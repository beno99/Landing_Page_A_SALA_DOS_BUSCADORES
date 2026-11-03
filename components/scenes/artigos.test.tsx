import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { Artigos } from "./Artigos";

const { items, pageSize } = site.artigos;
const cards = () => document.querySelectorAll("#artigos article");
const ofKind = (k: string) => items.filter((i) => i.kind === k);
const firstPage = (k: "artigo" | "video" | "short") => Math.min(ofKind(k).length, pageSize[k]);

describe("Artigos", () => {
  it("title, and every visible card links straight to its destination", () => {
    render(<Artigos content={site.artigos} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Artigos e vídeos para ampliar sua busca.");
    const visible = (["video", "short", "artigo"] as const).flatMap((k) => ofKind(k).slice(0, pageSize[k]));
    for (const item of visible) {
      expect(screen.getByRole("link", { name: `${item.action}: ${item.title}` })).toHaveAttribute("href", item.href);
    }
    expect(cards()).toHaveLength(visible.length);
  });

  it("each filter shows only its format, and Todos brings the groups back", async () => {
    render(<Artigos content={site.artigos} />);
    await userEvent.click(screen.getByRole("button", { name: "Vídeos" }));
    expect(screen.getByRole("button", { name: "Vídeos" })).toHaveAttribute("aria-pressed", "true");
    expect(cards()).toHaveLength(firstPage("video"));
    await userEvent.click(screen.getByRole("button", { name: "Shorts" }));
    expect(cards()).toHaveLength(firstPage("short"));
    await userEvent.click(screen.getByRole("button", { name: "Artigos" }));
    expect(cards()).toHaveLength(firstPage("artigo"));
    await userEvent.click(screen.getByRole("button", { name: "Todos" }));
    expect(cards()).toHaveLength(firstPage("video") + firstPage("short") + firstPage("artigo"));
  });

  it("'Mostrar mais' loads the rest of a format progressively, then disappears", async () => {
    render(<Artigos content={site.artigos} />);
    await userEvent.click(screen.getByRole("button", { name: "Shorts" }));
    const total = ofKind("short").length;
    expect(total).toBeGreaterThan(pageSize.short);
    while (screen.queryByRole("button", { name: /Mostrar mais/ })) {
      await userEvent.click(screen.getByRole("button", { name: /Mostrar mais/ }));
    }
    expect(cards()).toHaveLength(total);
  });

  it("each format keeps its cover proportion", () => {
    render(<Artigos content={site.artigos} />);
    const coverOf = (title: string) => screen.getByRole("heading", { name: title }).closest("article")!.firstElementChild!;
    expect(coverOf(ofKind("video")[0].title)).toHaveClass("aspect-video");
    expect(coverOf(ofKind("short")[0].title)).toHaveClass("aspect-[9/16]");
    expect(coverOf(ofKind("artigo")[0].title)).toHaveClass("aspect-[4/5]");
  });

  it("videos and Shorts open on YouTube, in a new tab", () => {
    for (const item of items.filter((i) => i.kind !== "artigo")) {
      expect(item.href).toMatch(/^https:\/\/www\.youtube\.com\/(watch\?v=|shorts\/)/);
      expect(item.external).toBe(true);
    }
  });
});
