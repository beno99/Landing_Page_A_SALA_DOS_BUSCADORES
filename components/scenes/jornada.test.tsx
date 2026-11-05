import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import { Jornada } from "./Jornada";

vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-jornada" }),
  Inter: () => ({ className: "font-inter" }),
}));

describe("Jornada", () => {
  it("presents three journey features and five example gems with their achievement requirements", () => {
    render(<Jornada content={site.jornada} />);
    expect(document.getElementById("jornada")).toHaveAttribute("aria-labelledby", "jornada-title");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Jornada do Buscador");
    for (const l of site.jornada.levels) expect(screen.getByRole("heading", { level: 3, name: l.title })).toBeInTheDocument();
    expect(site.jornada.gems.map((g) => g.name)).toEqual(["Fluorita", "Esmeralda", "Quartzo Rosa", "Pedra da Lua", "Espinélio"]);
    for (const g of site.jornada.gems) {
      expect(screen.getByText(g.name)).toBeInTheDocument();
      expect(screen.getByText(g.title)).toBeInTheDocument();
      expect(screen.getByText(g.text)).toBeInTheDocument();
    }
    expect(screen.getByRole("list", { name: "Exemplos de Gemas de Conhecimento" })).toBeInTheDocument();
    expect(screen.getAllByText("Conquistada")).toHaveLength(5);
  });
});
