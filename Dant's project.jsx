// Root app for Dant's

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accentHue": 35,
  "fontPair": "fraunces-inter",
  "animSpeed": "normal",
  "grain": true,
  "logoText": "Dant's"
}/*EDITMODE-END*/;

const FONT_PAIRS = {
  "fraunces-inter":  { display: "'Fraunces', Georgia, serif",          body: "'Inter', system-ui, sans-serif" },
  "garamond-inter":  { display: "'EB Garamond', Georgia, serif",       body: "'Inter', system-ui, sans-serif" },
  "cormorant-inter": { display: "'Cormorant Garamond', Georgia, serif", body: "'Inter', system-ui, sans-serif" },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [musicOn, setMusicOn] = React.useState(false);

  // Apply theme + accent + fonts as CSS vars on <html>
  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", t.theme === "navy" ? "navy" : "light");
    r.style.setProperty("--accent",   `oklch(0.58 0.13 ${t.accentHue})`);
    r.style.setProperty("--accent-2", `oklch(0.58 0.13 ${(Number(t.accentHue) + 60) % 360})`);
    const pair = FONT_PAIRS[t.fontPair] || FONT_PAIRS["fraunces-inter"];
    r.style.setProperty("--font-display", pair.display);
    r.style.setProperty("--font-body",    pair.body);
    document.body.dataset.anim = t.animSpeed;
    document.body.style.setProperty("--grain-opacity", t.grain ? ".35" : "0");
    // grain: toggle by clearing the ::after via class
    if (!t.grain) {
      document.documentElement.classList.add("no-grain");
    } else {
      document.documentElement.classList.remove("no-grain");
    }
  }, [t]);

  return (
    <>
      <ScrollProgress />
      <Nav musicOn={musicOn} onPlayMusic={() => setMusicOn(v => !v)} activeKey="home" />
      <Hero />
      <QuoteSection />
      <PosterQuote />
      <CurrentlyReading />
      <Featured />
      <FreePreviewCTA />
      <Collections />
      <About />
      <Newsletter />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio
          label="Mood"
          value={t.theme}
          options={[
            { value: "light", label: "Light" },
            { value: "navy",  label: "Deep navy" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakSlider
          label="Accent hue"
          min={0} max={360} step={5}
          value={t.accentHue}
          unit="°"
          onChange={(v) => setTweak("accentHue", v)}
        />
        <TweakToggle
          label="Paper grain"
          value={t.grain}
          onChange={(v) => setTweak("grain", v)}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Type pairing"
          value={t.fontPair}
          options={[
            { value: "fraunces-inter",  label: "Fraunces · Inter" },
            { value: "garamond-inter",  label: "EB Garamond · Inter" },
            { value: "cormorant-inter", label: "Cormorant · Inter" },
          ]}
          onChange={(v) => setTweak("fontPair", v)}
        />

        <TweakSection label="Motion" />
        <TweakRadio
          label="Background drift"
          value={t.animSpeed}
          options={[
            { value: "slow",   label: "Slow"   },
            { value: "normal", label: "Normal" },
            { value: "fast",   label: "Fast"   },
            { value: "off",    label: "Off"    },
          ]}
          onChange={(v) => setTweak("animSpeed", v)}
        />
      </TweaksPanel>

      {/* Music ambience hint (no real audio yet — promised for later) */}
      {musicOn && (
        <div
          className="glass"
          style={{
            position: "fixed", left: 16, bottom: 16, padding: "10px 14px",
            borderRadius: 999, fontSize: 12, color: "var(--ink-2)",
            display: "flex", gap: 10, alignItems: "center", zIndex: 40,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
          Reading-room ambience — coming soon. Imagine a low fire and rain.
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
