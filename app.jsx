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
  "fraunces-inter":  { display: "'Fraunces', Georgia, serif",           body: "'Inter', system-ui, sans-serif" },
  "garamond-inter":  { display: "'EB Garamond', Georgia, serif",        body: "'Inter', system-ui, sans-serif" },
  "cormorant-inter": { display: "'Cormorant Garamond', Georgia, serif", body: "'Inter', system-ui, sans-serif" },
};

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [musicOn, setMusicOn] = React.useState(false);
  const { t } = useLang();

  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", tw.theme === "navy" ? "navy" : "light");
    r.style.setProperty("--accent",   `oklch(0.58 0.13 ${tw.accentHue})`);
    r.style.setProperty("--accent-2", `oklch(0.58 0.13 ${(Number(tw.accentHue) + 60) % 360})`);
    const pair = FONT_PAIRS[tw.fontPair] || FONT_PAIRS["fraunces-inter"];
    r.style.setProperty("--font-display", pair.display);
    r.style.setProperty("--font-body",    pair.body);
    document.body.dataset.anim = tw.animSpeed;
    if (!tw.grain) {
      document.documentElement.classList.add("no-grain");
    } else {
      document.documentElement.classList.remove("no-grain");
    }
  }, [tw]);

  return (
    <>
      <ScrollProgress />
      <Nav musicOn={musicOn} onPlayMusic={() => setMusicOn(v => !v)} activeKey="home" />
      <Hero />
      <QuoteSection />
      <PosterQuote />
      <CurrentlyReading />
      <Featured />
      <Reviews />
      <FreePreviewCTA />
      <Collections />
      <About />
      <Newsletter />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label={t("tweaks.theme")} />
        <TweakRadio
          label={t("tweaks.mood")}
          value={tw.theme}
          options={[
            { value: "light", label: t("tweaks.light") },
            { value: "navy",  label: t("tweaks.navy")  },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakSlider
          label={t("tweaks.accentHue")}
          min={0} max={360} step={5}
          value={tw.accentHue}
          unit="°"
          onChange={(v) => setTweak("accentHue", v)}
        />
        <TweakToggle
          label={t("tweaks.grain")}
          value={tw.grain}
          onChange={(v) => setTweak("grain", v)}
        />

        <TweakSection label={t("tweaks.typography")} />
        <TweakSelect
          label={t("tweaks.typePairing")}
          value={tw.fontPair}
          options={[
            { value: "fraunces-inter",  label: "Fraunces · Inter" },
            { value: "garamond-inter",  label: "EB Garamond · Inter" },
            { value: "cormorant-inter", label: "Cormorant · Inter" },
          ]}
          onChange={(v) => setTweak("fontPair", v)}
        />

        <TweakSection label={t("tweaks.motion")} />
        <TweakRadio
          label={t("tweaks.drift")}
          value={tw.animSpeed}
          options={[
            { value: "slow",   label: t("tweaks.slow")   },
            { value: "normal", label: t("tweaks.normal") },
            { value: "fast",   label: t("tweaks.fast")   },
            { value: "off",    label: t("tweaks.off")    },
          ]}
          onChange={(v) => setTweak("animSpeed", v)}
        />
      </TweaksPanel>

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
          {t("music.hint")}
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <LangProvider><App /></LangProvider>
);
