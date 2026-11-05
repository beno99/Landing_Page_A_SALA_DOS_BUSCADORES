"use client";
import { useEffect, useState, type RefObject } from "react";

export type Tone = "light" | "dark";

// Relative luminance (WCAG) of a computed `rgb()/rgba()` color, or null when it is (nearly) transparent.
function luminanceOf(color: string): number | null {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  if (a < 0.5) return null;
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

// Tone of whatever sits under (x, y), skipping `ignore`. A `data-nav-tone="light|dark"` ancestor wins;
// otherwise the first opaque background up the tree decides. Images/video/canvas count as dark.
function toneAt(x: number, y: number, ignore: Element): Tone {
  if (typeof document.elementsFromPoint !== "function") return "dark"; // jsdom / very old engines
  const stack = document.elementsFromPoint(x, y).filter((el) => !ignore.contains(el));
  for (let el: Element | null = stack[0] ?? null; el; el = el.parentElement) {
    const forced = el.getAttribute("data-nav-tone");
    if (forced === "light" || forced === "dark") return forced;
    if (el instanceof HTMLImageElement || el instanceof HTMLVideoElement || el instanceof HTMLCanvasElement) return "dark";
    const lum = luminanceOf(getComputedStyle(el).backgroundColor);
    if (lum !== null) return lum > 0.4 ? "light" : "dark";
  }
  return "dark";
}

/** Watches the surface behind a fixed element (sampled near its left edge, at its vertical center). */
export function useSurfaceTone(ref: RefObject<HTMLElement | null>): Tone {
  const [tone, setTone] = useState<Tone>("dark");

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTone(toneAt(Math.max(rect.left, 0) + 6, rect.top + rect.height / 2, el));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return tone;
}
