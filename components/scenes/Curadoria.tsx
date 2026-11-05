import type { CuradoriaContent } from "@/content/types";
import { PropostaPanels } from "@/components/ui/proposta/PropostaPanels";
import { cn } from "@/lib/cn";
import tokens from "@/components/ui/proposta/tokens.module.css";
import styles from "./Curadoria.module.css";

export function Curadoria({ content }: { content: CuradoriaContent }) {
  return (
    <section id="curadoria" aria-labelledby="curadoria-title" data-theme="solido-escuro"
      className={cn(tokens.theme, styles.section)}>
      <div className={cn("container-page", styles.layout)}>
        <header className={styles.introduction}>
          <p className={cn("type-eyebrow", styles.label)}>{content.label}</p>
          <div className={styles.copy}>
            <h2 id="curadoria-title" className={cn("type-title", styles.title)}>{content.line1} {content.line2}</h2>
            <p className={cn("type-lead", styles.description)}>{content.text}</p>
          </div>
        </header>
        <PropostaPanels principles={content.principles} />
      </div>
    </section>
  );
}
