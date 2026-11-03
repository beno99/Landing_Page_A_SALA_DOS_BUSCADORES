"use client";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { Sala, SalasContent } from "@/content/types";
import { SceneTrack } from "@/components/motion/SceneTrack";
import { DepthTunnel, type TunnelEntry } from "@/components/motion/DepthTunnel";
import { SalaCard } from "@/components/ui/SalaCard";
import { tunnelLayout, type TunnelLayout } from "@/lib/motion/math";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useNearViewport } from "@/lib/useNearViewport";

export const SALAS_TRACK = { desktop: 560, mobile: 380 };
// Title fully visible (after the Hero handoff has mostly dissolved): anchors land here.
export const SALAS_REVEAL = 0.05;

type Slot = Omit<TunnelEntry, "key" | "wave" | "node">;

// Desktop composition per block size (1–2–3–2–1): each cover on its own plane (dz: further back),
// at its own size, height and side, drifting along its own path as it comes closer. The front cover
// of a block is the largest and lowest; the back ones are smaller, higher and drift outwards.
const DESKTOP: Record<number, Slot[]> = {
  1: [{ x: 0, y: 2, scale: 1.12, drift: { x: 0, y: -3 } }],
  2: [
    { x: -19, y: 13, scale: 1, drift: { x: -7, y: 5 } },
    { x: 21, y: -15, dz: 520, scale: 0.78, drift: { x: 6, y: -4 } },
  ],
  3: [
    { x: 2, y: 19, scale: 0.96, drift: { x: 2, y: 7 } },
    { x: -25, y: -13, dz: 420, scale: 0.8, drift: { x: -7, y: -3 } },
    { x: 25, y: -5, dz: 900, scale: 0.7, drift: { x: 8, y: 1 } },
  ],
};
// The closing pair mirrors the opening one: front cover high on the right, back one low on the left.
const DESKTOP_PAIR_CLOSE: Slot[] = [
  { x: 20, y: -12, scale: 1, drift: { x: 6, y: -5 } },
  { x: -22, y: 15, dz: 380, scale: 0.84, drift: { x: -6, y: 4 } },
];

// Phones: one block at a time, covers stacked with small side offsets and short drifts (no overlap).
const MOBILE: Record<number, Slot[]> = {
  1: [{ x: 0, y: 0, scale: 1.05, drift: { x: 0, y: -1 } }],
  2: [
    { x: -5, y: -13, scale: 0.86, drift: { x: -2, y: -1 } },
    { x: 5, y: 13, scale: 0.86, drift: { x: 2, y: 1 } },
  ],
  3: [
    { x: -4, y: -23, scale: 0.78, drift: { x: -2, y: -1 } },
    { x: 5, y: 0, scale: 0.78, drift: { x: 2, y: 0 } },
    { x: -3, y: 23, scale: 0.78, drift: { x: -1, y: 1 } },
  ],
};

export function slotsFor(size: number, blockIndex: number, blockCount: number, mobile: boolean): Slot[] {
  if (mobile) return MOBILE[size] ?? MOBILE[1];
  if (size === 2 && blockIndex > blockCount / 2) return DESKTOP_PAIR_CLOSE;
  return DESKTOP[size] ?? DESKTOP[1];
}

/** Progress where an appearance is in front of the viewer (SceneTrack scrolls there when it gets focus). */
function focusProgress(layout: TunnelLayout, wave: number, dz = 0): number {
  return layout.total ? Math.min(1, (layout.zs[wave] + dz - 250) / layout.total) : 0;
}

export function Salas({ content }: { content: SalasContent }) {
  return (
    <SceneTrack id="salas" labelledBy="salas-title" heights={SALAS_TRACK} revealProgress={SALAS_REVEAL}>
      {(progress, reduced) => (reduced ? <SalasGrid content={content} /> : <SalasTunnel content={content} progress={progress} />)}
    </SceneTrack>
  );
}

function SalasTitle({ content }: { content: SalasContent }) {
  return (
    <div className="text-center">
      <h2 id="salas-title" className="mx-auto max-w-[760px] text-balance font-display text-[clamp(34px,3.8vw,56px)] leading-[1.02] text-bone">{content.title}</h2>
      <p className="mx-auto mt-6 max-w-[460px] text-balance text-[15px] font-light leading-snug text-bone/90 [text-shadow:0_1px_10px_rgb(12_4_4/0.9)]">{content.subtitle}</p>
    </div>
  );
}

function SalasTunnel({ content, progress }: { content: SalasContent; progress: MotionValue<number> }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const byId = useMemo(() => new Map(content.salas.map((s) => [s.id, s])), [content.salas]);
  const layout = useMemo(
    // start beyond the visibility horizon (4200), so the first cover only appears once the title has faded.
    // Desktop blocks are far apart, so the next block is still faint while the current one passes.
    () => tunnelLayout(content.blocks.length, isMobile ? { spacing: 1100, start: 5000, exit: 900 } : { spacing: 2600, start: 6000, exit: 1300 }),
    [content.blocks.length, isMobile],
  );
  const titleOpacity = useTransform(progress, [0, 0.04, 0.07, 0.11, 0.97, 1], [0, 1, 1, 0, 0, 1]);

  // Cover images stay off the critical path until the tunnel is about to be scrolled into view.
  const rootRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(rootRef);

  const seen = new Set<string>();
  const items: TunnelEntry[] = content.blocks.flatMap((block, wave) => {
    const slots = slotsFor(block.length, wave, content.blocks.length, isMobile);
    return block.flatMap((id, i) => {
      const raw = byId.get(id);
      if (!raw) return [];
      const sala: Sala = near ? raw : { ...raw, image: undefined };
      const repeat = seen.has(id);
      seen.add(id);
      const slot = slots[i] ?? slots[0];
      return [{
        key: `${wave}-${id}`,
        wave,
        ...slot,
        node: <SalaCard sala={sala} size="tunnel" decorative={repeat} focusProgress={repeat ? undefined : focusProgress(layout, wave, slot.dz)} />,
      }];
    });
  });

  return (
    <div ref={rootRef} className="relative h-full w-full overflow-hidden">
      <DepthTunnel items={items} layout={layout} progress={progress} maxBlur={isMobile ? 0 : 3} solo={isMobile} className="absolute inset-0" />
      <motion.div style={{ opacity: titleOpacity }} className="pointer-events-none absolute inset-0 grid place-items-center px-4">
        <SalasTitle content={content} />
      </motion.div>
    </div>
  );
}

// Reduced motion: the eight covers in a still, accessible grid (each once).
function SalasGrid({ content }: { content: SalasContent }) {
  return (
    <div className="relative overflow-hidden py-28">
      <Image src="/images/salas/space.webp" alt="" fill sizes="100vw" className="object-cover" />
      <div className="container-page relative">
        <SalasTitle content={content} />
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.salas.map((sala) => (
            <li key={sala.id}>
              <SalaCard sala={sala} size="grid" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
