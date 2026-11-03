"use client";
import { useState } from "react";
import type { LeituraContent, Passage, ReadingMode } from "@/content/types";
import { Reveal, SectionLabel } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/cn";
import { useDrawIndexOnce } from "@/lib/useDraw";

const QUOTE = "font-display italic leading-[1.14] text-graphite";
const GREEK = "font-greek italic leading-[1.18] text-graphite";
const LARGE = "text-[32px] sm:text-[44px] lg:text-[52px]";
const SMALL = "text-[24px] sm:text-[30px] lg:text-[34px]";
const SIDE_LABEL = "text-[11px] font-semibold uppercase tracking-[0.14em] text-brown";

// One approved passage per visit (it stays the same while the reader switches Original / Tradução /
// Lado a lado). Original is offered only when the verified original text exists.
export function Leitura({ content }: { content: LeituraContent }) {
  const index = useDrawIndexOnce(`leitura:${content.passages.map((p) => p.id).join(",")}`, content.passages.length);
  const passage = content.passages[index];
  const hasOriginal = Boolean(passage.original);
  const [chosen, setChosen] = useState<ReadingMode>("translation");
  const mode: ReadingMode = hasOriginal ? chosen : "translation";
  const modes = content.modes.map((m) => ({ ...m, disabled: !hasOriginal && m.id !== "translation" }));
  const [first, glossary, last] = content.features;

  return (
    <section id="leitura" aria-labelledby="leitura-title" className="section-y bg-cream">
      <div className="container-page flex flex-col items-center gap-10 text-center">
        <h2 id="leitura-title" className="sr-only">{content.label}</h2>
        <SectionLabel>{content.label}</SectionLabel>

        <Reveal className="flex w-full flex-col items-center gap-8">
          <figure className="flex w-full flex-col items-center gap-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-3">Sala {passage.sala}</p>
            <div className="flex w-full max-w-[1040px] items-center justify-center lg:min-h-[142px]">
              <PassageText passage={passage} mode={mode} />
            </div>
            <figcaption className="flex flex-col items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brown">{passage.source}</span>
              <span className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
                <a href={passage.salaHref} className="link-underline font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                  {content.salaAction}: {passage.sala}
                </a>
                {passage.reference.external && (
                  <a href={passage.reference.href} target="_blank" rel="noreferrer" className="link-underline text-text-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
                    {passage.reference.label} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </span>
            </figcaption>
          </figure>
          <div className="flex flex-col items-center gap-3">
            <Segmented label={content.modesLabel} options={modes} value={mode} onChange={setChosen} describedBy={hasOriginal ? undefined : "leitura-sem-original"} />
            {!hasOriginal && <p id="leitura-sem-original" className="text-[13px] text-text-3">{content.unavailable}</p>}
          </div>
        </Reveal>

        <ul className="mt-6 grid w-full gap-8 text-left md:grid-cols-3 md:gap-0">
          <Feature title={first.title} text={first.text} />
          <Feature title={glossary.title} className="md:border-l md:pl-8">
            <dl className="text-[15px] font-light leading-normal text-text-2">
              <dt className="inline font-semibold text-graphite">{passage.glossary.term}</dt> · <dd className="inline">{passage.glossary.text}</dd>
            </dl>
          </Feature>
          <Feature title={last.title} text={last.text} className="md:border-l md:pl-8" />
        </ul>
      </div>
    </section>
  );
}

function Feature({ title, text, className, children }: { title: string; text?: string; className?: string; children?: React.ReactNode }) {
  return (
    <li className={cn("flex flex-col gap-2 border-t border-ink/15 pt-6 md:pr-8", className)}>
      <h3 className="title-serif text-[22px] leading-tight text-graphite">{title}</h3>
      {children ?? <p className="text-[15px] font-light leading-normal text-text-2">{text}</p>}
    </li>
  );
}

function PassageText({ passage, mode }: { passage: Passage; mode: ReadingMode }) {
  const originalClass = passage.originalLang === "grc" ? GREEK : QUOTE;
  if (mode === "side" && passage.original) {
    return (
      <div className="grid w-full gap-8 md:grid-cols-2 md:gap-0">
        <blockquote lang={passage.originalLang} className="flex flex-col gap-3 md:pr-10">
          <span lang="pt-BR" className={SIDE_LABEL}>{passage.originalLabel}</span>
          <span className={cn(originalClass, SMALL)}>{passage.original}</span>
        </blockquote>
        <blockquote className="flex flex-col gap-3 md:border-l md:border-ink/15 md:pl-10">
          <span className={SIDE_LABEL}>{passage.translationLabel}</span>
          <span className={cn(QUOTE, SMALL)}>{passage.translation}</span>
        </blockquote>
      </div>
    );
  }
  if (mode === "original" && passage.original) {
    return (
      <blockquote className="flex flex-col items-center gap-4">
        <span className={SIDE_LABEL}>{passage.originalLabel}</span>
        <span lang={passage.originalLang} className={cn(originalClass, LARGE)}>{passage.original}</span>
      </blockquote>
    );
  }
  return (
    <blockquote className="flex flex-col items-center gap-4">
      <span className={SIDE_LABEL}>{passage.translationLabel}</span>
      <span className={cn(QUOTE, LARGE, "text-balance")}>“{passage.translation}”</span>
    </blockquote>
  );
}
