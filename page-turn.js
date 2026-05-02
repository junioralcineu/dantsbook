// Page-turn transition with ducklings — shared across all pages.
// On same-origin link clicks, plays a flip-out (current page lifts/curls)
// while a small troupe of ducklings shoves it across, then navigates.
// On every load, plays a quick flip-in so the next page settles.

(function () {
  if (window.__pageTurnInstalled) return;
  window.__pageTurnInstalled = true;

  // ── Inject styles ────────────────────────────────────────────
  const css = `
  .pt-stage {
    position: fixed; inset: 0; z-index: 99999;
    pointer-events: none;
    perspective: 2400px;
    perspective-origin: 100% 50%;
  }
  .pt-page {
    position: absolute; inset: 0;
    background:
      linear-gradient(180deg, oklch(.97 .015 80) 0%, oklch(.92 .025 78) 100%);
    transform-origin: right center;
    transform-style: preserve-3d;
    will-change: transform, opacity;
    box-shadow:
      inset 8px 0 24px -10px rgba(40,30,15,.18),
      0 30px 80px -20px rgba(40,30,15,.45);
    border-left: 1px solid rgba(40,30,15,.10);
  }
  .pt-page.dark {
    background: linear-gradient(180deg, oklch(.22 .04 245) 0%, oklch(.16 .05 250) 100%);
  }
  .pt-page::after {
    content: ""; position: absolute; inset: 0;
    background-image:
      radial-gradient(rgba(80,55,20,.08) 1px, transparent 1px),
      radial-gradient(rgba(80,55,20,.05) 1px, transparent 1px);
    background-size: 3px 3px, 7px 7px;
    background-position: 0 0, 1px 2px;
    mix-blend-mode: multiply;
    pointer-events: none;
  }
  .pt-page .pt-edge {
    position: absolute; top: 0; bottom: 0; left: 0; width: 14px;
    background: linear-gradient(90deg, rgba(40,30,15,.18), transparent);
  }

  /* outgoing page: curls right-to-left around right edge */
  @keyframes pt-flip-out {
    0%   { transform: rotateY(0deg);    box-shadow: inset 8px 0 24px -10px rgba(40,30,15,.18), 0 30px 80px -20px rgba(40,30,15,.45); }
    60%  { transform: rotateY(-110deg); box-shadow: inset 40px 0 60px -10px rgba(40,30,15,.50), 0 30px 80px -20px rgba(40,30,15,.55); }
    100% { transform: rotateY(-180deg); box-shadow: inset 60px 0 80px -10px rgba(40,30,15,.45), 0 30px 80px -20px rgba(40,30,15,.30); opacity: .0; }
  }
  /* incoming page: from -180 back to 0 */
  @keyframes pt-flip-in {
    0%   { transform: rotateY(180deg); opacity: .0; }
    20%  { opacity: 1; }
    100% { transform: rotateY(0deg);    opacity: 1; }
  }
  .pt-page.out { animation: pt-flip-out 1100ms cubic-bezier(.55,.15,.30,1) forwards; }
  .pt-page.in  { animation: pt-flip-in 900ms cubic-bezier(.30,.70,.30,1) forwards; }

  /* Duckling troupe */
  .pt-ducks {
    position: absolute; left: 0; right: 0; bottom: 18%;
    height: 80px;
    display: flex; align-items: end; justify-content: center; gap: 14px;
    pointer-events: none;
    transform: translateX(0);
    will-change: transform;
  }
  .pt-ducks.go { animation: pt-troupe 1100ms cubic-bezier(.55,.15,.30,1) forwards; }
  .pt-ducks.in { animation: pt-troupe-in 900ms cubic-bezier(.30,.70,.30,1) forwards; }
  @keyframes pt-troupe {
    0%   { transform: translateX(-30vw); opacity: 0; }
    20%  { opacity: 1; }
    100% { transform: translateX(40vw);  opacity: 0; }
  }
  @keyframes pt-troupe-in {
    0%   { transform: translateX(40vw);  opacity: 0; }
    25%  { opacity: 1; }
    100% { transform: translateX(-20vw); opacity: 0; }
  }

  /* one duckling */
  .duckling {
    position: relative;
    width: 56px; height: 52px;
    animation: pt-waddle .35s ease-in-out infinite alternate;
    transform-origin: 50% 90%;
  }
  .duckling.d2 { animation-duration: .42s; transform: scale(.9); }
  .duckling.d3 { animation-duration: .31s; transform: scale(1.08); }
  .duckling.d4 { animation-duration: .38s; transform: scale(.85); }
  .duckling.d5 { animation-duration: .33s; transform: scale(.95); }
  @keyframes pt-waddle {
    from { transform: rotate(-6deg) translateY(0); }
    to   { transform: rotate(6deg)  translateY(-4px); }
  }
  .duckling.d2 { animation-name: pt-waddle2; }
  @keyframes pt-waddle2 {
    from { transform: scale(.9) rotate(5deg); }
    to   { transform: scale(.9) rotate(-5deg) translateY(-3px); }
  }
  .duckling.d3 { animation-name: pt-waddle3; }
  @keyframes pt-waddle3 {
    from { transform: scale(1.08) rotate(-7deg); }
    to   { transform: scale(1.08) rotate(7deg) translateY(-5px); }
  }

  /* duckling parts (CSS shapes only) */
  .d-body {
    position: absolute; left: 8px; bottom: 4px;
    width: 40px; height: 28px; border-radius: 50% 50% 45% 55% / 60% 60% 40% 40%;
    background: oklch(.86 .14 95);
    box-shadow: inset -3px -2px 0 oklch(.78 .14 80);
  }
  .d-head {
    position: absolute; right: 0; top: 4px;
    width: 26px; height: 26px; border-radius: 50%;
    background: oklch(.88 .14 95);
    box-shadow: inset -2px -2px 0 oklch(.80 .14 80);
  }
  .d-eye {
    position: absolute; right: 8px; top: 12px;
    width: 4px; height: 4px; border-radius: 50%;
    background: #1a1814;
  }
  .d-beak {
    position: absolute; right: -6px; top: 16px;
    width: 12px; height: 7px;
    background: oklch(.75 .14 50);
    border-radius: 4px 60% 60% 4px;
    transform: rotate(-4deg);
  }
  .d-wing {
    position: absolute; left: 14px; top: 16px;
    width: 18px; height: 12px;
    background: oklch(.78 .14 88);
    border-radius: 60% 40% 50% 50%;
    animation: pt-wing .3s ease-in-out infinite alternate;
  }
  @keyframes pt-wing {
    from { transform: rotate(-6deg); } to { transform: rotate(8deg); }
  }
  .d-feet {
    position: absolute; bottom: -2px; left: 14px;
    display: flex; gap: 4px;
  }
  .d-feet i {
    width: 7px; height: 4px;
    background: oklch(.65 .14 45);
    border-radius: 50% 50% 30% 30%;
  }
  /* speech bubble — tiny grunt */
  .d-grunt {
    position: absolute; top: -16px; right: -4px;
    font: 600 9px/1 ui-monospace, monospace;
    color: oklch(.40 .03 60);
    background: oklch(.99 .01 80);
    padding: 3px 6px; border-radius: 8px;
    border: .5px solid rgba(40,30,15,.15);
    opacity: 0;
    animation: pt-grunt 1.1s ease-in-out forwards;
  }
  @keyframes pt-grunt {
    0%, 30% { opacity: 0; transform: translateY(4px); }
    50% { opacity: 1; transform: translateY(0); }
    80%, 100% { opacity: 0; transform: translateY(-4px); }
  }

  /* prevent body interaction during flip */
  html.pt-busy, html.pt-busy body { overflow: hidden !important; }
  `;
  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Helpers ──────────────────────────────────────────────────
  const isNavy = () => document.documentElement.getAttribute("data-theme") === "navy";

  function buildDucklings(count) {
    const wrap = document.createElement("div");
    wrap.className = "pt-ducks";
    const grunts = ["pip!", "heave!", "hup!", "page!", "go!"];
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = `duckling d${(i % 5) + 1}`;
      d.innerHTML = `
        <div class="d-body"></div>
        <div class="d-wing"></div>
        <div class="d-head">
          <div class="d-eye"></div>
          <div class="d-beak"></div>
        </div>
        <div class="d-feet"><i></i><i></i></div>
        ${i === Math.floor(count / 2) ? `<span class="d-grunt">${grunts[Math.floor(Math.random()*grunts.length)]}</span>` : ""}
      `;
      wrap.appendChild(d);
    }
    return wrap;
  }

  function buildStage(direction /* 'out' | 'in' */) {
    const stage = document.createElement("div");
    stage.className = "pt-stage";
    const page = document.createElement("div");
    page.className = `pt-page ${isNavy() ? "dark" : ""} ${direction}`;
    const edge = document.createElement("div");
    edge.className = "pt-edge";
    page.appendChild(edge);
    const ducks = buildDucklings(5);
    ducks.classList.add(direction === "out" ? "go" : "in");
    stage.appendChild(page);
    stage.appendChild(ducks);
    return stage;
  }

  // ── Outgoing transition ──────────────────────────────────────
  function flipOutTo(href) {
    document.documentElement.classList.add("pt-busy");
    const stage = buildStage("out");
    document.body.appendChild(stage);
    setTimeout(() => { window.location.href = href; }, 950);
  }

  // ── Incoming transition (on load) ────────────────────────────
  function flipIn() {
    try {
      if (sessionStorage.getItem("pt:incoming") !== "1") return;
      sessionStorage.removeItem("pt:incoming");
    } catch (_err) { return; }
    const stage = buildStage("in");
    if (!document.body) return;
    document.body.appendChild(stage);
    setTimeout(() => { stage.remove(); }, 950);
  }

  // ── Click interception ───────────────────────────────────────
  let busy = false;

  function onClick(e) {
    if (busy) return;
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download")) return;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return;
    // skip pure-hash anchor
    if (href.startsWith("#")) return;

    // resolve to absolute
    let url;
    try { url = new URL(href, window.location.href); } catch (_err) { return; }
    if (url.origin !== window.location.origin) return;
    // skip same-page navigation (with or without a hash — just scroll)
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;

    e.preventDefault();
    busy = true;
    try { sessionStorage.setItem("pt:incoming", "1"); } catch (_err) {}
    flipOutTo(url.href);
  }

  // ── Wire up ──────────────────────────────────────────────────
  document.addEventListener("click", onClick, true);

  // play incoming when ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", flipIn);
  } else {
    flipIn();
  }

  // pageshow handles bfcache restore
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) flipIn();
  });
})();
