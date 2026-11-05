"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { getImageProps } from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { Step, TrilhasContent } from "@/content/types";
import { SceneTrack } from "@/components/motion/SceneTrack";
import { SectionLabel, TwoLineTitle } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/ui/StepCard";
import { READING_IMAGE_SIZES } from "@/components/ui/ReadingImage";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useNearViewport } from "@/lib/useNearViewport";
import { cn } from "@/lib/cn";
import styles from "./Trilhas.module.css";
import { holdRange } from "@/lib/motion/math";

export const TRILHAS_TRACK = { desktop: 250, mobile: 160 };

// Desktop (quietcubes.com "From one click to team-ready pod"): one column per step between
// vertical dividers. Each step enters 75vh below its place and rises with the scroll, all at the
// same speed but staggered, so mid-way they form the Figma's staircase (19332:5440) and they end
// aligned at the top of their columns.
export const STEP_RISE = [0.06, 0.16, 0.26, 0.36].map((start) => [start, start + 0.42] as const);
// Fallback image windows before the flowing mobile list has been measured.
export const STEP_THRESHOLDS = [0.12, 0.34, 0.56, 0.78];
// First step in place (and the staircase visible): anchors land here.
export const TRILHAS_REVEAL = STEP_RISE[0][1];
// The numeral tile pops in (scale 0.9 → 1 + fade) during the last slice of its own rise — i.e.
// once the divider line beside it has (almost) finished drawing up to it.
const MARKER_SLICE = 0.3;

export function Trilhas({ content }: { content: TrilhasContent }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  return (
    <SceneTrack id="trilhas" labelledBy="trilhas-title" heights={TRILHAS_TRACK} revealProgress={desktop ? TRILHAS_REVEAL : undefined} className={styles.track} stageClassName={styles.stage}>
      {(progress, reduced) => <TrilhasStage content={content} progress={progress} reduced={reduced} />}
    </SceneTrack>
  );
}

function TrilhasStage({ content, progress, reduced }: { content: TrilhasContent; progress: MotionValue<number>; reduced: boolean }) {
  const nearRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(nearRef);
  useEffect(() => {
    if (!near) return;
    for (const step of content.steps) {
      const { props } = getImageProps({ src: step.image, alt: "", fill: true, sizes: READING_IMAGE_SIZES });
      preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "low" });
    }
  }, [near, content.steps]);
  const draw = useTransform(progress, ...holdRange([0.08, 0.9], ["scaleY(0)", "scaleY(1)"])); // mobile line scale
  // The heading settles a little smaller as the steps arrive, like the reference.
  const titleScale = useTransform(progress, ...holdRange([0.06, 0.6], ["scale(1)", "scale(0.8)"]));
  return (
    <div ref={nearRef} className={styles.scene}>
      <div className={cn("container-page", styles.container)}>
        <motion.div className={styles.heading} style={{ transform: reduced ? "none" : titleScale }}>
          <SectionLabel>{content.label}</SectionLabel>
          <TwoLineTitle id="trilhas-title" line1={content.line1} line2={content.line2} />
          <p className={styles.note}>{content.note}</p>
        </motion.div>

        {/* Desktop: rising columns, each with its own line drawing up behind it */}
        <ol className={styles.columns}>
          {content.steps.map((step, i) => (
            <RisingStep key={step.numeral} step={step} index={i} progress={progress} reduced={reduced} />
          ))}
        </ol>

        {/* Mobile/tablet: vertical list */}
        <div className={styles.mobile}>
          <div aria-hidden="true" className={styles.listLine} />
          <motion.div aria-hidden="true" className={styles.listDraw} style={{ transform: reduced ? "none" : draw }} />
          <ol className={styles.list}>
            {content.steps.map((step, i) => (
              <ListStep key={step.numeral} step={step} index={i} progress={progress} reduced={reduced} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function RisingStep({ step, index, progress, reduced }: { step: Step; index: number; progress: MotionValue<number>; reduced: boolean }) {
  const [start, end] = STEP_RISE[index];
  const y = useTransform(progress, ...holdRange([start, end], ["translateY(75vh)", "translateY(0vh)"]));
  // The column's own divider grows top-down over the same [start, end] window as the card's rise,
  // so each stretch of line only finishes drawing exactly when its step lands.
  const lineScale = useTransform(progress, ...holdRange([start, end], ["scaleY(0)", "scaleY(1)"]));
  const markerFrom = start + (end - start) * (1 - MARKER_SLICE);
  const markerScale = useTransform(progress, ...holdRange([markerFrom, end], ["scale(0.9)", "scale(1)"]));
  const markerOpacity = useTransform(progress, ...holdRange([markerFrom, end], [0, 1]));
  return (
    <li className={styles.column} data-focus-progress={end}>
      <motion.div
        aria-hidden="true"
        className={styles.divider}
        style={{ transform: reduced ? "none" : lineScale }}
      />
      <motion.div className={styles.rise} style={reduced ? undefined : { transform: y }}>
        <StepCard step={step} progress={progress} imageWindow={[start + 0.15, 1]} reduced={reduced} numeralStyle={reduced ? undefined : { transform: markerScale, opacity: markerOpacity }} />
      </motion.div>
    </li>
  );
}

function ListStep({ step, index, progress, reduced }: { step: Step; index: number; progress: MotionValue<number>; reduced: boolean }) {
  const t = STEP_THRESHOLDS[index];
  return (
    <li>
      <StepCard step={step} progress={progress} imageWindow={[t, Math.min(1, t + 0.3)]} reduced={reduced} />
    </li>
  );
}
