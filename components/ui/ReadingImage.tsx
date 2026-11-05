"use client";
import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import styles from "./ReadingImage.module.css";

export const READING_IMAGE_SIZES = "(min-width: 1316px) 280px, (min-width: 1024px) calc(22.5vw - 16px), 90vw";
const POINTER_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
// Critically damped: independent axes retarget without a bounce or a restart.
const SPRING = { stiffness: 240, damping: 31, mass: 1 };
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Leave 10px at both ends for the pointer spring; reduced motion always uses the center. */
export function readingImageOffset(progress: number, start: number, end: number, overflow: number, reduced: boolean) {
  if (reduced || overflow <= 20) return -overflow / 2;
  const amount = clamp((progress - start) / Math.max(0.001, end - start), 0, 1);
  return -10 - amount * (overflow - 20);
}

export function ReadingImage({ src, progress, window: range, reduced }: {
  src: string; progress: MotionValue<number>; window: readonly [number, number]; reduced: boolean;
}) {
  const plate = useRef<HTMLElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const canPoint = useMediaQuery(POINTER_QUERY) && !reduced;
  const overflow = useMotionValue(0);
  const start = useMotionValue(range[0]);
  const end = useMotionValue(range[1]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerScale = useMotionValue(1);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);
  const scale = useSpring(pointerScale, SPRING);
  const parallax = useTransform(() => `translate3d(0, ${readingImageOffset(progress.get(), start.get(), end.get(), overflow.get(), reduced)}px, 0)`);
  const tracking = useTransform(() => canPoint ? `translate3d(${x.get()}px, ${y.get()}px, 0) scale(${scale.get()})` : "none");

  useEffect(() => {
    const frame = plate.current;
    const image = layer.current;
    const scene = frame?.closest("section");
    if (!frame || !image || !scene) return;
    const measure = () => {
      overflow.set(Math.max(0, image.offsetHeight - frame.offsetHeight));
      if (window.matchMedia("(min-width: 1024px)").matches) {
        start.set(range[0]); end.set(range[1]);
      } else {
        // In the flowing mobile list, map each plate's viewport passage to the SAME scene progress.
        // offsetTop ignores entrance transforms, so the measurement cannot feed back into itself.
        let top = 0;
        for (let node: HTMLElement | null = frame; node && node !== scene; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
        const distance = Math.max(1, scene.offsetHeight - window.innerHeight);
        start.set(clamp((top - window.innerHeight) / distance, 0, 0.99));
        end.set(clamp((top + frame.offsetHeight) / distance, 0.01, 1));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scene); observer.observe(frame); observer.observe(image);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [overflow, start, end, range]);

  useEffect(() => {
    if (!canPoint) {
      pointerX.jump(0); pointerY.jump(0); pointerScale.jump(1);
      x.jump(0); y.jump(0); scale.jump(1);
    }
  }, [canPoint, pointerX, pointerY, pointerScale, x, y, scale]);

  function follow(event: PointerEvent<HTMLElement>) {
    if (!canPoint || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width || !box.height) return;
    pointerX.set(clamp((0.5 - (event.clientX - box.left) / box.width) * 20, -10, 10));
    pointerY.set(clamp((0.5 - (event.clientY - box.top) / box.height) * 20, -10, 10));
    pointerScale.set(1.04);
  }
  function reset() { pointerX.set(0); pointerY.set(0); pointerScale.set(1); }

  return (
    <figure ref={plate} className={styles.plate} data-reading-plate="" aria-hidden="true"
      onPointerEnter={follow} onPointerMove={follow} onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div ref={layer} className={styles.layer} data-reading-parallax="" style={{ transform: parallax }}>
        <motion.div className={styles.tracking} data-reading-pointer="" style={{ transform: tracking }}>
          <Image src={src} alt="" fill sizes={READING_IMAGE_SIZES} loading="lazy" decoding="async" className={styles.image} draggable={false} />
        </motion.div>
      </motion.div>
    </figure>
  );
}
