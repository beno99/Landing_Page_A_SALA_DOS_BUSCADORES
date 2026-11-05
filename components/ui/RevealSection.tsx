"use client";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

/**
 * A <section> that flips `data-revealed` from "false" to "true" the first time 25% of it is in view.
 * The choreography itself lives in the section's CSS, keyed off that attribute.
 */
export function RevealSection({ children, ...props }: ComponentPropsWithoutRef<"section">) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setRevealed(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  return <section ref={ref} data-revealed={revealed} {...props}>{children}</section>;
}
