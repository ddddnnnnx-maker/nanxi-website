"use client";

import { useLang } from "@/lib/i18n";

/* Bottom-centre language switch (中 / EN). mix-blend-difference so it inverts
   with each page's background, like the cursor and corner text. */
export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 mix-blend-difference text-white sm:bottom-7"
    >
      <span className="label flex items-center gap-2">
        <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
        <span className="opacity-30">/</span>
        <span className={lang === "zh" ? "opacity-100" : "opacity-40"}>中</span>
      </span>
    </button>
  );
}
