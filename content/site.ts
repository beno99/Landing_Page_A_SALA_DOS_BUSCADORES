import type { Link, SiteContent } from "./types";

const PORTAL = "https://sala-dos-buscadores.vercel.app";
const CANAL = "https://www.youtube.com/@ASALADOSBUSCADORES";
const video = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const short = (id: string) => `https://www.youtube.com/shorts/${id}`;
// Página inicial do Portal. Quem não está logado passa pelo login e volta para cá (?voltar=/).
const portal: Link = { label: "Entrar no Portal", href: PORTAL };
const youtube: Link = { label: "YouTube", href: CANAL, external: true };
// E-mail de contato e de candidatura. A confirmar com a equipe antes de publicar (ver orientações L09).
export const EMAIL = "contato@asaladosbuscadores.com.br";
const candidatura = `mailto:${EMAIL}?subject=Candidatura%20para%20Anfitri%C3%A3o`;

const navLinks: Link[] = [
  { label: "Início", href: "#inicio" },
  { label: "Conteúdos", href: "#salas" },
  { label: "A proposta", href: "#curadoria" },
  { label: "Temas", href: "#perguntas" },
  { label: "Jornada", href: "#jornada" },
  { label: "Anfitriões", href: "#anfitriao" },
];

export const site: SiteContent = {
  meta: {
    title: "A Sala dos Buscadores",
    description:
      "Um portal que organiza tradições religiosas, espirituais e filosóficas em Salas comparáveis. Sem hierarquizar crenças, sem apagar diferenças.",
    ogImage: "/images/og.jpg",
  },
  nav: { links: navLinks, cta: portal, labels: { menu: "Menu", close: "Fechar", primary: "Principal", logo: "A Sala dos Buscadores, início" } },
  hero: {
    title: ["A porta está aberta", "para a sua busca."],
    description:
      "Explore conhecimentos, tradições e perspectivas sobre a experiência humana. Encontre artigos, vídeos e fontes para estudar, comparar e construir seu próprio caminho.",
    cta: portal,
  },
  salas: {
    title: "Conhecimentos que abrem novas perspectivas.",
    subtitle: "Documentários e episódios para explorar tradições, textos antigos e perguntas sobre a existência. Escolha uma capa para assistir no YouTube ou abrir a Sala no Portal.",
    // Oito capas: as quatro do canal (abrem o vídeo no YouTube) e as quatro novas das Salas (abrem a Sala no Portal).
    salas: [
      { id: "espiral", name: "E se o tempo fosse uma espiral? Vídeo no YouTube", image: "/images/salas/espiral.webp", href: video("WdfozbD1Lyo"), external: true },
      { id: "nag-hammadi", name: "Nag Hammadi: os textos esquecidos e a porta da consciência. Vídeo no YouTube", image: "/images/salas/nag-hammadi.webp", href: video("tcIkPbnpHLo"), external: true },
      { id: "corpus-hermeticum", name: "Corpus Hermeticum: mente, cosmos e conhecimento. Sala no Portal", image: "/images/salas/corpus-hermeticum.webp", href: `${PORTAL}/salas/corpus-hermeticum` },
      { id: "urantia", name: "O Livro de Urântia: origem, universo e Jesus. Vídeo no YouTube", image: "/images/salas/urantia.webp", href: video("BMd3HC6ZpKY"), external: true },
      { id: "caibalion", name: "O Caibalion: ritmo, polaridade e transformação. Sala no Portal", image: "/images/salas/caibalion.webp", href: `${PORTAL}/salas/caibalion` },
      { id: "apocrifos", name: "Evangelhos apócrifos: vozes do cristianismo antigo. Sala no Portal", image: "/images/salas/apocrifos.webp", href: `${PORTAL}/salas/apocrifos-cristianismo-primitivo` },
      { id: "enoque", name: "Enoque: para onde ele foi? Trailer no YouTube", image: "/images/salas/enoque.webp", href: video("_YBJhQ2C6jc"), external: true },
      { id: "fe-e-poder", name: "Fé e Poder: textos, história e autoridade. Sala no Portal", image: "/images/salas/fe-e-poder.webp", href: `${PORTAL}/salas/fe-e-poder` },
    ],
    blocks: [["espiral"], ["nag-hammadi", "corpus-hermeticum"], ["urantia", "caibalion", "apocrifos"], ["enoque", "fe-e-poder"], ["espiral"]],
  },
  curadoria: {
    label: "A proposta do portal",
    line1: "Diferentes tradições.",
    line2: "Espaço para a sua busca.",
    text: "A Sala dos Buscadores reúne conhecimentos religiosos, espirituais e filosóficos em Salas temáticas. A Curadoria e os Anfitriões apresentam textos, fontes e perspectivas em seus contextos, convidando você a estudar, comparar e construir suas próprias interpretações.",
    image: "/images/editorial/proposta.webp",
    imageLabel: "Acervo · ilustração",
    imageCaption: "Arte ilustrativa do acervo do projeto",
    principles: [
      { title: "Respeito às tradições", text: "Conheça cada perspectiva em seu contexto, com atenção às diferenças." },
      { title: "Fontes para aprofundar", text: "Consulte as referências e descubra de onde vêm as ideias apresentadas." },
      { title: "Autoria e responsabilidade", text: "Identifique quem escreve e a perspectiva de cada conteúdo, com revisão editorial antes da publicação." },
    ],
  },
  perguntas: {
    label: "Temas",
    line1: "Perguntas que",
    line2: "atravessam tradições.",
    text: "Explore temas que aproximam diferentes Salas. Compare perspectivas, consulte fontes e encontre novas perguntas para continuar sua busca.",
    // Temas já usados no Portal. Quando o Portal expuser os temas das publicações da Curadoria, esta lista passa a vir de lá.
    themes: ["Alma", "Conhecimento interior", "Formação da Bíblia", "Jesus", "Manuscritos antigos", "Meditação", "Monoteísmo", "Morte", "Origem do mal", "Origem do universo"],
    show: 8,
    themesLabel: "Temas",
    cta: { label: "Comparar temas", href: `${PORTAL}/comparar` },
    image: "/images/perguntas/scene.webp",
  },
  trilhas: {
    label: "Leituras selecionadas",
    line1: "Leituras para começar",
    line2: "sua jornada.",
    note: "Encontre um ponto de partida e avance por leituras selecionadas pela Curadoria.",
    // Os quatro títulos ficam na Sala Corpus Hermeticum: até o Portal ter um endereço por artigo, cada degrau leva à Sala e diz isso.
    steps: [
      { numeral: "I", title: "O que é o hermetismo", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
      { numeral: "II", title: "Poimandres: a visão de Hermes", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
      { numeral: "III", title: "As sete esferas", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
      { numeral: "IV", title: "O Asclépio em latim", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
    ],
  },
  artigos: {
    label: "No acervo",
    line1: "Artigos e vídeos",
    line2: "para ampliar sua busca.",
    text: "Explore as publicações da Curadoria: leituras, documentários e vídeos curtos sobre diferentes tradições, conhecimentos e perspectivas.",
    filtersLabel: "Filtrar por formato",
    filters: [
      { id: "all", label: "Todos" },
      { id: "artigo", label: "Artigos" },
      { id: "video", label: "Vídeos" },
      { id: "short", label: "Shorts" },
    ],
    groups: [
      { id: "video", label: "Vídeos" },
      { id: "short", label: "Shorts" },
      { id: "artigo", label: "Artigos" },
    ],
    pageSize: { video: 4, short: 4, artigo: 3 },
    more: "Mostrar mais",
    // Vídeos e Shorts do canal oficial, com as capas do próprio YouTube (i.ytimg.com). Os artigos levam à Sala até o
    // Portal ter um endereço por artigo. Quando houver integração, esta lista passa a vir das publicações do Portal.
    items: [
      { id: "urantia", kind: "video", source: "Sala O Livro de Urântia", title: "O Livro de Urântia: origem, universo e Jesus", meta: "Vídeo · 17 min", action: "Assistir", image: "/images/salas/urantia.webp", alt: "Capa do documentário: livro aberto diante da Terra vista do espaço", href: video("BMd3HC6ZpKY"), external: true },
      { id: "nag-hammadi", kind: "video", source: "Sala Biblioteca de Nag Hammadi", title: "Nag Hammadi: os textos esquecidos e a porta da consciência", meta: "Vídeo · 28 min", action: "Assistir", image: "/images/salas/nag-hammadi.webp", alt: "Capa do documentário: livros e jarros antigos diante de uma porta iluminada numa caverna", href: video("tcIkPbnpHLo"), external: true },
      { id: "espiral", kind: "video", source: "Canal A Sala dos Buscadores", title: "E se o tempo fosse uma espiral?", meta: "Vídeo", action: "Assistir", image: "/images/salas/espiral.webp", alt: "Capa do vídeo: espiral de luz no céu", href: video("WdfozbD1Lyo"), external: true },
      { id: "enoque", kind: "video", source: "Documentário especial", title: "Enoque: para onde ele foi?", meta: "Trailer · 1 min", action: "Assistir", image: "/images/salas/enoque.webp", alt: "Capa do trailer: homem de barba olha para o alto diante de uma espiral de luz", href: video("_YBJhQ2C6jc"), external: true },
      { id: "short-caibalion-cotidiano", kind: "short", source: "Sala O Caibalion", title: "O que o Caibalion pode revelar sobre o seu cotidiano?", meta: "Short", action: "Assistir", image: "/images/shorts/14tlXFyioSs.webp", alt: "Capa do Short: homem parado numa calçada movimentada da cidade, à noite", href: short("14tlXFyioSs"), external: true },
      { id: "short-114-dizeres", kind: "short", source: "Sala Biblioteca de Nag Hammadi", title: "Os 114 dizeres", meta: "Short", action: "Assistir", image: "/images/shorts/7AtH6x1QTRk.webp", alt: "Capa do Short sobre o Evangelho de Tomé", href: short("7AtH6x1QTRk"), external: true },
      { id: "short-biblia-editada", kind: "short", source: "Sala Fé e Poder", title: "A Bíblia foi escrita ou editada?", meta: "Short", action: "Assistir", image: "/images/shorts/aw_FZo91z_A.webp", alt: "Capa do Short sobre a formação da Bíblia", href: short("aw_FZo91z_A"), external: true },
      { id: "short-urantia-opinioes", kind: "short", source: "Sala O Livro de Urântia", title: "Por que o Livro de Urântia divide opiniões?", meta: "Short", action: "Assistir", image: "/images/shorts/EGJycr9Llvs.webp", alt: "Capa do Short sobre O Livro de Urântia", href: short("EGJycr9Llvs"), external: true },
      { id: "short-apocrifos", kind: "short", source: "Sala Apócrifos do Cristianismo Primitivo", title: "Evangelhos que ficaram fora da Bíblia?", meta: "Short", action: "Assistir", image: "/images/shorts/XF7q4wuiIvc.webp", alt: "Capa do Short sobre os evangelhos apócrifos", href: short("XF7q4wuiIvc"), external: true },
      { id: "short-caibalion-principios", kind: "short", source: "Sala O Caibalion", title: "Os 7 princípios e um novo olhar", meta: "Short · Ep. 01", action: "Assistir", image: "/images/shorts/MOHUsZPR0vs.webp", alt: "Capa do primeiro episódio da série sobre O Caibalion", href: short("MOHUsZPR0vs"), external: true },
      { id: "short-sophia", kind: "short", source: "Sala Biblioteca de Nag Hammadi", title: "A Sabedoria caiu? O mistério de Sophia", meta: "Short", action: "Assistir", image: "/images/shorts/ArtbSP6eW5M.webp", alt: "Capa do Short sobre Sophia nos textos de Nag Hammadi", href: short("ArtbSP6eW5M"), external: true },
      { id: "short-niceia", kind: "short", source: "Sala Fé e Poder", title: "Niceia: o imperador podia ordenar a fé?", meta: "Short", action: "Assistir", image: "/images/shorts/cLc82GYMb6A.webp", alt: "Capa do Short sobre o Concílio de Niceia", href: short("cLc82GYMb6A"), external: true },
      { id: "short-enoque", kind: "short", source: "Documentário especial", title: "O Livro de Enoque: por que ficou fora da Bíblia?", meta: "Short", action: "Assistir", image: "/images/shorts/7vvbVV-ySgg.webp", alt: "Capa do Short sobre o Livro de Enoque", href: short("7vvbVV-ySgg"), external: true },
      { id: "tome", kind: "artigo", source: "Sala Biblioteca de Nag Hammadi", title: "O Evangelho de Tomé e os 114 ditos", meta: "Artigo", action: "Ver na Sala", image: "/images/artigos/capa-evangelho-tome.webp", alt: "Figura de capuz lê um livro à luz de vela numa sala de pedra", href: `${PORTAL}/salas/nag-hammadi` },
      { id: "poimandres", kind: "artigo", source: "Sala Corpus Hermeticum", title: "Poimandres, §24–26: a subida pelas esferas", meta: "Fonte primária", action: "Ver na Sala", image: "/images/artigos/capa-esferas.webp", alt: "Figura caminha por um corredor de pedra em direção à luz", href: `${PORTAL}/salas/corpus-hermeticum` },
    ],
    cta: { label: "Ver o canal no YouTube", href: CANAL, external: true },
  },
  leitura: {
    label: "Leitura na fonte",
    modesLabel: "Como ler o trecho",
    modes: [
      { id: "original", label: "Original" },
      { id: "translation", label: "Tradução" },
      { id: "side", label: "Lado a lado" },
    ],
    unavailable: "Original ainda não disponível para este trecho.",
    salaAction: "Ler na Sala",
    // Cinco trechos; um é sorteado a cada acesso. As traduções dos trechos 2 a 5 são propostas e passam pela
    // revisão editorial da Curadoria antes da publicação. A apresentação não implica endosso doutrinário.
    passages: [
      {
        id: "corpus-hermeticum",
        sala: "Corpus Hermeticum",
        salaHref: `${PORTAL}/salas/corpus-hermeticum`,
        original: "τοῦτό ἐστι τὸ ἀγαθὸν τέλος τοῖς γνῶσιν ἐσχηκόσι…",
        originalLang: "grc",
        originalLabel: "Original · grego",
        translation: "Este é o bom fim para os que alcançaram o conhecimento…",
        translationLabel: "Tradução",
        source: "Corpus Hermeticum · Tratado I (Poimandres), 26 · grego",
        reference: { label: "Ver na Sala", href: `${PORTAL}/salas/corpus-hermeticum` },
        glossary: { term: "Gnose", text: "grego · γνῶσις · conhecimento" },
      },
      {
        id: "tome",
        sala: "Biblioteca de Nag Hammadi",
        salaHref: `${PORTAL}/salas/nag-hammadi`,
        // Referência em inglês: é tradução, não o original copta. Original só com texto copta verificado.
        translation: "Quem busca não deve parar de buscar até encontrar.",
        translationLabel: "Tradução a partir de versão inglesa",
        source: "Evangelho de Tomé · dito 2, início · Biblioteca de Nag Hammadi",
        reference: { label: "Referência consultada (tradução inglesa)", href: "https://marcion.sourceforge.net/nag-hammadi-library/gospel-of-thomas-en.html", external: true },
        glossary: { term: "Dito", text: "cada uma das sentenças atribuídas a Jesus no Evangelho de Tomé" },
      },
      {
        id: "caibalion",
        sala: "O Caibalion",
        salaHref: `${PORTAL}/salas/caibalion`,
        original: "The lips of wisdom are closed, except to the ears of understanding.",
        originalLang: "en",
        originalLabel: "Original · inglês",
        translation: "Os lábios da sabedoria estão fechados, exceto aos ouvidos da compreensão.",
        translationLabel: "Tradução",
        source: "O Caibalion · epígrafe · Três Iniciados, edição de 1908 · hermetismo moderno",
        reference: { label: "Referência (Project Gutenberg)", href: "https://dev.gutenberg.org/cache/epub/14209/pg14209-images.html", external: true },
        glossary: { term: "Hermetismo moderno", text: "releitura, nos séculos XIX e XX, de temas atribuídos a Hermes Trismegisto" },
      },
      {
        id: "urantia",
        sala: "O Livro de Urântia",
        salaHref: `${PORTAL}/salas/urantia`,
        original: "Love is the desire to do good to others.",
        originalLang: "en",
        originalLabel: "Original · inglês",
        translation: "O amor é o desejo de fazer o bem aos outros.",
        translationLabel: "Tradução",
        source: "O Livro de Urântia · 56:10.21 · página 648.4",
        reference: { label: "Referência (urantia.org)", href: "https://www.urantia.org/urantia-book-standardized/paper-56-universal-unity", external: true },
        glossary: { term: "Documento", text: "cada uma das partes numeradas que compõem O Livro de Urântia" },
      },
      {
        id: "fe-e-poder",
        sala: "Fé e Poder",
        salaHref: `${PORTAL}/salas/fe-e-poder`,
        original: "πάντα δὲ δοκιμάζετε, τὸ καλὸν κατέχετε·",
        originalLang: "grc",
        originalLabel: "Original · grego",
        translation: "Examinem tudo; conservem o que é bom.",
        translationLabel: "Tradução",
        source: "Primeira Carta aos Tessalonicenses 5:21 · grego",
        reference: { label: "Referência textual (Bible Hub)", href: "https://www.biblehub.com/texts/1_thessalonians/5-21.htm", external: true },
        glossary: { term: "Examinar", text: "grego · δοκιμάζω · pôr à prova" },
      },
    ],
    features: [
      { title: "Original e tradução", text: "Alterne ou leia lado a lado quando o original verificado estiver disponível." },
      { title: "Glossário da Sala", text: "" },
      { title: "Fonte contextualizada", text: "Obra, seção e referência de cada trecho, com acesso à Sala." },
    ],
  },
  jornada: {
    label: "Seu percurso de estudo",
    line1: "Jornada do Buscador",
    line2: "Cada descoberta deixa uma marca.",
    text: "Explore temas e Salas, consulte fontes e conecte perspectivas. Suas conquistas acompanham o caminho que você constrói, no seu ritmo.",
    badge: { eyebrow: "Gemas de Conhecimento", title: "Marcas do seu percurso", text: "Estudo, descobertas e participação." },
    levels: [
      { title: "Seu caminho por temas", text: "Aprofunde assuntos que atravessam diferentes tradições e Salas." },
      { title: "Seu progresso em cada Sala", text: "Acompanhe as leituras e os conteúdos que você já explorou." },
      { title: "Suas gemas e conquistas", text: "Reconheça os passos da sua jornada e descubra como continuar." },
    ],
    gemsTitle: "Gemas de Conhecimento",
    gemsText: "Cada gema representa uma forma de explorar, compreender ou contribuir.",
    gems: [
      { name: "Citrino", title: "Primeiro passo", text: "Conclusão inicial de conteúdo.", from: "#F2C14E", to: "#B9770E" },
      { name: "Esmeralda", title: "Continuidade", text: "Estudo em dias diferentes, sem obrigação de sequência diária.", from: "#5FD39A", to: "#0E6B43" },
      { name: "Cristal de Rocha", title: "Na fonte", text: "Consulta às referências.", from: "#F4F8FA", to: "#9FB3BF" },
      { name: "Safira", title: "Aprofundamento", text: "Conclusão de uma trilha editorial.", from: "#6E95F0", to: "#1C3A8A" },
      { name: "Turmalina", title: "Perspectivas em diálogo", text: "Estudo e comparação do mesmo tema entre Salas.", from: "#8FD9C0", to: "#2E7D68" },
      { name: "Opala", title: "Entre Salas", text: "Exploração de conteúdos de diferentes Salas.", from: "#EAF2F8", to: "#B7A6D9" },
      { name: "Ametista", title: "Leitura reflexiva", text: "Reflexão pessoal sobre o que foi lido.", from: "#B48CE0", to: "#4E2A80" },
      { name: "Rubi", title: "Contribuição à comunidade", text: "Reconhecimento editorial, com critérios explícitos.", from: "#F0566F", to: "#7A0B1E" },
    ],
    titlesTitle: "Seu percurso ganha novos títulos",
    titles: ["Explorador", "Investigador", "Articulador", "Aprofundador"],
    titlesNote: "Títulos por tema reconhecem seu percurso de estudo. Não representam superioridade espiritual.",
    // Enquanto a Jornada não estiver no Portal, o CTA não aponta para uma funcionalidade inexistente.
    cta: { label: "Conhecer o Portal", href: PORTAL },
    ctaNote: "A Jornada do Buscador está em preparação. Acesso gratuito ao Portal.",
  },
  anfitriao: {
    label: "Espaço para Anfitriões",
    line1: "Seu conhecimento pode abrir",
    line2: "novos caminhos de descoberta.",
    text: "Compartilhe estudos, experiências e perspectivas em uma Sala com a sua assinatura. Autores, pesquisadores, educadores, comunicadores e representantes de tradições podem apresentar suas propostas e contribuir para ampliar os olhares sobre a existência.",
    steps: [
      { title: "Apresente sua proposta", text: "Conte o tema, sua abordagem e o que deseja compartilhar." },
      { title: "Prepare sua Sala", text: "Após a aprovação, organize seus conteúdos e referências." },
      { title: "Publique com acompanhamento", text: "A Curadoria revisa os materiais antes da publicação." },
    ],
    examplesTitle: "Diferentes vozes, autoria reconhecida.",
    examplesText: "Exemplos de Salas de Anfitriões. Cada proposta preserva sua perspectiva e apresenta suas referências.",
    seal: "Sala de Anfitrião",
    // Demonstração: nomes e dados não representam pessoas ou Salas cadastradas. Imagens do acervo visual do projeto.
    examples: [
      { image: "/images/anfitrioes/exemplo-tome.webp", theme: "Textos e tradições", title: "Leituras do Evangelho de Tomé", description: "Textos antigos, contexto histórico e perguntas sobre o conhecimento.", author: "Por Nome do anfitrião", authorNote: "Autoria e perfil identificados" },
      { image: "/images/anfitrioes/exemplo-fe-memoria.webp", theme: "História e cultura", title: "Fé, memória e sociedade", description: "Religião, símbolos e autoridade em diferentes contextos culturais.", author: "Por Nome do anfitrião", authorNote: "Autoria e perfil identificados" },
      { image: "/images/anfitrioes/exemplo-cosmos.webp", theme: "Cosmologias e filosofia", title: "Cosmos e sentidos da existência", description: "Cosmologias espirituais e filosóficas em diálogo com a experiência humana.", author: "Por Nome do anfitrião", authorNote: "Autoria e perfil identificados" },
    ],
    exampleNote: "Exemplo ilustrativo · sem publicação real",
    // Até haver formulário, a candidatura começa por e-mail.
    primary: { label: "Quero ser Anfitrião", href: candidatura },
    secondary: { label: "Conhecer os critérios de participação", href: "/anfitrioes#politica" },
    contact: { label: "Sem aplicativo de e-mail? Escreva para", email: EMAIL },
    card: {
      image: "/images/anfitrioes/exemplo-tome.webp",
      count: "2 conteúdos publicados",
      title: "Leituras do Evangelho de Tomé",
      description: "Sala de Anfitrião · Nome do anfitrião (demonstração)",
      level: "Iniciante",
      updated: "Atualizada em 7 out 2026",
      note: "Exemplo de demonstração",
    },
  },
  faq: {
    label: "A Sala dos Buscadores",
    title: "Sua busca começa com uma pergunta.",
    subtitle: "Conheça o Portal, encontre seu ponto de partida e explore no seu ritmo.",
    items: [
      { question: "Preciso seguir alguma religião para participar?", answer: "O Portal acolhe diferentes crenças e também quem não segue uma religião. Aqui, você encontra tradições e perspectivas em seus contextos e constrói seu próprio percurso de estudo." },
      { question: "O acesso ao Portal é gratuito?", answer: "Sim. A conta é gratuita e permite acompanhar seu percurso no acervo." },
      { question: "Quem produz os artigos e vídeos?", answer: "O acervo reúne conteúdos da Curadoria e de Anfitriões, com autoria identificada. Os materiais passam por revisão editorial antes da publicação; cada autor preserva sua perspectiva." },
      { question: "Como o assistente pode ajudar na minha busca?", answer: "Use o assistente para explorar assuntos e encontrar caminhos de leitura no acervo. Ele é uma ferramenta de apoio: consulte as fontes indicadas e avalie as respostas com senso crítico." },
      { question: "Preciso informar minha religião ou convicção?", answer: "Não. Essa informação é opcional. Você pode explorar o acervo sem declarar uma crença." },
      { question: "Como posso me tornar Anfitrião?", answer: "Apresente seu tema, sua abordagem e os materiais que deseja compartilhar. A Curadoria avalia a proposta e orienta os próximos passos para a criação da sua Sala." },
    ],
    contactLabel: "Ainda tem uma dúvida?",
    contact: { label: "Fale com a equipe pelos canais oficiais.", href: `mailto:${EMAIL}` },
  },
  chamado: {
    label: "Continue sua busca",
    line1: "Uma pergunta pode abrir",
    line2: "novos caminhos.",
    text: "Explore Salas, artigos e vídeos sobre tradições, filosofias e diferentes maneiras de compreender a existência. Construa sua Jornada do Buscador, no seu ritmo.",
    cta: portal,
    support: "Conta gratuita • Diferentes perspectivas • Autoria identificada",
    brand: { name: "A Sala dos Buscadores", tagline: "Conhecer. Comparar. Refletir." },
  },
  footer: {
    name: "A Sala dos Buscadores",
    description: "Um espaço de estudo e encontro entre tradições, fontes e perspectivas.",
    motto: "Sua busca, com liberdade para perguntar.",
    // Caminhos a partir da raiz ("/#…"), para o mesmo rodapé funcionar também em /anfitrioes.
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Portal", href: PORTAL },
          { label: "Salas", href: `${PORTAL}/salas` },
          { label: "Artigos e vídeos", href: "/#artigos" },
          { label: "Jornada do Buscador", href: "/#jornada" },
        ],
      },
      {
        title: "Participe",
        links: [
          { label: "Quero ser Anfitrião", href: "/anfitrioes" },
          { label: "Perguntas frequentes", href: "/#faq" },
          { label: "Contato", href: `mailto:${EMAIL}` },
        ],
      },
      {
        title: "Transparência",
        links: [
          { label: "Política editorial", href: "/anfitrioes#politica" },
          { label: "Privacidade e LGPD", href: `${PORTAL}/sobre#privacidade` },
          { label: "Termos de uso", href: `${PORTAL}/sobre#termos` },
        ],
      },
    ],
    socialTitle: "Acompanhe o canal",
    // Instagram, TikTok, Facebook e X entram aqui quando os endereços oficiais forem confirmados.
    social: [youtube],
    contact: { label: "E-mail de contato", href: `mailto:${EMAIL}` },
    copyright: "A Sala dos Buscadores",
    backToTop: "Voltar ao topo",
  },
};
