"use client";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useMediaQuery";
import { cn } from "@/lib/cn";
import styles from "./GemCardMotion.module.css";

const SPRING = { stiffness: 220, damping: 30, mass: 1 };
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/** Decorative movement only: the achievement examples remain non-interactive list items. */
export function GemCardMotion({ children, className, style }: {
  children: ReactNode; className: string; style?: CSSProperties;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = finePointer && !reduced;
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const targetLift = useMotionValue(0);
  const rotateX = useSpring(targetX, SPRING);
  const rotateY = useSpring(targetY, SPRING);
  const lift = useSpring(targetLift, SPRING);
  const transform = useTransform(() => enabled
    ? `translateY(${lift.get()}px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`
    : "none");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let intersecting = false;
    const update = () => setVisible(intersecting && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      update();
    }, { threshold: 0.15 });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    if (!enabled || !visible) {
      targetX.jump(0); targetY.jump(0); targetLift.jump(0);
      rotateX.jump(0); rotateY.jump(0); lift.jump(0);
    }
  }, [enabled, visible, targetX, targetY, targetLift, rotateX, rotateY, lift]);

  function follow(event: PointerEvent<HTMLLIElement>) {
    if (!enabled || event.pointerType !== "mouse") return;
    // Measure the stationary list item so the tilted surface cannot feed back into the pointer.
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width || !box.height) return;
    targetX.set(-clamp((event.clientY - box.top) / box.height * 2 - 1) * 1.6);
    targetY.set(clamp((event.clientX - box.left) / box.width * 2 - 1) * 1.6);
    targetLift.set(-3);
  }
  function reset() { targetX.set(0); targetY.set(0); targetLift.set(0); }

  return (
    <li ref={ref} className={styles.item} data-gem-item="" onPointerEnter={follow} onPointerMove={follow}
      onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div className={cn(className, styles.surface)} style={{ ...style, transform }}
        data-gem-card="" data-gem-active={visible && !reduced}>
        {children}
      </motion.div>
    </li>
  );
}
