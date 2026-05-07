function ReviewPage() {
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
      const rect  = article.getBoundingClientRect();
      const passed = Math.max(0, Math.min(rect.height, window.innerHeight - rect.top));
      const pct   = rect.height > 0 ? Math.min(100, (passed / rect.height) * 100) : 0;
      const el = document.getElementById("article-prog");
      if (el) el.style.width = pct + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reviewId = window.location.hash.slice(1);
  const review   = (REVIEWS || []).find(r => r.id === reviewId) || (REVIEWS || [])[0];

  if (!review) return (
    <main className="reader-shell" style={{ textAlign: "center", paddingTop: 80 }}>
      <p className="body-l">Review not found.</p>
      <a className="pill" href="index.html">← Back to journal</a>
    </main>
  );

  const title   = review.title[lang]  || review.title.en;
  const author  = review.author[lang] || review.author.en;
  const content = review.content[lang] || review.content.en;

  return (
    <>
      <Nav activeKey="home" musicOn={false} onPlayMusic={() => {}} />
      <main className="reader-shell">
        <div className="reader-meta">
          <span>{review.category}</span>
          <span className="star">{"★".repeat(review.rating)}</span>
        </div>
        <Reveal className="reader-cover">
          {review.image ? (
            <img
              src={review.image}
              alt={`${title} — ${author}`}
              style={{ width: 200, aspectRatio: "2/3", objectFit: "cover", borderRadius: 6,
                boxShadow: "inset 8px 0 12px -10px rgba(0,0,0,.35), 0 8px 28px -8px rgba(40,30,15,.50)" }}
            />
          ) : (
            <Cover tone={review.cover} title={title} author={author} size="lg" />
          )}
        </Reveal>
        <Reveal as="h1" className="reader-title" delay={80}>{title}</Reveal>
        <Reveal className="reader-author" delay={160}>{author}</Reveal>
        <div className="reader-divider" aria-hidden="true">
          <span className="line" /><span className="ornament">❦</span><span className="line" />
        </div>
        <article className="reader-body" style={{ fontSize: tw.fontSize + "px" }}>
          {content.map((para, i) => (
            <React.Fragment key={i}>
              <Reveal as="p" delay={i * 25}>{para}</Reveal>
              {i === review.affiliateAfterParagraph && review.affiliateUrl && (
                <Reveal delay={i * 25 + 15}>
                  <div style={{ margin: "28px 0 32px", display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
                    <a className="pill solid" href={review.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">
                      {t("reviews.buy")}
                    </a>
                    <p className="disclosure" style={{ margin: 0 }}>{t("featured.disclosure")}</p>
                  </div>
                </Reveal>
              )}
            </React.Fragment>
          ))}
        </article>
        <div className="reader-divider" aria-hidden="true">
          <span className="line" /><span className="ornament">❦</span><span className="line" />
        </div>
        <Reveal>
          <div className="reader-end glass">
            <div className="eyebrow">{t("reviews.endEyebrow")}</div>
            <h3>{t("reviews.endH3")}</h3>
            <div className="reader-actions">
              <a className="pill" href="Articles.html">{t("preview.readMore")}</a>
              <a className="pill ghost" href="index.html">{t("preview.backJournal")}</a>
            </div>
          </div>
        </Reveal>
      </main>
      <Footer />
      <TweaksPanel title="Tweaks">
        <TweakSection label={t("tweaks.reader")} />
        <TweakSlider label={t("tweaks.bodySize")} min={16} max={28} step={1}
          value={tw.fontSize} unit="px" onChange={(v) => setTweak("fontSize", v)} />
        <TweakSection label={t("tweaks.theme")} />
        <TweakRadio label={t("tweaks.mood")} value={tw.theme}
          options={[{value:"light",label:t("tweaks.light")},{value:"navy",label:t("tweaks.navy")}]}
          onChange={(v) => setTweak("theme", v)} />
        <TweakSlider label={t("tweaks.accentHue")} min={0} max={360} step={5}
          value={tw.accentHue} unit="°" onChange={(v) => setTweak("accentHue", v)} />
        <TweakSection label={t("tweaks.typography")} />
        <TweakSelect label={t("tweaks.typePairing")} value={tw.fontPair}
          options={[
            {value:"fraunces-inter",  label:"Fraunces · Inter"},
            {value:"garamond-inter",  label:"EB Garamond · Inter"},
            {value:"cormorant-inter", label:"Cormorant · Inter"},
          ]}
          onChange={(v) => setTweak("fontPair", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <LangProvider><ReviewPage /></LangProvider>
);
