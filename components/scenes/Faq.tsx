"use client";
import { useId, useState } from "react";
import type { FaqContent, FaqItem } from "@/content/types";
import { SectionLabel } from "@/components/ui/SectionHeading";

// FAQ in ivory (telas-substitutas/faq/01–02). Collapsible: every answer starts closed, the whole question
// is the button (aria-expanded + aria-controls) and shows + / −. Two independent columns on desktop
// (an open answer never stretches its neighbour), one on phones. Questions are numbered down the first
// column and then the second, so the reading and Tab order follow the numbers.
export function Faq({ content }: { content: FaqContent }) {
  const half = Math.ceil(content.items.length / 2);
  const columns = [content.items.slice(0, half), content.items.slice(half)];
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-[#f2e9d8]">
      <div className="container-page flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 id="faq-title" className="title-serif text-balance text-[38px] text-graphite sm:text-[48px] lg:text-[56px]">{content.title}</h2>
          <p className="text-lg font-light text-text-2">{content.subtitle}</p>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-2 md:gap-6">
          {columns.map((col, c) => (
            <ul key={c} className="flex flex-col gap-4 md:gap-6">
              {col.map((item, i) => (
                <FaqCard key={item.question} item={item} number={c * half + i + 1} />
              ))}
            </ul>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brown">{content.contactLabel}</p>
          <a href={content.contact.href} className="link-underline w-fit max-w-full break-words title-serif text-[22px] text-graphite [overflow-wrap:anywhere] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            {content.contact.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqCard({ item, number }: { item: FaqItem; number: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="rounded-2xl bg-ivory ring-1 ring-inset ring-brown/15">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-answer`}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start gap-4 rounded-2xl p-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:p-6 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/50"
        >
          <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-sand/60 text-sm text-brown">{number}</span>
          <span className="title-serif flex-1 pt-1 text-[21px] leading-[1.25] text-graphite sm:text-[22px]">{item.question}</span>
          <span aria-hidden="true" className="relative mt-2.5 size-3.5 shrink-0 text-brown">
            <i className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
            <i className={`absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current transition-transform duration-300 ease-cinema motion-reduce:transition-none ${open ? "rotate-0" : "rotate-90"}`} />
          </span>
        </button>
      </h3>
      <div id={`${id}-answer`} role="region" aria-label={item.question} hidden={!open} className="px-5 pb-6 pl-[68px] sm:px-6 sm:pl-[72px]">
        <p className="text-base font-light leading-[1.6] text-text-2">{item.answer}</p>
      </div>
    </li>
  );
}
