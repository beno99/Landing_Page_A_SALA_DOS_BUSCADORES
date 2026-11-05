"use client";
import Image from "next/image";
import NextLink from "next/link";
import type { FooterContent, Link } from "@/content/types";
import { FooterSocialIcon } from "@/components/ui/FooterSocialIcon";
import { cn } from "@/lib/cn";
import { scrollToTop } from "@/lib/scrollToSceneProgress";
import styles from "./FooterCurtain.module.css";

export function FooterCurtain({ content }: { content: FooterContent }) {
  return (
    <footer id="rodape" className={cn(styles.footer)}>
      <div className="container-page">
        <div className={styles.top}>
          <div className={styles.brand}>
            <NextLink href="/#inicio" aria-label={`${content.name}, início`} className={styles.brandLink}>
              <Image src="/images/brand/marca.webp" alt="" width={512} height={435} className={styles.mark} />
              <span aria-hidden="true" className={styles.name}>{content.name}</span>
            </NextLink>
            <p className={styles.description}>{content.description}</p>
            <p className={styles.motto}>{content.motto}</p>
          </div>
          {content.columns.map(column => (
            <nav key={column.title} aria-label={column.title} className={styles.column}>
              <h2 className={styles.heading}>{column.title}</h2>
              <ul className={styles.links}>
                {column.links.map(link => <li key={link.label}><FooterLink link={link} /></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <nav aria-label={content.socialTitle} className={styles.social}>
          <h2 className={styles.heading}>{content.socialTitle}</h2>
          <ul className={styles.socialList}>
            {content.social.map(item => (
              <li key={item.icon}>
                {item.href ? (
                  <a href={item.href} aria-label={item.label} title={item.label} className={styles.socialItem}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <FooterSocialIcon icon={item.icon} />
                  </a>
                ) : (
                  <span className={styles.socialItem} role="img" aria-label={`${item.label} — endereço a confirmar`} title={`${item.label} — endereço a confirmar`}>
                    <FooterSocialIcon icon={item.icon} />
                  </span>
                )}
              </li>
            ))}
            <li><a href={content.contact.href} aria-label={content.contact.label} title={content.contact.label} className={styles.socialItem}><FooterSocialIcon icon="email" /></a></li>
          </ul>
        </nav>
        <div className={styles.bottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} {content.copyright}</p>
          <button type="button" onClick={scrollToTop} className={styles.backToTop}>{content.backToTop}<span aria-hidden="true">↑</span></button>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ link }: { link: Link }) {
  if (link.href.startsWith("/")) return <NextLink href={link.href} className={styles.link}>{link.label}</NextLink>;
  return <a href={link.href} className={styles.link} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{link.label}</a>;
}
