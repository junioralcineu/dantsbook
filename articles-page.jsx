const { useState, useMemo } = React;

function ArticlesPage() {
  const { lang, t, d } = useLang();
  const [tw, setTweak] = useTweaks({
    "theme": "light",
    "accentHue": 35,
    "fontPair": "fraunces-inter",
    "animSpeed": "normal",
    "grain": true
  });

  React.useEffect(() => {
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

  const tags = useMemo(() => ["All", ...Array.from(new Set(ARTICLES.map(a => a.tag)))], []);
  const [tag, setTag] = useState(() => {
    const hash = window.location.hash.slice(1);
    const valid = ["All", ...Array.from(new Set(ARTICLES.map(a => a.tag)))];
    return valid.includes(hash) ? hash : "All";
  });
  const filtered = useMemo(
    () => tag === "All" ? ARTICLES : ARTICLES.filter(a => a.tag === tag),
    [tag]
  );

  return (
    <>
      <ScrollProgress />
      <Nav activeKey="articles" musicOn={false} onPlayMusic={() => {}} />

      <section className="wrap page-head">
        <div className="eyebrow">{t("articles.eyebrow")}</div>
        <h1>{t("articles.h1")}</h1>
        <p>{t("articles.desc")}</p>
      </section>

      <section className="wrap" style={{ marginTop: 12 }}>
        <Reveal className="filter-row" as="div">
          {tags.map((g) => (
            <button key={g} className="chip" aria-pressed={tag === g} onClick={() => setTag(g)}>
              {g === "All" ? t("articles.all") : t("genre." + g)}
            </button>
          ))}
          <span className="chip" style={{ borderStyle: "dashed", color: "var(--ink-3)" }}>
            {filtered.length} {filtered.length === 1 ? t("articles.piece") : t("articles.pieces")}
          </span>
        </Reveal>

        <div className="articles-grid">
          {filtered.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <a href="Preview.html" className="article-card glass">
                <div className="article-cover">
                  <Cover tone={a.cover} title={d(a, "title")} author={t("genre." + a.tag)} />
                </div>
                <div className="article-meta">
                  <span style={{ color: "var(--accent)" }}>●</span>
                  <span>{t("genre." + a.tag)}</span>
                  <span>·</span>
                  <span>{a.minutes} {t("articles.minRead")}</span>
                </div>
                <h3 className="article-h">{d(a, "title")}</h3>
                <div className="article-expand-wrap">
                  <div className="article-expand-inner">
                    <p className="article-dek">{d(a, "dek")}</p>
                    <div className="article-foot">
                      <span>{a.date}</span>
                      <span>{t("articles.read")}</span>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />

      <TweaksPanel title="Tweaks">
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
  <LangProvider><ArticlesPage /></LangProvider>
);
