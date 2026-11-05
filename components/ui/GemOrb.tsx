"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { startGem, stopGem } from "@/lib/gem-clock";
import type { GemRenderer } from "@/lib/gem-renderer";
import styles from "./GemOrb.module.css";

const GEMS: Record<string, { seed: number; style: number }> = {
  fluorita: { seed: 23, style: 4 },
  esmeralda: { seed: 5, style: 1 },
  "quartzo-rosa": { seed: 17, style: 0 },
  "pedra-da-lua": { seed: 11, style: 2 },
  espinelio: { seed: 53, style: 7 },
};

export function GemOrb({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const canvas = element?.querySelector("canvas");
    const name = image.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
    const config = GEMS[name];
    if (!element || !canvas || !config) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let renderer: GemRenderer | null = null;
    let visible = false;
    let disposed = false;
    let attempted = false;
    let generation = 0;
    let time = 0;

    function draw() {
      if (!renderer) return;
      renderer.render({ time, dark: true, reduced: reduced.matches });
      element!.dataset.rendered = "true";
    }
    function step(dt: number) {
      if (disposed || !visible || document.hidden || reduced.matches || !renderer) return false;
      time += dt;
      draw();
      return true;
    }
    function resize() {
      if (!renderer) return;
      const size = Math.round(Math.min(canvas!.getBoundingClientRect().width || 171, 192) * Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.resize(size, size);
      if (visible && !document.hidden) draw();
    }
    function sync() {
      stopGem(step);
      if (disposed || !visible || document.hidden) return;
      if (renderer) {
        draw();
        if (!reduced.matches) startGem(step);
      } else if (!attempted) {
        attempted = true;
        const current = generation;
        // The shader is downloaded and allocated only when its gem enters the viewport.
        void import("@/lib/gem-renderer").then(({ createGemRenderer }) => {
          if (disposed || current !== generation) return;
          const css = getComputedStyle(element!);
          const colors = ["base", "light", "deep"].map(tone => css.getPropertyValue(`--color-gem-${name}-${tone}`).trim());
          renderer = createGemRenderer(canvas!, { ...config, colors });
          if (renderer) { resize(); sync(); }
        }).catch(() => { /* Keep the original image if the chunk or WebGL is unavailable. */ });
      }
    }
    function lost(event: Event) {
      event.preventDefault();
      generation++;
      stopGem(step);
      renderer?.dispose();
      renderer = null;
      element!.dataset.rendered = "false";
    }
    function restored() { attempted = false; sync(); }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    const sizes = new ResizeObserver(resize);
    observer.observe(element);
    sizes.observe(canvas);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    return () => {
      disposed = true;
      stopGem(step);
      observer.disconnect();
      sizes.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
      renderer?.dispose();
      element.dataset.rendered = "false";
    };
  }, [image]);

  return <div ref={ref} className={styles.orb} aria-hidden="true" data-gem-orb="">
    <Image src={image} alt="" width={384} height={384} sizes="128px" className={styles.fallback} />
    <canvas className={styles.canvas} width={256} height={256} />
  </div>;
}
