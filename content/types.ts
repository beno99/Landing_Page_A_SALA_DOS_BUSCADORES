export type Link = { label: string; href: string; external?: boolean };
export type HeroContent = { title: [string, string]; description: string; cta: Link };
/** A cover in the showcase. `external`: opens on YouTube in a new tab (otherwise the Portal, same tab). */
export type Sala = { id: string; name: string; image?: string; href: string; external?: boolean };
/** `blocks`: the showcase sequence by Sala id, one array per wave (1–2–3–2), without repeated covers. */
export type SalasContent = { title: string; subtitle: string; salas: Sala[]; blocks: string[][] };
export type CuradoriaContent = {
  label: string; line1: string; line2: string; text: string;
  principles: { title: string; text: string; image: string; mobileImage: string }[];
};
/** `themes`: the pool of real themes; `show` of them are drawn once per visit, without repeats. */
export type PerguntasContent = { label: string; line1: string; line2: string; text: string; themes: string[]; show: number; themesLabel: string; cta: Link; image: string };
export type Step = { numeral: string; title: string; meta: string; href: string; image: string };
export type TrilhasContent = { label: string; line1: string; line2: string; note: string; steps: Step[] };
export type AcervoFilter = "all" | "artigo" | "video";
export type AcervoSala = {
  id: string; title: string; description: string; image: string; count: number;
  level: string; updated: string; updatedLabel: string; href: string;
};
export type AcervoArticle = {
  title: string; summary: string; meta: string; sala: string; themes: string[];
  level: string; author: string; seal: string; href: string;
};
export type AcervoVideo = {
  title: string; image: string; source: string;
  /** Optional: the YouTube feed has no theme, and only the Data API returns the duration. */
  theme?: string; duration?: string;
  seal: string; meta: string; href: string;
};
export type ArtigosContent = {
  label: string; line1: string; line2: string; text: string; filtersLabel: string;
  filters: { id: AcervoFilter; label: string }[];
  backgroundImage: string; salas: AcervoSala[];
  /** Articles shown in the "Artigos" carousel (fixed list for now: the Portal requires login). */
  articles: AcervoArticle[];
  /** Fallback for the "Vídeos" carousel; the page replaces it with the channel's latest videos (lib/youtube.ts). */
  videos: AcervoVideo[]; cta: Link;
};
export type Gem = { number: string; name: string; title: string; text: string; image: string; glow: string };
export type JornadaContent = {
  label: string; line1: string; line2: string; text: string;
  levels: { title: string; text: string; icon: string }[];
  gemsTitle: string; gemStatus: string; gems: Gem[];
};
/** A demonstration card of a host's Sala. It is never a link: no such Sala is published. */
export type HostExample = { image: string; theme: string; title: string; description: string; author: string; authorNote: string };
export type AnfitriaoContent = {
  label: string; line1: string; line2: string; text: string;
  backgroundImage: string; featuredSala: AcervoSala & { seal: string };
  steps: { title: string; text: string; icon: string }[];
  examplesTitle: string; examplesText: string; seal: string; examples: HostExample[]; exampleNote: string;
  primary: Link; secondary: Link;
  /** Plain-text fallback for people without an e-mail app configured. */
  contact: { label: string; email: string };
  /** Kept for the /anfitrioes demonstration of a host's Sala. */
  card: { image: string; count: string; title: string; description: string; level: string; updated: string; note: string };
};
/** `brand`: the side card with the mark; `support`: the short reassurance line under the CTA. */
export type ChamadoContent = { label?: string; line1: string; line2: string; text: string; cta: Link; support?: string; brand?: { name: string; tagline: string } };
export type EditorTool = "termo" | "obra" | "citar";
export type EditorContent = {
  label: string; line1: string; line2: string; text: string; srNote: string; toolbarLabel: string;
  tools: { id: EditorTool; title: string; text: string }[];
  status: { saving: string; saved: string; sent: string };
  /** The draft sentence: `before` + work + `middle` + term + `after`, then the citation and `note`. */
  draft: { eyebrow: string; title: string; before: string; work: string; middle: string; term: string; after: string; note: string; source: string };
  send: { label: string; requirements: string[]; note: string; action: string; done: string };
};
export type FaqItem = { question: string; answer: string };
export type FaqContent = { label: string; title: string; subtitle: string; items: FaqItem[]; contactLabel: string; contact: Link };
export type FooterColumn = { title: string; links: Link[] };
export type FooterSocial = { label: string; icon: "youtube" | "instagram" | "tiktok" | "facebook" | "x" | "email"; href?: string; external?: boolean };
export type FooterContent = {
  name: string; description: string; motto: string; columns: FooterColumn[];
  socialTitle: string; social: FooterSocial[]; contact: Link;
  /** "©" + the current year is added in the component. */
  copyright: string; backToTop: string;
};
export type NavContent = { links: Link[]; cta: Link; home?: string; labels: { menu: string; close: string; primary: string; logo: string } };
export type SiteContent = {
  meta: { title: string; description: string; ogImage: string };
  nav: NavContent; hero: HeroContent; salas: SalasContent; curadoria: CuradoriaContent;
  perguntas: PerguntasContent; trilhas: TrilhasContent; artigos: ArtigosContent;
  jornada: JornadaContent; anfitriao: AnfitriaoContent;
  faq: FaqContent; footer: FooterContent;
};
export type AnfitrioesContent = {
  meta: { title: string; description: string };
  nav: NavContent; hero: HeroContent & { label: string; image: string; secondary: Link };
  porQue: { label: string; line1: string; line2: string; text: string; image: string; imageLabel: string; imageCaption: string; reasons: { title: string; text: string }[] };
  sala: {
    label: string; line1: string; line2: string; text: string; card: AnfitriaoContent["card"];
    profile: { avatar: string; label: string; name: string; note: string; seal: string };
    /** What a reader sees on the public page: published articles only. */
    publicLabel: string; publicArticles: { title: string; text: string }[];
    /** A separate example of the host's private panel, where drafts and reviews live. */
    panel: { label: string; note: string; items: { state: string; title: string }[] };
  };
  editor: EditorContent;
  etapas: { label: string; line1: string; line2: string; text: string; listLabel: string; steps: { numeral: string; title: string; text: string }[]; cta: Link };
  politica: { label: string; line1: string; line2: string; text: string; rules: { title: string; text: string }[] };
  faq: FaqContent; chamado: ChamadoContent; footer: FooterContent;
};
