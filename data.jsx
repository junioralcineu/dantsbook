// Sample content for Dant's reading journal — bilingual (EN / PT).
// Book titles and author names are kept in the original language.

const QUOTE_OF_WEEK = {
  text: "The unexamined life is not worth living — but the examined life, examined too closely, becomes a kind of trembling.",
  text_pt: "A vida não examinada não vale a pena ser vivida — mas a vida examinada, examinada de perto demais, torna-se uma espécie de tremor.",
  source: "From this week's notebook · on Plato's Apology",
  source_pt: "Do caderno desta semana · sobre a Apologia de Platão",
};

const CURRENTLY_READING = [
  {
    title: "Meditations",
    title_pt: "Meditações",
    author: "Marcus Aurelius",
    pages: 304,
    page: 187,
    note: "Slow mornings with this one. Book V is destroying me, gently.",
    note_pt: "Manhãs lentas com este. O Livro V está a destruir-me, gentilmente.",
    cover: "cv-ink",
  },
  {
    title: "The Brothers Karamazov",
    title_pt: "Os Irmãos Karamázov",
    author: "Fyodor Dostoevsky",
    pages: 796,
    page: 412,
    note: "Just past the Grand Inquisitor. Need a week to recover.",
    note_pt: "Acabei de passar o Grande Inquisidor. Preciso de uma semana para recuperar.",
    cover: "cv-clay",
  },
  {
    title: "The Histories",
    title_pt: "As Histórias",
    author: "Herodotus",
    pages: 760,
    page: 95,
    note: "Reading slowly with a map and a strong coffee.",
    note_pt: "A ler devagar com um mapa e um café forte.",
    cover: "cv-olive",
  },
  {
    title: "Letters from a Stoic",
    title_pt: "Cartas de um Estoico",
    author: "Seneca",
    pages: 254,
    page: 220,
    note: "I keep underlining everything. The book is mostly ink now.",
    note_pt: "Continuo a sublinhar tudo. O livro é sobretudo tinta agora.",
    cover: "cv-bone",
  },
];

const FEATURED = {
  title: "The Republic",
  title_pt: "A República",
  author: "Plato",
  translator: "translated by C. D. C. Reeve",
  rating: 5,
  tags: ["Philosophy", "Classics", "Political theory"],
  image: "bookimages/91nYfNvYa7L._SL1500_.jpg",
  buyUrl: "https://amzn.to/4cXORM3",
  blurb:
    "I came back to The Republic this winter expecting a familiar conversation and found a book that argues with me from the first page. Plato isn't building a city — he's building a mirror. What you see in it depends on how honestly you're willing to look.",
  blurb_pt:
    "Voltei à República neste inverno à espera de uma conversa familiar e encontrei um livro que discute comigo desde a primeira página. Platão não está a construir uma cidade — está a construir um espelho. O que vês nele depende de quão honestamente estás disposto a olhar.",
  pull:
    "A book that asks what justice would feel like if you could afford to be honest about it.",
  pull_pt:
    "Um livro que pergunta como seria a justiça se te pudesses dar ao luxo de ser honesto sobre ela.",
  priceNow: "$12.95",
  priceWas: "$18.00",
  cover: "cv-ink",
};

const COLLECTIONS = [
  {
    title: "First steps into Stoicism",
    title_pt: "Primeiros passos no Estoicismo",
    count: 6,
    blurb: "Where to begin if Marcus, Seneca, and Epictetus all feel daunting.",
    blurb_pt: "Por onde começar se Marco Aurélio, Séneca e Epicteto parecem intimidantes.",
    genres: ["Philosophy"],
    covers: ["cv-bone", "cv-ink", "cv-clay"],
  },
  {
    title: "Russian winters",
    title_pt: "Invernos russos",
    count: 8,
    blurb: "Long novels for long nights — Dostoevsky, Tolstoy, Chekhov.",
    blurb_pt: "Romances longos para noites longas — Dostoiévski, Tolstói, Tchékhov.",
    genres: ["Fiction", "Classics"],
    covers: ["cv-navy", "cv-clay", "cv-ink"],
  },
  {
    title: "The Greeks, slowly",
    title_pt: "Os Gregos, devagar",
    count: 7,
    blurb: "A reading order that rewards patience over completion.",
    blurb_pt: "Uma ordem de leitura que recompensa a paciência em vez da conclusão.",
    genres: ["Classics", "Philosophy"],
    covers: ["cv-olive", "cv-bone", "cv-amber"],
  },
  {
    title: "Letters & journals",
    title_pt: "Cartas & diários",
    count: 5,
    blurb: "Books that read like someone thinking out loud, addressed to you.",
    blurb_pt: "Livros que se leem como alguém a pensar em voz alta, dirigidos a ti.",
    genres: ["Essays"],
    covers: ["cv-rose", "cv-bone", "cv-moss"],
  },
  {
    title: "Short books, long shadows",
    title_pt: "Livros curtos, sombras longas",
    count: 9,
    blurb: "Under 200 pages. Each one rearranges something in you.",
    blurb_pt: "Menos de 200 páginas. Cada um reorganiza algo em ti.",
    genres: ["Philosophy", "Fiction"],
    covers: ["cv-ink", "cv-amber", "cv-clay"],
  },
  {
    title: "Existentialism, warmly",
    title_pt: "Existencialismo, com carinho",
    count: 6,
    blurb: "Camus, Kierkegaard, Frankl — read for company, not for despair.",
    blurb_pt: "Camus, Kierkegaard, Frankl — ler para ter companhia, não para o desespero.",
    genres: ["Philosophy", "Essays"],
    covers: ["cv-clay", "cv-navy", "cv-bone"],
  },
];

const ALL_GENRES = ["All", "Philosophy", "Classics", "Fiction", "Essays"];

const NAV_LINKS = [
  { label: "Journal",  href: "index.html",       key: "home" },
  { label: "Articles", href: "Articles.html",              key: "articles" },
  { label: "Reading",  href: "Reading.html",               key: "reading" },
  { label: "Opinions", href: "Opinions.html",              key: "opinions" },
  { label: "About",    href: "index.html#about", key: "about" },
];

// ── Articles page content ─────────────────────────────────────────
const ARTICLES = [
  {
    title: "Reading Marcus Aurelius in a Loud Year",
    title_pt: "Ler Marco Aurélio num Ano Barulhento",
    dek: "On finding stillness in a book that was never meant for an audience.",
    dek_pt: "Sobre como encontrar tranquilidade num livro que nunca foi feito para uma audiência.",
    date: "April 21, 2026",
    minutes: 9,
    tag: "Philosophy",
    cover: "cv-ink",
  },
  {
    title: "The Grand Inquisitor, Read Slowly Twice",
    title_pt: "O Grande Inquisidor, Lido Devagar Duas Vezes",
    dek: "Why Dostoevsky's most famous chapter rewards a second, quieter pass.",
    dek_pt: "Por que razão o capítulo mais famoso de Dostoiévski merece uma segunda leitura mais silenciosa.",
    date: "April 14, 2026",
    minutes: 14,
    tag: "Classics",
    cover: "cv-clay",
  },
  {
    title: "What Plato Means by Justice",
    title_pt: "O Que Platão Quer Dizer com Justiça",
    dek: "An honest attempt to summarize Book IV without flattening it.",
    dek_pt: "Uma tentativa honesta de resumir o Livro IV sem o achatar.",
    date: "April 6, 2026",
    minutes: 11,
    tag: "Philosophy",
    cover: "cv-olive",
  },
  {
    title: "On Marginalia: A Defense of Writing in Books",
    title_pt: "Sobre Marginália: Uma Defesa de Escrever nos Livros",
    dek: "Pencil, never pen. Always with a date in the margin.",
    dek_pt: "Lápis, nunca caneta. Sempre com uma data na margem.",
    date: "March 30, 2026",
    minutes: 6,
    tag: "Essays",
    cover: "cv-bone",
  },
  {
    title: "Herodotus, the First Travel Writer",
    title_pt: "Heródoto, o Primeiro Escritor de Viagens",
    dek: "Reading the Histories with a map, a coffee, and zero hurry.",
    dek_pt: "Ler as Histórias com um mapa, um café e zero pressa.",
    date: "March 22, 2026",
    minutes: 12,
    tag: "Classics",
    cover: "cv-amber",
  },
  {
    title: "Seneca on Time, in Three Letters",
    title_pt: "Séneca sobre o Tempo, em Três Cartas",
    dek: "The shortest essays I know about the longest subject we have.",
    dek_pt: "Os ensaios mais curtos que conheço sobre o assunto mais longo que temos.",
    date: "March 15, 2026",
    minutes: 8,
    tag: "Philosophy",
    cover: "cv-rose",
  },
];

// ── Opinions / public letters ─────────────────────────────────────
const OPINIONS = [
  {
    name: "Maren K.",
    where: "Lisbon",
    avatar: "cv-clay",
    text:
      "I've been reading Dant's letters for four months now. They're the only Sunday email I open before coffee. The piece on Marcus Aurelius made me start a paper notebook again.",
    text_pt:
      "Leio as cartas do Dant's há quatro meses. São o único email de domingo que abro antes do café. O texto sobre Marco Aurélio fez-me começar um caderno de papel de novo.",
    book: "Meditations",
    rating: 5,
  },
  {
    name: "Theo R.",
    where: "Edinburgh",
    avatar: "cv-ink",
    text:
      "What I appreciate most: no five-star theatre, no rankings. Dant treats books like company you keep, not products you finish. The Brothers Karamazov essay is the best thing I read in March.",
    text_pt:
      "O que mais aprecio: sem teatro de cinco estrelas, sem rankings. O Dant trata os livros como companhia que se mantém, não produtos que se acabam. O ensaio sobre Os Irmãos Karamazov foi a melhor coisa que li em março.",
    book: "The Brothers Karamazov",
    rating: 5,
  },
  {
    name: "Iris V.",
    where: "Buenos Aires",
    avatar: "cv-olive",
    text:
      "I came for the philosophy lists, stayed for the slow-reading manifesto. I now read 12 books a year on purpose, and I feel like I read more than ever.",
    text_pt:
      "Vim pelas listas de filosofia, fiquei pelo manifesto da leitura lenta. Agora leio 12 livros por ano de propósito, e sinto que li mais do que nunca.",
    book: "Letters from a Stoic",
    rating: 4,
  },
  {
    name: "Jules A.",
    where: "Brooklyn",
    avatar: "cv-amber",
    text:
      "Honest disagreement: I think the take on Plato is too generous. But the page where Dant argues with himself in real time is exactly why I subscribe.",
    text_pt:
      "Desacordo honesto: acho que a perspetiva sobre Platão é demasiado generosa. Mas a página onde o Dant discute consigo mesmo em tempo real é exatamente a razão pela qual estou subscrito.",
    book: "The Republic",
    rating: 4,
  },
  {
    name: "Hana M.",
    where: "Kyoto",
    avatar: "cv-rose",
    text:
      "The 'Russian winters' shelf got me through January. I followed it in order, and I think I understand Anna Karenina now in a way no class ever taught me.",
    text_pt:
      "A prateleira 'Invernos russos' ajudou-me a atravessar janeiro. Segui-a em ordem, e acho que agora entendo Anna Karenina de uma forma que nenhuma aula alguma vez me ensinou.",
    book: "Anna Karenina",
    rating: 5,
  },
  {
    name: "Sam P.",
    where: "Dublin",
    avatar: "cv-moss",
    text:
      "If I disagree with anything, it's the ban on hot takes. Sometimes a hot take is just an honest one. But Dant earns the slowness — every line feels weighed.",
    text_pt:
      "Se discordo de algo, é do veto às opiniões precipitadas. Às vezes uma opinião precipitada é simplesmente uma honesta. Mas o Dant merece a lentidão — cada linha parece pesada.",
    book: "Apology",
    rating: 4,
  },
];

// ── Aesthetic poster quote (homepage) ─────────────────────────────
const POSTER_QUOTE = {
  text: "We must be careful what we pretend to be, for we are what we pretend to be.",
  text_pt: "Devemos ter cuidado com o que fingimos ser, pois somos o que fingimos ser.",
  source: "Kurt Vonnegut · Mother Night",
  number: "№ 017",
  edition: "Spring · MMXXVI",
  edition_pt: "Primavera · MMXXVI",
};

// ── Free preview content ──────────────────────────────────────────
const PREVIEW_BOOK = {
  title: "Meditations",
  title_pt: "Meditações",
  author: "Marcus Aurelius",
  translator: "Translated by Gregory Hays",
  cover: "cv-ink",
  blurb:
    "A free, two-page preview from Book V — the morning passage that has lived on my fridge for the better part of a decade.",
  blurb_pt:
    "Uma pré-visualização gratuita de duas páginas do Livro V — a passagem matinal que viveu no meu frigorífico durante cerca de uma década.",
  excerpt: [
    "At dawn, when you have trouble getting out of bed, tell yourself: \"I have to go to work — as a human being. What do I have to complain of, if I'm going to do what I was born for — the things I was brought into the world to do?\"",
    "Or is this what I was created for? To huddle under the blankets and stay warm?",
    "— But it's nicer here.",
    "So you were born to feel \"nice\"? Instead of doing things and experiencing them? Don't you see the plants, the birds, the ants and spiders and bees going about their individual tasks, putting the world in order, as best they can?",
    "And you're not willing to do your job as a human being? Why aren't you running to do what your nature demands?",
    "— But we have to sleep sometime…",
    "Agreed. But nature set a limit on that — as it did on eating and drinking. And you're over the limit. You've had more than enough of that. But not of working. There you're still below your quota.",
  ],
  excerpt_pt: [
    "Ao amanhecer, quando tens dificuldade em levantar-te, diz a ti mesmo: «Tenho de ir trabalhar — como ser humano. De que me posso queixar, se vou fazer o que nasci para fazer — as coisas para as quais fui trazido ao mundo?»",
    "Ou é isto para que fui criado? Para ficar encolhido debaixo das coberturas e estar quente?",
    "— Mas está mais agradável aqui.",
    "Então nasceste para sentir «agradável»? Em vez de fazer coisas e experienciá-las? Não vês as plantas, os pássaros, as formigas e as aranhas e as abelhas a trabalhar nos seus ofícios individuais, a pôr o mundo em ordem, tanto quanto podem?",
    "E tu não estás disposto a fazer o teu trabalho como ser humano? Por que não corres para fazer o que a tua natureza exige?",
    "— Mas temos de dormir às vezes…",
    "Concordado. Mas a natureza estabeleceu um limite para isso — tal como fez para comer e beber. E tu ultrapassaste o limite. Já tiveste mais do que suficiente. Mas não de trabalhar. Aí ainda estás abaixo da tua quota.",
  ],
};

// ── Reading-room encouragements ───────────────────────────────────
const ENCOURAGEMENTS = [
  "You don't have to finish it tonight.",
  "Read one paragraph again. Slowly.",
  "The page isn't going anywhere.",
  "Notice what you noticed.",
  "It's okay to put it down for a moment.",
  "Underline the line that just moved you.",
  "A book read slowly is read twice.",
  "You're already further than this morning.",
  "Take a breath. The author waited centuries.",
  "If a sentence stopped you, it earned it.",
  "Re-reading is not failing.",
  "One quiet hour is more than most people have.",
];

const ENCOURAGEMENTS_PT = [
  "Não precisas de acabar esta noite.",
  "Lê um parágrafo de novo. Devagar.",
  "A página não vai a lado nenhum.",
  "Repara no que reparaste.",
  "Não há problema em pousá-lo por um momento.",
  "Sublinha a frase que acabou de te tocar.",
  "Um livro lido devagar é lido duas vezes.",
  "Já estás mais à frente do que esta manhã.",
  "Respira fundo. O autor esperou séculos.",
  "Se uma frase te deteve, ganhou-o.",
  "Reler não é falhar.",
  "Uma hora tranquila vale mais do que a maioria das pessoas tem.",
];

// ── Daily poster quotes ───────────────────────────────────────────
// EN → American authors  |  PT → Brazilian authors
// getDailyQuote(lang) uses the day number since Unix epoch as index,
// so every visitor sees the same quote on the same day.

const DAILY_QUOTES_EN = [
  { text: "The world breaks everyone, and afterward, some are strong at the broken places.",          source: "Ernest Hemingway · A Farewell to Arms" },
  { text: "So we beat on, boats against the current, borne back ceaselessly into the past.",          source: "F. Scott Fitzgerald · The Great Gatsby" },
  { text: "The past is never dead. It's not even past.",                                              source: "William Faulkner · Requiem for a Nun" },
  { text: "Definitions belong to the definers, not the defined.",                                     source: "Toni Morrison · Beloved" },
  { text: "You never really understand a person until you consider things from his point of view.",   source: "Harper Lee · To Kill a Mockingbird" },
  { text: "I went to the woods because I wished to live deliberately.",                               source: "Henry David Thoreau · Walden" },
  { text: "I am large, I contain multitudes.",                                                        source: "Walt Whitman · Song of Myself" },
  { text: "All that we see or seem is but a dream within a dream.",                                   source: "Edgar Allan Poe · A Dream Within a Dream" },
  { text: "And now that you don't have to be perfect, you can be good.",                              source: "John Steinbeck · East of Eden" },
  { text: "You have to carry the fire.",                                                              source: "Cormac McCarthy · The Road" },
  { text: "I took a deep breath and listened to the old brag of my heart: I am, I am, I am.",        source: "Sylvia Plath · The Bell Jar" },
  { text: "The truth does not change according to our ability to stomach it.",                        source: "Flannery O'Connor · Letters" },
];

const DAILY_QUOTES_PT = [
  { text: "Liberdade é pouco. O que desejo ainda não tem nome.",                                      source: "Clarice Lispector · A Paixão Segundo G.H." },
  { text: "Mestre não é quem sempre ensina, mas quem de repente aprende.",                            source: "Guimarães Rosa · Grande Sertão: Veredas" },
  { text: "Que não seja imortal, posto que é chama, mas que seja infinito enquanto dure.",            source: "Vinicius de Moraes · Soneto da Fidelidade" },
  { text: "Não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria.",             source: "Machado de Assis · Memórias Póstumas de Brás Cubas" },
  { text: "No meio do caminho tinha uma pedra, tinha uma pedra no meio do caminho.",                  source: "Carlos Drummond de Andrade · No Meio do Caminho" },
  { text: "O que não sei fazer, desmancho em poesia.",                                                source: "Manoel de Barros" },
  { text: "Escrever é uma maldição que salva.",                                                       source: "Clarice Lispector · A Descoberta do Mundo" },
  { text: "Sou um tupi tangendo um alaúde.",                                                         source: "Mário de Andrade" },
  { text: "O sertão é do tamanho do mundo.",                                                         source: "Guimarães Rosa · Grande Sertão: Veredas" },
  { text: "Vou-me embora pra Pasárgada, lá sou amigo do rei.",                                       source: "Manuel Bandeira" },
  { text: "Não quero faca nem queijo. Quero a fome.",                                                 source: "Adélia Prado · Bagagem" },
  { text: "Feliz aquele que transfere o que sabe e aprende o que ensina.",                            source: "Cora Coralina" },
];

function getDailyQuote(lang) {
  const quotes = lang === "pt" ? DAILY_QUOTES_PT : DAILY_QUOTES_EN;
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24)); // days since Unix epoch
  return quotes[day % quotes.length];
}

// ── Reviews ───────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: "white-nights",
    title:    { en: "White Nights",         pt: "Noites Brancas"      },
    author:   { en: "Fyodor Dostoyevsky",   pt: "Fiódor Dostoiévski"  },
    category: "Classic",
    cover:    "cv-navy",
    image:    "bookimages/noites_brancas.jpg",
    rating:   5,
    affiliateUrl: "https://www.amazon.com.br/s?k=Noites+Brancas+Dostoiévski+Penguin+Companhia",
    affiliateAfterParagraph: 5,
    content: {
      en: [
        "You know that feeling of walking alone late at night? The street completely empty, the silence… it feels like your thoughts start speaking louder than the city itself. That's exactly the atmosphere Dostoyevsky creates from the very first pages of White Nights (or Belye nochi — Белые ночи, in the original Russian).",

        "The whole story is set in St. Petersburg, right around that time of year when the so-called \"white nights\" happen — a phenomenon where the sun sets but the sky never truly gets dark. It stays light all night long. And that's not just a backdrop; it's the perfect portrait of how the mind of our protagonist works, a man we only ever know as \"the Dreamer\" (the Mechtatel — Мечтатель).",

        "The Dreamer doesn't fit very well into the real world. No close ties, no real friendships. He spends his days wandering the city, making up stories in his head about the faces of buildings. In one of my favourite passages, he confesses his own situation: \"I am a dreamer; I have so little real life that I look upon such moments as this, even now, as a rarity, and I cannot but repeat them in my dreams.\"",

        "He almost makes peace with that loneliness, turning his imagination into the only place where he feels safe. But the spell breaks the moment he crosses a bridge and runs into Nastenka. She's there, crying, stuck in a wait that hurts too much. That's when two solitudes meet, and we watch the beautiful anguish of a completely idealised love that lasts exactly four nights.",

        "What really got me thinking during this read was stopping to consider who wrote it. Dostoyevsky was only 26 at the time — full of ideals, living under a deeply repressive regime, meeting in secret to read banned books and dream of freedom. White Nights carries a lot of that youthful energy, the feeling of someone walking right along the edge. And then, just a few months after publishing it, he was arrested, put through a horrifying mock execution, and sent to hard labour in Siberia.",

        "I think that's why this Penguin Companhia edition ends up feeling so special: it's as if it preserves his last romantic breath, before prison and suffering hardened his vision of the world for good. And here's a detail that changes the whole experience: the translation. This edition was translated by Rubens Figueiredo, simply one of the foremost specialists in Russian literature in Brazil. He translates directly from the original, which means you can feel the exact cadence, rhythm and melancholy of the text — without that stilted filter of indirect translations. It's pure Dostoyevsky on the page.",

        "It's wild to think that, so much time later, this story still hits that hard. At the end of the day, it's about how we all build our own bubbles and illusions when reality gets too heavy to carry. The ending of the book is that inevitable gut-punch of reality knocking at the door.",

        "The feeling that stays with you when you close the book is perfectly captured in its last and most famous line: \"My God! A whole minute of happiness! Is that really so little for a man's whole life?\" Feeling that flutter from a real connection with someone — even if it only lasts a moment — will always be worth so much more than going through life protected, feeling nothing."
      ],
      pt: [
        "Sabe aquela sensação de andar sozinho de madrugada? A rua completamente vazia, o silêncio... parece que a nossa cabeça começa a falar mais alto que a própria cidade. É exatamente esse clima que o Dostoiévski cria logo nas primeiras páginas de Noites Brancas (ou Belye nochi — Белые ночи, no original em russo).",

        "A história toda se passa em São Petersburgo, bem naquela época do ano onde aconteciam as tais \"noites brancas\" – um fenômeno onde o sol se punha, mas o céu nunca escurecia de verdade. Ficava claro a noite toda. E isso não é só um detalhe do cenário; é o retrato perfeito de como funciona a mente do nosso protagonista, que conhecemos apenas como \"o Sonhador\" (o Mechtatel — Мечтатель).",

        "Bem, o sonhador não se encaixa muito bem no mundo real. Não tem laços, não tem grandes amizades. Ele passa o tempo vagando pela cidade, criando histórias na própria cabeça para as fachadas dos prédios. Em um dos meus trechos favoritos, ele mesmo confessa a sua condição: \"Sou um sonhador; tenho tão pouca vida real que os momentos como este, como o de agora, considero-os tão raros que não posso deixar de repeti-los nos meus sonhos.\"",

        "Ele meio que se abraça com essa solidão até transformar a própria imaginação no único lugar onde se sente seguro. Mas esse transe acaba no momento em que ele passa por uma ponte e esbarra na Nástienka. Ela está lá, chorando, presa a uma espera que a machuca demais. É nesse momento que essas duas solidões se encontram, e a gente acompanha a angústia bonita de um amor totalmente idealizado que dura exatas quatro noites.",

        "O que me chamou muita atenção nessa leitura foi parar para pensar em quem escreveu isso. O Dostoiévski tinha só 26 anos na época. Ele estava cheio de ideais, vivendo em uma Rússia totalmente repressora, se reunindo escondido para ler livros proibidos e sonhar com liberdade. Noites Brancas carrega muito dessa energia jovem, de alguém caminhando na beira do precipício. Tanto que, poucos meses depois de publicar o livro, ele foi preso, passou por uma simulação de fuzilamento terrível e foi mandado para fazer trabalho forçado na Sibéria.",

        "Eu acho que por isso, essa edição da Penguin Companhia acaba sendo tão especial: é como se ela guardasse o último respiro romântico dele, antes de a prisão e o sofrimento endurecerem de vez a sua visão de mundo. E aqui vai um detalhe que muda toda a experiência: a tradução. Essa edição foi traduzida pelo Rubens Figueiredo, que é simplesmente um dos maiores especialistas em literatura russa no Brasil. Ele traduz direto do original, o que faz com que a gente consiga sentir exatamente a cadência, o ritmo e a melancolia do texto sem aquele filtro engessado de traduções indiretas. É o Dostoiévski puro ali na página.",

        "É muito louco pensar que, tanto tempo depois, essa história ainda bate tão forte na gente. No fim das contas, ela fala sobre como nós também criamos nossas próprias bolhas e ilusões quando a realidade fica pesada demais. O fim do livro é aquele choque de realidade inevitável batendo à porta.",

        "A sensação que fica quando você fecha as páginas resume perfeitamente a última e mais famosa frase do livro: \"Meu Deus! Um minuto inteiro de bem-aventurança! Acaso isso é pouco para toda a vida de um homem?\" Sentir aquele frio na barriga de uma conexão real com alguém — mesmo que passe rápido — sempre vai valer muito mais a pena do que passar a vida inteira protegido, sem sentir nada."
      ],
    },
  },
];

Object.assign(window, {
  QUOTE_OF_WEEK, CURRENTLY_READING, FEATURED, COLLECTIONS, ALL_GENRES, NAV_LINKS,
  ARTICLES, OPINIONS, POSTER_QUOTE, PREVIEW_BOOK, REVIEWS,
  ENCOURAGEMENTS, ENCOURAGEMENTS_PT,
  DAILY_QUOTES_EN, DAILY_QUOTES_PT, getDailyQuote,
});
