"use client";
import Image from "next/image";
import NextLink from "next/link";
import type { FooterContent } from "@/content/types";
import { cn } from "@/lib/cn";
import { scrollToTop } from "@/lib/scrollToSceneProgress";

// A plain footer at the end of the page: never hidden behind an animation, every link reachable by
// keyboard and on phones (the former "curtain" kept it inert until the page was scrolled to the end).
export function FooterCurtain({ content }: { content: FooterContent }) {
  return <FooterBody content={content} />;
}

function FooterBody({ content }: { content: FooterContent }) {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-10 bg-[#191b18] pb-8 pt-12 md:pt-14">
      {/* Mark + phrase | Explore | Participe | Transparência. On phones the mark takes the full row and the
          link columns pair up, so the footer stays short. */}
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-10">
        <div className="col-span-2 flex max-w-[360px] flex-col gap-5 md:col-span-1">
          <NextLink href="/#inicio" aria-label={`${content.name}, início`} className="flex w-fit items-center gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream">
            <Image src="/images/brand/marca.webp" alt="" width={512} height={435} className="h-auto w-[64px]" />
            <span aria-hidden="true" className="title-serif text-[26px] leading-[1.1] text-ivory">{content.name}</span>
          </NextLink>
          <p className="text-base leading-[1.5] text-white/75">{content.description}</p>
          <p className="text-base text-gold-light">{content.motto}</p>
        </div>
        {content.columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{col.title}</p>
            <ul className="flex flex-col gap-3 pointer-coarse:gap-0">
              {col.links.map((link) => (
                <li key={link.label}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-page flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
        <nav aria-label={content.socialTitle} className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{content.socialTitle}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {content.social.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
        <FooterLink link={content.contact} />
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-white/10 pt-5 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
        <span>© {year} {content.copyright}</span>
        <button
          type="button"
          onClick={scrollToTop}
          className={cn("btn btn-secondary inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm md:self-auto pointer-coarse:min-h-11")}
        >
          {content.backToTop}
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}

const LINK_CLASS =
  "link-underline inline-block text-base leading-[23.4px] text-white/85 pointer-coarse:py-[11px] hover:text-cream focus-visible:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/** Pages of this site ("/…") go through next/link; the Portal, YouTube and e-mail are plain links. */
function FooterLink({ link }: { link: FooterContent["contact"] }) {
  if (link.href.startsWith("/")) return <NextLink href={link.href} className={LINK_CLASS}>{link.label}</NextLink>;
  return (
    <a href={link.href} {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})} className={LINK_CLASS}>
      {link.label}
      {link.external && <span aria-hidden="true"> ↗</span>}
    </a>
  );
}
