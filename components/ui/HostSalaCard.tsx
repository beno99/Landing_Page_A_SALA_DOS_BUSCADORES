import Image from "next/image";
import type { AnfitriaoContent } from "@/content/types";
import { cn } from "@/lib/cn";
import styles from "./HostSalaCard.module.css";

type HostSala = AnfitriaoContent["featuredSala"];

/** Portal "Sala" card in its light frame: count and save over the cover, then a glass panel with origin, level and date. */
export function HostSalaCard({ sala, saved, onSave }: { sala: HostSala; saved: boolean; onSave: () => void }) {
  return (
    <article className={styles.roomCard}>
      <div className={styles.roomVisual}>
        <Image src={sala.image} alt="" fill sizes="(min-width: 1024px) 387px, (min-width: 480px) 385px, 90vw" className={styles.roomImage} />
        <div className={styles.roomTop}>
          <span className={styles.count}>{sala.count} {sala.count === 1 ? "conteúdo" : "conteúdos"}</span>
          <button type="button" onClick={onSave} aria-pressed={saved}
            aria-label={`${saved ? "Remover" : "Salvar"} ${sala.title} ${saved ? "da" : "na"} estante deste navegador`}
            title={saved ? "Salva neste navegador — clique para remover" : "Salvar neste navegador"}
            className={cn("btn", styles.save)}>
            <Image src="/assets/anfitrioes/bookmark.svg" alt="" width={20} height={20} />
          </button>
        </div>
        <div className={styles.roomPanel}>
          <h3>{sala.title}</h3>
          <p className={styles.roomDescription}>{sala.description}</p>
          <span className={styles.origin}><span className={styles.originIcon}><SealIcon /></span>{sala.seal}</span>
          <div className={styles.roomMeta}>
            <span className={styles.level}><Image src="/assets/anfitrioes/nivel.svg" alt="" width={16} height={14} />{sala.level}</span>
            <p>Atualizada em <time dateTime={sala.updated}>{sala.updatedLabel}</time></p>
          </div>
          <a href={sala.href} className={cn("btn", styles.enter)}>
            Entrar na Sala<Image src="/assets/anfitrioes/arrow.svg" alt="" width={20} height={20} />
          </a>
        </div>
      </div>
    </article>
  );
}

/** A framed doorway: the Sala mark on the origin badge. */
function SealIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" />
      <path d="M5.5 13.5V8a2.5 2.5 0 0 1 5 0v5.5" />
      <path d="M2 10.5h3.5M10.5 10.5H14" />
    </svg>
  );
}
