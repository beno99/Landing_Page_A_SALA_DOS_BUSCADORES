import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { anfitrioes } from "@/content/anfitrioes";
import { Chamado } from "./Chamado";

describe("Chamado", () => {
  it("host closing call keeps its title, text, application CTA and support line", () => {
    render(<Chamado content={anfitrioes.chamado} />);
    expect(document.getElementById("chamado")).toHaveAttribute("aria-labelledby", "chamado-title");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(`${anfitrioes.chamado.line1} ${anfitrioes.chamado.line2}`);
    expect(screen.getByText(anfitrioes.chamado.text)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: anfitrioes.chamado.cta.label })).toHaveAttribute("href", anfitrioes.chamado.cta.href);
    expect(screen.getByText(anfitrioes.chamado.support!)).toBeInTheDocument();
  });
});
