import { describe, expect, it } from "vitest";
import { site } from "./site";

const SECTION_IDS = ["inicio", "salas", "curadoria", "perguntas", "trilhas", "artigos", "leitura", "jornada", "anfitriao", "faq", "chamado"];

describe("site content", () => {
  it("has the quantities the scenes expect", () => {
    expect(site.salas.salas).toHaveLength(4);
    expect(site.curadoria.principles).toHaveLength(3);
    expect(site.perguntas.themes).toHaveLength(10);
    expect(new Set(site.perguntas.themes).size).toBe(site.perguntas.themes.length);
    expect(site.perguntas.show).toBeLessThanOrEqual(site.perguntas.themes.length);
    expect(site.trilhas.steps).toHaveLength(4);
    expect(site.faq.items).toHaveLength(5);
  });

  it("contains no leftover template text", () => {
    const json = JSON.stringify(site);
    for (const bad of ["NFT", "Italian", "Forwwward", "Heading 3", "Link →", "Lorem"]) {
      expect(json).not.toContain(bad);
    }
  });

  it("menu anchors point to existing scenes", () => {
    for (const link of site.nav.links) {
      expect(SECTION_IDS).toContain(link.href.replace("#", ""));
    }
  });

  it("menu follows the page order", () => {
    const order = site.nav.links.map((l) => SECTION_IDS.indexOf(l.href.replace("#", "")));
    expect(order).toEqual([...order].sort((a, b) => a - b));
    const footerMenu = site.footer.columns.find((c) => c.title === "Menu")!.links.map((l) => l.href);
    expect(footerMenu).toEqual(site.nav.links.map((l) => l.href).filter((h) => footerMenu.includes(h)));
  });

  it("no placeholder links are left", () => {
    const hrefs = JSON.stringify(site).match(/"href":"[^"]*"/g) ?? [];
    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs).not.toContain('"href":"#"');
  });

  it("articles and videos: distinct ids and titles, every format present, no Verbetes", () => {
    const { items, filters } = site.artigos;
    expect(new Set(items.map((a) => a.id)).size).toBe(items.length);
    expect(new Set(items.map((a) => a.title)).size).toBe(items.length);
    expect(filters.map((f) => f.label)).toEqual(["Todos", "Artigos", "Vídeos", "Shorts"]);
    for (const kind of ["artigo", "video", "short"] as const) expect(items.some((i) => i.kind === kind)).toBe(true);
    expect(JSON.stringify(site)).not.toContain("Verbete");
  });

  it("every main CTA goes to the Portal home", () => {
    expect(site.nav.cta).toEqual({ label: "Entrar no Portal", href: "https://sala-dos-buscadores.vercel.app" });
    expect(site.hero.cta).toEqual(site.nav.cta);
  });
});
