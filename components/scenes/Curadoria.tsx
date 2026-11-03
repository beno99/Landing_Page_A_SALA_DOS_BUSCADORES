import Image from "next/image";
import type { CuradoriaContent } from "@/content/types";
import { Reveal, SectionLabel, TwoLineTitle } from "@/components/ui/SectionHeading";

// Editorial proposal (telas-substitutas/editorial/03): framed artwork on the left, title, text and the
// three principles on the right, on the light background.
export function Curadoria({ content }: { content: CuradoriaContent }) {
  return (
    // relative: paints above the pinned sky of the Hero and Salas, which ends right where this section starts
    <section id="curadoria" aria-labelledby="curadoria-title" className="section-y relative bg-cream">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,520fr)_minmax(0,720fr)] lg:gap-16">
        <figure className="flex flex-col gap-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-graphite lg:aspect-[520/784]">
            <Image src={content.image} alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="text-xs text-text-3">
            <span className="font-semibold uppercase tracking-[0.14em] text-brown">{content.imageLabel}</span> · {content.imageCaption}
          </figcaption>
        </figure>

        <div className="flex flex-col gap-8">
          <SectionLabel>{content.label}</SectionLabel>
          <Reveal>
            <TwoLineTitle id="curadoria-title" line1={content.line1} line2={content.line2} />
          </Reveal>
          <p className="max-w-[576px] text-lg font-light leading-relaxed text-text-2">{content.text}</p>
          <ul>
            {content.principles.map((p) => (
              <li key={p.title} className="flex flex-col gap-1 border-t border-ink/15 py-[18px]">
                <h3 className="title-serif text-[24px] leading-tight text-graphite">{p.title}</h3>
                <p className="max-w-[440px] text-[15px] font-light leading-normal text-text-2">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
