"use client";

import { useLang } from "@/lib/i18n";

/* Reusable contact block. Used on page 2 (compact) and page 4 (full).
   Both pages have a black background, so this is styled for dark.
   Emails are mailto:, phones are tel:, LinkedIn/Instagram are icon links. */

const EMAIL = "ddddnnnnx@gmail.com";
const EMAIL_CN = "NanxD92@163.com";
const PHONE_UK = "+44 07778340553";
const PHONE_CN = "+86 17813302997";
const LINKEDIN = "https://www.linkedin.com/in/nanxi-dao-4a7ab1339/";
const INSTAGRAM = "https://www.instagram.com/vvv.6574/";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.81.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.78.3-1.44.71-2.1 1.37C1.38 2.66.97 3.32.67 4.1.37 4.86.17 5.74.11 7.01.05 8.29.04 8.7.04 12s.01 3.71.07 4.99c.06 1.27.26 2.15.56 2.91.3.78.71 1.44 1.37 2.1.66.66 1.32 1.07 2.1 1.37.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.78-.3 1.44-.71 2.1-1.37.66-.66 1.07-1.32 1.37-2.1.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.99s-.01-3.71-.07-4.99c-.06-1.27-.26-2.15-.56-2.91-.3-.78-.71-1.44-1.37-2.1-.66-.66-1.32-1.07-2.1-1.37-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

function Socials() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="grid h-9 w-9 place-items-center rounded-full border border-white/20 p-2 text-white/70 transition-colors duration-300 hover:border-white hover:text-white"
      >
        <LinkedInIcon />
      </a>
      <a
        href={INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="grid h-9 w-9 place-items-center rounded-full border border-white/20 p-2 text-white/70 transition-colors duration-300 hover:border-white hover:text-white"
      >
        <InstagramIcon />
      </a>
    </div>
  );
}

export default function Contact({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { lang } = useLang();
  const L =
    lang === "zh"
      ? { email: "邮箱", emailCn: "国内邮箱", phoneUk: "电话（英国）", phoneCn: "电话（中国）" }
      : { email: "Email", emailCn: "Email (CN)", phoneUk: "Phone (UK)", phoneCn: "Phone (CN)" };

  const Item = ({ label, value, href }: { label: string; value: string; href: string }) => (
    <div className="flex flex-col gap-0.5">
      <span className="label text-white/40">{label}</span>
      <a
        href={href}
        className="w-fit text-[clamp(0.9rem,1.1vw,1rem)] text-white/80 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
      >
        {value}
      </a>
    </div>
  );

  return (
    <div className={className}>
      <div className={`grid gap-x-10 gap-y-4 ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2"}`}>
        <Item label={L.email} value={EMAIL} href={`mailto:${EMAIL}`} />
        <Item label={L.emailCn} value={EMAIL_CN} href={`mailto:${EMAIL_CN}`} />
        <Item label={L.phoneUk} value={PHONE_UK} href={`tel:${PHONE_UK.replace(/\s/g, "")}`} />
        <Item label={L.phoneCn} value={PHONE_CN} href={`tel:${PHONE_CN.replace(/\s/g, "")}`} />
      </div>
      <div className="mt-6">
        <Socials />
      </div>
    </div>
  );
}
