const { useState } = React;

function OpinionCard({ o }) {
  const { t, d } = useLang();
  return (
    <article className="op-card glass">
      <div className="op-stars" aria-label={`${o.rating} of 5`}>
        {"★".repeat(o.rating)}{"☆".repeat(5 - o.rating)}
      </div>
      <p className="op-quote">{d(o, "text")}</p>
      <div className="op-row">
        <div className={`op-avatar cover ${o.avatar}`} style={{ aspectRatio: "auto", padding: 0 }} />
        <div>
          <div className="op-name">{o.name}</div>
          <div className="op-where">{o.where}</div>
        </div>
      </div>
      <div className="op-meta">
        <span>{t("opinions.on")} <em>{o.book}</em></span>
        <span>↗</span>
      </div>
    </article>
  );
}

function OpinionsPage() {
  const { t } = useLang();
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

  const [form, setForm] = useState({ name: "", book: "", text: "" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (form.name.trim() && form.text.trim()) setSent(true);
  };

  return (
    <>
      <ScrollProgress />
      <Nav activeKey="opinions" musicOn={false} onPlayMusic={() => {}} />

      <section className="wrap page-head">
        <div className="eyebrow">{t("opinions.eyebrow")}</div>
        <h1>{t("opinions.h1")}</h1>
        <p>{t("opinions.desc")}</p>
      </section>

      <section className="wrap">
        <div className="opinions-grid">
          {OPINIONS.map((o, i) => (
            <Reveal key={o.name} delay={i * 60}>
              <OpinionCard o={o} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <form className="submit-card glass" onSubmit={submit}>
            <div className="eyebrow">{t("opinions.sendEyebrow")}</div>
            <h2>{t("opinions.sendH2")}</h2>
            <p className="body-m" style={{ maxWidth: "52ch", margin: "0 auto", color: "var(--ink-2)" }}>
              {t("opinions.sendDesc")}
            </p>
            <div className="submit-form">
              <input type="text" placeholder={t("opinions.namePlaceholder")}
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input type="text" placeholder={t("opinions.bookPlaceholder")}
                value={form.book} onChange={(e) => setForm({ ...form, book: e.target.value })} />
              <textarea placeholder={t("opinions.textPlaceholder")}
                value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
              <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
                <button className="pill solid" type="submit">
                  {sent ? t("opinions.sent") : t("opinions.send")}
                </button>
              </div>
              {sent && (
                <div className="body-m" style={{ color: "var(--ink-2)", marginTop: 6 }}>
                  {t("opinions.thanks")}
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </section>

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
  <LangProvider><OpinionsPage /></LangProvider>
);
