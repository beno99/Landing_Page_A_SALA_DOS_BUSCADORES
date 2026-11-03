import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Chamado } from "./Chamado";

describe("Chamado", () => {
  it("closing call: two-line title, text, the Portal CTA, its support line and the brand card", () => {
    render(<Chamado content={site.chamado} />);
    expect(document.getElementById("chamado")).toHaveAttribute("aria-labelledby", "chamado-title");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Uma pergunta pode abrir novos caminhos.");
    expect(screen.getByText(site.chamado.text)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Entrar no Portal" })).toHaveAttribute("href", site.chamado.cta.href);
    expect(screen.getByText(site.chamado.support!)).toBeInTheDocument();
    expect(screen.getByText(site.chamado.brand!.tagline)).toBeInTheDocument();
  });
});
