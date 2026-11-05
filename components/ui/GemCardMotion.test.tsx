import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setMatchMedia } from "@/vitest.setup";
import { GemCardMotion } from "./GemCardMotion";

afterEach(() => { setMatchMedia(() => false); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
const card = () => <ul><GemCardMotion className="gem"><p>Fluorita</p></GemCardMotion></ul>;

function move(item: HTMLElement) {
  vi.spyOn(item, "getBoundingClientRect").mockReturnValue({ left: 0, top: 0, width: 200, height: 400 } as DOMRect);
  const event = new MouseEvent("pointermove", { bubbles: true, clientX: 200, clientY: 0 });
  Object.defineProperty(event, "pointerType", { value: "mouse" });
  fireEvent(item, event);
}

describe("Gem card motion", () => {
  it("tilts subtly from a stationary hit area and returns with the spring on leave", async () => {
    setMatchMedia(query => query.includes("pointer: fine"));
    const { container } = render(card());
    const item = container.querySelector("li")!;
    const surface = container.querySelector<HTMLElement>("[data-gem-card]")!;
    move(item);
    await waitFor(() => expect(surface.style.transform).toBe("translateY(-3px) rotateX(1.6deg) rotateY(1.6deg)"));
    fireEvent.pointerLeave(item);
    await waitFor(() => expect(surface.style.transform).toBe("translateY(0px) rotateX(0deg) rotateY(0deg)"));
    expect(item).not.toHaveAttribute("tabindex");
    expect(container.querySelector("button,a")).toBeNull();
  });

  it.each(["coarse", "reduced"])("does not tilt with %s input/preferences", async (mode) => {
    setMatchMedia(query => mode === "reduced" && (query.includes("pointer: fine") || query.includes("prefers-reduced-motion")));
    const { container } = render(card());
    move(container.querySelector("li")!);
    await waitFor(() => expect(container.querySelector<HTMLElement>("[data-gem-card]")!.style.transform).toBe("none"));
    expect(container.querySelector("[data-gem-card]")).toHaveAttribute("data-gem-active", "false");
  });

  it("pauses the interior texture outside the viewport and when the tab is hidden", () => {
    let callback: IntersectionObserverCallback;
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(cb: IntersectionObserverCallback) { callback = cb; }
      observe() {} disconnect = disconnect;
    });
    const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    const { container, unmount } = render(card());
    const surface = container.querySelector("[data-gem-card]")!;
    const intersect = (isIntersecting: boolean) => act(() => callback([{ isIntersecting }] as IntersectionObserverEntry[], {} as IntersectionObserver));
    expect(surface).toHaveAttribute("data-gem-active", "false");
    intersect(true);
    expect(surface).toHaveAttribute("data-gem-active", "true");
    visibility.mockReturnValue("hidden");
    fireEvent(document, new Event("visibilitychange"));
    expect(surface).toHaveAttribute("data-gem-active", "false");
    visibility.mockReturnValue("visible");
    fireEvent(document, new Event("visibilitychange"));
    expect(surface).toHaveAttribute("data-gem-active", "true");
    intersect(false);
    expect(surface).toHaveAttribute("data-gem-active", "false");
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
