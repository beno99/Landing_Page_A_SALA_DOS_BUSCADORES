import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { FooterCurtain } from "./FooterCurtain";

describe("Footer", () => {
  it("mark, phrase, Explore / Participe / Transparência, social, contact, year and back to top", () => {
    render(<FooterCurtain content={site.footer} />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector('img[src*="marca.webp"]')).not.toBeNull();
    expect(footer).toHaveTextContent(site.footer.description);
    expect(footer).toHaveTextContent(site.footer.motto);
    expect(site.footer.columns.map((c) => c.title)).toEqual(["Explore", "Participe", "Transparência"]);
    for (const col of site.footer.columns) {
      const nav = screen.getByRole("navigation", { name: col.title });
      for (const link of col.links) expect(nav).toHaveTextContent(link.label);
    }
    expect(screen.getByRole("navigation", { name: site.footer.socialTitle })).toHaveTextContent("YouTube");
    expect(screen.getByRole("link", { name: site.footer.contact.label })).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} ${site.footer.copyright}`);
    expect(screen.getByRole("button", { name: /Voltar ao topo/ })).toBeInTheDocument();
  });

  it("is never inert or fixed: every link stays reachable by keyboard", () => {
    const { container } = render(<FooterCurtain content={site.footer} />);
    expect(container.querySelector("[inert]")).toBeNull();
    expect(container.querySelector(".fixed")).toBeNull();
  });

  it("no placeholder or fictitious links", () => {
    const hrefs = [...site.footer.columns.flatMap((c) => c.links), ...site.footer.social, site.footer.contact].map((l) => l.href);
    for (const h of hrefs) expect(h).toMatch(/^(https:\/\/|mailto:|\/)/);
  });
});
