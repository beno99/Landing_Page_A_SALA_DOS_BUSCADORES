"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import type { NavContent } from "@/content/types";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { useSurfaceTone } from "@/lib/useSurfaceTone";

export function Nav({ nav }: { nav: NavContent }) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  // The bar contrasts with the section underneath: white over dark sections, graphite over light ones.
  const surface = useSurfaceTone(header);
  const white = surface === "dark";
  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 80));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header ref={header} data-surface={surface} className="pointer-events-none fixed inset-x-0 top-4 z-50 md:top-6">
      <div className="container-nav pointer-events-auto relative">
        {/* Solid pill behind the bar (no blur); only its colors transition. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ease-cinema lg:rounded-full",
            white
              ? "border-ink/10 bg-white shadow-[0_10px_28px_-14px_rgba(0,0,0,0.55)]"
              : "border-white/10 bg-graphite shadow-[0_10px_28px_-14px_rgba(57,0,7,0.45)]",
          )}
        />
        <nav aria-label={nav.labels.primary} className="relative flex items-center justify-between gap-4 py-2 pl-4 pr-2 lg:pl-6">
          {/* Official mark (golden SB) + the name in text. Below `sm` only the mark shows, so the CTA and the
              menu button fit at 320px; the link keeps its accessible name either way. */}
          <a href={nav.home ?? "#inicio"} aria-label={nav.labels.logo} className="flex shrink-0 origin-left items-center gap-3 rounded-sm pointer-coarse:py-[7px] motion-safe:transition-transform duration-300 ease-cinema focus-visible:outline-2 focus-visible:outline-current"
            style={{ transform: compact ? "scale(0.88)" : "scale(1)" }}
          >
            <Image src="/images/brand/marca.webp" alt="" width={512} height={435} loading="eager" className="h-auto w-[38px] lg:w-[44px]" />
            <span aria-hidden="true" className={cn("title-serif hidden text-[17px] whitespace-nowrap transition-colors duration-300 sm:inline lg:hidden xl:inline xl:text-[19px]", white ? "text-ink" : "text-cream")}>A Sala dos Buscadores</span>
          </a>
          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={cn(
                  "link-underline text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4",
                  white
                    ? "text-ink/75 hover:text-ink focus-visible:text-ink focus-visible:outline-ink"
                    : "text-cream/70 hover:text-cream focus-visible:text-cream focus-visible:outline-cream",
                )}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Pill href={nav.cta.href} size="sm" variant={white ? "dark" : "solid"}>{nav.cta.label}</Pill>
            </li>
          </ul>
          <div className="flex items-center gap-1.5 min-[360px]:gap-2 lg:hidden">
            <Pill href={nav.cta.href} size="sm" variant={white ? "dark" : "solid"} className="max-[359px]:px-3.5">{nav.cta.label}</Pill>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "btn btn-secondary rounded-full px-3.5 py-2 text-sm font-medium pointer-coarse:min-h-11 min-[360px]:px-4",
                white && "border-ink/30! bg-ink/5! text-ink! [--btn-ring-in:var(--color-cream)] [--btn-ring-out:var(--color-ink)]",
              )}
            >
              {open ? nav.labels.close : nav.labels.menu}
            </button>
          </div>
        </nav>
        {open && (
          <ul
            id="menu-mobile"
            className={cn(
              "absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-2xl border p-3 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)] lg:hidden",
              white ? "border-ink/10 bg-white" : "border-white/10 bg-graphite",
            )}
          >
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)} className={cn(
                  "block rounded-lg px-3 py-3 text-base transition-colors duration-200 focus-visible:outline-2",
                  white
                    ? "text-ink/80 hover:bg-ink/5 hover:text-ink focus-visible:outline-ink"
                    : "text-cream/80 hover:bg-white/5 hover:text-cream focus-visible:outline-cream",
                )}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
