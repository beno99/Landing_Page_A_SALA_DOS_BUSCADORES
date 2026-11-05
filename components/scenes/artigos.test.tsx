import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { Artigos } from "./Artigos";

vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-acervo-title" }),
  Source_Serif_4: () => ({ variable: "font-acervo-summary" }),
  Inter: () => ({ className: "font-inter" }),
}));

beforeEach(() => localStorage.clear());

describe("Artigos e vídeos", () => {
  it("starts with the three rooms and their actual destinations", () => {
    render(<Artigos content={site.artigos} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Artigos e vídeos para ampliar sua busca.");
    for (const [name, slug] of [
      ["Comece por aqui", "comece-por-aqui"],
      ["Biblioteca de Nag Hammadi", "biblioteca-de-nag-hammadi"],
      ["Fé e Poder", "fe-e-poder"],
    ]) {
      const card = screen.getByRole("heading", { name }).closest("article")!;
      expect(within(card).getByRole("link", { name: /Entrar na Sala/ }))
        .toHaveAttribute("href", "https://asaladosbuscadores.com.br/salas/" + slug);
    }
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("switches between the three Figma states, including keyboard activation", async () => {
    const user = userEvent.setup();
    render(<Artigos content={site.artigos} />);
    await user.click(screen.getByRole("button", { name: "Artigos" }));
    expect(screen.getByRole("button", { name: "Artigos" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: /Ler artigo: Ajustador do Pensamento/ }))
      .toHaveAttribute("href", "https://asaladosbuscadores.com.br/salas/o-livro-de-urantia/ajustador-do-pensamento-e-discernimento-em-urantia");
    expect(screen.queryByRole("heading", { name: "Comece por aqui" })).not.toBeInTheDocument();
    screen.getByRole("button", { name: "Vídeos" }).focus();
    await user.keyboard("{Enter}");
    const watch = screen.getAllByRole("link", { name: "Assistir no YouTube" });
    expect(watch.map((a) => a.getAttribute("href"))).toEqual(site.artigos.videos.map((v) => v.href));
    expect(screen.getByRole("region", { name: "Vídeos do canal" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Ler artigo:/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Todos" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
  });

  it("saves locally, survives remounting and filters, and can be unsaved", async () => {
    const user = userEvent.setup();
    const view = render(<Artigos content={site.artigos} />);
    await user.click(screen.getByRole("button", { name: /Salvar.*Comece por aqui/ }));
    expect(screen.getByRole("status")).toHaveTextContent("salva neste navegador");
    view.unmount();
    render(<Artigos content={site.artigos} />);
    expect(screen.getByRole("button", { name: /Remover.*Comece por aqui/ })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "Artigos" }));
    await user.click(screen.getByRole("button", { name: "Todos" }));
    await user.click(screen.getByRole("button", { name: /Remover.*Comece por aqui/ }));
    expect(screen.getByRole("button", { name: /Salvar.*Comece por aqui/ })).toHaveAttribute("aria-pressed", "false");
  });

  it("does not claim a save succeeded when browser storage is unavailable", async () => {
    const user = userEvent.setup();
    render(<Artigos content={site.artigos} />);
    const storage = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage unavailable"); });
    try {
      await user.click(screen.getByRole("button", { name: /Salvar.*Comece por aqui/ }));
      expect(screen.getByRole("status")).toHaveTextContent("Não foi possível salvar");
      expect(screen.getByRole("button", { name: /Salvar.*Comece por aqui/ })).toHaveAttribute("aria-pressed", "false");
    } finally {
      storage.mockRestore();
    }
  });
});
