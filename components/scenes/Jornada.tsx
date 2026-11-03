"use client";
import { useId } from "react";
import { motion } from "motion/react";
import type { Gem, JornadaContent } from "@/content/types";
import { Pill } from "@/components/ui/Pill";
import { Reveal, SectionLabel } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/useMediaQuery";

const EASE_CINEMA = [0.22, 1, 0.36, 1] as const;
const PANEL = "rounded-2xl bg-white/[0.035] ring-1 ring-inset ring-white/10";

// Jornada do Buscador (telas-substitutas/jornada/01–02): the three levels of the journey, the eight Gems
// of Knowledge and the titles by theme. Each discovery leaves a mark: the gems light up one after the
// other, from grey to their colour (reduced motion: already lit). No personal progress is shown here.
export function Jornada({ content }: { content: JornadaContent }) {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="jornada" aria-labelledby="jornada-title" className="section-y bg-noir">
      <div className="container-page flex flex-col gap-14">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-5">
            <SectionLabel tone="dark">{content.label}</SectionLabel>
            <Reveal>
              <h2 id="jornada-title" className="title-serif text-balance">
                <span className="block text-[44px] text-ivory sm:text-[56px] lg:text-[64px]">{content.line1}</span>
                <span className="mt-3 block text-[26px] italic text-gold sm:text-[30px]">{content.line2}</span>
              </h2>
            </Reveal>
            <p className="max-w-[560px] text-lg font-light leading-relaxed text-white/80">{content.text}</p>
          </div>
          <div className={`${PANEL} flex flex-col gap-3 p-6`}>
            <div className="flex items-center gap-4">
              <GemIcon gem={content.gems[0]} size={52} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">{content.badge.eyebrow}</p>
            </div>
            <p className="title-serif text-[22px] text-ivory">{content.badge.title}</p>
            <p className="text-[15px] font-light text-white/75">{content.badge.text}</p>
          </div>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {content.levels.map((l, i) => (
            <li key={l.title} className={`${PANEL} flex flex-col gap-2 p-6`}>
              <span aria-hidden="true" className="text-xs font-semibold text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="title-serif text-[22px] leading-tight text-ivory">{l.title}</h3>
              <p className="text-[15px] font-light leading-normal text-white/75">{l.text}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="title-serif text-[30px] text-ivory sm:text-[34px]">{content.gemsTitle}</h3>
            <p className="text-[15px] font-light text-white/75">{content.gemsText}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {content.gems.map((g, i) => (
              <li key={g.name} className={`${PANEL} flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-4 sm:p-5`}>
                <motion.span
                  aria-hidden="true"
                  className="shrink-0"
                  initial={reduced ? false : { filter: "grayscale(1) brightness(0.45)", scale: 0.9 }}
                  whileInView={{ filter: "grayscale(0) brightness(1)", scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : i * 0.12, ease: EASE_CINEMA }}
                >
                  <GemIcon gem={g} size={48} />
                </motion.span>
                <span className="flex flex-col gap-1">
                  <span className="title-serif text-[19px] leading-tight text-ivory">{g.name}</span>
                  <span className="text-sm font-medium text-gold-light/90">{g.title}</span>
                  <span className="text-[13px] font-light leading-snug text-white/65">{g.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="title-serif text-[28px] text-ivory sm:text-[32px]">{content.titlesTitle}</h3>
          <ol aria-label={content.titlesTitle} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[20px] text-gold sm:text-[22px]">
            {content.titles.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-gold/60">→</span>}
                {t}
              </li>
            ))}
          </ol>
          <p className="text-[15px] font-light text-white/75">{content.titlesNote}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <Pill href={content.cta.href} arrow>{content.cta.label}</Pill>
          <p className="text-sm text-white/70">{content.ctaNote}</p>
        </div>
      </div>
    </section>
  );
}

/** A faceted gem in its own colours. Decorative: the name and title next to it carry the meaning. */
export function GemIcon({ gem, size }: { gem: Gem; size: number }) {
  const id = useId();
  return (
    <svg width={size} height={size * 0.86} viewBox="0 0 56 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={gem.from} />
          <stop offset="1" stopColor={gem.to} />
        </linearGradient>
      </defs>
      <ellipse cx="28" cy="45" rx="17" ry="2.6" fill="#000" opacity="0.45" />
      <path d="M14 4h28l12 13-26 28L2 17z" fill={`url(#${id}-a)`} />
      <path d="M2 17h52M14 4l6 13 8-13 8 13 6-13M20 17l8 28 8-28" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1" strokeLinejoin="round" />
      <path d="M14 4h28l-6 13H20z" fill="#fff" opacity="0.22" />
    </svg>
  );
}
