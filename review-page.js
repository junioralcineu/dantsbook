const {
  useEffect
} = React;
function ReviewPage() {
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
  const reviewId = window.location.hash.slice(1);
  const review = (REVIEWS || []).find(r => r.id === reviewId) || (REVIEWS || [])[0];
  if (!review) return /*#__PURE__*/React.createElement("main", {
    className: "reader-shell",
    style: {
      textAlign: "center",
      paddingTop: 80
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "body-l"
  }, "Review not found."), /*#__PURE__*/React.createElement("a", {
    className: "pill",
    href: "index.html"
  }, "\u2190 Back to journal"));
  const title = review.title[lang] || review.title.en;
  const author = review.author[lang] || review.author.en;
  const content = review.content[lang] || review.content.en;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    activeKey: "home",
    musicOn: false,
    onPlayMusic: () => {}
  }), /*#__PURE__*/React.createElement("main", {
    className: "reader-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reader-meta"
  }, /*#__PURE__*/React.createElement("span", null, review.category), /*#__PURE__*/React.createElement("span", {
    className: "star"
  }, "★".repeat(review.rating))), /*#__PURE__*/React.createElement(Reveal, {
    className: "reader-cover"
  }, /*#__PURE__*/React.createElement(Cover, {
    tone: review.cover,
    title: title,
    author: author,
    size: "lg"
  })), /*#__PURE__*/React.createElement(Reveal, {
    as: "h1",
    className: "reader-title",
    delay: 80
  }, title), /*#__PURE__*/React.createElement(Reveal, {
    className: "reader-author",
    delay: 160
  }, author), /*#__PURE__*/React.createElement("div", {
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
  }, content.map((para, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    delay: i * 25
  }, para), i === review.affiliateAfterParagraph && review.affiliateUrl && /*#__PURE__*/React.createElement(Reveal, {
    delay: i * 25 + 15
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "28px 0 32px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "pill solid",
    href: review.affiliateUrl,
    target: "_blank",
    rel: "nofollow sponsored noopener"
  }, t("reviews.buy")), /*#__PURE__*/React.createElement("p", {
    className: "disclosure",
    style: {
      margin: 0
    }
  }, t("featured.disclosure"))))))), /*#__PURE__*/React.createElement("div", {
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
  }, t("reviews.endEyebrow")), /*#__PURE__*/React.createElement("h3", null, t("reviews.endH3")), /*#__PURE__*/React.createElement("div", {
    className: "reader-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "pill",
    href: "Articles.html"
  }, t("preview.readMore")), /*#__PURE__*/React.createElement("a", {
    className: "pill ghost",
    href: "index.html"
  }, t("preview.backJournal")))))), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
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
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(LangProvider, null, /*#__PURE__*/React.createElement(ReviewPage, null)));
