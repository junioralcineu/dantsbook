// Reading room: timer, ambience (Web Audio synthesised), rotating encouragements

const { useState, useEffect, useRef, useCallback } = React;

// ── Ambience engine (Web Audio API) ───────────────────────────────
function makeAmbience(ctx, kind) {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const nodes = [];

  if (kind === "rain") {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      data[i] = last * 3.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass"; lp.frequency.value = 1100;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass"; hp.frequency.value = 220;
    src.connect(hp); hp.connect(lp); lp.connect(master);
    src.start();
    nodes.push(src);
  } else if (kind === "fire") {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.04 * w) / 1.04;
      data[i] = last * 5 + (Math.random() < 0.001 ? (Math.random() - 0.5) * 1.2 : 0);
    }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 600;
    src.connect(lp); lp.connect(master); src.start();
    nodes.push(src);
  } else {
    // "library": low pad + airy noise
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.6;
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 800;
    src.connect(lp); lp.connect(master); src.start();
    nodes.push(src);

    const o1 = ctx.createOscillator(); o1.type = "sine"; o1.frequency.value = 110;
    const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = 165;
    const padG = ctx.createGain(); padG.gain.value = 0.05;
    o1.connect(padG); o2.connect(padG); padG.connect(master);
    o1.start(); o2.start();
    nodes.push(o1, o2);
  }

  return {
    master,
    fadeTo(v, dur = 1.2) {
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.linearRampToValueAtTime(v, t + dur);
    },
    stop() {
      try { master.gain.cancelScheduledValues(ctx.currentTime); } catch (e) {}
      master.gain.value = 0;
      nodes.forEach((n) => { try { n.stop && n.stop(); } catch (e) {} });
      try { master.disconnect(); } catch (e) {}
    },
  };
}

// ── Helpers ──────────────────────────────────────────────────────
const fmt = (s) => {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

// ── Reading page ─────────────────────────────────────────────────
function ReadingRoom() {
  const { lang, t } = useLang();

  const [tw, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "theme": "light",
    "accentHue": 35,
    "fontPair": "fraunces-inter",
    "animSpeed": "normal"
  }/*EDITMODE-END*/);

  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", tw.theme === "navy" ? "navy" : "light");
    r.style.setProperty("--accent",   `oklch(0.58 0.13 ${tw.accentHue})`);
    r.style.setProperty("--accent-2", `oklch(0.58 0.13 ${(Number(tw.accentHue) + 60) % 360})`);
    const PAIRS = {
      "fraunces-inter":  { display: "'Fraunces', Georgia, serif",           body: "'Inter', system-ui, sans-serif" },
      "garamond-inter":  { display: "'EB Garamond', Georgia, serif",        body: "'Inter', system-ui, sans-serif" },
      "cormorant-inter": { display: "'Cormorant Garamond', Georgia, serif", body: "'Inter', system-ui, sans-serif" },
    };
    const p = PAIRS[tw.fontPair] || PAIRS["fraunces-inter"];
    r.style.setProperty("--font-display", p.display);
    r.style.setProperty("--font-body",    p.body);
    document.body.dataset.anim = tw.animSpeed;
  }, [tw]);

  // ── Timer state ───────────────────────────────────────────────
  const PRESETS = [
    { label: "15 min", value: 15 * 60 },
    { label: "25 min", value: 25 * 60 },
    { label: "40 min", value: 40 * 60 },
    { label: "60 min", value: 60 * 60 },
  ];
  const [goal, setGoal] = useState(25 * 60);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessionsToday, setSessionsToday] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("dants.reading") || "{}");
      const today = new Date().toISOString().slice(0, 10);
      return stored.date === today ? (stored.count || 0) : 0;
    } catch (e) { return 0; }
  });
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((s) => {
        const next = s + 1;
        if (next >= goal) {
          setRunning(false);
          setFinished(true);
          const today = new Date().toISOString().slice(0, 10);
          setSessionsToday((c) => {
            const nc = c + 1;
            try { localStorage.setItem("dants.reading", JSON.stringify({ date: today, count: nc })); } catch (e) {}
            return nc;
          });
          return goal;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, goal]);

  const reset = () => { setElapsed(0); setRunning(false); setFinished(false); };
  const start = () => { setFinished(false); setRunning(true); };
  const pause = () => setRunning(false);

  // ── Encouragements ────────────────────────────────────────────
  const [msg, setMsg] = useState(null);
  const lastShownRef = useRef(-1);
  useEffect(() => {
    if (!running) return;
    const msgs = lang === "pt" ? ENCOURAGEMENTS_PT : ENCOURAGEMENTS;
    const id = setInterval(() => {
      let idx;
      do { idx = Math.floor(Math.random() * msgs.length); }
      while (idx === lastShownRef.current && msgs.length > 1);
      lastShownRef.current = idx;
      setMsg(msgs[idx]);
      setTimeout(() => setMsg(null), 6500);
    }, 150 * 1000);
    const first = setTimeout(() => {
      const idx = Math.floor(Math.random() * msgs.length);
      lastShownRef.current = idx;
      setMsg(msgs[idx]);
      setTimeout(() => setMsg(null), 6500);
    }, 25 * 1000);
    return () => { clearInterval(id); clearTimeout(first); };
  }, [running, lang]);

  // ── Ambience ─────────────────────────────────────────────────
  const [ambKind, setAmbKind] = useState("library");
  const [ambOn, setAmbOn] = useState(false);
  const [vol, setVol] = useState(0.35);
  const ctxRef = useRef(null);
  const ambRef = useRef(null);

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) ctxRef.current = new AC();
    }
    if (ctxRef.current && ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const startAmb = useCallback((kind) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    if (ambRef.current) ambRef.current.stop();
    const a = makeAmbience(ctx, kind);
    a.fadeTo(vol, 1.5);
    ambRef.current = a;
  }, [ensureCtx, vol]);

  const toggleAmb = () => {
    if (ambOn) {
      if (ambRef.current) {
        ambRef.current.fadeTo(0, 0.8);
        const a = ambRef.current;
        setTimeout(() => a.stop(), 900);
        ambRef.current = null;
      }
      setAmbOn(false);
    } else {
      startAmb(ambKind);
      setAmbOn(true);
    }
  };
  const changeKind = (k) => { setAmbKind(k); if (ambOn) startAmb(k); };
  useEffect(() => { if (ambRef.current) ambRef.current.fadeTo(vol, 0.3); }, [vol]);
  useEffect(() => () => { if (ambRef.current) ambRef.current.stop(); }, []);

  // ── Dial geometry ────────────────────────────────────────────
  const R = 130;
  const C = 2 * Math.PI * R;
  const pct = elapsed / goal;
  const offset = C * (1 - pct);

  const pipMax = 4;
  const pipsVisible = Math.min(sessionsToday, pipMax);

  // weekday in current language
  const weekday = new Date().toLocaleDateString(lang === "pt" ? "pt-PT" : "en-US", { weekday: "long" });

  // finished body with time substituted
  const finishedBody = t("room.finishedBody").replace("{time}", fmt(elapsed));
  const finishedEyebrow = t("room.finishedEyebrow").replace("{time}", fmt(goal));

  return (
    <>
      <div className="room dim">
        {/* Top bar */}
        <div className="room-top">
          <a className="room-back" href="Dants Book Blog.html">
            <span style={{ fontSize: 16, lineHeight: 1 }}>‹</span> {t("room.back")}
          </a>
          <div className="room-meta">{t("room.title")} · {weekday}</div>
          <div style={{ width: 148 }} />
        </div>

        {/* Stage */}
        <div className="room-stage">
          <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />

          <div className="dial-wrap">
            {running && <div className="dial-pulse" />}
            <svg className="dial-svg" viewBox="0 0 280 280">
              <circle className="dial-track" cx="140" cy="140" r={R} />
              <circle
                className="dial-fill"
                cx="140" cy="140" r={R}
                strokeDasharray={C}
                strokeDashoffset={offset}
              />
            </svg>
            <div className="dial-inner">
              <div className="dial-state">
                {finished ? t("room.complete") : running ? t("room.reading") : elapsed > 0 ? t("room.paused") : t("room.ready")}
              </div>
              <div className="dial-time">{fmt(goal - elapsed)}</div>
              <div className="dial-state" style={{ opacity: .7 }}>
                {t("room.of")} {fmt(goal)}
              </div>
            </div>
          </div>

          <div className="room-controls">
            {!running && (
              <button className="ctrl primary" onClick={start}>
                {elapsed > 0 ? t("room.resume") : t("room.begin")}
              </button>
            )}
            {running && (
              <button className="ctrl primary" onClick={pause}>{t("room.pause")}</button>
            )}
            <button className="ctrl" onClick={reset} disabled={elapsed === 0}>{t("room.reset")}</button>
          </div>

          <div className="presets" role="group" aria-label="Session length">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                className="preset"
                aria-pressed={goal === p.value}
                onClick={() => { if (!running) { setGoal(p.value); setElapsed(0); setFinished(false); } }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="room-bottom">
          <div className="session-line">
            <span>{t("room.sessions")}</span>
            <span className="pip-row" aria-label={`${sessionsToday} sessions today`}>
              {Array.from({ length: pipMax }).map((_, i) => (
                <span key={i} className={`pip ${i < pipsVisible ? "on" : ""}`} />
              ))}
              {sessionsToday > pipMax && (
                <span style={{ marginLeft: 6 }}>+{sessionsToday - pipMax}</span>
              )}
            </span>
          </div>

          <div className="amb" role="group" aria-label="Ambience">
            <button
              className={`amb-btn ${ambOn ? "" : "off"}`}
              onClick={toggleAmb}
              aria-pressed={ambOn}
              title={ambOn ? t("room.pause") : t("nav.ambience")}
            >
              {ambOn ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="3" height="8" rx="1"/><rect x="7" y="2" width="3" height="8" rx="1"/></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M3 2 L10 6 L3 10 Z"/></svg>
              )}
            </button>
            <div className={`amb-bars ${ambOn ? "" : "amb-paused"}`} aria-hidden="true" style={{ color: "var(--ink-2)" }}>
              <i /><i /><i /><i />
            </div>
            <select value={ambKind} onChange={(e) => changeKind(e.target.value)} aria-label="Ambience kind">
              <option value="library">{t("room.library")}</option>
              <option value="rain">{t("room.rain")}</option>
              <option value="fire">{t("room.fire")}</option>
            </select>
            <input
              type="range" min="0" max="1" step="0.01"
              className="amb-vol"
              value={vol}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              aria-label="Volume"
            />
          </div>
        </div>

        <div className="room-hint">{t("room.tip")}</div>
      </div>

      {/* Encouragement toast */}
      <div className={`encourage ${msg ? "show" : ""}`} aria-live="polite">{msg}</div>

      {/* Finished overlay */}
      <div className={`finished ${finished ? "show" : ""}`}>
        <div className="finished-card">
          <div className="eyebrow">{finishedEyebrow}</div>
          <h2>{t("room.finishedH2")}</h2>
          <p className="body-m" style={{ color: "var(--ink-2)" }}>
            {finishedBody}
          </p>
          <div style={{ marginTop: 14 }}>
            <button className="pill solid" onClick={reset}>{t("room.readAgain")}</button>
            <a className="pill" href="Articles.html">{t("room.browseArticles")}</a>
            <a className="pill ghost" href="Dants Book Blog.html">{t("room.back")}</a>
          </div>
        </div>
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label={t("tweaks.theme")} />
        <TweakRadio label={t("tweaks.mood")} value={tw.theme}
          options={[{value:"light",label:t("tweaks.light")},{value:"navy",label:t("tweaks.navy")}]}
          onChange={(v)=>setTweak("theme",v)} />
        <TweakSlider label={t("tweaks.accentHue")} min={0} max={360} step={5} value={tw.accentHue} unit="°"
          onChange={(v)=>setTweak("accentHue",v)} />
        <TweakSection label={t("tweaks.motion")} />
        <TweakRadio label={t("tweaks.drift")} value={tw.animSpeed}
          options={[
            { value: "slow",   label: t("tweaks.slow")   },
            { value: "normal", label: t("tweaks.normal") },
            { value: "fast",   label: t("tweaks.fast")   },
            { value: "off",    label: t("tweaks.off")    },
          ]}
          onChange={(v)=>setTweak("animSpeed",v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <LangProvider><ReadingRoom /></LangProvider>
);
