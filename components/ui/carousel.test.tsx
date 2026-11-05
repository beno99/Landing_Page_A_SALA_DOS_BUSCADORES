import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { AcervoArticle } from "@/content/types";
import { AcervoArticleCard } from "./AcervoCards";
import { Carousel } from "./Carousel";

const make = (n: number): AcervoArticle => ({
  title: `Artigo de teste ${n}`, summary: "Resumo", meta: "Artigo · 5 min", sala: "Sala", themes: ["Tema"],
  level: "Iniciante", author: "Autor", seal: "Editorial curado", href: `https://example.com/artigo-${n}`,
});

const Articles = ({ articles }: { articles: AcervoArticle[] }) => (
  <Carousel items={articles} getKey={(a) => a.href} label="Artigos do acervo" noun="artigo" render={(a) => <AcervoArticleCard article={a} />} />
);

describe("Carousel", () => {
  it("renders every article as a slide with working links", () => {
    render(<Articles articles={[make(1), make(2), make(3)]} />);
    expect(screen.getByRole("region", { name: "Artigos do acervo" })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Ler artigo: Artigo de teste 3" })).toHaveAttribute("href", "https://example.com/artigo-3");
  });

  it("moves with the arrows and the dots, disabling the arrows at the ends", async () => {
    const user = userEvent.setup();
    render(<Articles articles={[make(1), make(2), make(3)]} />);
    const prev = screen.getByRole("button", { name: "Artigo anterior" });
    const next = screen.getByRole("button", { name: "Próximo artigo" });
    expect(prev).toBeDisabled();
    expect(screen.getByRole("button", { name: "Ir para o artigo 1 de 3" })).toHaveAttribute("aria-current", "true");
    await user.click(next);
    expect(screen.getByRole("button", { name: "Ir para o artigo 2 de 3" })).toHaveAttribute("aria-current", "true");
    await user.click(screen.getByRole("button", { name: "Ir para o artigo 3 de 3" }));
    expect(next).toBeDisabled();
    expect(prev).toBeEnabled();
  });

  it("shows just the card, without controls, when there is a single article", () => {
    render(<Articles articles={[make(1)]} />);
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: "Próximo artigo" })).not.toBeInTheDocument();
  });
});
