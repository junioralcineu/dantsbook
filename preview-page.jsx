function PreviewPage() {
  const { lang, t } = useLang();
  const [tw, setTweak] = useTweaks({
    "theme": "light",
    "accentHue": 35,
    "fontPair": "fraunces-inter",
    "animSpeed": "normal",
    "fontSize": 21
  });

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

  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector(".reader-body");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const passed = Math.max(0, Math.min(rect.height, window.innerHeight - rect.top));
      const pct = rect.height > 0 ? Math.min(100, (passed / rect.height) * 100) : 0;
      const el = document.getElementById("article-prog");
      if (el) el.style.width = pct + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const excerpt = lang === "pt" ? (PREVIEW_BOOK.excerpt_pt || PREVIEW_BOOK.excerpt) : PREVIEW_BOOK.excerpt;

  return (
    <>
      <Nav activeKey="home" musicOn={false} onPlayMusic={() => {}} />
      <main className="reader-shell">
        <div className="reader-meta">
          <span>{t("preview.free")}</span>
          <span>{t("preview.minRead")}</span>
        </div>
        <Reveal className="reader-cover">
          <Cover tone={PREVIEW_BOOK.cover} title={PREVIEW_BOOK.title} author={PREVIEW_BOOK.author} size="lg" />
        </Reveal>
        <Reveal as="h1" className="reader-title" delay={100}>{PREVIEW_BOOK.title}</Reveal>
        <Reveal className="reader-author" delay={180}>{PREVIEW_BOOK.author} · {PREVIEW_BOOK.translator}</Reveal>
        <div className="reader-divider" aria-hidden="true">
          <span className="line" /><span className="ornament">❦</span><span className="line" />
        </div>
        <article className="reader-body" style={{ fontSize: tw.fontSize + "px" }}>
          {excerpt.map((p, i) => (
            <Reveal key={i} as="p" delay={i * 40}>{p}</Reveal>
          ))}
        </article>
        <div className="reader-divider" aria-hidden="true">
          <span className="line" /><span className="ornament">❦</span><span className="line" />
        </div>
        <Reveal>
          <div className="reader-end glass">
            <div className="eyebrow">{t("preview.endEyebrow")}</div>
            <h3>{t("preview.endH3")}</h3>
            <p className="body-m" style={{ maxWidth: "48ch", margin: "0 auto", color: "var(--ink-2)" }}>
              {t("preview.endBody")}
            </p>
            <div className="reader-actions">
              <a className="pill solid" href="#" rel="sponsored noopener">{t("featured.buy")}</a>
              <a className="pill" href="Articles.html">{t("preview.readMore")}</a>
              <a className="pill ghost" href="index.html">{t("preview.backJournal")}</a>
            </div>
            <div className="disclosure" style={{ marginTop: 14 }}>{t("featured.disclosure")}</div>
          </div>
        </Reveal>
      </main>
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweakSection label={t("tweaks.reader")} />
        <TweakSlider label={t("tweaks.bodySize")} min={16} max={28} step={1} value={tw.fontSize} unit="px"
          onChange={(v)=>setTweak("fontSize",v)} />
        <TweakSection label={t("tweaks.theme")} />
        <TweakRadio label={t("tweaks.mood")} value={tw.theme}
          options={[{value:"light",label:t("tweaks.light")},{value:"navy",label:t("tweaks.navy")}]}
          onChange={(v)=>setTweak("theme",v)} />
        <TweakSlider label={t("tweaks.accentHue")} min={0} max={360} step={5} value={tw.accentHue} unit="°"
          onChange={(v)=>setTweak("accentHue",v)} />
        <TweakSection label={t("tweaks.typography")} />
        <TweakSelect label={t("tweaks.typePairing")} value={tw.fontPair}
          options={[
            {value:"fraunces-inter",label:"Fraunces · Inter"},
            {value:"garamond-inter",label:"EB Garamond · Inter"},
            {value:"cormorant-inter",label:"Cormorant · Inter"},
          ]}
          onChange={(v)=>setTweak("fontPair",v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <LangProvider><PreviewPage /></LangProvider>
);
