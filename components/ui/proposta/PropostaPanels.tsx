"use client";
import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import type { CuradoriaContent } from "@/content/types";
import styles from "./PropostaPanels.module.css";

const DESKTOP = "(min-width: 1024px)";
const HOVER = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const HOVER_INTENT_MS = 100;

export function PropostaPanels({ principles }: { principles: CuradoriaContent["principles"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [warmImages, setWarmImages] = useState(false);
  const list = useRef<HTMLOListElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovered = useRef<number | null>(null);
  const focused = useRef<number | null>(null);
  const pointerDown = useRef(false);

  function cancelHover() {
    if (hoverTimer.current !== null) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setWarmImages(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    if (list.current) observer.observe(list.current);
    const query = window.matchMedia(DESKTOP);
    const reset = () => {
      cancelHover();
      hovered.current = null;
      focused.current = null;
      setOpen(null);
    };
    query.addEventListener("change", reset);
    return () => { cancelHover(); observer.disconnect(); query.removeEventListener("change", reset); };
  }, []);

  return (
    <ol ref={list} className={styles.panels} aria-label="Princípios do Portal">
      {principles.map((principle, index) => {
        const expanded = open === index;
        const id = `proposta-${index + 1}`;
        const common = { alt: "", sizes: "(min-width: 1316px) 400px, (min-width: 1024px) 36vw, 90vw", loading: warmImages ? "eager" as const : "lazy" as const };
        const desktop = getImageProps({ ...common, src: principle.image, width: 1536, height: 2752 }).props;
        const mobile = getImageProps({ ...common, src: principle.mobileImage, width: 2400, height: 1792 }).props;
        return (
          <li key={principle.title} className={styles.panel} data-open={expanded}
            onPointerEnter={event => {
              if (event.pointerType === "touch" || !window.matchMedia(HOVER).matches) return;
              cancelHover();
              hovered.current = index;
              hoverTimer.current = setTimeout(() => setOpen(index), HOVER_INTENT_MS);
            }}
            onPointerLeave={() => {
              cancelHover();
              hovered.current = null;
              if (window.matchMedia(DESKTOP).matches) setOpen(focused.current);
            }}>
            <div className={styles.artwork} aria-hidden="true">
              <picture>
                <source media={DESKTOP} srcSet={desktop.srcSet} sizes={desktop.sizes} />
                {/* getImageProps supplies optimized sources for art direction. */}
                <img {...mobile} alt="" decoding="async" className={styles.image} />
              </picture>
              <div className={styles.veil} />
            </div>
            <h3 className={styles.heading}>
              <button id={`${id}-trigger`} type="button" className={styles.trigger}
                aria-expanded={expanded} aria-controls={`${id}-body`}
                onPointerDown={() => { pointerDown.current = true; }}
                onPointerUp={() => { pointerDown.current = false; }}
                onPointerCancel={() => { pointerDown.current = false; }}
                onFocus={() => {
                  if (window.matchMedia(DESKTOP).matches && !pointerDown.current) {
                    cancelHover();
                    focused.current = index;
                    setOpen(index);
                  }
                }}
                onBlur={() => {
                  pointerDown.current = false;
                  focused.current = null;
                  if (window.matchMedia(DESKTOP).matches) setOpen(hovered.current);
                }}
                onClick={() => {
                  cancelHover();
                  setOpen(current => current === index ? null : index);
                }}
                onKeyDown={event => {
                  if (event.key === "Escape") {
                    cancelHover(); hovered.current = null; focused.current = null; setOpen(null);
                  }
                }}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.title}>{principle.title}</span>
              </button>
            </h3>
            <div id={`${id}-body`} aria-labelledby={`${id}-trigger`} aria-hidden={!expanded} className={styles.body}>
              <p>{principle.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
