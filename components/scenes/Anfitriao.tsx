"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { AnfitriaoContent } from "@/content/types";
import { Pill } from "@/components/ui/Pill";
import { HostSalaCard } from "@/components/ui/HostSalaCard";
import { useSavedSalas } from "@/lib/useSavedSalas";
import { cn } from "@/lib/cn";
import styles from "./Anfitriao.module.css";

export function Anfitriao({ content }: { content: AnfitriaoContent }) {
  const { saved, toggle } = useSavedSalas();
  const [message, setMessage] = useState("");
  const sala = content.featuredSala;
  const [firstWord, ...rest] = `${content.line1} ${content.line2}`.split(" ");
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(""), 6000);
    return () => window.clearTimeout(timer);
  }, [message]);

  function save() {
    const wasSaved = saved.has(sala.id);
    if (!toggle(sala.id)) {
      setMessage("Não foi possível salvar neste navegador. Verifique as permissões de armazenamento.");
      return;
    }
    setMessage(wasSaved ? `${sala.title} removida da estante deste navegador.` : `${sala.title} salva neste navegador.`);
  }

  return (
    <section id="anfitriao" aria-labelledby="anfitriao-title" className={cn(styles.section)}>
      <div className={styles.texture} aria-hidden="true">
        <Image src={content.backgroundImage} alt="" fill sizes="100vw" />
      </div>
      <div className={cn("container-page", styles.content)}>
        <div className={styles.main}>
          <div className={styles.introduction}>
            <p className={cn("type-eyebrow", styles.label)}>{content.label}</p>
            <h2 id="anfitriao-title" className="type-title">
              <span className={styles.displayWord}><span className={styles.initial}>{firstWord.slice(0, 1)}</span>{firstWord.slice(1)}</span>{" "}{rest.join(" ")}
            </h2>
            <p className={cn("type-lead", styles.description)}>{content.text}</p>
            <Pill href={content.primary.href} className={styles.apply}>{content.primary.label}</Pill>
          </div>
          <HostSalaCard sala={sala} saved={saved.has(sala.id)} onSave={save} />
        </div>
        <ol className={styles.steps}>
          {content.steps.map(step => (
            <li key={step.title} className={styles.step}>
              <div className={styles.stepHeading}>
                <Image src={step.icon} alt="" width={24} height={24} />
                <h3>{step.title}</h3>
              </div>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <p role="status" className={message ? styles.notice : "sr-only"}>{message}</p>
    </section>
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
