import Image from "next/image";
import type { AcervoArticle, AcervoSala, AcervoVideo } from "@/content/types";
import { cn } from "@/lib/cn";
import styles from "@/components/scenes/Artigos.module.css";

function Seal({ children }: { children: string }) {
  return <span className={styles.seal}><Image src="/assets/acervo/curado.svg" alt="" width={18} height={18} />{children}</span>;
}

export function AcervoSalaCard({ sala, saved, onSave, seal }: {
  sala: AcervoSala; saved: boolean; onSave: () => void; seal?: string;
}) {
  return (
    <article className={styles.roomCard}>
      <div className={styles.roomVisual}>
        <Image src={sala.image} alt="" fill
          sizes="(min-width: 1100px) 376px, (min-width: 700px) 45vw, 90vw"
          className={styles.roomImage} />
        <div className={styles.roomTop}>
          <span className={styles.count}>{sala.count} {sala.count === 1 ? "conteúdo" : "conteúdos"}</span>
          <button type="button" onClick={onSave} aria-pressed={saved}
            aria-label={`${saved ? "Remover" : "Salvar"} ${sala.title} ${saved ? "da" : "na"} estante deste navegador`}
            title={saved ? "Salva neste navegador — clique para remover" : "Salvar neste navegador"}
            className={cn("btn", styles.save)}>
            <Image src="/assets/acervo/bookmark.svg" alt="" width={24} height={24} />
          </button>
        </div>
        <div className={styles.roomPanel}>
          {seal && <span className={styles.origin}>{seal}</span>}
          <h3>{sala.title}</h3>
          <p className={styles.roomDescription}>{sala.description}</p>
          <div className={styles.roomMeta}>
            <span className={styles.level}><Image src="/assets/acervo/nivel-iniciante.svg" alt="" width={19} height={17} />{sala.level}</span>
            <p>Atualizada em <time dateTime={sala.updated}>{sala.updatedLabel}</time></p>
          </div>
          <a href={sala.href} className={cn("btn", styles.enter)}>
            Entrar na Sala<Image src="/assets/acervo/arrow.svg" alt="" width={24} height={24} />
          </a>
        </div>
      </div>
    </article>
  );
}

const LEVEL_BARS: Record<string, number> = { Iniciante: 1, "Intermediário": 2, "Avançado": 3 };

/** Three bars, as many filled as the level (Iniciante 1, Intermediário 2, Avançado 3). */
function LevelIcon({ level }: { level: string }) {
  const filled = LEVEL_BARS[level] ?? 1;
  return (
    <svg aria-hidden="true" viewBox="0 0 16 14" width="16" height="14" fill="currentColor">
      {[0, 1, 2].map((i) => (
        <rect key={i} x={i * 5} y={8 - i * 4} width="3" height={6 + i * 4} rx="1" opacity={i < filled ? 1 : 0.35} />
      ))}
    </svg>
  );
}

function ThemeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M10 5.5C8.5 4.3 6.2 3.8 3 3.8v11.4c3.2 0 5.5.5 7 1.7 1.5-1.2 3.8-1.7 7-1.7V3.8c-3.2 0-5.5.5-7 1.7Z" />
      <path d="M10 5.5v11.4M12.5 7.5h2.5M12.5 10h2.5M12.5 12.5h2.5" strokeLinecap="round" />
    </svg>
  );
}

export function AcervoArticleCard({ article }: { article: AcervoArticle }) {
  const [authorName, ...authorRole] = article.author.split(" · ");
  return (
    <article className={styles.articleCard}>
      <div className={styles.articleBody}>
        <div className={styles.articleMeta}>
          <span className={styles.articleIcon}><Image src="/assets/acervo/artigo.svg" alt="" width={18} height={18} /></span>
          <p>{article.meta}<span>{article.sala}</span></p>
        </div>
        <h3>{article.title}</h3>
        <p className={styles.summary}>{article.summary}</p>
        <ul aria-label="Temas e nível do artigo" className={styles.articleThemes}>
          {article.themes.map(theme => <li key={theme}><ThemeIcon />{theme}</li>)}
          <li className={article.level === "Iniciante" ? styles.levelBeginner : styles.intermediate}>
            <LevelIcon level={article.level} />{article.level}
          </li>
        </ul>
      </div>
      <footer className={styles.articleFooter}>
        <p><strong>{authorName}</strong>{authorRole.length > 0 && ` · ${authorRole.join(" · ")}`}</p>
        <Seal>{article.seal}</Seal>
      </footer>
      <a className={styles.articleLink} href={article.href} aria-label={`Ler artigo: ${article.title}`} />
    </article>
  );
}

export function AcervoVideoCard({ video }: { video: AcervoVideo }) {
  return (
    <article className={styles.videoCard}>
      <div className={styles.videoVisual}>
        <Image src={video.image} alt="" fill sizes="(min-width: 1156px) 1024px, 90vw" className={styles.videoImage} />
        <div className={styles.videoShade} aria-hidden="true" />
        {video.duration ? <span className={styles.duration}><Image src="/assets/acervo/clock.svg" alt="" width={14} height={14} />{video.duration}</span> : <span aria-hidden="true" />}
        <div className={styles.videoBottom}>
          <div className={styles.videoInfo}>
            <p>{video.source}{video.theme && <span> · {video.theme}</span>}</p>
            <h3>{video.title}</h3>
            <Seal>{video.seal}</Seal>
            <p>{video.meta}</p>
          </div>
          <a href={video.href} target="_blank" rel="noopener noreferrer" className={cn("btn", styles.watch)}>
            Assistir no YouTube<Image src="/assets/acervo/external.svg" alt="" width={16} height={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
