// Reusable components for Dant's blog

const { useEffect, useRef, useState, useMemo } = React;

// ── Week counter (launch date: 10 May 2026) ───────────────────────
function getWeekNumber() {
  const launch = new Date(2026, 4, 10); // month is 0-indexed: 4 = May
  const today  = new Date();
  today.setHours(0, 0, 0, 0);
  launch.setHours(0, 0, 0, 0);
  const diffMs = today - launch;
  if (diffMs < 0) return 1;                                    // before launch → week 1
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1; // floor(days/7) + 1
}

// ── Reveal on scroll ─────────────────────────────────────────────
function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "visible" : ""} ${className}`}
      style={style}
      {...rest}>
      {children}
    </Tag>
  );
}

// ── Book cover (placeholder graphic) ─────────────────────────────
function Cover({ tone = "cv-ink", title, author, size }) {
  return (
    <div className={`cover ${tone} ${size === "lg" ? "lg" : ""}`} aria-hidden={!title}>
      <div className="c-mark" />
      <div>
        {author && <div className="c-author">{author}</div>}
        {title && <div className="c-title">{title}</div>}
      </div>
    </div>
  );
}

// ── Top scroll progress ──────────────────────────────────────────
function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? h.scrollTop / max * 100 : 0;
      bar.style.width = pct + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

// ── Animated reading progress (fills when in view) ───────────────
function ProgressBar({ value }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setW(value); });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div ref={ref} className="progress" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100" role="progressbar">
      <span style={{ width: w + "%" }} />
    </div>
  );
}

// ── Spotify ambient widget ────────────────────────────────────────
const SPOTIFY_SIZES = [
  { key: "S", h: 152,  label: "Mini"   },
  { key: "M", h: 352,  label: "Normal" },
  { key: "L", h: 500,  label: "Grande" },
];

const SPOTIFY_KEY = "dants.spotify";

function SpotifyWidget({ open, onClose }) {
  // If restoring from localStorage, load the iframe immediately
  const [loaded, setLoaded] = React.useState(open);
  const [size, setSize] = React.useState(() => {
    try { return localStorage.getItem(SPOTIFY_KEY + ".size") || "M"; }
    catch (e) { return "M"; }
  });

  // Load iframe as soon as widget opens for the first time
  React.useEffect(() => { if (open && !loaded) setLoaded(true); }, [open]);

  // Persist open state so next page auto-reopens the widget
  React.useEffect(() => {
    try {
      if (open) localStorage.setItem(SPOTIFY_KEY + ".open", "1");
      else      localStorage.removeItem(SPOTIFY_KEY + ".open");
    } catch (e) {}
  }, [open]);

  // Persist chosen size
  React.useEffect(() => {
    try { localStorage.setItem(SPOTIFY_KEY + ".size", size); } catch (e) {}
  }, [size]);

  const current = SPOTIFY_SIZES.find(s => s.key === size);

  return (
    <div className={`spotify-widget${open ? " open" : ""}`} aria-hidden={!open} role="region" aria-label="Ambient music player">
      <div className="spotify-widget-header">
        <span className="spotify-widget-label">Ambiente · Dant's</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          {SPOTIFY_SIZES.map(s => (
            <button
              key={s.key}
              className={`spotify-size-btn${size === s.key ? " active" : ""}`}
              onClick={() => setSize(s.key)}
              title={s.label}
            >
              {s.key}
            </button>
          ))}
          <button className="spotify-close" onClick={onClose} aria-label="Fechar player">✕</button>
        </div>
      </div>

      <div className="spotify-iframe-wrap" style={{ height: current.h }}>
        {loaded && (
          <iframe
            src="https://open.spotify.com/embed/playlist/34xu1Ho7uHzBAKLJ0GqGks?utm_source=generator&theme=0&autoplay=1"
            width="100%"
            height={current.h}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Dant's Reading Ambience"
            style={{ borderRadius: 12, display: "block" }}
          />
        )}
      </div>

      <p className="spotify-login-note">
        Faça login no Spotify para ouvir a música completa.
      </p>
    </div>
  );
}

// ── Nav ──────────────────────────────────────────────────────────
function Nav({ onPlayMusic, musicOn, activeKey = "home" }) {
  const { lang, t, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [spotifyOpen, setSpotifyOpen] = useState(() => {
    try { return localStorage.getItem(SPOTIFY_KEY + ".open") === "1"; }
    catch (e) { return false; }
  });
  const close = () => setMenuOpen(false);
  const toggleSpotify = () => {
    setSpotifyOpen(o => !o);
    if (onPlayMusic) onPlayMusic();
  };

  const LangBtn = ({ onClick }) => (
    <button
      className="pill ghost"
      onClick={onClick}
      aria-label={lang === "en" ? "Switch to Portuguese" : "Switch to English"}
      style={{ paddingLeft: 14, paddingRight: 14, minWidth: 44, fontWeight: 600, letterSpacing: ".06em" }}
    >
      {lang === "en" ? "PT" : "EN"}
    </button>
  );

  return (
    <>
    <header className="nav">
      <div className="wrap">
        <div className="nav-inner glass">
          <a href="index.html" className="logo" onClick={close}>Dant's<sup>®</sup></a>

          {/* Desktop nav links */}
          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) =>
              <a key={l.key} href={l.href} className={l.key === activeKey ? "active" : ""}>
                {t("nav." + l.key)}
              </a>
            )}
          </nav>

          {/* Desktop CTA group */}
          <div className="nav-cta">
            <LangBtn onClick={() => setLang(lang === "en" ? "pt" : "en")} />
            <button
              className="pill ghost"
              onClick={toggleSpotify}
              aria-pressed={spotifyOpen}
              title={t("nav.ambience")}
              style={{ paddingLeft: 14, paddingRight: 14 }}>
              <span className={`amb-bars${spotifyOpen ? " playing" : ""}`}>
                <i /><i /><i />
              </span>
              {spotifyOpen ? t("nav.ambienceOn") : t("nav.ambience")}
            </button>
            <a className="pill solid" href="index.html#newsletter">{t("nav.subscribe")}</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
              </svg>
            ) : (
              <svg width="18" height="13" viewBox="0 0 18 13" fill="currentColor">
                <rect width="18" height="2" rx="1"/><rect y="5.5" width="13" height="2" rx="1"/><rect y="11" width="18" height="2" rx="1"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`nav-mobile${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
          <div className="nav-mobile-inner">
            <nav className="nav-mobile-links" aria-label="Mobile navigation">
              {NAV_LINKS.map((l) =>
                <a key={l.key} href={l.href}
                   className={l.key === activeKey ? "active" : ""}
                   onClick={close}>
                  {t("nav." + l.key)}
                </a>
              )}
            </nav>
            <div className="nav-mobile-cta">
              <LangBtn onClick={() => { setLang(lang === "en" ? "pt" : "en"); close(); }} />
              <a className="pill solid" href="index.html#newsletter" onClick={close}>
                {t("nav.subscribe")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <SpotifyWidget open={spotifyOpen} onClose={() => setSpotifyOpen(false)} />
    </>
  );
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLang();
  const eyebrow = t("hero.eyebrow").replace("{week}", getWeekNumber());
  return (
    <section id="hero" className="hero wrap">
      <Reveal as="div" className="marker" style={{ justifyContent: "center", display: "flex" }}>
        <span className="line" /><span className="dot" /><span className="eyebrow">{eyebrow}</span><span className="dot" /><span className="line" />
      </Reveal>
      <Reveal as="h1" className="display" delay={120}>
        {t("hero.h1a")} <em>{t("hero.h1b")}</em>,
        <br />{t("hero.h1c")} <em>{t("hero.h1d")}</em>
      </Reveal>
      <Reveal as="p" className="lede" delay={240}>
        {t("hero.lede")}
      </Reveal>
      <Reveal className="cta-row" delay={360}>
        <a className="pill solid lg" href="#featured">{t("hero.cta1")}</a>
        <a className="pill lg" href="#lists">{t("hero.cta2")}</a>
      </Reveal>
    </section>
  );
}

// ── Quote of the week ───────────────────────────────────────────
function QuoteSection() {
  const { t, d } = useLang();
  return (
    <section className="wrap" style={{ marginTop: 24 }}>
      <Reveal>
        <div className="quote-card glass">
          <div className="eyebrow" style={{ marginBottom: 22 }}>{t("quote.eyebrow")}</div>
          <blockquote>
            <span style={{ color: "var(--accent)", fontStyle: "normal", marginRight: 4 }}>"</span>
            {d(QUOTE_OF_WEEK, "text")}
            <span style={{ color: "var(--accent)", fontStyle: "normal", marginLeft: 4 }}>"</span>
          </blockquote>
          <cite>{d(QUOTE_OF_WEEK, "source")}</cite>
        </div>
      </Reveal>
    </section>
  );
}

// ── Currently reading ───────────────────────────────────────────
function CurrentlyReading() {
  const { t, d } = useLang();
  return (
    <section id="currently" className="wrap" style={{ marginTop: "clamp(48px, 10vw, 96px)" }}>
      <Reveal className="sec-head">
        <div>
          <div className="eyebrow">{t("currently.eyebrow")}</div>
          <h2>{t("currently.h2")}</h2>
        </div>
        <div className="body-m" style={{ maxWidth: 360 }}>
          {t("currently.desc")}
        </div>
      </Reveal>

      <div className="reading-grid">
        {CURRENTLY_READING.map((b, i) => {
          const pct = Math.round(b.page / b.pages * 100);
          return (
            <Reveal key={b.title} delay={i * 90}>
              <article className="reading-card glass">
                <Cover tone={b.cover} title={d(b, "title")} author={b.author} />
                <div>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>{b.author}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22, margin: "2px 0 8px", letterSpacing: "-.01em" }}>
                    {d(b, "title")}
                  </h3>
                  <p className="body-m" style={{ margin: 0 }}>{d(b, "note")}</p>
                  <ProgressBar value={pct} />
                  <div className="progress-meta">
                    <span>p. {b.page} / {b.pages}</span>
                    <span>{pct}%</span>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ── Featured book of the month ──────────────────────────────────
function Featured() {
  const { t, d } = useLang();
  const f = FEATURED;
  return (
    <section id="featured" className="wrap" style={{ marginTop: "clamp(56px, 10vw, 120px)" }}>
      <Reveal className="sec-head">
        <div>
          <div className="eyebrow">{t("featured.eyebrow")}</div>
          <h2>{t("featured.h2")}</h2>
        </div>
      </Reveal>

      <Reveal>
        <div className="featured glass">
          <Cover tone={f.cover} title={d(f, "title")} author={f.author} size="lg" />
          <div>
            <div className="meta">
              {f.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}
            </div>
            <h3>{d(f, "title")}</h3>
            <div className="eyebrow" style={{ letterSpacing: ".1em" }}>
              {f.author} · {f.translator}
            </div>
            <div className="star" aria-label={`${f.rating} of 5`} style={{ marginTop: 14, fontSize: 18 }}>
              {"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}
            </div>
            <p className="body-l" style={{ marginTop: 18 }}>{d(f, "blurb")}</p>
            <p className="display" style={{ fontStyle: "italic", fontSize: "clamp(20px, 2vw, 26px)", color: "var(--ink-2)", marginTop: 22, borderLeft: "2px solid var(--accent)", paddingLeft: 18 }}>
              {d(f, "pull")}
            </p>
            <div className="price-row">
              <span className="price"><s>{f.priceWas}</s>{f.priceNow}</span>
              <a className="pill solid" href="#" rel="sponsored noopener">{t("featured.buy")}</a>
              <a className="pill" href="#">{t("featured.notes")}</a>
            </div>
            <div className="disclosure">
              {t("featured.disclosure")}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Reading lists / collections ─────────────────────────────────
function Collections() {
  const { t, d } = useLang();
  const [genre, setGenre] = useState("All");
  const filtered = useMemo(
    () => genre === "All" ? COLLECTIONS : COLLECTIONS.filter((c) => c.genres.includes(genre)),
    [genre]
  );

  return (
    <section id="lists" className="wrap" style={{ marginTop: "clamp(56px, 10vw, 120px)" }}>
      <Reveal className="sec-head">
        <div>
          <div className="eyebrow">{t("collections.eyebrow")}</div>
          <h2>{t("collections.h2")}</h2>
        </div>
        <div className="body-m" style={{ maxWidth: 360 }}>
          {t("collections.desc")}
        </div>
      </Reveal>

      <Reveal className="filter-row" as="div">
        {ALL_GENRES.map((g) =>
          <button
            key={g}
            className="chip"
            aria-pressed={genre === g}
            onClick={() => setGenre(g)}>
            {g === "All" ? t("collections.all") : t("genre." + g)}
          </button>
        )}
        <span className="chip" style={{ borderStyle: "dashed", color: "var(--ink-3)" }}>
          {filtered.length} {filtered.length === 1 ? t("collections.list") : t("collections.lists")}
        </span>
      </Reveal>

      <div className="lists-grid">
        {filtered.map((c, i) =>
          <Reveal key={c.title} delay={i * 70}>
            <article className="list-card glass">
              <div className="list-stack">
                {c.covers.map((cv, idx) =>
                  <Cover key={idx} tone={cv} />
                )}
              </div>
              <div>
                <div className="list-meta">
                  <span style={{ color: "var(--accent)" }}>●</span> {c.count} {t("collections.books")} · {c.genres.map((g) => t("genre." + g)).join(" · ")}
                </div>
                <h4>{d(c, "title")}</h4>
                <p className="body-m" style={{ margin: "6px 0 0" }}>{d(c, "blurb")}</p>
              </div>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a className="body-m" href={`Articles.html#${c.genres[0]}`} style={{ color: "var(--ink)", textDecoration: "none", fontWeight: 500 }}>
                  {t("collections.openList")}
                </a>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                  {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                </span>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────────
function About() {
  const { t } = useLang();
  return (
    <section id="about" className="wrap" style={{ marginTop: "clamp(64px, 12vw, 140px)" }}>
      <div className="about">
        <Reveal>
          <div className="eyebrow">{t("about.eyebrow")}</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4.4vw, 56px)", margin: "10px 0 22px", letterSpacing: "-.018em", textWrap: "balance" }}>
            {t("about.h2a")} <em>{t("about.h2b")}</em>{t("about.h2c")}
          </h2>
          <p className="body-l" dangerouslySetInnerHTML={{ __html: t("about.p1") }} />
          <p className="body-l" style={{ marginTop: 14 }} dangerouslySetInnerHTML={{ __html: t("about.p2") }} />
          <div className="cta-row" style={{ justifyContent: "flex-start", marginTop: 28 }}>
            <a className="pill" href="#newsletter">{t("about.cta1")}</a>
            <a className="pill ghost" href="#">{t("about.cta2")}</a>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="portrait">
            <span className="tag">{t("about.portrait")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Newsletter ───────────────────────────────────────────────────
function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const submit = (e) => {
    e.preventDefault();
    const ok = /\S+@\S+\.\S+/.test(email);
    setStatus(ok ? "sent" : "invalid");
  };
  return (
    <section id="newsletter" className="wrap" style={{ marginTop: "clamp(64px, 12vw, 140px)" }}>
      <Reveal>
        <div className="news glass">
          <div className="eyebrow">{t("news.eyebrow")}</div>
          <h2 className="display" style={{ fontSize: "clamp(28px, 3.6vw, 46px)", margin: "10px 0 14px", letterSpacing: "-.015em" }}>
            {t("news.h2")}
          </h2>
          <p className="body-l" style={{ maxWidth: "52ch", margin: "0 auto" }}>
            {t("news.body")}
          </p>
          <form className="news-form glass" onSubmit={submit}>
            <input
              type="email"
              placeholder={t("news.placeholder")}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
              aria-label={t("news.placeholder")}
            />
            <button type="submit" className="pill solid">
              {status === "sent" ? t("news.subscribed") : t("news.subscribe")}
            </button>
          </form>
          <div className="body-m" style={{ marginTop: 12, minHeight: 18, color: status === "invalid" ? "var(--accent)" : "var(--ink-3)" }}>
            {status === "sent" && t("news.success")}
            {status === "invalid" && t("news.invalid")}
            {status === "idle" && t("news.note")}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer>
      <div className="wrap row">
        <div className="logo" style={{ fontSize: 18 }}>Dant's<sup>®</sup></div>
        <div>© 2026 Dant's reading journal · {t("footer.built")}</div>
      </div>
    </footer>
  );
}

// ── Aesthetic poster: classic-book quote ─────────────────────────
function PosterQuote() {
  const { lang, t, d } = useLang();
  const quote = getDailyQuote(lang);
  return (
    <section className="wrap" style={{ marginTop: "clamp(56px, 10vw, 120px)" }}>
      <Reveal className="sec-head">
        <div>
          <div className="eyebrow">{t("poster.editionPrefix")} {POSTER_QUOTE.number}</div>
          <h2>{t("poster.h2")}</h2>
        </div>
        <div className="body-m" style={{ maxWidth: 360 }}>
          {t("poster.desc")}
        </div>
      </Reveal>

      <Reveal>
        <div className="poster-wrap">
          <div className="poster" role="figure" aria-label="Quote poster">
            <div className="poster-grid" aria-hidden="true" />
            <div className="poster-head">
              <span className="poster-mono">DANT'S · STUDIO PRESS</span>
              <span className="poster-mono">{d(POSTER_QUOTE, "edition")}</span>
            </div>
            <div className="poster-rule" />
            <div className="poster-body">
              <span className="poster-mark">"</span>
              <p className="poster-text">{quote.text}</p>
              <span className="poster-cite">— {quote.source}</span>
            </div>
            <div className="poster-rule" />
            <div className="poster-foot">
              <span className="poster-mono">{POSTER_QUOTE.number} · OF ∞</span>
              <span className="poster-mono">PRINT &middot; READ &middot; KEEP</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── Free preview CTA ─────────────────────────────────────────────
function FreePreviewCTA() {
  const { t, d } = useLang();
  return (
    <section id="preview" className="wrap" style={{ marginTop: "clamp(56px, 10vw, 120px)" }}>
      <Reveal>
        <a href="Preview.html" className="preview-card glass" aria-label={t("previewCta.eyebrow")}>
          <div className="preview-cover-wrap">
            <Cover tone={PREVIEW_BOOK.cover} title={d(PREVIEW_BOOK, "title")} author={PREVIEW_BOOK.author} size="lg" />
          </div>
          <div className="preview-body">
            <div className="eyebrow">{t("previewCta.eyebrow")}</div>
            <h3 className="display preview-h">
              {t("previewCta.h3a")} <em>{d(PREVIEW_BOOK, "title")}</em>{t("previewCta.h3b")}
            </h3>
            <p className="body-l preview-blurb">
              {d(PREVIEW_BOOK, "blurb")} {t("previewCta.blurbSuffix")}
            </p>
            <div className="preview-row">
              <span className="pill solid">{t("previewCta.open")}</span>
              <span className="body-m" style={{ color: "var(--ink-3)" }}>
                {t("previewCta.time")} · {PREVIEW_BOOK.translator}
              </span>
            </div>
          </div>
        </a>
      </Reveal>
    </section>
  );
}

// ── Reviews ──────────────────────────────────────────────────────
function Reviews() {
  const { lang, t } = useLang();
  if (!REVIEWS || !REVIEWS.length) return null;
  return (
    <section id="reviews" className="wrap" style={{ marginTop: "clamp(56px, 10vw, 120px)" }}>
      <Reveal className="sec-head">
        <div>
          <div className="eyebrow">{t("reviews.eyebrow")}</div>
          <h2>{t("reviews.h2")}</h2>
        </div>
      </Reveal>
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => {
          const title  = r.title[lang]  || r.title.en;
          const author = r.author[lang] || r.author.en;
          const snippet = (r.content[lang] || r.content.en)[0];
          return (
            <Reveal key={r.id} delay={i * 80}>
              <article className="review-card glass">
                <div>
                  <Cover tone={r.cover} title={title} author={author} size="lg" />
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>
                    {r.category}
                    <span className="star" style={{ marginLeft: 10, fontSize: 13 }}>
                      {"★".repeat(r.rating)}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(22px, 2.4vw, 30px)", letterSpacing: "-.015em", margin: "4px 0 6px", textWrap: "balance" }}>
                    {title}
                  </h3>
                  <div className="eyebrow" style={{ marginBottom: 16, letterSpacing: ".1em" }}>
                    {author}
                  </div>
                  <p className="body-m" style={{ margin: "0 0 20px" }}>
                    {snippet.length > 200 ? snippet.slice(0, 200) + "…" : snippet}
                  </p>
                  <a className="pill solid" href={`Review.html#${r.id}`}>
                    {t("reviews.read")}
                  </a>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

Object.assign(window, {
  Reveal, Cover, ScrollProgress, ProgressBar,
  Nav, Hero, QuoteSection, CurrentlyReading, Featured, Collections, About, Newsletter, Footer,
  PosterQuote, FreePreviewCTA, Reviews,
});
