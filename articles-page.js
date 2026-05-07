function ArticlesPage() {
  const {
    lang,
    t,
    d
  } = useLang();
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
    r.style.setProperty("--accent", `oklch(0.58 0.13 ${tw.accentHue})`);
    r.style.setProperty("--accent-2", `oklch(0.58 0.13 ${(Number(tw.accentHue) + 60) % 360})`);
    const PAIRS = {
      "fraunces-inter": {
        display: "'Fraunces', Georgia, serif",
        body: "'Inter', system-ui, sans-serif"
      },
      "garamond-inter": {
        display: "'EB Garamond', Georgia, serif",
        body: "'Inter', system-ui, sans-serif"
      },
      "cormorant-inter": {
        display: "'Cormorant Garamond', Georgia, serif",
        body: "'Inter', system-ui, sans-serif"
      }
    };
    const p = PAIRS[tw.fontPair] || PAIRS["fraunces-inter"];
    r.style.setProperty("--font-display", p.display);
    r.style.setProperty("--font-body", p.body);
    document.body.dataset.anim = tw.animSpeed;
  }, [tw]);
  const tags = useMemo(() => ["All", ...Array.from(new Set(ARTICLES.map(a => a.tag)))], []);
  const [tag, setTag] = useState(() => {
    const hash = window.location.hash.slice(1);
    const valid = ["All", ...Array.from(new Set(ARTICLES.map(a => a.tag)))];
    return valid.includes(hash) ? hash : "All";
  });
  const filtered = useMemo(() => tag === "All" ? ARTICLES : ARTICLES.filter(a => a.tag === tag), [tag]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Nav, {
    activeKey: "articles",
    musicOn: false,
    onPlayMusic: () => {}
  }), /*#__PURE__*/React.createElement("section", {
    className: "wrap page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("articles.eyebrow")), /*#__PURE__*/React.createElement("h1", null, t("articles.h1")), /*#__PURE__*/React.createElement("p", null, t("articles.desc"))), /*#__PURE__*/React.createElement("section", {
    className: "wrap",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    className: "filter-row",
    as: "div"
  }, tags.map(g => /*#__PURE__*/React.createElement("button", {
    key: g,
    className: "chip",
    "aria-pressed": tag === g,
    onClick: () => setTag(g)
  }, g === "All" ? t("articles.all") : t("genre." + g))), /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      borderStyle: "dashed",
      color: "var(--ink-3)"
    }
  }, filtered.length, " ", filtered.length === 1 ? t("articles.piece") : t("articles.pieces"))), /*#__PURE__*/React.createElement("div", {
    className: "articles-grid"
  }, filtered.map((a, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: a.title,
    delay: i * 60
  }, /*#__PURE__*/React.createElement("a", {
    href: "Preview.html",
    className: "article-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article-cover"
  }, /*#__PURE__*/React.createElement(Cover, {
    tone: a.cover,
    title: d(a, "title"),
    author: t("genre." + a.tag)
  })), /*#__PURE__*/React.createElement("div", {
    className: "article-meta"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u25CF"), /*#__PURE__*/React.createElement("span", null, t("genre." + a.tag)), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, a.minutes, " ", t("articles.minRead"))), /*#__PURE__*/React.createElement("h3", {
    className: "article-h"
  }, d(a, "title")), /*#__PURE__*/React.createElement("div", {
    className: "article-expand-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article-expand-inner"
  }, /*#__PURE__*/React.createElement("p", {
    className: "article-dek"
  }, d(a, "dek")), /*#__PURE__*/React.createElement("div", {
    className: "article-foot"
  }, /*#__PURE__*/React.createElement("span", null, a.date), /*#__PURE__*/React.createElement("span", null, t("articles.read")))))))))), /*#__PURE__*/React.createElement(Newsletter, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: t("tweaks.theme")
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: t("tweaks.mood"),
    value: tw.theme,
    options: [{
      value: "light",
      label: t("tweaks.light")
    }, {
      value: "navy",
      label: t("tweaks.navy")
    }],
    onChange: v => setTweak("theme", v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: t("tweaks.accentHue"),
    min: 0,
    max: 360,
    step: 5,
    value: tw.accentHue,
    unit: "\xB0",
    onChange: v => setTweak("accentHue", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: t("tweaks.typography")
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: t("tweaks.typePairing"),
    value: tw.fontPair,
    options: [{
      value: "fraunces-inter",
      label: "Fraunces · Inter"
    }, {
      value: "garamond-inter",
      label: "EB Garamond · Inter"
    }, {
      value: "cormorant-inter",
      label: "Cormorant · Inter"
    }],
    onChange: v => setTweak("fontPair", v)
  })));
}
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(LangProvider, null, /*#__PURE__*/React.createElement(ArticlesPage, null)));
