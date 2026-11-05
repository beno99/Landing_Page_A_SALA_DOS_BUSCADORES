import type { Link, SiteContent } from "./types";

const PORTAL = "https://asaladosbuscadores.com.br";
const CANAL = "https://youtube.com/@asaladosbuscadores";
const video = (id: string) => `https://www.youtube.com/watch?v=${id}`;
// Página inicial do Portal. Quem não está logado passa pelo login e volta para cá (?voltar=/).
const portal: Link = { label: "Entrar no Portal", href: PORTAL };
const youtube: Link = { label: "YouTube", href: CANAL, external: true };
// E-mail de contato e de candidatura, confirmado pela equipe (5 nov 2026).
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
    blocks: [["espiral"], ["nag-hammadi", "corpus-hermeticum"], ["urantia", "caibalion", "apocrifos"], ["enoque", "fe-e-poder"]],
  },
  curadoria: {
    label: "A proposta do portal",
    line1: "Diferentes tradições,",
    line2: "espaço para a sua busca.",
    text: "A Sala dos Buscadores reúne conhecimentos religiosos, espirituais e filosóficos em Salas temáticas. A Curadoria e os Anfitriões apresentam textos, fontes e perspectivas em seus contextos, convidando você a estudar, comparar e construir suas próprias interpretações.",
    principles: [
      { title: "Respeito às tradições", text: "Conheça cada perspectiva em seu contexto, com atenção às diferenças.", image: "/images/proposta/01-tradicoes.webp", mobileImage: "/images/proposta/01-tradicoes-4x3.webp" },
      { title: "Fontes para aprofundar", text: "Consulte as referências e descubra de onde vêm as ideias apresentadas.", image: "/images/proposta/02-fontes.webp", mobileImage: "/images/proposta/02-fontes-4x3.webp" },
      { title: "Autoria e responsabilidade", text: "Identifique quem escreve e a perspectiva de cada conteúdo, com revisão editorial antes da publicação.", image: "/images/proposta/03-autoria.webp", mobileImage: "/images/proposta/03-autoria-4x3.webp" },
    ],
  },
  perguntas: {
    label: "Temas",
    line1: "Perguntas que",
    line2: "atravessam tradições.",
    text: "Explore temas que aproximam diferentes Salas. Compare perspectivas, consulte fontes e encontre novas perguntas para continuar sua busca.",
    themes: ["Consciência", "Autoconhecimento", "Morte e Continuidade", "Mal e Sofrimento", "Manuscritos antigos", "Astrologia e Cosmologia", "Cânon e Tradição", "Textos apócrifos", "Tradução e Interpretação", "Gnose"],
    show: 10,
    themesLabel: "Temas",
    cta: { label: "Comparar temas", href: `${PORTAL}/comparar` },
    image: "/images/perguntas/biblioteca.png",
  },
  trilhas: {
    label: "Leituras selecionadas",
    line1: "Leituras para começar",
    line2: "sua jornada.",
    note: "Encontre um ponto de partida e avance por leituras selecionadas pela Curadoria.",
    // Os quatro títulos ficam na Sala Corpus Hermeticum: até o Portal ter um endereço por artigo, cada degrau leva à Sala e diz isso.
    steps: [
      { numeral: "I", title: "O que é o hermetismo", image: "/images/leituras/01-hermetismo.webp", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
      { numeral: "II", title: "Poimandres: a visão de Hermes", image: "/images/leituras/02-poimandres.webp", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
      { numeral: "III", title: "As sete esferas", image: "/images/leituras/03-sete-esferas.webp", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
      { numeral: "IV", title: "O Asclépio em latim", image: "/images/leituras/04-asclepio.webp", meta: "Artigo · na Sala Corpus Hermeticum", href: `${PORTAL}/salas/corpus-hermeticum` },
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
    ],
    backgroundImage: "/images/acervo/textura.png",
    salas: [
      {
        id: "comece-por-aqui", title: "Comece por aqui",
        description: "Apresentação do portal e percursos de estudo",
        image: "/images/acervo/comece-por-aqui.png", count: 1, level: "Iniciante",
        updated: "2026-11-03", updatedLabel: "3 nov 2026",
        href: "https://asaladosbuscadores.com.br/salas/comece-por-aqui",
      },
      {
        id: "biblioteca-de-nag-hammadi", title: "Biblioteca de Nag Hammadi",
        description: "Textos coptas da Antiguidade · conhecimento, alma e cosmologia",
        image: "/images/acervo/nag-hammadi.png", count: 6, level: "Iniciante",
        updated: "2026-11-01", updatedLabel: "1 nov 2026",
        href: "https://asaladosbuscadores.com.br/salas/biblioteca-de-nag-hammadi",
      },
      {
        id: "fe-e-poder", title: "Fé e Poder",
        description: "Religião, textos e autoridade · história e interpretação",
        image: "/images/acervo/fe-e-poder.png", count: 6, level: "Iniciante",
        updated: "2026-11-01", updatedLabel: "1 nov 2026",
        href: "https://asaladosbuscadores.com.br/salas/fe-e-poder",
      },
    ],
    // Carrossel do filtro "Artigos": lista fixa, porque o Portal exige login e não expõe os artigos publicamente.
    // Quando houver uma rota pública, esta lista pode vir dela (mesmo formato).
    articles: [
      {
        title: "Ajustador do Pensamento e discernimento em Urântia",
        summary: "Por que uma impressão interior não deve ser tratada automaticamente como orientação divina",
        meta: "Artigo · 5 min", sala: "O Livro de Urântia",
        themes: ["Cosmos e Origens", "Jesus e Cristianismos"],
        level: "Intermediário", author: "Tales Gouve · Curadoria da Sala de Urântia",
        seal: "Editorial curado",
        href: "https://asaladosbuscadores.com.br/salas/o-livro-de-urantia/ajustador-do-pensamento-e-discernimento-em-urantia",
      },
      {
        title: "A vida continua? Identidade e evolução espiritual em Urântia e no Espiritismo",
        // Resumo copiado do card do Portal, que o corta; o card daqui também limita a 3 linhas.
        summary: "O que permanece de nós após a morte? Urântia e o Espiritismo oferecem respostas que se aproximam em alguns pontos e seguem caminhos distintos em outros.",
        meta: "Artigo · 7 min", sala: "O Livro de Urântia",
        themes: ["Morte"],
        level: "Iniciante", author: "Tales Gouve · Curadoria da Sala de Urântia",
        seal: "Editorial curado",
        // PROVISÓRIO: página da Sala até recebermos o link do artigo.
        href: "https://asaladosbuscadores.com.br/salas/o-livro-de-urantia",
      },
      {
        title: "O que é gnose? Conhecimento, autoconhecimento e despertar",
        summary: "Nos textos de Nag Hammadi, conhecer pode significar uma transformação na maneira de compreender a própria existência.",
        meta: "Artigo · 7 min", sala: "Biblioteca de Nag Hammadi",
        themes: ["Conhecimento interior"],
        level: "Iniciante", author: "Gael Tavos · Curadoria da Sala de Nag Hammadi",
        seal: "Editorial curado",
        // PROVISÓRIO: página da Sala até recebermos o link do artigo.
        href: "https://asaladosbuscadores.com.br/salas/biblioteca-de-nag-hammadi",
      },
    ],
    // Reserva do carrossel "Vídeos": a página troca pelos vídeos mais recentes do canal (lib/youtube.ts)
    // e usa esta lista só se o YouTube não responder.
    videos: [
      {
        title: "ENOQUE: Para Onde Ele Foi? | Trailer Oficial do Documentário Especial",
        image: "https://i.ytimg.com/vi/_YBJhQ2C6jc/maxresdefault.jpg", source: "A Sala dos Buscadores",
        duration: "1:21", seal: "Editorial curado", meta: "No canal do YouTube", href: video("_YBJhQ2C6jc"),
      },
      {
        title: "E se o tempo fosse uma espiral? | A Sala dos Buscadores",
        image: "https://i.ytimg.com/vi/WdfozbD1Lyo/maxresdefault.jpg", source: "A Sala dos Buscadores",
        duration: "16:30", seal: "Editorial curado", meta: "No canal do YouTube", href: video("WdfozbD1Lyo"),
      },
      {
        title: "O Livro de Urântia: origem, universo e Jesus | Documentário especial",
        image: "https://i.ytimg.com/vi/BMd3HC6ZpKY/maxresdefault.jpg", source: "A Sala dos Buscadores",
        duration: "27:37", seal: "Editorial curado", meta: "No canal do YouTube", href: video("BMd3HC6ZpKY"),
      },
    ],
    cta: { label: "Explorar o acervo", href: "https://asaladosbuscadores.com.br/salas" },
  },
  jornada: {
    label: "Seu percurso de estudo",
    line1: "Jornada do Buscador",
    line2: "Cada descoberta deixa uma marca.",
    text: "Explore temas e Salas, consulte fontes e conecte perspectivas. Suas conquistas acompanham o caminho que você constrói, no seu ritmo.",
    levels: [
      { title: "Seu progresso em cada Sala", text: "Acompanhe as leituras e os conteúdos que você já explorou.", icon: "/assets/jornada/progresso.svg" },
      { title: "Seu caminho por temas", text: "Aprofunde assuntos que atravessam diferentes tradições e Salas.", icon: "/assets/jornada/temas.svg" },
      { title: "Suas gemas e conquistas", text: "Reconheça os passos da sua jornada e descubra como continuar.", icon: "/assets/jornada/conquistas.svg" },
    ],
    gemsTitle: "Gemas de Conhecimento",
    gemStatus: "Conquistada",
    // Exemplos ilustrativos do estado conquistado, sem progresso pessoal nesta LP.
    gems: [
      { number: "11", name: "Fluorita", title: "Duas perspectivas", text: "Concluir pelo menos 1 conteúdo em cada uma de 2 Salas.", image: "/images/jornada/fluorita.png", glow: "rgba(63, 174, 140, 0.24)" },
      { number: "05", name: "Esmeralda", title: "Continuidade", text: "Concluir 5 conteúdos em pelo menos 3 dias diferentes, sem precisar ser seguidos.", image: "/images/jornada/esmeralda.png", glow: "rgba(7, 159, 112, 0.24)" },
      { number: "06", name: "Quartzo Rosa", title: "Retomar a busca", text: "Concluir conteúdos em pelo menos 2 dias diferentes.", image: "/images/jornada/quartzo-rosa.png", glow: "rgba(231, 160, 180, 0.24)" },
      { number: "07", name: "Pedra da Lua", title: "Ritmo próprio", text: "Concluir conteúdos em pelo menos 5 dias diferentes, sem exigir sequência.", image: "/images/jornada/pedra-da-lua.png", glow: "rgba(216, 225, 236, 0.24)" },
      { number: "08", name: "Espinélio", title: "Uma busca constante", text: "Concluir 30 conteúdos em pelo menos 15 dias diferentes.", image: "/images/jornada/espinelio.png", glow: "rgba(217, 70, 95, 0.24)" },
    ],
  },
  anfitriao: {
    label: "Espaço para Anfitriões",
    line1: "Seu conhecimento pode abrir",
    line2: "novos caminhos de descoberta.",
    text: "Compartilhe estudos, experiências e perspectivas em uma Sala com a sua assinatura. Autores, pesquisadores, educadores, comunicadores e representantes de tradições podem apresentar suas propostas e contribuir para ampliar os olhares sobre a existência.",
    backgroundImage: "/images/anfitrioes/textura.png",
    featuredSala: {
      id: "corpus-hermeticum", title: "Corpus Hermeticum",
      description: "Hermetismo antigo · mente, cosmos e conhecimento",
      image: "/images/anfitrioes/corpus-hermeticum.png", count: 1,
      level: "Iniciante", updated: "2026-11-01", updatedLabel: "1 nov 2026",
      href: "https://asaladosbuscadores.com.br/salas/corpus-hermeticum",
      seal: "Sala da curadoria",
    },
    steps: [
      { title: "Apresente sua proposta", text: "Conte o tema, sua abordagem e o que deseja compartilhar.", icon: "/assets/anfitrioes/proposta.svg" },
      { title: "Prepare sua Sala", text: "Após a aprovação, organize seus conteúdos e referências.", icon: "/assets/anfitrioes/preparar.svg" },
      { title: "Publique com acompanhamento", text: "A Curadoria revisa os materiais antes da publicação.", icon: "/assets/anfitrioes/publicar.svg" },
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
    // Perfis oficiais confirmados pela equipe (5 nov 2026).
    social: [
      { ...youtube, icon: "youtube" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/asaladosbuscadores", external: true },
      { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@asaladosbuscadores", external: true },
      { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/share/1CGMMFLfbp/", external: true },
      { label: "X", icon: "x", href: "https://x.com/saladobuscador", external: true },
    ],
    contact: { label: "E-mail de contato", href: `mailto:${EMAIL}` },
    copyright: "A Sala dos Buscadores",
    backToTop: "Voltar ao topo",
  },
};
