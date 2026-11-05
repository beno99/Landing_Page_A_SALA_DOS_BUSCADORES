"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { AcervoFilter, AcervoSala, ArtigosContent } from "@/content/types";
import { AcervoArticleCard, AcervoSalaCard, AcervoVideoCard } from "@/components/ui/AcervoCards";
import { Carousel } from "@/components/ui/Carousel";
import { Pill } from "@/components/ui/Pill";
import { Segmented } from "@/components/ui/Segmented";
import { cn } from "@/lib/cn";
import { useSavedSalas } from "@/lib/useSavedSalas";
import styles from "./Artigos.module.css";

export function Artigos({ content }: { content: ArtigosContent }) {
  const [filter, setFilter] = useState<AcervoFilter>("all");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(""), 6000);
    return () => window.clearTimeout(timeout);
  }, [message]);
  const { saved, toggle } = useSavedSalas();
  const [firstWord, ...rest] = content.line1.split(" ");

  function save(sala: AcervoSala) {
    const wasSaved = saved.has(sala.id);
    if (!toggle(sala.id)) {
      setMessage("Não foi possível salvar neste navegador. Verifique as permissões de armazenamento.");
      return;
    }
    setMessage(wasSaved ? `${sala.title} removida da estante deste navegador.` : `${sala.title} salva neste navegador.`);
  }

  return (
    <section id="artigos" aria-labelledby="artigos-title"
      className={cn(styles.section)}>
      <div className={styles.texture} aria-hidden="true">
        <Image src={content.backgroundImage} alt="" fill sizes="110vw" />
      </div>
      <div className={cn("container-page", styles.content)}>
        <header className={styles.header}>
          <p className={cn("type-eyebrow", styles.label)}>{content.label}</p>
          <h2 id="artigos-title" className={cn("type-title", styles.title)}>
            <span><span className={styles.accent}>{firstWord}</span>{" "}{rest.join(" ")}</span>{" "}
            <span className={styles.secondLine}>{content.line2}</span>
          </h2>
          <p className={cn("type-lead", styles.description)}>{content.text}</p>
          <Segmented label={content.filtersLabel} options={content.filters} value={filter}
            onChange={setFilter} className={styles.filters} />
        </header>
        <div className={styles.results}>
          {filter === "all" && <div className={styles.rooms}>
            {content.salas.map(sala => <AcervoSalaCard key={sala.id} sala={sala}
              saved={saved.has(sala.id)} onSave={() => save(sala)} />)}
          </div>}
          {filter === "artigo" && <Carousel items={content.articles} getKey={a => a.href} label="Artigos do acervo" noun="artigo"
            render={article => <AcervoArticleCard article={article} />} />}
          {filter === "video" && <Carousel items={content.videos} getKey={v => v.href} label="Vídeos do canal" noun="vídeo"
            slideWidth={1040} render={video => <AcervoVideoCard video={video} />} />}
        </div>
        <Pill href={content.cta.href} className={styles.explore}>{content.cta.label}</Pill>
      </div>
      <p role="status" className={message ? styles.notice : "sr-only"}>{message}</p>
    </section>
  );
}
