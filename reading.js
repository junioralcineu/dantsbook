// Dant's — Reading room (focus timer + Web Audio ambience + encouragements).
// Plain JS, only loaded on reading.html.

(function () {
  const ENCOURAGEMENTS_EN = [
    "You don't have to finish it tonight.", "Read one paragraph again. Slowly.",
    "The page isn't going anywhere.", "Notice what you noticed.",
    "It's okay to put it down for a moment.", "Underline the line that just moved you.",
    "A book read slowly is read twice.", "You're already further than this morning.",
    "Take a breath. The author waited centuries.", "If a sentence stopped you, it earned it.",
    "Re-reading is not failing.", "One quiet hour is more than most people have.",
  ];
  const ENCOURAGEMENTS_PT = [
    "Não precisas de acabar esta noite.", "Lê um parágrafo de novo. Devagar.",
    "A página não vai a lado nenhum.", "Repara no que reparaste.",
    "Não há problema em pousá-lo por um momento.", "Sublinha a frase que acabou de te tocar.",
    "Um livro lido devagar é lido duas vezes.", "Já estás mais à frente do que esta manhã.",
    "Respira fundo. O autor esperou séculos.", "Se uma frase te deteve, ganhou-o.",
    "Reler não é falhar.", "Uma hora tranquila vale mais do que a maioria das pessoas tem.",
  ];

  function currentLang() {
    return document.documentElement.getAttribute("data-lang") === "pt" ? "pt" : "en";
  }

  function fmt(s) {
    const m = Math.floor(s / 60), sec = s % 60;
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  // ── Ambience engine (Web Audio API) ─────────────────────────────
  function makeAmbience(ctx, kind) {
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    const nodes = [];

    if (kind === "rain") {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < data.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; data[i] = last * 3.5; }
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1100;
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 220;
      src.connect(hp); hp.connect(lp); lp.connect(master); src.start();
      nodes.push(src);
    } else if (kind === "fire") {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < data.length; i++) {
        const w = Math.random() * 2 - 1; last = (last + 0.04 * w) / 1.04;
        data[i] = last * 5 + (Math.random() < 0.001 ? (Math.random() - 0.5) * 1.2 : 0);
      }
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 600;
      src.connect(lp); lp.connect(master); src.start();
      nodes.push(src);
    } else {
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
      fadeTo(v, dur) {
        dur = dur || 1.2;
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

  document.addEventListener("DOMContentLoaded", () => {
    const dialFill = document.querySelector(".dial-fill");
    const dialPulseWrap = document.querySelector(".dial-wrap");
    const dialTime = document.querySelector(".dial-time");
    const dialState = document.querySelector(".dial-state");
    const dialOf = document.querySelector("[data-room-dial-of-time]");
    const beginBtn = document.querySelector("[data-room-begin]");
    const pauseBtn = document.querySelector("[data-room-pause]");
    const resetBtn = document.querySelector("[data-room-reset]");
    const presetBtns = document.querySelectorAll("[data-room-preset]");
    const sessionPips = document.querySelectorAll(".pip");
    const sessionExtra = document.querySelector("[data-room-extra]");
    const ambBtn = document.querySelector("[data-room-amb-toggle]");
    const ambBars = document.querySelector(".room-bottom .amb-bars");
    const ambSelect = document.querySelector("[data-room-amb-kind]");
    const ambVol = document.querySelector("[data-room-amb-vol]");
    const encourageEl = document.querySelector(".encourage");
    const finishedEl = document.querySelector(".finished");
    const finishedEyebrow = document.querySelector("[data-room-finished-eyebrow]");
    const finishedBody = document.querySelector("[data-room-finished-body]");
    const readAgainBtn = document.querySelector("[data-room-read-again]");

    if (!dialFill) return; // not the reading page

    const R = 130;
    const C = 2 * Math.PI * R;
    dialFill.setAttribute("stroke-dasharray", String(C));

    let goal = 25 * 60;
    let elapsed = 0;
    let running = false;
    let finished = false;
    let tickId = null;
    let sessionsToday = 0;

    try {
      const stored = JSON.parse(localStorage.getItem("dants.reading") || "{}");
      const today = new Date().toISOString().slice(0, 10);
      sessionsToday = stored.date === today ? stored.count || 0 : 0;
    } catch (e) {}

    function render() {
      const pct = elapsed / goal;
      dialFill.setAttribute("stroke-dashoffset", String(C * (1 - pct)));
      dialTime.textContent = fmt(goal - elapsed);
      if (dialOf) dialOf.textContent = fmt(goal);
      dialState.textContent = finished
        ? dialState.dataset.complete
        : running ? dialState.dataset.reading
        : elapsed > 0 ? dialState.dataset.paused
        : dialState.dataset.ready;
      beginBtn.style.display = running ? "none" : "";
      pauseBtn.style.display = running ? "" : "none";
      beginBtn.textContent = elapsed > 0 ? beginBtn.dataset.resume : beginBtn.dataset.begin;
      resetBtn.disabled = elapsed === 0;
      if (dialPulseWrap) dialPulseWrap.classList.toggle("running", running);
      presetBtns.forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.roomPreset) === goal)));
      const pipMax = sessionPips.length;
      const visible = Math.min(sessionsToday, pipMax);
      sessionPips.forEach((p, i) => p.classList.toggle("on", i < visible));
      if (sessionExtra) sessionExtra.textContent = sessionsToday > pipMax ? "+" + (sessionsToday - pipMax) : "";
    }

    function tick() {
      elapsed++;
      if (elapsed >= goal) {
        elapsed = goal;
        running = false;
        finished = true;
        clearInterval(tickId);
        const today = new Date().toISOString().slice(0, 10);
        sessionsToday++;
        try { localStorage.setItem("dants.reading", JSON.stringify({ date: today, count: sessionsToday })); } catch (e) {}
        showFinished();
      }
      render();
    }

    function start() {
      finished = false;
      hideFinished();
      running = true;
      tickId = setInterval(tick, 1000);
      render();
    }
    function pause() {
      running = false;
      clearInterval(tickId);
      render();
    }
    function reset() {
      elapsed = 0; running = false; finished = false;
      clearInterval(tickId);
      hideFinished();
      render();
    }

    function showFinished() {
      if (finishedEyebrow) finishedEyebrow.textContent = finishedEyebrow.dataset.template.replace("{time}", fmt(goal));
      if (finishedBody) finishedBody.textContent = finishedBody.dataset.template.replace("{time}", fmt(elapsed));
      finishedEl.classList.add("show");
    }
    function hideFinished() { finishedEl.classList.remove("show"); }

    beginBtn.addEventListener("click", start);
    pauseBtn.addEventListener("click", pause);
    resetBtn.addEventListener("click", reset);
    if (readAgainBtn) readAgainBtn.addEventListener("click", reset);
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (running) return;
        goal = Number(btn.dataset.roomPreset);
        elapsed = 0; finished = false;
        hideFinished();
        render();
      });
    });

    // ── Encouragement toasts ────────────────────────────────────
    let encourageTimer = null;
    let encourageFirstTimer = null;
    let lastShown = -1;
    function showEncouragement() {
      const msgs = currentLang() === "pt" ? ENCOURAGEMENTS_PT : ENCOURAGEMENTS_EN;
      let idx;
      do { idx = Math.floor(Math.random() * msgs.length); } while (idx === lastShown && msgs.length > 1);
      lastShown = idx;
      encourageEl.textContent = msgs[idx];
      encourageEl.classList.add("show");
      setTimeout(() => encourageEl.classList.remove("show"), 6500);
    }
    function startEncouragements() {
      encourageFirstTimer = setTimeout(showEncouragement, 25000);
      encourageTimer = setInterval(showEncouragement, 150000);
    }
    function stopEncouragements() {
      clearTimeout(encourageFirstTimer);
      clearInterval(encourageTimer);
    }
    beginBtn.addEventListener("click", startEncouragements);
    pauseBtn.addEventListener("click", stopEncouragements);
    resetBtn.addEventListener("click", stopEncouragements);

    // ── Ambience ─────────────────────────────────────────────────
    let ctx = null, amb = null, ambOn = false, ambKind = "library", vol = 0.35;
    function ensureCtx() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) ctx = new AC();
      }
      if (ctx && ctx.state === "suspended") ctx.resume();
      return ctx;
    }
    function startAmb(kind) {
      const c = ensureCtx();
      if (!c) return;
      if (amb) amb.stop();
      amb = makeAmbience(c, kind);
      amb.fadeTo(vol, 1.5);
    }
    if (ambBtn) {
      ambBtn.addEventListener("click", () => {
        if (ambOn) {
          if (amb) { amb.fadeTo(0, 0.8); const a = amb; setTimeout(() => a.stop(), 900); amb = null; }
          ambOn = false;
        } else {
          startAmb(ambKind);
          ambOn = true;
        }
        ambBtn.classList.toggle("off", !ambOn);
        if (ambBars) ambBars.classList.toggle("amb-paused", !ambOn);
      });
    }
    if (ambSelect) {
      ambSelect.addEventListener("change", (e) => {
        ambKind = e.target.value;
        if (ambOn) startAmb(ambKind);
      });
    }
    if (ambVol) {
      ambVol.addEventListener("input", (e) => {
        vol = parseFloat(e.target.value);
        if (amb) amb.fadeTo(vol, 0.3);
      });
    }
    window.addEventListener("beforeunload", () => { if (amb) amb.stop(); });

    render();
  });
})();
