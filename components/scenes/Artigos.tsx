"use client";
import Image from "next/image";
import { useState } from "react";
import type { ArticleItem, ArticleKind, ArtigosContent } from "@/content/types";
import { Pill } from "@/components/ui/Pill";
import { Reveal, SectionLabel, TwoLineTitle } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/cn";

type Filter = ArticleKind | "all";

// Each format keeps its own cover proportion and its own grid.
const COVER: Record<ArticleKind, string> = { video: "aspect-video", short: "aspect-[9/16]", artigo: "aspect-[4/5]" };
const GRID: Record<ArticleKind, string> = {
  video: "grid gap-6 md:grid-cols-2",
  short: "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4",
  artigo: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
};
const SIZES: Record<ArticleKind, string> = {
  video: "(max-width: 767px) 100vw, 580px",
  short: "(max-width: 767px) 50vw, 280px",
  artigo: "(max-width: 639px) 100vw, 380px",
};

// "Todos" shows one group per format (videos, Shorts, articles); a filter shows only its group. Each
// group starts with `pageSize` cards and grows with "Mostrar mais".
export function Artigos({ content }: { content: ArtigosContent }) {
  const [filter, setFilter] = useState<Filter>("all");
  const groups = content.groups.filter((g) => filter === "all" || g.id === filter);
  return (
    <section id="artigos" aria-labelledby="artigos-title" className="section-y bg-oxblood">
      <div className="container-page flex flex-col gap-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-4">
            <SectionLabel tone="dark">{content.label}</SectionLabel>
            <Reveal>
              <TwoLineTitle id="artigos-title" line1={content.line1} line2={content.line2} tone="dark" />
            </Reveal>
          </div>
          <p className="max-w-[440px] text-lg font-light leading-relaxed text-white/80">{content.text}</p>
        </div>

        <Segmented label={content.filtersLabel} options={content.filters} value={filter} onChange={setFilter} />

        {groups.map((g) => (
          <KindGroup
            key={g.id}
            kind={g.id}
            label={g.label}
            showLabel={filter === "all"}
            items={content.items.filter((i) => i.kind === g.id)}
            pageSize={content.pageSize[g.id]}
            more={content.more}
          />
        ))}

        <div className="flex justify-center">
          <Pill href={content.cta.href} external={content.cta.external} arrow>{content.cta.label}</Pill>
        </div>
      </div>
    </section>
  );
}

function KindGroup({ kind, label, showLabel, items, pageSize, more }: {
  kind: ArticleKind; label: string; showLabel: boolean; items: ArticleItem[]; pageSize: number; more: string;
}) {
  const [shown, setShown] = useState(pageSize);
  if (!items.length) return null;
  const id = `artigos-${kind}`;
  const rest = items.length - shown;
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-6">
      <h3 id={id} className={cn("text-xs font-semibold uppercase tracking-[0.14em] text-gold-light/90", !showLabel && "sr-only")}>
        {label} <span className="font-normal text-white/50">· {items.length}</span>
      </h3>
      <ul className={GRID[kind]}>
        {items.slice(0, shown).map((item) => (
          <li key={item.id} className="flex">
            <ArticleCard item={item} />
          </li>
        ))}
      </ul>
      {rest > 0 && (
        <button
          type="button"
          onClick={() => setShown((n) => n + pageSize)}
          className="btn btn-secondary w-fit self-center rounded-full px-5 py-2.5 text-sm font-semibold text-cream pointer-coarse:min-h-11"
        >
          {more} {label.toLowerCase()} <span className="font-normal text-cream/70">({rest})</span>
        </button>
      )}
    </div>
  );
}

// Dark card: the cover at its real proportion, the format chip on it, then source, title and action.
// The whole card is the link; the action inside is its visible label.
function ArticleCard({ item }: { item: ArticleItem }) {
  const compact = item.kind === "short";
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-card-escuro p-2 shadow-[inset_0_0_0_1px_rgb(246_231_206/0.18),0_2px_4px_rgb(0_0_0/0.18),0_24px_48px_-16px_rgb(0_0_0/0.65)]">
      <div className={cn("relative overflow-hidden rounded-2xl bg-wine-deep", COVER[item.kind])}>
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes={SIZES[item.kind]}
          className="object-cover transition-transform duration-700 ease-ui motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]"
          style={{ objectPosition: item.focus ?? "50% 50%" }}
        />
        <span className="absolute left-3 top-3 rounded-xl bg-charcoal/85 px-3 py-1.5 text-xs font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)]">{item.meta}</span>
      </div>
      <div className={cn("flex flex-1 flex-col gap-3", compact ? "p-3 pt-4" : "p-4 pt-5 sm:p-5")}>
        <p className="text-xs leading-snug text-gold-light/85">{item.source}</p>
        <h4 className={cn("title-serif leading-[1.15] text-white", compact ? "text-[18px] sm:text-[20px]" : "text-[24px] sm:text-[26px]")}>{item.title}</h4>
        <span aria-hidden="true" className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-semibold text-cream transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-white">
          {item.action}
          <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
            <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <a
        href={item.href}
        aria-label={`${item.action}: ${item.title}`}
        {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      />
    </article>
  );
}
