"use client";
import Image from "next/image";
import type { AnfitriaoContent, HostExample } from "@/content/types";
import { Pill } from "@/components/ui/Pill";
import { Reveal, SectionLabel, TwoLineTitle } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// Espaço para Anfitriões (telas-substitutas/anfitrioes/04): invitation, three steps and three
// demonstration cards with the gold detail, the text seal and the author line.
export function Anfitriao({ content }: { content: AnfitriaoContent }) {
  return (
    <section id="anfitriao" aria-labelledby="anfitriao-title" className="section-y bg-cream">
      <div className="container-page flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <SectionLabel>{content.label}</SectionLabel>
          <Reveal>
            <TwoLineTitle id="anfitriao-title" line1={content.line1} line2={content.line2} />
          </Reveal>
          <p className="max-w-[760px] text-lg font-light leading-relaxed text-text-2">{content.text}</p>
        </div>

        <ol className="grid gap-4 md:grid-cols-3">
          {content.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 rounded-2xl bg-sand/35 p-6 ring-1 ring-inset ring-brown/10">
              <h3 className="title-serif text-[21px] leading-tight text-graphite">
                <span className="text-brown">{String(i + 1).padStart(2, "0")} ·</span> {s.title}
              </h3>
              <p className="text-[15px] font-light leading-normal text-text-2">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="title-serif text-[30px] leading-tight text-graphite sm:text-[34px]">{content.examplesTitle}</h3>
            <p className="text-[15px] font-light text-text-2">{content.examplesText}</p>
          </div>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.examples.map((e) => (
              <li key={e.title} className="flex">
                <HostCard example={e} seal={content.seal} note={content.exampleNote} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Pill href={content.primary.href} variant="dark" arrow>{content.primary.label}</Pill>
            <a href={content.secondary.href} className="link-underline text-[15px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{content.secondary.label}</a>
          </div>
          <p className="text-sm text-text-3">
            {content.contact.label} <span className="select-all font-semibold text-text-2">{content.contact.email}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Dark card with a discreet gold border: the gold marks the editorial origin (a host's Sala), not a
 *  premium category. A demonstration, so it is not a link. */
function HostCard({ example, seal, note }: { example: HostExample; seal: string; note: string }) {
  return (
    <article className="flex w-full flex-col rounded-3xl bg-[#221d18] p-2 ring-1 ring-inset ring-gold/45 shadow-[0_24px_48px_-20px_rgb(57_0_7/0.45)]">
      <div className="relative aspect-[382/256] overflow-hidden rounded-2xl">
        <Image src={example.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px" className="object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-gold-light px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-graphite">{seal}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">{example.theme}</p>
        <h4 className="title-serif text-[28px] leading-[1.1] text-ivory">{example.title}</h4>
        <p className="text-[15px] font-light leading-normal text-white/80">{example.description}</p>
        <p className="mt-auto flex flex-col gap-0.5 pt-2">
          <span className="text-[16px] text-gold-light">{example.author}</span>
          <span className="text-xs text-white/65">{example.authorNote}</span>
        </p>
        <p className="border-t border-white/10 pt-3 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-white/55">{note}</p>
      </div>
    </article>
  );
}

// The /anfitrioes demonstration of a host's Sala (portal card family). It is a demonstration, so it has
// no link: it must not pass for a published Sala.
export function ExampleCard({ card, tone = "light", className }: { card: AnfitriaoContent["card"]; tone?: "light" | "dark"; className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[600px] w-full max-w-[384px] rounded-3xl p-2",
        tone === "dark"
          ? "bg-card-escuro shadow-[inset_0_0_0_1px_rgb(211_179_110/0.45),0_24px_48px_-16px_rgb(0_0_0/0.65)]"
          : "bg-ivory shadow-[inset_0_0_0_1px_rgb(57_0_7/0.12),0_18px_40px_-16px_rgb(57_0_7/0.12)]",
        className,
      )}
    >
      <div className="relative flex flex-1 flex-col justify-between gap-6 overflow-hidden rounded-2xl p-4">
        <Image src={card.image} alt="" fill sizes="(max-width: 420px) 100vw, 384px" className="object-cover" />
        <span className="relative w-fit rounded-xl bg-charcoal/80 px-3 py-1.5 text-xs font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)]">{card.count}</span>
        <div className="vidro-escuro relative flex flex-col gap-4 rounded-2xl p-6">
          <h3 className="title-serif text-[30px] leading-[1.1] text-white">{card.title}</h3>
          <p className="text-sm leading-[22px] text-white/95">{card.description}</p>
          <div className="flex flex-col items-start gap-2">
            <span className="rounded-full bg-level px-3.5 py-1.5 text-[12.5px] font-semibold tracking-[-0.006em] text-level-ink">{card.level}</span>
            <span className="text-xs text-white/95">{card.updated}</span>
          </div>
          <p className="w-fit rounded-xl bg-white/10 px-4 py-2 text-[13.5px] font-medium text-white/90 ring-1 ring-inset ring-white/20">{card.note}</p>
        </div>
      </div>
    </div>
  );
}
