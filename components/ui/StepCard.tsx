"use client";
import { motion, type MotionStyle, type MotionValue } from "motion/react";
import type { Step } from "@/content/types";
import { ReadingImage } from "./ReadingImage";
import styles from "./StepCard.module.css";

/** One link, with editorial content above a decorative, scene-driven image. */
export function StepCard({ step, progress, imageWindow, reduced, numeralStyle }: {
  step: Step; progress: MotionValue<number>; imageWindow: readonly [number, number]; reduced: boolean; numeralStyle?: MotionStyle;
}) {
  return (
    <a href={step.href} className={styles.card}>
      <div className={styles.copy}>
        <motion.span aria-hidden="true" style={numeralStyle} className={styles.numeral}>{step.numeral}</motion.span>
        <h3 className={styles.title}>{step.title}</h3>
        <p className={styles.meta}>{step.meta}</p>
        <span className={styles.action}>Começar a leitura ↗</span>
      </div>
      <ReadingImage src={step.image} progress={progress} window={imageWindow} reduced={reduced} />
    </a>
  );
}
