export type Link = { label: string; href: string; external?: boolean };
export type HeroContent = { title: [string, string]; description: string; cta: Link };
/** A cover in the showcase. `external`: opens on YouTube in a new tab (otherwise the Portal, same tab). */
export type Sala = { id: string; name: string; image?: string; href: string; external?: boolean };
/** `blocks`: the showcase sequence by Sala id, one array per wave (1–2–3–2–1); the opening cover closes the cycle. */
export type SalasContent = { title: string; subtitle: string; salas: Sala[]; blocks: string[][] };
export type CuradoriaContent = {
  label: string; line1: string; line2: string; text: string;
  image: string; imageLabel: string; imageCaption: string;
  principles: { title: string; text: string }[];
};
/** `themes`: the pool of real themes; `show` of them are drawn once per visit, without repeats. */
export type PerguntasContent = { label: string; line1: string; line2: string; text: string; themes: string[]; show: number; themesLabel: string; cta: Link; image: string };
export type Step = { numeral: string; title: string; meta: string; href: string };
export type TrilhasContent = { label: string; line1: string; line2: string; note: string; steps: Step[] };
/** `kind` sets the cover's proportion: video 16:9, short 9:16, artigo 4:5. `focus` is the image's object-position. */
export type ArticleKind = "artigo" | "video" | "short";
export type ArticleItem = { id: string; kind: ArticleKind; source: string; title: string; meta: string; action: string; image: string; alt: string; focus?: string; href: string; external?: boolean };
export type ArtigosContent = {
  label: string; line1: string; line2: string; text: string; filtersLabel: string;
  filters: { id: ArticleKind | "all"; label: string }[];
  /** Group headings shown under "Todos", in this order. */
  groups: { id: ArticleKind; label: string }[];
  /** How many cards of each kind show before "Mostrar mais". */
  pageSize: Record<ArticleKind, number>;
  more: string;
  items: ArticleItem[]; cta: Link;
};
export type ReadingMode = "original" | "translation" | "side";
export type LeituraContent = {
  label: string; modesLabel: string; modes: { id: ReadingMode; label: string }[];
  quote: { original: string; translation: string; source: string; originalLabel: string; translationLabel: string };
  features: { title: string; text: string }[];
};
export type ConquistasContent = { label: string; line1: string; line2: string; gemsLabel: string; gems: { name: string; title: string; from: string; to: string }[]; text: string };
export type AnfitriaoContent = {
  label: string; line1: string; line2: string; text: string; steps: { title: string; text: string }[];
  primary: Link; secondary: Link; seal: string; caption: string;
  card: { image: string; count: string; title: string; description: string; level: string; updated: string; note: string };
};
export type ChamadoContent = { line1: string; line2: string; text: string; cta: Link };
export type EditorTool = "termo" | "obra" | "citar";
export type EditorContent = {
  label: string; line1: string; line2: string; text: string; srNote: string; toolbarLabel: string;
  tools: { id: EditorTool; title: string; text: string }[];
  status: { saving: string; saved: string; sent: string };
  draft: { eyebrow: string; title: string; work: string; term: string; source: string };
  send: { label: string; requirements: string[]; note: string; action: string; done: string };
};
export type FaqItem = { question: string; answer: string };
export type FaqContent = { label: string; line1: string; line2: string; invite: string; email: string; items: FaqItem[] };
export type FooterColumn = { title: string; links: Link[] };
export type FooterContent = { logoAlt: string; description: string; columns: FooterColumn[]; copyright: string; credit: string; backToTop: string };
export type NavContent = { links: Link[]; cta: Link; home?: string; labels: { menu: string; close: string; primary: string; logo: string } };
export type SiteContent = {
  meta: { title: string; description: string; ogImage: string };
  nav: NavContent; hero: HeroContent; salas: SalasContent; curadoria: CuradoriaContent;
  perguntas: PerguntasContent; trilhas: TrilhasContent; artigos: ArtigosContent;
  leitura: LeituraContent; conquistas: ConquistasContent; anfitriao: AnfitriaoContent;
  faq: FaqContent; chamado: ChamadoContent; footer: FooterContent;
};
export type AnfitrioesContent = {
  meta: { title: string; description: string };
  nav: NavContent; hero: HeroContent & { label: string; image: string; secondary: Link };
  porQue: { label: string; line1: string; line2: string; text: string; image: string; imageLabel: string; imageCaption: string; reasons: { title: string; text: string }[] };
  sala: {
    label: string; line1: string; line2: string; text: string; card: AnfitriaoContent["card"];
    profile: { avatar: string; label: string; name: string; note: string; seal: string };
    articles: { state: string; title: string; text: string }[];
    reach: { title: string; text: string }[];
  };
  editor: EditorContent;
  etapas: { label: string; line1: string; line2: string; text: string; listLabel: string; steps: { numeral: string; title: string; text: string }[]; cta: Link };
  politica: { label: string; line1: string; line2: string; text: string; rules: { title: string; text: string }[] };
  faq: FaqContent; chamado: ChamadoContent; footer: FooterContent;
};
