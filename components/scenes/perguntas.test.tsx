import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { Perguntas } from "./Perguntas";

vi.mock("next/font/google", () => ({
  Cormorant_Garamond: () => ({ variable: "font-temas-title" }),
  Fraunces: () => ({ variable: "font-temas-accent" }),
  Inter: () => ({ className: "font-inter" }),
}));

describe("Perguntas", () => {
  it("renders the title, themes in editorial order, and comparison link", () => {
    render(<Perguntas content={site.perguntas} />);
    expect(screen.getByRole("heading", { name: "Perguntas que atravessam tradições." })).toBeInTheDocument();
    const shown = [...screen.getByRole("list", { name: "Temas" }).querySelectorAll("li")].map((li) => li.textContent);
    expect(shown).toHaveLength(site.perguntas.show);
    expect(shown).toEqual(site.perguntas.themes.slice(0, site.perguntas.show));
    expect(new Set(shown).size).toBe(shown.length);
    for (const t of shown) expect(site.perguntas.themes).toContain(t);
    expect(screen.getByRole("link", { name: site.perguntas.cta.label })).toHaveAttribute("href", site.perguntas.cta.href);
  });
});
