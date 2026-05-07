// Root app for Dant's

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accentHue": 35,
  "fontPair": "fraunces-inter",
  "animSpeed": "normal",
  "grain": true,
  "logoText": "Dant's"
} /*EDITMODE-END*/;
const FONT_PAIRS = {
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
function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [musicOn, setMusicOn] = React.useState(false);
  const {
    t
  } = useLang();
  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-theme", tw.theme === "navy" ? "navy" : "light");
    r.style.setProperty("--accent", `oklch(0.58 0.13 ${tw.accentHue})`);
    r.style.setProperty("--accent-2", `oklch(0.58 0.13 ${(Number(tw.accentHue) + 60) % 360})`);
    const pair = FONT_PAIRS[tw.fontPair] || FONT_PAIRS["fraunces-inter"];
    r.style.setProperty("--font-display", pair.display);
    r.style.setProperty("--font-body", pair.body);
    document.body.dataset.anim = tw.animSpeed;
    if (!tw.grain) {
      document.documentElement.classList.add("no-grain");
    } else {
      document.documentElement.classList.remove("no-grain");
    }
  }, [tw]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Nav, {
    musicOn: musicOn,
    onPlayMusic: () => setMusicOn(v => !v),
    activeKey: "home"
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(QuoteSection, null), /*#__PURE__*/React.createElement(PosterQuote, null), /*#__PURE__*/React.createElement(CurrentlyReading, null), /*#__PURE__*/React.createElement(Featured, null), /*#__PURE__*/React.createElement(Reviews, null), /*#__PURE__*/React.createElement(FreePreviewCTA, null), /*#__PURE__*/React.createElement(Collections, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Newsletter, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(TweaksPanel, {
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
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: t("tweaks.grain"),
    value: tw.grain,
    onChange: v => setTweak("grain", v)
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
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: t("tweaks.motion")
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: t("tweaks.drift"),
    value: tw.animSpeed,
    options: [{
      value: "slow",
      label: t("tweaks.slow")
    }, {
      value: "normal",
      label: t("tweaks.normal")
    }, {
      value: "fast",
      label: t("tweaks.fast")
    }, {
      value: "off",
      label: t("tweaks.off")
    }],
    onChange: v => setTweak("animSpeed", v)
  })));
}
ReactDOM.createRoot(document.getElementById("app")).render(/*#__PURE__*/React.createElement(LangProvider, null, /*#__PURE__*/React.createElement(App, null)));
