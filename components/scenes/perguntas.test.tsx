import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Perguntas } from "./Perguntas";

describe("Perguntas", () => {
  it("title, a drawn selection of distinct real themes, and CTA", () => {
    render(<Perguntas content={site.perguntas} />);
    expect(screen.getByRole("heading", { name: "Perguntas que atravessam tradições." })).toBeInTheDocument();
    const shown = [...screen.getByRole("list", { name: "Temas" }).querySelectorAll("li")].map((li) => li.textContent);
    expect(shown).toHaveLength(site.perguntas.show);
    expect(new Set(shown).size).toBe(shown.length);
    for (const t of shown) expect(site.perguntas.themes).toContain(t);
    expect(screen.getByRole("link", { name: site.perguntas.cta.label })).toBeInTheDocument();
  });
});
