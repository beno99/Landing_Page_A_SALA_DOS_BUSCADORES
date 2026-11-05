import Image from "next/image";
import type { PerguntasContent } from "@/content/types";
import { Pill, Tag } from "@/components/ui/Pill";
import { RevealSection } from "@/components/ui/RevealSection";
import { cn } from "@/lib/cn";
import styles from "./Perguntas.module.css";

export function Perguntas({ content }: { content: PerguntasContent }) {
  const [firstWord, ...remainingWords] = content.line1.split(" ");

  return (
    <RevealSection
      id="perguntas"
      aria-labelledby="perguntas-title"
      className={cn(styles.section)}
    >
      <Image src={content.image} alt="" fill sizes="100vw" className={styles.background} />
      <div className={cn("container-page", styles.container)}>
        <div className={styles.content}>
          <p className={cn("type-eyebrow", styles.label)}>{content.label}</p>
          <h2 id="perguntas-title" className={cn("type-title", styles.title)}>
            <span className={styles.firstLine}>
              <span className={styles.accent}>
                <span className={styles.initial}>{firstWord.slice(0, 1)}</span>{firstWord.slice(1)}
              </span>{" "}{remainingWords.join(" ")}
            </span>{" "}
            <span className={styles.secondLine}>{content.line2}</span>
          </h2>
          <p className={cn("type-lead", styles.description)}>{content.text}</p>
          <ul aria-label={content.themesLabel} className={styles.themes}>
            {content.themes.slice(0, content.show).map((theme, i) => (
              <li key={theme} className={styles.themeItem} style={{ ["--i" as string]: i }}><Tag className={styles.theme}>{theme}</Tag></li>
            ))}
          </ul>
          <Pill href={content.cta.href} className={styles.cta}>{content.cta.label}</Pill>
        </div>
      </div>
    </RevealSection>
  );
}
