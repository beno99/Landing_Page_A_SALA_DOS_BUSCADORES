import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { motionValue } from "motion/react";
import { site } from "@/content/site";
import { setMatchMedia } from "@/vitest.setup";
import { readingImageOffset, ReadingImage } from "@/components/ui/ReadingImage";
import { STEP_RISE, Trilhas } from "./Trilhas";

afterEach(() => { setMatchMedia(() => false); vi.restoreAllMocks(); });

describe("Trilhas", () => {
  it("keeps the exact copy and one link per card, with the decorative plate below its text", () => {
    const { container } = render(<Trilhas content={site.trilhas} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Leituras para começar sua jornada.");
    expect(screen.getByText("Leituras selecionadas")).toBeInTheDocument();
    expect(screen.getByText(site.trilhas.note)).toBeInTheDocument();
    for (const step of site.trilhas.steps) {
      // CSS displays only one of the desktop/mobile lists in a browser.
      const links = screen.getAllByRole("link", { name: `${step.title} ${step.meta} Começar a leitura ↗` });
      expect(links).toHaveLength(2);
      for (const link of links) {
        expect(link).toHaveAttribute("href", step.href);
        expect(link.querySelectorAll("a,button")).toHaveLength(0);
        const image = link.querySelector("img")!;
        expect(image).toHaveAttribute("alt", "");
        expect(image).toHaveAttribute("loading", "lazy");
        expect(image).toHaveAttribute("decoding", "async");
        expect(decodeURIComponent(image.getAttribute("src")!)).toContain(step.image);
        expect(link.lastElementChild?.tagName).toBe("FIGURE");
      }
    }
    expect(container.querySelectorAll("[data-reading-plate]")).toHaveLength(8);
  });

  it("keyboard focus reveals rising desktop cards; the mobile list uses native focus scrolling", () => {
    render(<Trilhas content={site.trilhas} />);
    const [column, listItem] = screen.getAllByRole("link", { name: new RegExp(site.trilhas.steps[1].title) });
    expect(column.closest("[data-focus-progress]")).toHaveAttribute("data-focus-progress", String(STEP_RISE[1][1]));
    expect(listItem.closest("[data-focus-progress]")).toBeNull();
    expect(document.getElementById("trilhas")).not.toHaveAttribute("data-reveal-progress");
  });

  it("the columns still rise sequentially and finish within the scene", () => {
    STEP_RISE.forEach(([start, end], i) => {
      expect(end).toBeGreaterThan(start);
      if (i) expect(start).toBeGreaterThan(STEP_RISE[i - 1][0]);
    });
    expect(STEP_RISE.at(-1)![1]).toBeLessThanOrEqual(1);
  });

  it("preloads all four responsive sources only when the scene approaches the viewport", () => {
    const callbacks: IntersectionObserverCallback[] = [];
    const original = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) { callbacks.push(callback); }
      observe() {} disconnect() {} unobserve() {}
    } as unknown as typeof IntersectionObserver;
    try {
      render(<Trilhas content={site.trilhas} />);
      const preloads = () => Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]')).filter(el => el.getAttribute("imagesrcset")?.includes("leituras"));
      expect(preloads()).toHaveLength(0);
      act(() => callbacks.forEach(callback => callback([{ isIntersecting: true }] as IntersectionObserverEntry[], { disconnect() {} } as IntersectionObserver)));
      expect(preloads()).toHaveLength(4);
    } finally {
      globalThis.IntersectionObserver = original;
      document.head.querySelectorAll('link[rel="preload"][as="image"]').forEach(el => el.remove());
    }
  });
});

describe("Reading image movement", () => {
  it("traverses only the spare image height, clamps beyond its window, and centers with reduced motion", () => {
    expect(readingImageOffset(0, 0.2, 0.8, 180, false)).toBe(-10);
    expect(readingImageOffset(0.5, 0.2, 0.8, 180, false)).toBeCloseTo(-90);
    expect(readingImageOffset(1, 0.2, 0.8, 180, false)).toBe(-170);
    for (const p of [0, 0.5, 1]) expect(readingImageOffset(p, 0.2, 0.8, 180, true)).toBe(-90);
    expect(readingImageOffset(1, 0, 1, 8, false)).toBe(-4);
  });

  it("responds to scene progress without any window scroll", async () => {
    setMatchMedia(query => query.includes("min-width: 1024px"));
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function (this: HTMLElement) {
      return this.hasAttribute("data-reading-parallax") ? 500 : 300;
    });
    const progress = motionValue(0);
    const { container } = render(<section><ReadingImage src={site.trilhas.steps[0].image} progress={progress} window={[0.2, 0.8]} reduced={false} /></section>);
    const layer = container.querySelector<HTMLElement>("[data-reading-parallax]")!;
    await waitFor(() => expect(layer.style.transform).toContain("-10px"));
    act(() => progress.set(1));
    await waitFor(() => expect(layer.style.transform).toContain("-190px"));
  });

  it("centers and freezes the image when reduced motion is enabled at runtime", async () => {
    setMatchMedia(query => query.includes("min-width: 1024px"));
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(function (this: HTMLElement) {
      return this.hasAttribute("data-reading-parallax") ? 500 : 300;
    });
    const progress = motionValue(0);
    const view = (reduced: boolean) => <section><ReadingImage src={site.trilhas.steps[0].image} progress={progress} window={[0, 1]} reduced={reduced} /></section>;
    const { container, rerender } = render(view(false));
    const layer = container.querySelector<HTMLElement>("[data-reading-parallax]")!;
    rerender(view(true));
    await waitFor(() => expect(layer.style.transform).toContain("-100px"));
    act(() => progress.set(1));
    await waitFor(() => expect(layer.style.transform).toContain("-100px"));
  });

  it("tracks fine mouse pointers oppositely and returns to center when leaving", async () => {
    setMatchMedia(query => query.includes("min-width: 1024px"));
    const { container } = render(<section><ReadingImage src={site.trilhas.steps[0].image} progress={motionValue(0)} window={[0, 1]} reduced={false} /></section>);
    const frame = container.querySelector("figure")!;
    vi.spyOn(frame, "getBoundingClientRect").mockReturnValue({ left: 0, top: 0, width: 200, height: 200 } as DOMRect);
    const move = new MouseEvent("pointermove", { bubbles: true, clientX: 200, clientY: 0 });
    Object.defineProperty(move, "pointerType", { value: "mouse" });
    fireEvent(frame, move);
    const pointer = container.querySelector<HTMLElement>("[data-reading-pointer]")!;
    await waitFor(() => expect(pointer.style.transform).toContain("translate3d(-10px, 10px, 0) scale(1.04)"));
    fireEvent.pointerLeave(frame);
    await waitFor(() => expect(pointer.style.transform).toBe("translate3d(0px, 0px, 0) scale(1)"));
  });

  it.each([false, true])("does not track touch or reduced-motion pointers (reduced=%s)", async (reduced) => {
    setMatchMedia(query => reduced ? query.includes("min-width: 1024px") : false);
    const { container } = render(<section><ReadingImage src={site.trilhas.steps[0].image} progress={motionValue(0)} window={[0, 1]} reduced={reduced} /></section>);
    const frame = container.querySelector("figure")!;
    fireEvent.pointerMove(frame, { pointerType: "mouse", clientX: 200, clientY: 150 });
    const pointer = container.querySelector<HTMLElement>("[data-reading-pointer]")!;
    await waitFor(() => expect(pointer.style.transform).toBe("none"));
  });
});
