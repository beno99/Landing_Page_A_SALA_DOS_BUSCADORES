"use client";
import Image from "next/image";
import type { ChamadoContent } from "@/content/types";
import { Pill } from "@/components/ui/Pill";
import { Reveal, SectionLabel, TwoLineTitle } from "@/components/ui/SectionHeading";

// Closing call (telas-substitutas/rodape/01–02): title, text, the Portal CTA and its reassurance line,
// beside a card with the official mark at its own proportion.
export function Chamado({ content }: { content: ChamadoContent }) {
  return (
    <section id="chamado" aria-labelledby="chamado-title" className="section-y relative bg-cream">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_330px] lg:gap-16">
        <Reveal className="flex flex-col items-start gap-7">
          {content.label && <SectionLabel>{content.label}</SectionLabel>}
          <TwoLineTitle id="chamado-title" line1={content.line1} line2={content.line2} />
          <p className="max-w-[600px] text-lg font-light leading-relaxed text-text-2">{content.text}</p>
          <Pill href={content.cta.href} external={content.cta.external} variant="dark" arrow>{content.cta.label}</Pill>
          {content.support && <p className="text-sm text-text-3">{content.support}</p>}
        </Reveal>
        {content.brand && (
          <div className="flex flex-col gap-5 rounded-3xl bg-sand/40 p-8 ring-1 ring-inset ring-brown/10 lg:p-10">
            <Image src="/images/brand/marca.webp" alt="" width={512} height={435} className="h-auto w-[150px] self-center lg:w-[170px]" />
            <p className="title-serif text-[30px] leading-[1.1] text-graphite">{content.brand.name}</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brown">{content.brand.tagline}</p>
          </div>
        )}
      </div>
    </section>
  );
}
