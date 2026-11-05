import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { site } from "@/content/site";
import userEvent from "@testing-library/user-event";
import { scrollToTop } from "@/lib/scrollToSceneProgress";
import { FooterCurtain } from "./FooterCurtain";

vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-footer-brand" }),
  Inter: () => ({ className: "font-inter" }),
}));
vi.mock("@/lib/scrollToSceneProgress", () => ({ scrollToTop: vi.fn() }));

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
    expect(screen.getByRole("link", { name: "YouTube" })).toHaveAttribute("href", "https://youtube.com/@asaladosbuscadores");
    expect(screen.getByRole("navigation", { name: site.footer.socialTitle }).querySelectorAll("svg")).toHaveLength(6);
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
    for (const h of hrefs.filter(Boolean)) expect(h).toMatch(/^(https:\/\/|mailto:|\/)/);
  });
  it("links every official profile in a new tab, plus the contact e-mail", () => {
    render(<FooterCurtain content={site.footer} />);
    const nav = screen.getByRole("navigation", { name: site.footer.socialTitle });
    for (const [name, href] of [
      ["YouTube", "https://youtube.com/@asaladosbuscadores"],
      ["Instagram", "https://www.instagram.com/asaladosbuscadores"],
      ["TikTok", "https://www.tiktok.com/@asaladosbuscadores"],
      ["Facebook", "https://www.facebook.com/share/1CGMMFLfbp/"],
      ["X", "https://x.com/saladobuscador"],
    ]) {
      const link = within(nav).getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
    }
    expect(within(nav).getByRole("link", { name: "E-mail de contato" })).toHaveAttribute("href", "mailto:contato@asaladosbuscadores.com.br");
  });

  it("keeps unconfirmed social accounts unlinked and returns to the top on activation", async () => {
    render(<FooterCurtain content={site.footer} />);
    for (const item of site.footer.social.filter(item => !item.href)) {
      expect(screen.queryByRole("link", { name: item.label })).toBeNull();
      expect(screen.getByRole("img", { name: `${item.label} — endereço a confirmar` })).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole("button", { name: /Voltar ao topo/ }));
    expect(scrollToTop).toHaveBeenCalledOnce();
  });

});
