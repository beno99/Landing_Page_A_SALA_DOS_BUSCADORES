"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Carousel.module.css";

/** Native scroll-snap track (swipe/trackpad/keyboard scroll all work) plus previous/next buttons and dots.
    With a single item it renders just that item, without controls. `noun` names one item in the labels
    ("artigo" → "Próximo artigo", "Ir para o artigo 2 de 3"). */
export function Carousel<T>({ items, getKey, render, label, noun, gender = "m", slideWidth = 880 }: {
  items: T[]; getKey: (item: T) => string; render: (item: T) => ReactNode;
  label: string; noun: string; gender?: "m" | "f"; slideWidth?: number;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = items.length;
  const art = gender === "f" ? "a" : "o";

  // The current slide is the one whose left edge is closest to the track's left edge.
  useEffect(() => {
    const el = track.current;
    if (!el || count < 2) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const slides = Array.from(el.children) as HTMLElement[];
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setIndex(best);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); el.removeEventListener("scroll", onScroll); };
  }, [count]);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo?.({ left: slide.offsetLeft - el.offsetLeft, behavior: reduced ? "auto" : "smooth" });
    setIndex(i);
  }, []);

  if (count === 0) return null;
  if (count === 1) return <>{render(items[0])}</>;

  const next = gender === "f" ? "Próxima" : "Próximo";

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label={label}
      style={{ "--slide-width": `${slideWidth}px` } as CSSProperties}>
      <ul ref={track} className={styles.track}>
        {items.map((item, i) => (
          <li key={getKey(item)} className={styles.slide} aria-roledescription="slide" aria-label={`${i + 1} de ${count}`}>
            {render(item)}
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <button type="button" className={cn("btn", styles.arrow)} onClick={() => goTo(index - 1)} disabled={index === 0}
          aria-label={`${noun[0].toUpperCase()}${noun.slice(1)} anterior`}>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none"><path d="M16 10H4M9 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className={styles.dots}>
          {items.map((item, i) => (
            <button key={getKey(item)} type="button" className={styles.dot} aria-current={i === index ? "true" : undefined}
              aria-label={`Ir para ${art} ${noun} ${i + 1} de ${count}`} onClick={() => goTo(i)} />
          ))}
        </div>
        <button type="button" className={cn("btn", styles.arrow)} onClick={() => goTo(index + 1)} disabled={index === count - 1}
          aria-label={`${next} ${noun}`}>
          <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
