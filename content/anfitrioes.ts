import type { AnfitrioesContent, Link } from "./types";
import { EMAIL, site } from "./site";

// Até haver formulário, a candidatura começa por e-mail (o mesmo destino da LP).
const candidatura: Link = { label: site.anfitriao.primary.label, href: site.anfitriao.primary.href };

const navLinks: Link[] = [
  { label: "Início", href: "/" },
  { label: "Por que", href: "#por-que" },
  { label: "A sua Sala", href: "#sala" },
  { label: "O editor", href: "#editor" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Critérios", href: "#politica" },
];

// Mesmos textos, marca e diferenciação da seção "Espaço para Anfitriões" da LP. Nomes e dados são
// demonstrativos: não representam pessoas ou Salas cadastradas. Recursos ainda não validados com uma
// conta de Anfitrião (salvamento automático, citações pelo assistente, comparação, perfil público e
// gestão de várias Salas) não são anunciados como prontos.
export const anfitrioes: AnfitrioesContent = {
  meta: {
    title: "Espaço para Anfitriões · A Sala dos Buscadores",
    description: site.anfitriao.text,
  },
  nav: { ...site.nav, home: "#inicio", links: navLinks, cta: candidatura },
  hero: {
    label: site.anfitriao.label,
    image: "/images/anfitrioes/hero.webp",
    secondary: { label: "Ver um exemplo de Sala", href: "#sala" },
    title: [site.anfitriao.line1, site.anfitriao.line2],
    description: site.anfitriao.text,
    cta: candidatura,
  },
  porQue: {
    label: "Por que ser Anfitrião",
    line1: "Diferentes vozes,",
    line2: "autoria reconhecida.",
    text: "Sua Sala apresenta a sua perspectiva, com as suas referências, ao lado das Salas da Curadoria. Cada conteúdo mostra quem escreve.",
    image: "/images/anfitrioes/arco-do-ceu.webp",
    imageLabel: "Acervo · ilustração",
    imageCaption: "O buscador diante do arco do céu",
    reasons: [
      { title: "A sua perspectiva, com o seu nome", text: "Cada conteúdo traz a sua assinatura e o selo “Sala de Anfitrião”. O dourado identifica a origem editorial, não uma categoria superior." },
      { title: "Fontes e perspectivas identificadas", text: "Afirmações factuais trazem referências; interpretações e relatos são atribuídos a seus autores." },
      { title: "Revisão com autoria preservada", text: "A Curadoria revisa e pode solicitar ajustes antes da publicação. A revisão não transforma o seu conteúdo em conteúdo da Curadoria." },
    ],
  },
  sala: {
    label: "Como fica a sua Sala",
    line1: "Uma Sala no acervo,",
    line2: "com a sua assinatura.",
    text: "Demonstração: à esquerda, a Sala como o leitor a vê no Portal; à parte, um exemplo do painel privado do Anfitrião.",
    card: site.anfitriao.card,
    profile: {
      avatar: "/images/anfitrioes/avatar.webp",
      label: "Autoria identificada",
      name: "Nome do anfitrião",
      note: "Campo ilustrativo: o Anfitrião escolhe o nome público que aparece nos conteúdos.",
      seal: site.anfitriao.seal,
    },
    publicLabel: "Na página pública, só o que foi publicado",
    publicArticles: [
      { title: "O Evangelho de Tomé: uma coleção de ditos", text: "Publicado com a assinatura do Anfitrião, após a revisão da Curadoria." },
      { title: "Buscar e encontrar: o dito 2 em contexto", text: "Publicado com a assinatura do Anfitrião, após a revisão da Curadoria." },
    ],
    panel: {
      label: "Exemplo do painel privado do Anfitrião",
      note: "Visível só para o Anfitrião. Rascunhos e conteúdos em revisão nunca aparecem no catálogo público.",
      items: [
        { state: "Publicado", title: "O Evangelho de Tomé: uma coleção de ditos" },
        { state: "Publicado", title: "Buscar e encontrar: o dito 2 em contexto" },
        { state: "Em revisão", title: "Tomé e os evangelhos sinóticos: ditos paralelos" },
        { state: "Rascunho", title: "Os manuscritos: o códice copta e os fragmentos gregos" },
      ],
    },
  },
  editor: {
    label: "O editor",
    line1: "Escreva com rigor,",
    line2: "identifique cada fonte.",
    text: "Uma demonstração do editor de blocos: termos, obras e chamadas de fonte ficam marcados no texto e ligados às obras citadas.",
    srNote: "Demonstração do editor. Nada é salvo nem enviado.",
    toolbarLabel: "Ferramentas do editor",
    tools: [
      { id: "termo", title: "Termo", text: "Para o vocabulário próprio da tradição, marcado do mesmo jeito em todo o texto." },
      { id: "obra", title: "Obra", text: "Para títulos de obras, sempre marcados do mesmo jeito em todo o acervo." },
      { id: "citar", title: "Citar fonte", text: "Insere a chamada [n] ligada a uma obra do card Fontes." },
    ],
    status: { saving: "Editando…", saved: "Demonstração", sent: "Enviado para revisão (demonstração)" },
    draft: {
      eyebrow: "Leituras do Evangelho de Tomé · Novo artigo",
      title: "Buscar e encontrar: o dito 2 em contexto",
      before: "No ",
      work: "Evangelho de Tomé",
      middle: ", o ",
      term: "dito",
      after: " 2 descreve a busca como um percurso: quem encontra fica perturbado e, depois, maravilhado",
      note: "A leitura que proponho aqui é a de um Anfitrião, e as interpretações seguem as fontes citadas.",
      source: "Fonte primária · obra do card Fontes",
    },
    send: {
      label: "Para enviar",
      requirements: ["Título e apresentação", "Pelo menos uma fonte", "Referências para afirmações factuais", "Sala escolhida"],
      note: "A Curadoria revisa antes de publicar e pode solicitar ajustes.",
      action: "Enviar para revisão",
      done: "Em revisão",
    },
  },
  etapas: {
    label: "Como funciona",
    line1: "Da proposta",
    line2: "à Sala publicada.",
    text: "Cinco etapas, com acompanhamento da Curadoria do começo ao fim.",
    listLabel: "Etapas da proposta à Sala publicada",
    steps: [
      { numeral: "I", title: "Apresente sua proposta", text: "Conte o tema, sua abordagem e o que deseja compartilhar." },
      { numeral: "II", title: "Conversa com a Curadoria", text: "A Curadoria avalia a proposta e orienta os próximos passos." },
      { numeral: "III", title: "Prepare sua Sala", text: "Após a aprovação, organize seus conteúdos e referências." },
      { numeral: "IV", title: "Revisão editorial", text: "A Curadoria revisa os materiais e pode solicitar ajustes antes da publicação." },
      { numeral: "V", title: "Publique com acompanhamento", text: "A Sala vai ao Portal com a sua assinatura e o selo “Sala de Anfitrião”." },
    ],
    cta: candidatura,
  },
  politica: {
    label: "Critérios de participação",
    line1: "Apresentar,",
    line2: "não pregar.",
    text: "As mesmas regras valem para a Curadoria e para os Anfitriões. É isso que mantém o acervo comparável e confiável.",
    rules: [
      { title: "Respeito às tradições", text: "A Sala apresenta cada perspectiva em seu contexto, sem tratá-la como superior às outras." },
      { title: "Fontes e perspectivas identificadas", text: "Afirmações factuais trazem referências. Interpretações e relatos são atribuídos a seus autores, sem apresentar experiências pessoais como fatos universais." },
      { title: "Autoria reconhecida", text: "Conteúdos de Anfitrião mostram a assinatura e o selo “Sala de Anfitrião”. A revisão da Curadoria não muda a autoria." },
      { title: "Revisão antes de publicar", text: "A Curadoria revisa e pode solicitar ajustes antes da publicação." },
    ],
  },
  faq: {
    label: "Espaço para Anfitriões",
    title: "Perguntas de Anfitriões.",
    subtitle: "O que saber antes de apresentar a sua proposta.",
    items: [
      { question: "Como posso me tornar Anfitrião?", answer: "Apresente seu tema, sua abordagem e os materiais que deseja compartilhar. A Curadoria avalia a proposta e orienta os próximos passos para a criação da sua Sala." },
      { question: "A Curadoria muda o meu texto?", answer: "A Curadoria revisa e pode solicitar ajustes antes da publicação. A autoria continua sendo sua." },
      { question: "Preciso ser de uma tradição específica?", answer: "Não. Autores, pesquisadores, educadores, comunicadores e representantes de tradições podem apresentar propostas." },
      { question: "Como as minhas fontes aparecem?", answer: "Afirmações factuais trazem referências, e interpretações e relatos são atribuídos a seus autores." },
      { question: "Posso propor mais de uma Sala?", answer: "Converse com a Curadoria antes de apresentar uma nova proposta." },
    ],
    contactLabel: "Quer conversar antes?",
    contact: { label: `Escreva para ${EMAIL}`, href: `mailto:${EMAIL}` },
  },
  chamado: {
    label: site.anfitriao.label,
    line1: "A porta está aberta;",
    line2: "a sua Sala também pode estar.",
    text: "Apresente sua proposta à Curadoria. Ela avalia o tema e orienta os próximos passos.",
    cta: candidatura,
    support: `Sem aplicativo de e-mail? Escreva para ${EMAIL}`,
  },
  footer: site.footer,
};
