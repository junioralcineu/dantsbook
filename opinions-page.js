const {
  useState
} = React;
function OpinionCard({
  o
}) {
  const {
    t,
    d
  } = useLang();
  return /*#__PURE__*/React.createElement("article", {
    className: "op-card glass"
  }, /*#__PURE__*/React.createElement("div", {
    className: "op-stars",
    "aria-label": `${o.rating} of 5`
  }, "★".repeat(o.rating), "☆".repeat(5 - o.rating)), /*#__PURE__*/React.createElement("p", {
    className: "op-quote"
  }, d(o, "text")), /*#__PURE__*/React.createElement("div", {
    className: "op-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: `op-avatar cover ${o.avatar}`,
    style: {
      aspectRatio: "auto",
      padding: 0
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "op-name"
  }, o.name), /*#__PURE__*/React.createElement("div", {
    className: "op-where"
  }, o.where))), /*#__PURE__*/React.createElement("div", {
    className: "op-meta"
  }, /*#__PURE__*/React.createElement("span", null, t("opinions.on"), " ", /*#__PURE__*/React.createElement("em", null, o.book)), /*#__PURE__*/React.createElement("span", null, "\u2197")));
}
function OpinionsPage() {
  const {
    t
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
  const [form, setForm] = useState({
    name: "",
    book: "",
    text: ""
  });
  const [sent, setSent] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (form.name.trim() && form.text.trim()) setSent(true);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Nav, {
    activeKey: "opinions",
    musicOn: false,
    onPlayMusic: () => {}
  }), /*#__PURE__*/React.createElement("section", {
    className: "wrap page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("opinions.eyebrow")), /*#__PURE__*/React.createElement("h1", null, t("opinions.h1")), /*#__PURE__*/React.createElement("p", null, t("opinions.desc"))), /*#__PURE__*/React.createElement("section", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "opinions-grid"
  }, OPINIONS.map((o, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: o.name,
    delay: i * 60
  }, /*#__PURE__*/React.createElement(OpinionCard, {
    o: o
  })))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("form", {
    className: "submit-card glass",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, t("opinions.sendEyebrow")), /*#__PURE__*/React.createElement("h2", null, t("opinions.sendH2")), /*#__PURE__*/React.createElement("p", {
    className: "body-m",
    style: {
      maxWidth: "52ch",
      margin: "0 auto",
      color: "var(--ink-2)"
    }
  }, t("opinions.sendDesc")), /*#__PURE__*/React.createElement("div", {
    className: "submit-form"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: t("opinions.namePlaceholder"),
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    })
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: t("opinions.bookPlaceholder"),
    value: form.book,
    onChange: e => setForm({
      ...form,
      book: e.target.value
    })
  }), /*#__PURE__*/React.createElement("textarea", {
    placeholder: t("opinions.textPlaceholder"),
    value: form.text,
    onChange: e => setForm({
      ...form,
      text: e.target.value
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "pill solid",
    type: "submit"
  }, sent ? t("opinions.sent") : t("opinions.send"))), sent && /*#__PURE__*/React.createElement("div", {
    className: "body-m",
    style: {
      color: "var(--ink-2)",
      marginTop: 6
    }
  }, t("opinions.thanks")))))), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
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
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(LangProvider, null, /*#__PURE__*/React.createElement(OpinionsPage, null)));
