"use client";
import type { ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { clamp, SOLO_GAP, soloOpacity, tunnelVisual, type TunnelLayout } from "@/lib/motion/math";

/**
 * One card in the tunnel. Cards are grouped in waves (`layout.zs[wave]`); inside a wave each card sits on
 * its own plane (`dz`, further back when positive), at its own size (`scale`) and position (`x` vw, `y` vh
 * from the center), and drifts along its own path (`drift`, in vw/vh, applied as it comes closer).
 */
export type TunnelEntry = {
  key: string; wave: number; x: number; y: number; node: ReactNode;
  dz?: number; scale?: number; drift?: { x: number; y: number };
};

type Props = {
  items: TunnelEntry[];
  layout: TunnelLayout;
  progress: MotionValue<number>;
  maxBlur?: number;
  perspective?: number;
  /** Waves pass one at a time (phones): the next wave appears only once the previous one has left. */
  solo?: boolean;
  className?: string;
};

const FAR = 4200;

export function DepthTunnel({ items, layout, progress, maxBlur = 6, perspective = 1200, solo, className }: Props) {
  const camera = useTransform(progress, [0, 1], [0, layout.total]);
  const spacing = (layout.zs[1] ?? 0) - (layout.zs[0] ?? 0);
  return (
    <div data-tunnel className={className} style={{ perspective: `${perspective}px` }}>
      <motion.div className="absolute inset-0" style={{ z: camera, transformStyle: "preserve-3d" }}>
        {items.map((item) => (
          <TunnelItem
            key={item.key}
            entry={item}
            waveZ={layout.zs[item.wave]}
            camera={camera}
            maxBlur={maxBlur}
            solo={solo}
            soloSpacing={solo && item.wave > 0 ? spacing : undefined}
          />
        ))}
      </motion.div>
    </div>
  );
}

function TunnelItem({ entry, waveZ, camera, maxBlur, solo, soloSpacing }: {
  entry: TunnelEntry; waveZ: number; camera: MotionValue<number>; maxBlur: number; solo?: boolean; soloSpacing?: number;
}) {
  const z = waveZ + (entry.dz ?? 0);
  const opacity = useTransform(camera, (c) => {
    const d = z - c;
    if (!solo) return tunnelVisual(d, { maxBlur, far: FAR }).opacity;
    // Fades out just past the viewer; a later wave stays hidden until the previous one has left.
    if (soloSpacing === undefined || d < 0) return tunnelVisual(d, { maxBlur, far: FAR, fadeOut: -SOLO_GAP }).opacity;
    return soloOpacity(waveZ - c, soloSpacing);
  });
  const filter = useTransform(camera, (c) => {
    const b = tunnelVisual(z - c, { maxBlur, far: FAR }).blur;
    return b > 0.05 ? `blur(${b.toFixed(2)}px)` : "none";
  });
  // 0 far away → 1 when the card reaches the viewer's plane (and beyond).
  const near = useTransform(camera, (c) => 1 - clamp((z - c) / FAR));
  const dx = useTransform(near, (t) => `${((entry.drift?.x ?? 0) * t).toFixed(3)}vw`);
  const dy = useTransform(near, (t) => `${((entry.drift?.y ?? 0) * t).toFixed(3)}vh`);
  return (
    <motion.div
      className="absolute"
      style={{ left: `calc(50% + ${entry.x}vw)`, top: `calc(50% + ${entry.y}vh)`, x: "-50%", y: "-50%", z: -z, opacity, filter }}
    >
      <motion.div style={{ x: dx, y: dy, scale: entry.scale ?? 1 }}>{entry.node}</motion.div>
    </motion.div>
  );
}
