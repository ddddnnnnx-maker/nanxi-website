"use client";

import LocalTime from "./LocalTime";
import { useLang } from "@/lib/i18n";

/* Four-corner pinned info frame. mix-blend-difference keeps it legible over both
   the off-white and black sections. Text is bilingual. */
export default function CornerFrame() {
  const { t } = useLang();
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference text-white">
      {/* top-left: name */}
      <div className="label absolute left-5 top-5 sm:left-7 sm:top-7">{t.brand}</div>

      {/* top-right: live local time */}
      <div className="label absolute right-5 top-5 text-right sm:right-7 sm:top-7">
        <LocalTime />
      </div>

      {/* bottom-left: tagline */}
      <div className="label absolute bottom-5 left-5 max-w-[42vw] sm:bottom-7 sm:left-7">
        {t.tagline}
      </div>

      {/* bottom-right: scroll hint */}
      <div className="label absolute bottom-5 right-5 flex items-center gap-1 sm:bottom-7 sm:right-7">
        <span>{t.scroll}</span>
        <span className="animate-bounce">↓</span>
      </div>
    </div>
  );
}
