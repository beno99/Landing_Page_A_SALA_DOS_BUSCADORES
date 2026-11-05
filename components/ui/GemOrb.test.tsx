import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GemOrb } from "./GemOrb";
import { createGemRenderer } from "@/lib/gem-renderer";

vi.mock("@/lib/gem-renderer", () => ({ createGemRenderer: vi.fn() }));
const renderer = { resize: vi.fn(), render: vi.fn(), dispose: vi.fn() };
let intersect: IntersectionObserverCallback;
let mediaChanged: () => void;
let reduced = false;
let frameId = 0;
const frames = new Map<number, FrameRequestCallback>();
const visibility = (value: boolean) => act(() => intersect([{ isIntersecting: value }] as IntersectionObserverEntry[], {} as IntersectionObserver));
function tick(now: number) {
  const callbacks = [...frames.values()];
  frames.clear();
  act(() => callbacks.forEach(callback => callback(now)));
}

beforeEach(() => {
  vi.clearAllMocks();
  reduced = false;
  frames.clear();
  vi.mocked(createGemRenderer).mockReturnValue(renderer);
  vi.spyOn(performance, "now").mockReturnValue(0);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++frameId, callback); return frameId; });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { intersect = callback; }
    observe() {} disconnect() {}
  });
  vi.spyOn(window, "matchMedia").mockImplementation(() => ({
    get matches() { return reduced; },
    addEventListener: (_: string, callback: () => void) => { mediaChanged = callback; },
    removeEventListener: vi.fn(),
  }) as unknown as MediaQueryList);
  vi.spyOn(window, "getComputedStyle").mockReturnValue({ getPropertyValue: () => "#079f70" } as unknown as CSSStyleDeclaration);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("Volumetric gem lifecycle", () => {
  it("loads on visibility, advances the interior, and pauses offscreen or in a hidden tab", async () => {
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(false);
    const { container, unmount } = render(<GemOrb image="/images/jornada/esmeralda.png" />);
    expect(createGemRenderer).not.toHaveBeenCalled();
    visibility(true);
    await waitFor(() => expect(container.firstChild).toHaveAttribute("data-rendered", "true"));
    expect(createGemRenderer).toHaveBeenCalledWith(expect.any(HTMLCanvasElement), { colors: ["#079f70", "#079f70", "#079f70"], seed: 5, style: 1 });
    expect(renderer.resize).toHaveBeenCalledWith(171, 171);
    tick(40);
    expect(renderer.render).toHaveBeenLastCalledWith(expect.objectContaining({ time: 0.05, reduced: false }));
    visibility(false);
    expect(frames.size).toBe(0);
    visibility(true);
    expect(frames.size).toBe(1);
    hidden.mockReturnValue(true);
    fireEvent(document, new Event("visibilitychange"));
    expect(frames.size).toBe(0);
    hidden.mockReturnValue(false);
    fireEvent(document, new Event("visibilitychange"));
    expect(frames.size).toBe(1);
    unmount();
    expect(renderer.dispose).toHaveBeenCalledOnce();
    expect(frames.size).toBe(0);
  });

  it("draws a static gem without an animation loop when reduced motion is requested", async () => {
    reduced = true;
    render(<GemOrb image="/images/jornada/fluorita.png" />);
    visibility(true);
    await waitFor(() => expect(renderer.render).toHaveBeenCalled());
    expect(renderer.render).toHaveBeenLastCalledWith({ time: 0, dark: true, reduced: true });
    expect(frames.size).toBe(0);
    act(() => { reduced = false; mediaChanged(); });
    expect(frames.size).toBe(1);
    tick(40);
    act(() => { reduced = true; mediaChanged(); });
    expect(frames.size).toBe(0);
    expect(renderer.render).toHaveBeenLastCalledWith(expect.objectContaining({ reduced: true }));
  });

  it("keeps the original decorative image if WebGL is unavailable", async () => {
    vi.mocked(createGemRenderer).mockReturnValue(null);
    const { container } = render(<GemOrb image="/images/jornada/quartzo-rosa.png" />);
    visibility(true);
    await waitFor(() => expect(createGemRenderer).toHaveBeenCalled());
    expect(container.firstChild).not.toHaveAttribute("data-rendered", "true");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
    expect(frames.size).toBe(0);
  });

  it("restores the fallback after context loss, then recreates the renderer on recovery", async () => {
    const { container } = render(<GemOrb image="/images/jornada/espinelio.png" />);
    visibility(true);
    await waitFor(() => expect(container.firstChild).toHaveAttribute("data-rendered", "true"));
    fireEvent(container.querySelector("canvas")!, new Event("webglcontextlost", { cancelable: true }));
    expect(container.firstChild).toHaveAttribute("data-rendered", "false");
    expect(renderer.dispose).toHaveBeenCalledOnce();
    expect(frames.size).toBe(0);
    fireEvent(container.querySelector("canvas")!, new Event("webglcontextrestored"));
    await waitFor(() => expect(createGemRenderer).toHaveBeenCalledTimes(2));
    expect(container.firstChild).toHaveAttribute("data-rendered", "true");
  });

  it("does not allocate a renderer after unmount while the import is pending", async () => {
    const { unmount } = render(<GemOrb image="/images/jornada/pedra-da-lua.png" />);
    visibility(true);
    unmount();
    await act(async () => { await Promise.resolve(); });
    expect(createGemRenderer).not.toHaveBeenCalled();
    expect(frames.size).toBe(0);
  });
});
