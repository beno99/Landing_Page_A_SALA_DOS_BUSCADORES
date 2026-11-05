import { describe, expect, it } from "vitest";
import { site } from "./site";

const SECTION_IDS = ["inicio", "salas", "curadoria", "perguntas", "trilhas", "artigos", "jornada", "anfitriao", "faq"];

describe("site content", () => {
  it("has the quantities the scenes expect", () => {
    expect(site.salas.salas).toHaveLength(8);
    // L01: blocks of 1–2–3–2–1, eight distinct covers and nine appearances, the opening one closing the cycle.
    const { blocks, salas } = site.salas;
    expect(blocks.map((b) => b.length)).toEqual([1, 2, 3, 2, 1]);
    expect(blocks.flat()).toHaveLength(9);
    expect(new Set(blocks.flat())).toEqual(new Set(salas.map((s) => s.id)));
    expect(blocks[4]).toEqual(blocks[0]);
    expect(site.curadoria.principles).toHaveLength(3);
    expect(site.perguntas.themes).toHaveLength(10);
    expect(new Set(site.perguntas.themes).size).toBe(site.perguntas.themes.length);
    expect(site.perguntas.show).toBeLessThanOrEqual(site.perguntas.themes.length);
    expect(site.trilhas.steps).toHaveLength(4);
    expect(site.faq.items).toHaveLength(6);
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
  });

  it("no placeholder links are left", () => {
    const hrefs = JSON.stringify(site).match(/"href":"[^"]*"/g) ?? [];
    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs).not.toContain('"href":"#"');
  });

  it("acervo has unique rooms and the three designed filter states", () => {
    const { salas, filters, articles, videos } = site.artigos;
    expect(new Set(salas.map((s) => s.id)).size).toBe(salas.length);
    expect(filters.map((f) => f.label)).toEqual(["Todos", "Artigos", "Vídeos"]);
    expect(articles.length).toBeGreaterThan(0);
    expect(new Set(articles.map((a) => a.href)).size).toBe(articles.length);
    for (const a of articles) expect(a.href).toMatch(/^https:\/\/asaladosbuscadores.com.br\/salas\//);
    expect(videos.length).toBe(3);
    for (const v of videos) expect(v.href).toMatch(/^https:\/\/www.youtube.com\/watch\?v=/);
    expect(JSON.stringify(site)).not.toContain("Verbete");
  });

  it("every main CTA goes to the Portal home", () => {
    expect(site.nav.cta).toEqual({ label: "Entrar no Portal", href: "https://sala-dos-buscadores.vercel.app" });
    expect(site.hero.cta).toEqual(site.nav.cta);
  });
});
