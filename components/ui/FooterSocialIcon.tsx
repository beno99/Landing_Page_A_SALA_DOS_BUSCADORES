import type { FooterSocial } from "@/content/types";

/** Outlined social marks, matching the supplied footer reference. */
export function FooterSocialIcon({ icon }: { icon: FooterSocial["icon"] }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {icon === "youtube" && <><path d="M21.2 6.7c-.2-1.1-.9-1.8-2-2C17.5 4.3 14.6 4 12 4s-5.5.3-7.2.7c-1.1.2-1.8.9-2 2C2.3 8.2 2.2 10.3 2.2 12s.1 3.8.6 5.3c.2 1.1.9 1.8 2 2 1.7.4 4.6.7 7.2.7s5.5-.3 7.2-.7c1.1-.2 1.8-.9 2-2 .5-1.5.6-3.6.6-5.3s-.1-3.8-.6-5.3Z" /><path d="m10 8.7 5.2 3.3-5.2 3.3Z" /></>}
      {icon === "instagram" && <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>}
      {icon === "tiktok" && <path d="M14 2h3c.3 3 1.6 4.5 4 5v3c-1.6 0-3.1-.5-4-1.4V16a6 6 0 1 1-7-5.9v3.2a3 3 0 1 0 4 2.7V2Z" />}
      {icon === "facebook" && <><circle cx="12" cy="12" r="9.5" /><path d="M13 21.5V11c0-2.7 1.2-3.5 4-3M9 13h7" /></>}
      {icon === "x" && <><path d="M4 3h4l12 18h-4L4 3Z" /><path d="m20 3-7.7 8.2M4 21l7.6-8.2" /></>}
      {icon === "email" && <><path d="M2.5 5h19v14h-19z" /><path d="m3 5.5 9 8 9-8" /></>}
    </svg>
  );
}
