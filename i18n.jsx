// i18n.jsx — language context for Dant's
// Supports 'en' (English) and 'pt' (Portuguese)

const STRINGS = {
  en: {
    // Nav
    "nav.home": "Journal",
    "nav.articles": "Articles",
    "nav.reading": "Reading",
    "nav.opinions": "Opinions",
    "nav.about": "About",
    "nav.ambience": "Ambience",
    "nav.ambienceOn": "Ambience on",
    "nav.subscribe": "Subscribe",

    // Hero
    "hero.eyebrow": "A reading journal — week 17",
    "hero.h1a": "Books I'm reading",
    "hero.h1b": "slowly",
    "hero.h1c": "and the",
    "hero.h1d": "thoughts they leave behind.",
    "hero.lede": "Dant's is a quiet corner of the internet for the classics, philosophy, and the occasional novel that won't let me sleep. No ratings out of ten, no hot takes — just margins, marginalia, and the books I'd hand you across a kitchen table.",
    "hero.cta1": "Read this week's piece",
    "hero.cta2": "Browse the shelves",

    // Quote of the week
    "quote.eyebrow": "Quote of the week",

    // Currently reading
    "currently.eyebrow": "On the nightstand",
    "currently.h2": "Currently reading.",
    "currently.desc": "Four books I keep returning to this season. Progress moves at the pace of a slow afternoon.",

    // Featured
    "featured.eyebrow": "Book of the month",
    "featured.h2": "The one I'd press into your hands.",
    "featured.buy": "Buy on Amazon →",
    "featured.notes": "Read our notes",
    "featured.disclosure": "Affiliate disclosure: as an Amazon Associate I may earn from qualifying purchases.",

    // Aesthetic poster
    "poster.editionPrefix": "From the press · Edition",
    "poster.h2": "A line worth pinning to the wall.",
    "poster.desc": "Each season I print one passage as a small studio poster. Free to download, free to put up beside your reading chair.",

    // Free preview CTA
    "previewCta.eyebrow": "Free preview read",
    "previewCta.h3a": "Two pages of",
    "previewCta.h3b": ", on the house.",
    "previewCta.blurbSuffix": "No signup, no paywall — just the page that made me start the journal in the first place.",
    "previewCta.open": "Open the preview →",
    "previewCta.time": "~3 min",

    // Collections
    "collections.eyebrow": "Reading lists",
    "collections.h2": "Literary Curation",
    "collections.desc": "Curated reading paths through the canon. Filter by what you're in the mood for — most lists overlap on purpose.",
    "collections.all": "All",
    "collections.openList": "Open list →",
    "collections.books": "books",
    "collections.lists": "lists",
    "collections.list": "list",

    // Genre names (used in filter chips and list meta)
    "genre.Philosophy": "Philosophy",
    "genre.Classics": "Classics",
    "genre.Fiction": "Fiction",
    "genre.Essays": "Essays",

    // About
    "about.eyebrow": "About the journal",
    "about.h2a": "I'm Dant. I read",
    "about.h2b": "slowly",
    "about.h2c": ", on purpose.",
    "about.p1": "For a long time I tried to read fast — to keep up, to finish, to count. Then a friend gave me a paperback of <em>Meditations</em> with one sentence underlined, and I realized I'd been confusing pages-per-week with thinking.",
    "about.p2": "This site is the notebook I wished I'd kept earlier. I write about the classics and philosophy mostly, with the occasional novel that earns its way in. No reviews to please an algorithm — just honest letters about what a book did to my week.",
    "about.cta1": "Letters by email",
    "about.cta2": "Reading log →",
    "about.portrait": "Portrait — to be replaced",

    // Newsletter
    "news.eyebrow": "A slow letter",
    "news.h2": "One book, one thought, every Sunday morning.",
    "news.body": "No tracking, no roundups, no five-star anything. Just a short letter from my reading week — about 600 words, with coffee.",
    "news.placeholder": "your@email.com",
    "news.subscribe": "Subscribe",
    "news.subscribed": "Subscribed ✓",
    "news.success": "Welcome to the shelf — check your inbox.",
    "news.invalid": "That email doesn't look quite right.",
    "news.note": "Free. One click to unsubscribe. No autoplay videos, ever.",

    // Footer
    "footer.built": "Built slowly, on purpose.",

    // Reviews section
    "reviews.eyebrow": "Reading Journal",
    "reviews.h2": "Books I've read, honestly.",
    "reviews.read": "Read review →",
    "reviews.endEyebrow": "More to read",
    "reviews.endH3": "There's always another book.",
    "reviews.buy": "Buy on Amazon →",

    // Reading room
    "room.back": "Back to journal",
    "room.title": "Reading room",
    "room.complete": "Session complete",
    "room.reading": "Reading",
    "room.paused": "Paused",
    "room.ready": "Ready",
    "room.of": "of",
    "room.begin": "Begin reading",
    "room.pause": "Pause",
    "room.resume": "Resume",
    "room.reset": "Reset",
    "room.sessions": "Today's sessions",
    "room.library": "Quiet library",
    "room.rain": "Soft rain",
    "room.fire": "Low fire",
    "room.tip": "Tip — close other tabs. The world will wait.",
    "room.finishedEyebrow": "{time} of focused reading",
    "room.finishedH2": "That was a good page.",
    "room.finishedBody": "You read for {time} without breaking. Stretch, sip something warm, mark the page.",
    "room.readAgain": "Read again",
    "room.browseArticles": "Browse articles",

    // Articles page
    "articles.eyebrow": "The journal",
    "articles.h1": "Articles, written slowly.",
    "articles.desc": "Long-form pieces from the reading week. Most are between five and fifteen minutes. None are reviews — they're letters, mostly to myself, that I'm willing to share.",
    "articles.all": "All",
    "articles.pieces": "pieces",
    "articles.piece": "piece",
    "articles.minRead": "min read",
    "articles.read": "Read →",

    // Opinions page
    "opinions.eyebrow": "Public letters",
    "opinions.h1": "Opinions from the readers.",
    "opinions.desc": "A little corner for the people on the other side of the inbox. These are unedited, signed letters from the journal's subscribers — disagreements are welcome, hot takes are tolerated, kindness is non-negotiable.",
    "opinions.on": "On",
    "opinions.sendEyebrow": "Send a letter",
    "opinions.sendH2": "Say something honest.",
    "opinions.sendDesc": "I read every letter. The good ones, with permission, get a spot on this page. Disagreements are extra welcome.",
    "opinions.namePlaceholder": "Your name",
    "opinions.bookPlaceholder": "Book or article you're responding to",
    "opinions.textPlaceholder": "What's on your mind?",
    "opinions.send": "Send letter",
    "opinions.sent": "Letter sent ✓",
    "opinions.thanks": "Thank you. I'll write back this Sunday.",

    // Preview page
    "preview.free": "Free preview",
    "preview.minRead": "~3 min read",
    "preview.endEyebrow": "End of free preview",
    "preview.endH3": "The rest of Book V is waiting at your library.",
    "preview.endBody": "I keep three translations on my shelf. The Hays edition is the one I press into people's hands first. If you'd rather buy a copy, the link below is an Amazon affiliate one — same price for you.",
    "preview.readMore": "Read more articles",
    "preview.backJournal": "← Back to journal",

    // Music ambience hint
    "music.hint": "Reading-room ambience — coming soon. Imagine a low fire and rain.",

    // Tweaks panel labels
    "tweaks.theme": "Theme",
    "tweaks.mood": "Mood",
    "tweaks.light": "Light",
    "tweaks.navy": "Deep navy",
    "tweaks.accentHue": "Accent hue",
    "tweaks.grain": "Paper grain",
    "tweaks.typography": "Typography",
    "tweaks.typePairing": "Type pairing",
    "tweaks.motion": "Motion",
    "tweaks.drift": "Background drift",
    "tweaks.slow": "Slow",
    "tweaks.normal": "Normal",
    "tweaks.fast": "Fast",
    "tweaks.off": "Off",
    "tweaks.reader": "Reader",
    "tweaks.bodySize": "Body size",
  },

  pt: {
    // Nav
    "nav.home": "Diário",
    "nav.articles": "Artigos",
    "nav.reading": "Leitura",
    "nav.opinions": "Opiniões",
    "nav.about": "Sobre",
    "nav.ambience": "Ambiente",
    "nav.ambienceOn": "Ambiente ativo",
    "nav.subscribe": "Subscrever",

    // Hero
    "hero.eyebrow": "Um diário de leitura — semana 17",
    "hero.h1a": "Livros que leio",
    "hero.h1b": "devagar",
    "hero.h1c": "e os",
    "hero.h1d": "pensamentos que deixam.",
    "hero.lede": "Dant's é um cantinho tranquilo da internet dedicado aos clássicos, à filosofia e ao romance ocasional que não me deixa dormir. Sem notas de um a dez, sem opiniões precipitadas — apenas anotações nas margens e os livros que colocaria nas tuas mãos.",
    "hero.cta1": "Ler o texto desta semana",
    "hero.cta2": "Explorar as prateleiras",

    // Quote of the week
    "quote.eyebrow": "Citação da semana",

    // Currently reading
    "currently.eyebrow": "Na mesa de cabeceira",
    "currently.h2": "A ler agora.",
    "currently.desc": "Quatro livros aos quais continuo a voltar esta estação. O progresso avança ao ritmo de uma tarde tranquila.",

    // Featured
    "featured.eyebrow": "Livro do mês",
    "featured.h2": "Aquele que eu daria nas tuas mãos.",
    "featured.buy": "Comprar na Amazon →",
    "featured.notes": "Ler as notas",
    "featured.disclosure": "Divulgação de afiliado: como Associado Amazon posso ganhar com compras elegíveis.",

    // Aesthetic poster
    "poster.editionPrefix": "Da imprensa · Edição",
    "poster.h2": "Uma frase que vale a pena pregar na parede.",
    "poster.desc": "Cada estação imprimo uma passagem como um pequeno poster de estúdio. Gratuito para descarregar, gratuito para colocar junto à cadeira de leitura.",

    // Free preview CTA
    "previewCta.eyebrow": "Leitura de pré-visualização gratuita",
    "previewCta.h3a": "Duas páginas de",
    "previewCta.h3b": ", por nossa conta.",
    "previewCta.blurbSuffix": "Sem registo, sem paywall — apenas a página que me fez começar o diário.",
    "previewCta.open": "Abrir a pré-visualização →",
    "previewCta.time": "~3 min",

    // Collections
    "collections.eyebrow": "Listas de leitura",
    "collections.h2": "Curadoria Literária",
    "collections.desc": "Percursos de leitura cuidados pelo cânone. Filtra pelo teu estado de espírito — a maioria das listas sobrepõe-se propositadamente.",
    "collections.all": "Todos",
    "collections.openList": "Abrir lista →",
    "collections.books": "livros",
    "collections.lists": "listas",
    "collections.list": "lista",

    // Genre names
    "genre.Philosophy": "Filosofia",
    "genre.Classics": "Clássicos",
    "genre.Fiction": "Ficção",
    "genre.Essays": "Ensaios",

    // About
    "about.eyebrow": "Sobre o diário",
    "about.h2a": "Sou Dant. Leio",
    "about.h2b": "devagar",
    "about.h2c": ", de propósito.",
    "about.p1": "Durante muito tempo tentei ler depressa — para me manter a par, para terminar, para contar. Depois um amigo deu-me um livro de bolso das <em>Meditações</em> com uma frase sublinhada, e percebi que tinha confundido páginas por semana com pensamento.",
    "about.p2": "Este site é o caderno que gostaria de ter começado mais cedo. Escrevo sobretudo sobre os clássicos e a filosofia, com o romance ocasional que merece a sua entrada. Sem críticas para agradar a um algoritmo — apenas cartas honestas sobre o que um livro fez à minha semana.",
    "about.cta1": "Cartas por email",
    "about.cta2": "Registo de leituras →",
    "about.portrait": "Retrato — a substituir",

    // Newsletter
    "news.eyebrow": "Uma carta lenta",
    "news.h2": "Um livro, um pensamento, todas as manhãs de domingo.",
    "news.body": "Sem rastreamento, sem resumos, sem nada de cinco estrelas. Apenas uma carta curta da minha semana de leitura — cerca de 600 palavras, com café.",
    "news.placeholder": "o.teu@email.com",
    "news.subscribe": "Subscrever",
    "news.subscribed": "Subscrito ✓",
    "news.success": "Bem-vindo à prateleira — verifica a caixa de entrada.",
    "news.invalid": "Esse email não parece estar certo.",
    "news.note": "Gratuito. Um clique para cancelar. Sem vídeos automáticos, nunca.",

    // Footer
    "footer.built": "Construído devagar, de propósito.",

    // Reviews section
    "reviews.eyebrow": "Diário de Leitura",
    "reviews.h2": "Livros que li, honestamente.",
    "reviews.read": "Ler resenha →",
    "reviews.endEyebrow": "Mais para ler",
    "reviews.endH3": "Há sempre outro livro.",
    "reviews.buy": "Comprar na Amazon →",

    // Reading room
    "room.back": "Voltar ao diário",
    "room.title": "Sala de leitura",
    "room.complete": "Sessão concluída",
    "room.reading": "A ler",
    "room.paused": "Em pausa",
    "room.ready": "Pronto",
    "room.of": "de",
    "room.begin": "Começar a ler",
    "room.pause": "Pausar",
    "room.resume": "Retomar",
    "room.reset": "Reiniciar",
    "room.sessions": "Sessões hoje",
    "room.library": "Biblioteca silenciosa",
    "room.rain": "Chuva suave",
    "room.fire": "Lareira baixa",
    "room.tip": "Dica — fecha os outros separadores. O mundo espera.",
    "room.finishedEyebrow": "{time} de leitura focada",
    "room.finishedH2": "Foi uma boa página.",
    "room.finishedBody": "Leste durante {time} sem parar. Espreguiça-te, bebe algo quente, marca a página.",
    "room.readAgain": "Ler de novo",
    "room.browseArticles": "Ver artigos",

    // Articles page
    "articles.eyebrow": "O diário",
    "articles.h1": "Artigos, escritos devagar.",
    "articles.desc": "Textos longos da semana de leitura. A maioria tem entre cinco e quinze minutos. Não são críticas — são cartas, sobretudo para mim mesmo, que estou disposto a partilhar.",
    "articles.all": "Todos",
    "articles.pieces": "peças",
    "articles.piece": "peça",
    "articles.minRead": "min de leitura",
    "articles.read": "Ler →",

    // Opinions page
    "opinions.eyebrow": "Cartas públicas",
    "opinions.h1": "Opiniões dos leitores.",
    "opinions.desc": "Um cantinho para as pessoas do outro lado da caixa de entrada. São cartas não editadas e assinadas dos subscritores do diário — o desacordo é bem-vindo, as opiniões precipitadas são toleradas, a gentileza é inegociável.",
    "opinions.on": "Sobre",
    "opinions.sendEyebrow": "Enviar uma carta",
    "opinions.sendH2": "Diz algo honesto.",
    "opinions.sendDesc": "Leio cada carta. As boas, com permissão, têm lugar nesta página. Os desacordos são especialmente bem-vindos.",
    "opinions.namePlaceholder": "O teu nome",
    "opinions.bookPlaceholder": "Livro ou artigo ao qual estás a responder",
    "opinions.textPlaceholder": "O que tens em mente?",
    "opinions.send": "Enviar carta",
    "opinions.sent": "Carta enviada ✓",
    "opinions.thanks": "Obrigado. Responderei este domingo.",

    // Preview page
    "preview.free": "Pré-visualização gratuita",
    "preview.minRead": "~3 min de leitura",
    "preview.endEyebrow": "Fim da pré-visualização gratuita",
    "preview.endH3": "O resto do Livro V espera na tua biblioteca.",
    "preview.endBody": "Tenho três traduções na minha prateleira. A edição de Hays é a que coloco primeiro nas mãos das pessoas. Se preferes comprar um exemplar, o link abaixo é um link de afiliado Amazon — mesmo preço para ti.",
    "preview.readMore": "Ler mais artigos",
    "preview.backJournal": "← Voltar ao diário",

    // Music ambience hint
    "music.hint": "Ambiente da sala de leitura — em breve. Imagina uma lareira baixa e chuva.",

    // Tweaks panel labels
    "tweaks.theme": "Tema",
    "tweaks.mood": "Modo",
    "tweaks.light": "Claro",
    "tweaks.navy": "Azul escuro",
    "tweaks.accentHue": "Matiz de destaque",
    "tweaks.grain": "Textura de papel",
    "tweaks.typography": "Tipografia",
    "tweaks.typePairing": "Combinação de tipos",
    "tweaks.motion": "Movimento",
    "tweaks.drift": "Deriva do fundo",
    "tweaks.slow": "Lento",
    "tweaks.normal": "Normal",
    "tweaks.fast": "Rápido",
    "tweaks.off": "Desligado",
    "tweaks.reader": "Leitor",
    "tweaks.bodySize": "Tamanho do texto",
  },
};

// ── Context ───────────────────────────────────────────────────────
const LangContext = React.createContext({
  lang: "en",
  t: (key) => key,
  d: (obj, key) => (obj ? obj[key] : ""),
  setLang: () => {},
});

// ── Provider ──────────────────────────────────────────────────────
function LangProvider({ children }) {
  const [lang, setLangState] = React.useState(() => {
    try { return localStorage.getItem("dants.lang") || "en"; } catch (e) { return "en"; }
  });

  const setLang = React.useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem("dants.lang", l); } catch (e) {}
    document.documentElement.lang = l === "pt" ? "pt-PT" : "en";
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
  }, [lang]);

  // t(key) — translate a UI string
  const t = React.useCallback((key) => {
    return STRINGS[lang]?.[key] ?? STRINGS.en[key] ?? key;
  }, [lang]);

  // d(obj, key) — get a localized data field (falls back to English)
  const d = React.useCallback((obj, key) => {
    if (!obj) return "";
    if (lang === "pt" && obj[key + "_pt"] !== undefined) return obj[key + "_pt"];
    return obj[key] ?? "";
  }, [lang]);

  const value = React.useMemo(() => ({ lang, t, d, setLang }), [lang, t, d, setLang]);
  return React.createElement(LangContext.Provider, { value }, children);
}

// ── Hook ──────────────────────────────────────────────────────────
function useLang() {
  return React.useContext(LangContext);
}

Object.assign(window, { LangContext, LangProvider, useLang });
