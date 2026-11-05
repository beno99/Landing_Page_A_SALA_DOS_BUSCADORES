import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { anfitrioes } from "@/content/anfitrioes";
import { site } from "@/content/site";
import { Anfitriao } from "./Anfitriao";
import { Etapas, HeroAnfitrioes, Politica, PorQue, SuaSala } from "./AnfitrioesSections";
import { EditorDemo } from "./EditorDemo";

vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-anfitriao" }),
  Inter: () => ({ className: "font-inter" }),
}));
beforeEach(() => localStorage.clear());

describe("Página de anfitriões", () => {
  it("the hero is a plain first screen: title, both actions and no sky video", () => {
    const { container } = render(<HeroAnfitrioes content={anfitrioes.hero} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Seu conhecimento pode abrir novos caminhos de descoberta.");
    expect(screen.getByRole("link", { name: anfitrioes.hero.cta.label })).toHaveAttribute("href", anfitrioes.hero.cta.href);
    expect(screen.getByRole("link", { name: anfitrioes.hero.secondary.label })).toHaveAttribute("href", "#sala");
    expect(container.querySelector("video")).toBeNull();
  });

  it("each section keeps its title and items", () => {
    render(<PorQue content={anfitrioes.porQue} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Diferentes vozes, autoria reconhecida.");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(anfitrioes.porQue.reasons.length);
  });

  it("the demonstration Sala is labelled as such and links nowhere", () => {
    render(<SuaSala content={anfitrioes.sala} />);
    expect(screen.getByText(anfitrioes.sala.profile.name)).toBeInTheDocument();
    expect(screen.getByText(anfitrioes.sala.card.note)).toBeInTheDocument();
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("the public preview shows only published articles; drafts and reviews live in the separate private panel", () => {
    expect(anfitrioes.sala.publicArticles.length).toBeGreaterThan(0);
    const published = anfitrioes.sala.panel.items.filter((i) => i.state === "Publicado").map((i) => i.title);
    expect(anfitrioes.sala.publicArticles.map((a) => a.title)).toEqual(published);
    render(<SuaSala content={anfitrioes.sala} />);
    const publicBox = screen.getByRole("heading", { name: anfitrioes.sala.publicLabel }).parentElement!;
    expect(publicBox).not.toHaveTextContent("Em revisão");
    expect(publicBox).not.toHaveTextContent("Rascunho");
  });

  it("the example Sala about the Gospel of Thomas no longer talks about the Hymn of the Pearl", () => {
    const json = JSON.stringify(anfitrioes) + JSON.stringify(site.anfitriao);
    expect(json).not.toMatch(/Hino da Pérola|Atos de Tomé/);
    expect(json).not.toContain("Toda afirmação com fonte");
    expect(json).not.toMatch(/aprova ou reprova/);
    expect(json).not.toMatch(/salvo sozinho|citam a sua Sala|entra no Comparar/);
  });

  it("five steps, in order", () => {
    render(<Etapas content={anfitrioes.etapas} />);
    const list = screen.getByRole("list", { name: anfitrioes.etapas.listLabel });
    expect(list.querySelectorAll("li")).toHaveLength(5);
    expect(screen.getByRole("link", { name: anfitrioes.etapas.cta.label })).toHaveAttribute("href", anfitrioes.etapas.cta.href);
  });

  it("four editorial rules", () => {
    render(<Politica content={anfitrioes.politica} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
  });

  it("the page's anchors all exist on it", () => {
    const ids = ["por-que", "sala", "editor", "como-funciona", "politica", "faq"];
    for (const l of anfitrioes.nav.links) if (l.href.startsWith("#")) expect(ids).toContain(l.href.slice(1));
    expect(JSON.stringify(anfitrioes)).not.toContain('"href":"#"');
  });
});

describe("EditorDemo", () => {
  it("switches tools and simulates sending, without leaving the page", async () => {
    render(<EditorDemo content={anfitrioes.editor} />);
    await userEvent.click(screen.getByRole("button", { name: "Obra" }));
    expect(screen.getByRole("button", { name: "Obra" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: anfitrioes.editor.send.action }));
    expect(screen.getByRole("status")).toHaveTextContent(anfitrioes.editor.status.sent);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});

describe("Seção de anfitriões da página principal", () => {
  it("presents the invitation, three steps and the real Corpus Hermeticum room", () => {
    render(<Anfitriao content={site.anfitriao} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Seu conhecimento pode abrir novos caminhos de descoberta.");
    for (const step of site.anfitriao.steps) expect(screen.getByRole("heading", { level: 3, name: step.title })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Corpus Hermeticum" })).toBeInTheDocument();
    expect(screen.getByText("Sala da curadoria")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Entrar na Sala" })).toHaveAttribute("href", "https://asaladosbuscadores.com.br/salas/corpus-hermeticum");
    expect(screen.getByRole("link", { name: site.anfitriao.primary.label })).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });

  it("saves the room locally, restores it on remount and removes it", async () => {
    const user = userEvent.setup();
    const view = render(<Anfitriao content={site.anfitriao} />);
    await user.click(screen.getByRole("button", { name: /Salvar Corpus Hermeticum/ }));
    expect(screen.getByRole("status")).toHaveTextContent("Corpus Hermeticum salva neste navegador.");
    view.unmount();
    render(<Anfitriao content={site.anfitriao} />);
    expect(screen.getByRole("button", { name: /Remover Corpus Hermeticum/ })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: /Remover Corpus Hermeticum/ }));
    expect(screen.getByRole("button", { name: /Salvar Corpus Hermeticum/ })).toHaveAttribute("aria-pressed", "false");
  });

  it("reports storage errors without claiming the room was saved", async () => {
    render(<Anfitriao content={site.anfitriao} />);
    const storage = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Unavailable"); });
    try {
      await userEvent.click(screen.getByRole("button", { name: /Salvar Corpus Hermeticum/ }));
      expect(screen.getByRole("status")).toHaveTextContent("Não foi possível salvar");
      expect(screen.getByRole("button", { name: /Salvar Corpus Hermeticum/ })).toHaveAttribute("aria-pressed", "false");
    } finally { storage.mockRestore(); }
  });
});
