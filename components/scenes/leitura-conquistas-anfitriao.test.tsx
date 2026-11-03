import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { Leitura } from "./Leitura";
import { Jornada } from "./Jornada";
import { Anfitriao } from "./Anfitriao";

describe("Leitura", () => {
  const [hermetica, tome] = site.leitura.passages;

  it("has at least five passages, each with work/section, Sala and glossary of its own", () => {
    const { passages } = site.leitura;
    expect(passages.length).toBeGreaterThanOrEqual(5);
    expect(new Set(passages.map((p) => p.glossary.term)).size).toBe(passages.length);
    for (const p of passages) {
      expect(p.source.length).toBeGreaterThan(0);
      expect(p.salaHref).toMatch(/\/salas\//);
      if (p.original) expect(p.originalLang).toBeTruthy();
    }
  });

  it("starts on the translation; the switch changes the view but keeps the same passage", async () => {
    // The visit's draw picks the first passage; it then stays the same for the whole visit.
    const random = vi.spyOn(Math, "random").mockReturnValue(0);
    render(<Leitura content={site.leitura} />);
    random.mockRestore();
    expect(screen.getByRole("button", { name: "Tradução" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(`“${hermetica.translation}”`)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Original" }));
    expect(screen.getByText(hermetica.original!)).toHaveAttribute("lang", "grc");
    expect(screen.queryByText(`“${hermetica.translation}”`)).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "Lado a lado" }));
    expect(screen.getByText(hermetica.original!)).toBeInTheDocument();
    expect(screen.getByText(hermetica.translation)).toBeInTheDocument();
    expect(screen.getByText(hermetica.glossary.term)).toBeInTheDocument();
  });

  it("a passage without a verified original never offers Original (Tomé: intermediate translation)", () => {
    expect(tome.original).toBeUndefined();
    const onlyTome = { ...site.leitura, passages: [tome] };
    render(<Leitura content={onlyTome} />);
    expect(screen.getByRole("button", { name: "Original" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Lado a lado" })).toBeDisabled();
    expect(screen.getByText(site.leitura.unavailable)).toBeInTheDocument();
    expect(screen.getByText(tome.translationLabel)).toBeInTheDocument();
    expect(screen.getByText(tome.glossary.term)).toBeInTheDocument();
  });
});

describe("Jornada", () => {
  it("three levels, the eight gems with names and titles, the four titles and a CTA to the Portal", () => {
    render(<Jornada content={site.jornada} />);
    expect(document.getElementById("jornada")).toHaveAttribute("aria-labelledby", "jornada-title");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Jornada do Buscador");
    for (const l of site.jornada.levels) expect(screen.getByRole("heading", { level: 3, name: l.title })).toBeInTheDocument();
    expect(site.jornada.gems.map((g) => g.name)).toEqual(["Citrino", "Esmeralda", "Cristal de Rocha", "Safira", "Turmalina", "Opala", "Ametista", "Rubi"]);
    for (const g of site.jornada.gems) {
      expect(screen.getByText(g.name)).toBeInTheDocument();
      expect(screen.getByText(g.title)).toBeInTheDocument();
    }
    expect(screen.getByRole("list", { name: site.jornada.titlesTitle })).toHaveTextContent("Explorador→Investigador→Articulador→Aprofundador");
    expect(screen.getByRole("link", { name: site.jornada.cta.label })).toHaveAttribute("href", site.jornada.cta.href);
  });
});

describe("Anfitriao", () => {
  it("has the candidacy action, and the example card never links to a Sala", () => {
    render(<Anfitriao content={site.anfitriao} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Abra a sua Sala.");
    expect(screen.getByRole("link", { name: site.anfitriao.primary.label })).toHaveAttribute("href", site.anfitriao.primary.href);
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText(site.anfitriao.card.note)).toBeInTheDocument();
  });
});
