// Dant's — shared site behavior (plain JS, no build step, no framework).
// Loaded on every page. Page-specific extras (newsletter form, reading room, etc.)
// live in their own small <script> blocks at the bottom of each page.

(function () {
  // ── Bilingual toggle ───────────────────────────────────────────────
  // Both EN and PT text are already in the HTML (see <span data-lang-en>/<span data-lang-pt>).
  // Switching language just toggles which one is visible — see the CSS rules
  // for [data-lang-pt] near the top of styles.css.
  function setLang(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
    try { localStorage.setItem("dants.lang", lang); } catch (e) {}
    document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
      btn.textContent = lang === "en" ? "PT" : "EN";
    });
  }

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-lang") || "en";
      setLang(current === "en" ? "pt" : "en");
    });
  });

  // ── Mobile nav menu ──────────────────────────────────────────────
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileMenu = document.querySelector(".nav-mobile");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("open");
      mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ── Spotify ambience widget ──────────────────────────────────────
  const SPOTIFY_KEY = "dants.spotify";
  const ambToggleBtn = document.querySelector("[data-spotify-toggle]");
  const widget = document.querySelector(".spotify-widget");
  if (ambToggleBtn && widget) {
    const iframeWrap = widget.querySelector(".spotify-iframe-wrap");
    const sizeButtons = widget.querySelectorAll("[data-spotify-size]");
    const closeBtn = widget.querySelector(".spotify-close");
    const ambBars = ambToggleBtn.querySelector(".amb-bars");

    function loadIframe() {
      if (iframeWrap.querySelector("iframe")) return;
      const iframe = document.createElement("iframe");
      iframe.src = "https://open.spotify.com/embed/playlist/34xu1Ho7uHzBAKLJ0GqGks?utm_source=generator&theme=0&autoplay=1";
      iframe.width = "100%";
      iframe.height = iframeWrap.style.height || "352";
      iframe.frameBorder = "0";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      iframe.title = "Dant's Reading Ambience";
      iframe.style.borderRadius = "12px";
      iframe.style.display = "block";
      iframeWrap.appendChild(iframe);
    }

    function open() {
      widget.classList.add("open");
      widget.setAttribute("aria-hidden", "false");
      ambToggleBtn.setAttribute("aria-pressed", "true");
      if (ambBars) ambBars.classList.add("playing");
      loadIframe();
      try { localStorage.setItem(SPOTIFY_KEY + ".open", "1"); } catch (e) {}
    }
    function close() {
      widget.classList.remove("open");
      widget.setAttribute("aria-hidden", "true");
      ambToggleBtn.setAttribute("aria-pressed", "false");
      if (ambBars) ambBars.classList.remove("playing");
      try { localStorage.removeItem(SPOTIFY_KEY + ".open"); } catch (e) {}
    }

    ambToggleBtn.addEventListener("click", () => {
      widget.classList.contains("open") ? close() : open();
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    sizeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        sizeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const h = btn.dataset.spotifySize;
        iframeWrap.style.height = h + "px";
        const iframe = iframeWrap.querySelector("iframe");
        if (iframe) iframe.height = h;
        try { localStorage.setItem(SPOTIFY_KEY + ".size", h); } catch (e) {}
      });
    });

    try {
      if (localStorage.getItem(SPOTIFY_KEY + ".open") === "1") open();
      const savedSize = localStorage.getItem(SPOTIFY_KEY + ".size");
      if (savedSize) {
        const btn = widget.querySelector(`[data-spotify-size="${savedSize}"]`);
        if (btn) btn.click();
      }
    } catch (e) {}
  }

  // ── Scroll progress bar (top of page) ────────────────────────────
  const bar = document.getElementById("scroll-progress");
  if (bar) {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ── Reveal-on-scroll for every .reveal element ───────────────────
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // ── Generic chip filter (used on Collections + Articles grids) ──
  // Markup contract: a row of buttons with [data-filter-key] inside an
  // element with [data-filter-group], filtering cards that carry the same
  // value in their own [data-filter-key] attribute, found in [data-filter-target].
  document.querySelectorAll("[data-filter-group]").forEach((root) => {
    const targetSel = root.dataset.filterGroup;
    const grid = document.querySelector(targetSel);
    if (!grid) return;
    const cards = Array.from(grid.children);
    const countEl = root.querySelector("[data-filter-count]");
    const apply = (value) => {
      let visible = 0;
      cards.forEach((c) => {
        const values = (c.dataset.filterValue || "").split(",");
        const show = value === "All" || values.includes(value);
        c.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (countEl) countEl.textContent = String(visible);
    };
    root.querySelectorAll("[data-filter-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        root.querySelectorAll("[data-filter-key]").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        apply(btn.dataset.filterKey);
      });
    });
    apply("All");
  });
})();
