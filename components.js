function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Reusable components for Dant's blog

const {
  useEffect,
  useRef,
  useState,
  useMemo
} = React;

// ── Week counter (launch date: 10 May 2026) ───────────────────────
function getWeekNumber() {
  const launch = new Date(2026, 4, 10); // month is 0-indexed: 4 = May
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  launch.setHours(0, 0, 0, 0);
  const diffMs = today - launch;
  if (diffMs < 0) return 1; // before launch → week 1
  return Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1; // floor(days/7) + 1
}

// ── Reveal on scroll ─────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setShown(true)), {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style = delay ? {
    transitionDelay: `${delay}ms`
  } : undefined;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    className: `reveal ${shown ? "visible" : ""} ${className}`,
    style: style
  }, rest), children);
}

// ── Book cover (placeholder graphic) ─────────────────────────────
function Cover({
  tone = "cv-ink",
  title,
  author,
  size
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `cover ${tone} ${size === "lg" ? "lg" : ""}`,
    "aria-hidden": !title
  }, /*#__PURE__*/React.createElement("div", {
    className: "c-mark"
  }), /*#__PURE__*/React.createElement("div", null, author && /*#__PURE__*/React.createElement("div", {
    className: "c-author"
  }, author), title && /*#__PURE__*/React.createElement("div", {
    className: "c-title"
  }, title)));
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
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

// ── Animated reading progress (fills when in view) ───────────────
function ProgressBar({
  value
}) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setW(value);
      });
    }, {
      threshold: 0.4
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "progress",
    "aria-valuenow": value,
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    role: "progressbar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: w + "%"
    }
  }));
}

// ── Spotify ambient widget ────────────────────────────────────────
const SPOTIFY_SIZES = [{
  key: "S",
  h: 152,
  label: "Mini"
}, {
  key: "M",
  h: 352,
  label: "Normal"
}, {
  key: "L",
  h: 500,
  label: "Grande"
}];
const SPOTIFY_KEY = "dants.spotify";
function SpotifyWidget({
  open,
  onClose
}) {
  // If restoring from localStorage, load the iframe immediately
  const [loaded, setLoaded] = React.useState(open);
  const [size, setSize] = React.useState(() => {
    try {
      return localStorage.getItem(SPOTIFY_KEY + ".size") || "M";
    } catch (e) {
      return "M";
    }
  });

  // Load iframe as soon as widget opens for the first time
  React.useEffect(() => {
    if (open && !loaded) setLoaded(true);
  }, [open]);

  // Persist open state so next page auto-reopens the widget
  React.useEffect(() => {
    try {
      if (open) localStorage.setItem(SPOTIFY_KEY + ".open", "1");else localStorage.removeItem(SPOTIFY_KEY + ".open");
    } catch (e) {}
  }, [open]);

  // Persist chosen size
  React.useEffect(() => {
    try {
      localStorage.setItem(SPOTIFY_KEY + ".size", size);
    } catch (e) {}
  }, [size]);
  const current = SPOTIFY_SIZES.find(s => s.key === size);
  return /*#__PURE__*/React.createElement("div", {
    className: `spotify-widget${open ? " open" : ""}`,
    "aria-hidden": !open,
    role: "region",
    "aria-label": "Ambient music player"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spotify-widget-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "spotify-widget-label"
  }, "Ambiente \xB7 Dant's"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, SPOTIFY_SIZES.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    className: `spotify-size-btn${size === s.key ? " active" : ""}`,
    onClick: () => setSize(s.key),
    title: s.label
  }, s.key)), /*#__PURE__*/React.createElement("button", {
    className: "spotify-close",
    onClick: onClose,
    "aria-label": "Fechar player"
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    className: "spotify-iframe-wrap",
    style: {
      height: current.h
    }
  }, loaded && /*#__PURE__*/React.createElement("iframe", {
    src: "https://open.spotify.com/embed/playlist/34xu1Ho7uHzBAKLJ0GqGks?utm_source=generator&theme=0&autoplay=1",
    width: "100%",
    height: current.h,
    frameBorder: "0",
    allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
    loading: "lazy",
    title: "Dant's Reading Ambience",
    style: {
      borderRadius: 12,
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "spotify-login-note"
  }, "Fa\xE7a login no Spotify para ouvir a m\xFAsica completa."));
}

// ── Nav ──────────────────────────────────────────────────────────
function Nav({
  onPlayMusic,
  musicOn,
  activeKey = "home"
}) {
  const {
    lang,
    t,
    setLang
  } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [spotifyOpen, setSpotifyOpen] = useState(() => {
    try {
      return localStorage.getItem(SPOTIFY_KEY + ".open") === "1";
    } catch (e) {
      return false;
    }
  });
  const close = () => setMenuOpen(false);
  const toggleSpotify = () => {
    setSpotifyOpen(o => !o);
    if (onPlayMusic) onPlayMusic();
  };
  const LangBtn = ({
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    className: "pill ghost",
    onClick: onClick,
    "aria-label": lang === "en" ? "Switch to Portuguese" : "Switch to English",
    style: {
      paddingLeft: 14,
      paddingRight: 14,
      minWidth: 44,
      fontWeight: 600,
      letterSpacing: ".06em"
    }
  }, lang === "en" ? "PT" : "EN");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner glass"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    className: "logo",
    onClick: close
  }, "Dant's", /*#__PURE__*/React.createElement("sup", null, "\xAE")), /*#__PURE__*/React.createElement("nav", {
    className: "nav-links",
    "aria-label": "Primary"
  }, NAV_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    className: l.key === activeKey ? "active" : ""
  }, t("nav." + l.key)))), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta"
  }, /*#__PURE__*/React.createElement(LangBtn, {
    onClick: () => setLang(lang === "en" ? "pt" : "en")
  }), /*#__PURE__*/React.createElement("button", {
    className: "pill ghost",
    onClick: toggleSpotify,
    "aria-pressed": spotifyOpen,
    title: t("nav.ambience"),
    style: {
      paddingLeft: 14,
      paddingRight: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `amb-bars${spotifyOpen ? " playing" : ""}`
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), spotifyOpen ? t("nav.ambienceOn") : t("nav.ambience")), /*#__PURE__*/React.createElement("a", {
    className: "pill solid",
    href: "index.html#newsletter"
  }, t("nav.subscribe"))), /*#__PURE__*/React.createElement("button", {
    className: "nav-hamburger",
    onClick: () => setMenuOpen(o => !o),
    "aria-label": menuOpen ? "Close menu" : "Open menu",
    "aria-expanded": menuOpen
  }, menuOpen ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "1",
    x2: "13",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "13",
    y1: "1",
    x2: "1",
    y2: "13"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "13",
    viewBox: "0 0 18 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "18",
    height: "2",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    y: "5.5",
    width: "13",
    height: "2",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    y: "11",
    width: "18",
    height: "2",
    rx: "1"
  })))), /*#__PURE__*/React.createElement("div", {
    className: `nav-mobile${menuOpen ? " open" : ""}`,
    "aria-hidden": !menuOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-inner"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "nav-mobile-links",
    "aria-label": "Mobile navigation"
  }, NAV_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.key,
    href: l.href,
    className: l.key === activeKey ? "active" : "",
    onClick: close
  }, t("nav." + l.key)))), /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile-cta"
  }, /*#__PURE__*/React.createElement(LangBtn, {
    onClick: () => {
      setLang(lang === "en" ? "pt" : "en");
      close();
    }
  }), /*#__PURE__*/React.createElement("a", {
    className: "pill solid",
    href: "index.html#newsletter",
    onClick: close
  }, t("nav.subscribe"))))))), /*#__PURE__*/React.createElement(SpotifyWidget, {
    open: spotifyOpen,
    onClose: () => setSpotifyOpen(false)
  }));
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  const {
    t
  } = useLang();
  const eyebrow = t("hero.eyebrow").replace("{week}", getWeekNumber());
  return /*#__PURE__*/React.createElement("section", {
    id: "hero",
    className: "hero wrap"
  }, /*#__PURE__*/React.createElement(Reveal, {
    as: "div",
    className: "marker",
    style: {
      justifyContent: "center",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "line"
  })), /*#__PURE__*/React.createElement(Reveal, {
    as: "h1",
    className: "display",
    delay: 120
  }, t("hero.h1a"), " ", /*#__PURE__*/React.createElement("em", null, t("hero.h1b")), ",", /*#__PURE__*/React.createElement("br", null), t("hero.h1c"), " ", /*#__PURE__*/React.createElement("em", null, t("hero.h1d"))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    className: "lede",
    delay: 240
  }, t("hero.lede")), /*#__PURE__*/React.createElement(Reveal, {
    className: "cta-row",
    delay: 360
  }, /*#__PURE__*/React.createElement("a", {
    className: "pill solid lg",
    href: "#featured"
  }, t("hero.cta1")), /*#__PURE__*/React.createElement("a", {
    className: "pill lg",
    href: "#lists"
  }, t("hero.cta2"))));
}

// ── Quote of the week ───────────────────────────────────────────
function QuoteSection() {
  const {
    t,
    d
  } = useLang();
  return /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "quote-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 22
    }
  }, t("quote.eyebrow")), /*#__PURE__*/React.createElement("blockquote", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontStyle: "normal",
      marginRight: 4
    }
  }, "\""), d(QUOTE_OF_WEEK, "text"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontStyle: "normal",
      marginLeft: 4
    }
  }, "\"")), /*#__PURE__*/React.createElement("cite", null, d(QUOTE_OF_WEEK, "source")))));
}

// ── Currently reading ───────────────────────────────────────────
function CurrentlyReading() {
  const {
    t,
    d
  } = useLang();
  return /*#__PURE__*/React.createElement("section", {
    id: "currently",
    className: "wrap",
    style: {
      marginTop: "clamp(48px, 10vw, 96px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("currently.eyebrow")), /*#__PURE__*/React.createElement("h2", null, t("currently.h2"))), /*#__PURE__*/React.createElement("div", {
    className: "body-m",
    style: {
      maxWidth: 360
    }
  }, t("currently.desc"))), /*#__PURE__*/React.createElement("div", {
    className: "reading-grid"
  }, CURRENTLY_READING.map((b, i) => {
    const pct = Math.round(b.page / b.pages * 100);
    return /*#__PURE__*/React.createElement(Reveal, {
      key: b.title,
      delay: i * 90
    }, /*#__PURE__*/React.createElement("article", {
      className: "reading-card glass"
    }, /*#__PURE__*/React.createElement(Cover, {
      tone: b.cover,
      title: d(b, "title"),
      author: b.author
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow",
      style: {
        marginBottom: 4
      }
    }, b.author), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        fontSize: 22,
        margin: "2px 0 8px",
        letterSpacing: "-.01em"
      }
    }, d(b, "title")), /*#__PURE__*/React.createElement("p", {
      className: "body-m",
      style: {
        margin: 0
      }
    }, d(b, "note")), /*#__PURE__*/React.createElement(ProgressBar, {
      value: pct
    }), /*#__PURE__*/React.createElement("div", {
      className: "progress-meta"
    }, /*#__PURE__*/React.createElement("span", null, "p. ", b.page, " / ", b.pages), /*#__PURE__*/React.createElement("span", null, pct, "%")))));
  })));
}

// ── Featured book of the month ──────────────────────────────────
function Featured() {
  const {
    t,
    d
  } = useLang();
  const f = FEATURED;
  return /*#__PURE__*/React.createElement("section", {
    id: "featured",
    className: "wrap",
    style: {
      marginTop: "clamp(56px, 10vw, 120px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("featured.eyebrow")), /*#__PURE__*/React.createElement("h2", null, t("featured.h2")))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "featured glass"
  }, f.image ? /*#__PURE__*/React.createElement("img", {
    src: f.image,
    alt: `${d(f, "title")} — ${f.author}`,
    style: {
      width: "100%",
      maxWidth: 280,
      aspectRatio: "2/3",
      objectFit: "cover",
      borderRadius: 6,
      boxShadow: "inset 8px 0 12px -10px rgba(0,0,0,.35), 0 6px 24px -8px rgba(40,30,15,.45), 0 2px 4px rgba(40,30,15,.15)"
    }
  }) : /*#__PURE__*/React.createElement(Cover, {
    tone: f.cover,
    title: d(f, "title"),
    author: f.author,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, f.tags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: "chip"
  }, tag))), /*#__PURE__*/React.createElement("h3", null, d(f, "title")), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      letterSpacing: ".1em"
    }
  }, f.author, " \xB7 ", f.translator), /*#__PURE__*/React.createElement("div", {
    className: "star",
    "aria-label": `${f.rating} of 5`,
    style: {
      marginTop: 14,
      fontSize: 18
    }
  }, "★".repeat(f.rating), "☆".repeat(5 - f.rating)), /*#__PURE__*/React.createElement("p", {
    className: "body-l",
    style: {
      marginTop: 18
    }
  }, d(f, "blurb")), /*#__PURE__*/React.createElement("p", {
    className: "display",
    style: {
      fontStyle: "italic",
      fontSize: "clamp(20px, 2vw, 26px)",
      color: "var(--ink-2)",
      marginTop: 22,
      borderLeft: "2px solid var(--accent)",
      paddingLeft: 18
    }
  }, d(f, "pull")), /*#__PURE__*/React.createElement("div", {
    className: "price-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "price"
  }, /*#__PURE__*/React.createElement("s", null, f.priceWas), f.priceNow), /*#__PURE__*/React.createElement("a", {
    className: "pill solid",
    href: f.buyUrl || "#",
    target: "_blank",
    rel: "sponsored noopener"
  }, t("featured.buy")), /*#__PURE__*/React.createElement("a", {
    className: "pill",
    href: "#"
  }, t("featured.notes"))), /*#__PURE__*/React.createElement("div", {
    className: "disclosure"
  }, t("featured.disclosure"))))));
}

// ── Reading lists / collections ─────────────────────────────────
function Collections() {
  const {
    t,
    d
  } = useLang();
  const [genre, setGenre] = useState("All");
  const filtered = useMemo(() => genre === "All" ? COLLECTIONS : COLLECTIONS.filter(c => c.genres.includes(genre)), [genre]);
  return /*#__PURE__*/React.createElement("section", {
    id: "lists",
    className: "wrap",
    style: {
      marginTop: "clamp(56px, 10vw, 120px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("collections.eyebrow")), /*#__PURE__*/React.createElement("h2", null, t("collections.h2"))), /*#__PURE__*/React.createElement("div", {
    className: "body-m",
    style: {
      maxWidth: 360
    }
  }, t("collections.desc"))), /*#__PURE__*/React.createElement(Reveal, {
    className: "filter-row",
    as: "div"
  }, ALL_GENRES.map(g => /*#__PURE__*/React.createElement("button", {
    key: g,
    className: "chip",
    "aria-pressed": genre === g,
    onClick: () => setGenre(g)
  }, g === "All" ? t("collections.all") : t("genre." + g))), /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      borderStyle: "dashed",
      color: "var(--ink-3)"
    }
  }, filtered.length, " ", filtered.length === 1 ? t("collections.list") : t("collections.lists"))), /*#__PURE__*/React.createElement("div", {
    className: "lists-grid"
  }, filtered.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: c.title,
    delay: i * 70
  }, /*#__PURE__*/React.createElement("article", {
    className: "list-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "list-stack"
  }, c.covers.map((cv, idx) => /*#__PURE__*/React.createElement(Cover, {
    key: idx,
    tone: cv
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "list-meta"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF"), " ", c.count, " ", t("collections.books"), " \xB7 ", c.genres.map(g => t("genre." + g)).join(" · ")), /*#__PURE__*/React.createElement("h4", null, d(c, "title")), /*#__PURE__*/React.createElement("p", {
    className: "body-m",
    style: {
      margin: "6px 0 0"
    }
  }, d(c, "blurb"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "body-m",
    href: `Articles.html#${c.genres[0]}`,
    style: {
      color: "var(--ink)",
      textDecoration: "none",
      fontWeight: 500
    }
  }, t("collections.openList")), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: "var(--ink-3)"
    }
  }, String(i + 1).padStart(2, "0"), " / ", String(filtered.length).padStart(2, "0"))))))));
}

// ── About ────────────────────────────────────────────────────────
function About() {
  const {
    t
  } = useLang();
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    className: "wrap",
    style: {
      marginTop: "clamp(64px, 12vw, 140px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "about"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("about.eyebrow")), /*#__PURE__*/React.createElement("h2", {
    className: "display",
    style: {
      fontSize: "clamp(32px, 4.4vw, 56px)",
      margin: "10px 0 22px",
      letterSpacing: "-.018em",
      textWrap: "balance"
    }
  }, t("about.h2a"), " ", /*#__PURE__*/React.createElement("em", null, t("about.h2b")), t("about.h2c")), /*#__PURE__*/React.createElement("p", {
    className: "body-l",
    dangerouslySetInnerHTML: {
      __html: t("about.p1")
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "body-l",
    style: {
      marginTop: 14
    },
    dangerouslySetInnerHTML: {
      __html: t("about.p2")
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "cta-row",
    style: {
      justifyContent: "flex-start",
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "pill",
    href: "#newsletter"
  }, t("about.cta1")), /*#__PURE__*/React.createElement("a", {
    className: "pill ghost",
    href: "#"
  }, t("about.cta2")))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 150
  }, /*#__PURE__*/React.createElement("div", {
    className: "portrait"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tag"
  }, t("about.portrait"))))));
}

// ── Newsletter ───────────────────────────────────────────────────
function Newsletter() {
  const {
    t
  } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const submit = e => {
    e.preventDefault();
    const ok = /\S+@\S+\.\S+/.test(email);
    setStatus(ok ? "sent" : "invalid");
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "newsletter",
    className: "wrap",
    style: {
      marginTop: "clamp(64px, 12vw, 140px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "news glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("news.eyebrow")), /*#__PURE__*/React.createElement("h2", {
    className: "display",
    style: {
      fontSize: "clamp(28px, 3.6vw, 46px)",
      margin: "10px 0 14px",
      letterSpacing: "-.015em"
    }
  }, t("news.h2")), /*#__PURE__*/React.createElement("p", {
    className: "body-l",
    style: {
      maxWidth: "52ch",
      margin: "0 auto"
    }
  }, t("news.body")), /*#__PURE__*/React.createElement("form", {
    className: "news-form glass",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: t("news.placeholder"),
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      setStatus("idle");
    },
    "aria-label": t("news.placeholder")
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "pill solid"
  }, status === "sent" ? t("news.subscribed") : t("news.subscribe"))), /*#__PURE__*/React.createElement("div", {
    className: "body-m",
    style: {
      marginTop: 12,
      minHeight: 18,
      color: status === "invalid" ? "var(--accent)" : "var(--ink-3)"
    }
  }, status === "sent" && t("news.success"), status === "invalid" && t("news.invalid"), status === "idle" && t("news.note")))));
}
function Footer() {
  const {
    t
  } = useLang();
  return /*#__PURE__*/React.createElement("footer", null, /*#__PURE__*/React.createElement("div", {
    className: "wrap row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo",
    style: {
      fontSize: 18
    }
  }, "Dant's", /*#__PURE__*/React.createElement("sup", null, "\xAE")), /*#__PURE__*/React.createElement("div", null, "\xA9 2026 Dant's reading journal \xB7 ", t("footer.built"))));
}

// ── Aesthetic poster: classic-book quote ─────────────────────────
function PosterQuote() {
  const {
    lang,
    t,
    d
  } = useLang();
  const quote = getDailyQuote(lang);
  return /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      marginTop: "clamp(56px, 10vw, 120px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("poster.editionPrefix"), " ", POSTER_QUOTE.number), /*#__PURE__*/React.createElement("h2", null, t("poster.h2"))), /*#__PURE__*/React.createElement("div", {
    className: "body-m",
    style: {
      maxWidth: 360
    }
  }, t("poster.desc"))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "poster-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "poster",
    role: "figure",
    "aria-label": "Quote poster"
  }, /*#__PURE__*/React.createElement("div", {
    className: "poster-grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "poster-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "poster-mono"
  }, "DANT'S \xB7 STUDIO PRESS"), /*#__PURE__*/React.createElement("span", {
    className: "poster-mono"
  }, d(POSTER_QUOTE, "edition"))), /*#__PURE__*/React.createElement("div", {
    className: "poster-rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "poster-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "poster-mark"
  }, "\""), /*#__PURE__*/React.createElement("p", {
    className: "poster-text"
  }, quote.text), /*#__PURE__*/React.createElement("span", {
    className: "poster-cite"
  }, "\u2014 ", quote.source)), /*#__PURE__*/React.createElement("div", {
    className: "poster-rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "poster-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "poster-mono"
  }, POSTER_QUOTE.number, " \xB7 OF \u221E"), /*#__PURE__*/React.createElement("span", {
    className: "poster-mono"
  }, "PRINT \xB7 READ \xB7 KEEP"))))));
}

// ── Free preview CTA ─────────────────────────────────────────────
function FreePreviewCTA() {
  const {
    t,
    d
  } = useLang();
  return /*#__PURE__*/React.createElement("section", {
    id: "preview",
    className: "wrap",
    style: {
      marginTop: "clamp(56px, 10vw, 120px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("a", {
    href: "Preview.html",
    className: "preview-card glass",
    "aria-label": t("previewCta.eyebrow")
  }, /*#__PURE__*/React.createElement("div", {
    className: "preview-cover-wrap"
  }, /*#__PURE__*/React.createElement(Cover, {
    tone: PREVIEW_BOOK.cover,
    title: d(PREVIEW_BOOK, "title"),
    author: PREVIEW_BOOK.author,
    size: "lg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "preview-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("previewCta.eyebrow")), /*#__PURE__*/React.createElement("h3", {
    className: "display preview-h"
  }, t("previewCta.h3a"), " ", /*#__PURE__*/React.createElement("em", null, d(PREVIEW_BOOK, "title")), t("previewCta.h3b")), /*#__PURE__*/React.createElement("p", {
    className: "body-l preview-blurb"
  }, d(PREVIEW_BOOK, "blurb"), " ", t("previewCta.blurbSuffix")), /*#__PURE__*/React.createElement("div", {
    className: "preview-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill solid"
  }, t("previewCta.open")), /*#__PURE__*/React.createElement("span", {
    className: "body-m",
    style: {
      color: "var(--ink-3)"
    }
  }, t("previewCta.time"), " \xB7 ", PREVIEW_BOOK.translator))))));
}

// ── Reviews ──────────────────────────────────────────────────────
function Reviews() {
  const {
    lang,
    t
  } = useLang();
  if (!REVIEWS || !REVIEWS.length) return null;
  return /*#__PURE__*/React.createElement("section", {
    id: "reviews",
    className: "wrap",
    style: {
      marginTop: "clamp(56px, 10vw, 120px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("reviews.eyebrow")), /*#__PURE__*/React.createElement("h2", null, t("reviews.h2")))), /*#__PURE__*/React.createElement("div", {
    className: "reviews-grid"
  }, REVIEWS.map((r, i) => {
    const title = r.title[lang] || r.title.en;
    const author = r.author[lang] || r.author.en;
    const snippet = (r.content[lang] || r.content.en)[0];
    return /*#__PURE__*/React.createElement(Reveal, {
      key: r.id,
      delay: i * 80
    }, /*#__PURE__*/React.createElement("article", {
      className: "review-card glass"
    }, /*#__PURE__*/React.createElement("div", null, r.image ? /*#__PURE__*/React.createElement("img", {
      src: r.image,
      alt: `${title} — ${author}`,
      style: {
        width: "100%",
        aspectRatio: "2/3",
        objectFit: "cover",
        borderRadius: 6,
        boxShadow: "inset 8px 0 12px -10px rgba(0,0,0,.35), 0 6px 24px -8px rgba(40,30,15,.45), 0 2px 4px rgba(40,30,15,.15)"
      }
    }) : /*#__PURE__*/React.createElement(Cover, {
      tone: r.cover,
      title: title,
      author: author,
      size: "lg"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "eyebrow",
      style: {
        marginBottom: 6
      }
    }, r.category, /*#__PURE__*/React.createElement("span", {
      className: "star",
      style: {
        marginLeft: 10,
        fontSize: 13
      }
    }, "★".repeat(r.rating))), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        fontSize: "clamp(22px, 2.4vw, 30px)",
        letterSpacing: "-.015em",
        margin: "4px 0 6px",
        textWrap: "balance"
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      className: "eyebrow",
      style: {
        marginBottom: 16,
        letterSpacing: ".1em"
      }
    }, author), /*#__PURE__*/React.createElement("p", {
      className: "body-m",
      style: {
        margin: "0 0 20px"
      }
    }, snippet.length > 200 ? snippet.slice(0, 200) + "…" : snippet), /*#__PURE__*/React.createElement("a", {
      className: "pill solid",
      href: `Review.html#${r.id}`
    }, t("reviews.read")))));
  })));
}
Object.assign(window, {
  Reveal,
  Cover,
  ScrollProgress,
  ProgressBar,
  Nav,
  Hero,
  QuoteSection,
  CurrentlyReading,
  Featured,
  Collections,
  About,
  Newsletter,
  Footer,
  PosterQuote,
  FreePreviewCTA,
  Reviews
});
