"use client";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { PerguntasContent } from "@/content/types";
import { SceneTrack } from "@/components/motion/SceneTrack";
import { Pill, Tag } from "@/components/ui/Pill";
import { SectionLabel, TwoLineTitle } from "@/components/ui/SectionHeading";
import { holdRange } from "@/lib/motion/math";
import { useDrawOnce } from "@/lib/useDraw";

export const PERGUNTAS_TRACK = { desktop: 150, mobile: 100 };

// Deterministic "scattered" starting position for each theme. Kept small (about one chip away from its
// place) so a chip in transit never sits over the title, the text or the CTA.
function scatter(i: number) {
  return { x: (((i * 37) % 11) - 5) * 16, y: (((i * 53) % 7) - 3) * 12, r: (((i * 29) % 9) - 4) * 3 };
}

export function Perguntas({ content }: { content: PerguntasContent }) {
  return (
    <SceneTrack id="perguntas" labelledBy="perguntas-title" heights={PERGUNTAS_TRACK} className="bg-night">
      {(progress, reduced) => <PerguntasStage content={content} progress={progress} reduced={reduced} />}
    </SceneTrack>
  );
}

function PerguntasStage({ content, progress, reduced }: { content: PerguntasContent; progress: MotionValue<number>; reduced: boolean }) {
  const imageY = useTransform(progress, [0, 1], ["-6%", "6%"]);
  // A new selection of real themes on each visit, fixed while the person is on the page.
  const themes = useDrawOnce("temas", content.themes, content.show);
  return (
    <div className="relative flex h-full min-h-svh w-full items-center overflow-hidden bg-night">
      <motion.div
        aria-hidden="true"
        className="absolute -inset-y-[8%] left-0 w-full md:left-[23.8%] md:w-[81.4%]"
        style={{ y: reduced ? 0 : imageY }}
      >
        <Image src={content.image} alt="" fill sizes="(max-width: 767px) 100vw, 81vw" className="object-cover" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,#0c0404_28.3%,rgba(12,4,4,0)_97.5%)] md:w-[92%]"
      />
      <div className="container-page relative py-24">
        <div className="flex max-w-[863px] flex-col items-start gap-6">
          <div className="flex flex-col gap-4">
            <SectionLabel tone="dark">{content.label}</SectionLabel>
            <TwoLineTitle id="perguntas-title" line1={content.line1} line2={content.line2} tone="dark" />
          </div>
          <p className="max-w-[640px] text-lg font-light leading-relaxed text-white/80">{content.text}</p>
          <ul aria-label={content.themesLabel} className="flex max-w-[640px] flex-wrap gap-3">
            {themes.map((theme, i) => (
              <ScatterTag key={theme} label={theme} index={i} progress={progress} reduced={reduced} />
            ))}
          </ul>
          <Pill href={content.cta.href} arrow>{content.cta.label}</Pill>
        </div>
      </div>
    </div>
  );
}

function ScatterTag({ label, index, progress, reduced }: { label: string; index: number; progress: MotionValue<number>; reduced: boolean }) {
  const s = scatter(index);
  const from = 0.05 + index * 0.02;
  const to = 0.45 + index * 0.02;
  const [inR, xO] = holdRange([from, to], [s.x, 0]);
  const [, yO] = holdRange([from, to], [s.y, 0]);
  const [, rO] = holdRange([from, to], [s.r, 0]);
  const [, oO] = holdRange([from, to], [0, 1]);
  const x = useTransform(progress, inR, xO);
  const y = useTransform(progress, inR, yO);
  const rotate = useTransform(progress, inR, rO);
  const opacity = useTransform(progress, inR, oO);
  return (
    <motion.li className="motion-reduce:opacity-100! motion-reduce:transform-none!" style={reduced ? undefined : { x, y, rotate, opacity }}>
      <Tag>{label}</Tag>
    </motion.li>
  );
}
