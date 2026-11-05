import type { CSSProperties } from "react";
import Image from "next/image";
import type { JornadaContent } from "@/content/types";
import { GemOrb } from "@/components/ui/GemOrb";
import { GemCardMotion } from "@/components/ui/GemCardMotion";
import { cn } from "@/lib/cn";
import styles from "./Jornada.module.css";

/** Figma 61:3743. The gems illustrate achievements; they are not personal progress. */
export function Jornada({ content }: { content: JornadaContent }) {
  const [firstWord, ...remainingWords] = content.line1.split(" ");

  return (
    <section id="jornada" aria-labelledby="jornada-title" className={cn(styles.section)}>
      <div className="container-page">
        <header>
          <p className={cn("type-eyebrow", styles.label)}>{content.label}</p>
          <h2 id="jornada-title" className={cn("type-title", styles.title)}>
            <span className={styles.titleLine}>
              <span className={styles.displayWord}>{firstWord}</span>{" "}{remainingWords.join(" ")}
            </span>
            <span className={styles.titleLine}>{content.line2}</span>
          </h2>
          <p className={cn("type-lead", styles.description)}>{content.text}</p>
        </header>

        <ul className={styles.levels}>
          {content.levels.map((level) => (
            <li key={level.title} className={styles.level}>
              <div className={styles.levelHeading}>
                <Image src={level.icon} alt="" width={24} height={24} />
                <h3>{level.title}</h3>
              </div>
              <p>{level.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.gems}>
          <h3 className={styles.gemsTitle}>{content.gemsTitle}</h3>
          <ul className={styles.gemGrid} aria-label="Exemplos de Gemas de Conhecimento">
            {content.gems.map((gem) => (
              <GemCardMotion key={gem.name} className={styles.card} style={{ "--gem-glow": gem.glow } as CSSProperties}>
                <div className={styles.visual}>
                  <div className={styles.metadata}>
                    <span>{gem.number}</span>
                    <span className={styles.status} title="Exemplo do estado conquistado">
                      <Image src="/assets/jornada/check.svg" alt="" width={13} height={13} />
                      {content.gemStatus}
                    </span>
                  </div>
                  <div className={styles.sphere}>
                    <GemOrb image={gem.image} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.gemName}>{gem.name}</h4>
                  <p className={styles.gemSubtitle}>{gem.title}</p>
                  <p className={styles.requirement}>{gem.text}</p>
                </div>
              </GemCardMotion>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
