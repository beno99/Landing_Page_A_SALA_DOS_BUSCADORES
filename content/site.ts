import type { Link, SiteContent } from "./types";

const PORTAL = "https://sala-dos-buscadores.vercel.app";
const CANAL = "https://www.youtube.com/@ASALADOSBUSCADORES";
const video = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const short = (id: string) => `https://www.youtube.com/shorts/${id}`;
// Página inicial do Portal. Quem não está logado passa pelo login e volta para cá (?voltar=/).
const portal: Link = { label: "Entrar no Portal", href: PORTAL };
const youtube: Link = { label: "YouTube", href: CANAL, external: true };

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
    quote: {
      original: "τοῦτό ἐστι τὸ ἀγαθὸν τέλος τοῖς γνῶσιν ἐσχηκόσι…",
      translation: "Este é o bom fim para os que alcançaram o conhecimento…",
      source: "Corpus Hermeticum · Tratado I, 26 · Poimandres",
      originalLabel: "Original · grego",
      translationLabel: "Tradução",
    },
    features: [
      { title: "Original e tradução", text: "Alterne ou leia lado a lado, quando disponíveis, com a edição citada." },
      { title: "Glossário da Sala", text: "Demiurgo · grego · δημιουργός · artesão." },
      { title: "Continue de onde parou", text: "Retome a leitura no ponto em que parou." },
    ],
  },
  conquistas: {
    label: "Seu caminho no acervo",
    line1: "Cada descoberta",
    line2: "deixa uma marca.",
    gemsLabel: "Conquistas",
    gems: [
      { name: "Citrino", title: "Primeiro passo", from: "#F2C14E", to: "#B9770E" },
      { name: "Esmeralda", title: "Palavra por palavra", from: "#5FD39A", to: "#0E6B43" },
      { name: "Cristal de rocha", title: "Na fonte", from: "#F4F8FA", to: "#9FB3BF" },
      { name: "Safira", title: "Além da primeira leitura", from: "#6E95F0", to: "#1C3A8A" },
      { name: "Turmalina", title: "Lado a lado", from: "#F59AB5", to: "#2E9C6A" },
      { name: "Opala", title: "Entre Salas", from: "#EAF2F8", to: "#B7A6D9" },
      { name: "Ametista", title: "Leitura atenta", from: "#B48CE0", to: "#4E2A80" },
      { name: "Rubi", title: "Caminho percorrido", from: "#F0566F", to: "#7A0B1E" },
    ],
    text: "Leituras, encontros com as fontes e conexões entre Salas. Cada jornada tem seu próprio ritmo.",
  },
  anfitriao: {
    label: "Para anfitriões",
    line1: "Tem uma pesquisa?",
    line2: "Abra a sua Sala.",
    text: "Pesquisadores, professores e estudiosos de uma tradição podem manter uma Sala própria no acervo, com os seus artigos e as suas fontes, ao lado das Salas da curadoria.",
    steps: [
      { title: "Candidatura", text: "Você conta a sua pesquisa." },
      { title: "Convite", text: "A curadoria analisa e convida." },
      { title: "Revisão", text: "Nada vai ao ar sem aprovação." },
    ],
    // Até haver formulário, a candidatura começa por e-mail.
    primary: { label: "Quero ser anfitrião", href: "mailto:contato@asaladosbuscadores.com.br?subject=Candidatura%20para%20anfitri%C3%A3o" },
    secondary: { label: "Como funciona", href: "/anfitrioes" },
    seal: "Anfitrião · revisado pela curadoria",
    caption: "Exemplo de Sala de anfitriã (perfil de demonstração)",
    card: {
      image: "/images/anfitrioes/claustro.webp",
      count: "2 conteúdos",
      title: "Leituras do Evangelho de Tomé",
      description: "Sala de anfitriã · Helena Varga (demonstração)",
      level: "Iniciante",
      updated: "Atualizada em 7 out 2026",
      note: "Exemplo de demonstração",
    },
  },
  faq: {
    label: "Dúvidas",
    line1: "Perguntas",
    line2: "frequentes.",
    invite: "Não achou o que procurava?",
    email: "contato@asaladosbuscadores.com.br",
    items: [
      { question: "A Sala dos Buscadores defende alguma religião?", answer: "Não. O acervo organiza tradições religiosas, espirituais e filosóficas com neutralidade doutrinária. As Salas aparecem em ordem alfabética, e a ordem não indica importância." },
      { question: "A conta é paga?", answer: "Não. A conta é gratuita." },
      { question: "Quem escreve os conteúdos?", answer: "As equipes editoriais de cada Sala e anfitriões convidados. Nada vai ao ar sem a revisão da curadoria." },
      { question: "Como funciona o assistente?", answer: "A IA organiza o que o acervo diz; não determina qual crença é verdadeira." },
      { question: "Preciso informar minha religião?", answer: "Não. Esse campo é opcional no cadastro." },
    ],
  },
  chamado: {
    line1: "Abra espaço para",
    line2: "novas formas de conhecer.",
    text: "Uma curadoria de conhecimentos para explorar, questionar e descobrir no seu próprio ritmo.",
    cta: portal,
  },
  footer: {
    logoAlt: "A Sala dos Buscadores",
    description: "Um acervo para quem busca: tradições, textos e símbolos organizados com rigor e sem hierarquia.",
    columns: [
      { title: "Menu", links: navLinks.filter((l) => l.href !== "#perguntas") },
      {
        title: "Legal",
        links: [
          { label: "Privacidade e LGPD", href: `${PORTAL}/sobre#privacidade` },
          { label: "Termos de uso", href: `${PORTAL}/sobre#termos` },
        ],
      },
      { title: "Social", links: [youtube] },
    ],
    copyright: "2026 © A Sala dos Buscadores",
    credit: "Feito com cuidado pela equipe da Sala",
    backToTop: "Voltar ao topo",
  },
};
