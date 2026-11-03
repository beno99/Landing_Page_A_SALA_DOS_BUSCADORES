import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { HeroDoor } from "./HeroDoor";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("lists the anchors, the official mark and the Portal CTA", () => {
    render(<Nav nav={site.nav} />);
    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Entrar no Portal" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Jornada" })[0]).toHaveAttribute("href", "#jornada");
    expect(site.nav.links.map((l) => l.label)).toEqual(["Início", "Conteúdos", "A proposta", "Temas", "Jornada", "Anfitriões"]);
    expect(screen.getByRole("link", { name: site.nav.labels.logo }).querySelector("img")).toHaveAttribute("src", expect.stringContaining("marca.webp"));
  });

  it("closes the mobile menu after choosing a destination", async () => {
    render(<Nav nav={site.nav} />);
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    const menu = document.getElementById("menu-mobile")!;
    await userEvent.click(menu.querySelector('a[href="#curadoria"]')!);
    expect(document.getElementById("menu-mobile")).not.toBeInTheDocument();
  });

  it("opens the mobile menu", async () => {
    render(<Nav nav={site.nav} />);
    const btn = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("menu-mobile")).toBeInTheDocument();
  });

  it("closes the mobile menu on Escape and returns focus to the button", async () => {
    render(<Nav nav={site.nav} />);
    const btn = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(btn);
    await userEvent.keyboard("{Escape}");
    expect(document.getElementById("menu-mobile")).not.toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveFocus();
  });
});

describe("HeroDoor", () => {
  it("has the page's only h1 and the arch layer (the sky is the shared backdrop)", () => {
    render(<HeroDoor content={site.hero} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A porta está aberta para a sua busca.");
    expect(document.getElementById("inicio")).toHaveAttribute("aria-labelledby", "hero-title");
    expect(screen.getByTestId("hero-arch").querySelector("img")).toHaveAttribute("src", "/images/hero/arch.webp");
  });

  it("the CTA stays in the tab order while visible", () => {
    render(<HeroDoor content={site.hero} />);
    const cta = screen.getByRole("link", { name: site.hero.cta.label });
    expect(cta.closest("[inert]")).toBeNull();
  });
});
