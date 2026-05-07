function PreviewPage() {
  const {
    lang,
    t
  } = useLang();
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
  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector(".reader-body");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const passed = Math.max(0, Math.min(rect.height, window.innerHeight - rect.top));
      const pct = rect.height > 0 ? Math.min(100, passed / rect.height * 100) : 0;
      const el = document.getElementById("article-prog");
      if (el) el.style.width = pct + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const excerpt = lang === "pt" ? PREVIEW_BOOK.excerpt_pt || PREVIEW_BOOK.excerpt : PREVIEW_BOOK.excerpt;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    activeKey: "home",
    musicOn: false,
    onPlayMusic: () => {}
  }), /*#__PURE__*/React.createElement("main", {
    className: "reader-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reader-meta"
  }, /*#__PURE__*/React.createElement("span", null, t("preview.free")), /*#__PURE__*/React.createElement("span", null, t("preview.minRead"))), /*#__PURE__*/React.createElement(Reveal, {
    className: "reader-cover"
  }, /*#__PURE__*/React.createElement(Cover, {
    tone: PREVIEW_BOOK.cover,
    title: PREVIEW_BOOK.title,
    author: PREVIEW_BOOK.author,
    size: "lg"
  })), /*#__PURE__*/React.createElement(Reveal, {
    as: "h1",
    className: "reader-title",
    delay: 100
  }, PREVIEW_BOOK.title), /*#__PURE__*/React.createElement(Reveal, {
    className: "reader-author",
    delay: 180
  }, PREVIEW_BOOK.author, " \xB7 ", PREVIEW_BOOK.translator), /*#__PURE__*/React.createElement("div", {
    className: "reader-divider",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ornament"
  }, "\u2766"), /*#__PURE__*/React.createElement("span", {
    className: "line"
  })), /*#__PURE__*/React.createElement("article", {
    className: "reader-body",
    style: {
      fontSize: tw.fontSize + "px"
    }
  }, excerpt.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    as: "p",
    delay: i * 40
  }, p))), /*#__PURE__*/React.createElement("div", {
    className: "reader-divider",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ornament"
  }, "\u2766"), /*#__PURE__*/React.createElement("span", {
    className: "line"
  })), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "reader-end glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("preview.endEyebrow")), /*#__PURE__*/React.createElement("h3", null, t("preview.endH3")), /*#__PURE__*/React.createElement("p", {
    className: "body-m",
    style: {
      maxWidth: "48ch",
      margin: "0 auto",
      color: "var(--ink-2)"
    }
  }, t("preview.endBody")), /*#__PURE__*/React.createElement("div", {
    className: "reader-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "pill solid",
    href: "#",
    rel: "sponsored noopener"
  }, t("featured.buy")), /*#__PURE__*/React.createElement("a", {
    className: "pill",
    href: "Articles.html"
  }, t("preview.readMore")), /*#__PURE__*/React.createElement("a", {
    className: "pill ghost",
    href: "index.html"
  }, t("preview.backJournal"))), /*#__PURE__*/React.createElement("div", {
    className: "disclosure",
    style: {
      marginTop: 14
    }
  }, t("featured.disclosure"))))), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: t("tweaks.reader")
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: t("tweaks.bodySize"),
    min: 16,
    max: 28,
    step: 1,
    value: tw.fontSize,
    unit: "px",
    onChange: v => setTweak("fontSize", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
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
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(LangProvider, null, /*#__PURE__*/React.createElement(PreviewPage, null)));
