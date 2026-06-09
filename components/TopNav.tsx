"use client";

import type Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";

/* Transparent top menu, centred in the top row. mix-blend-difference so the
   labels invert with each page's background. Jumps to a page section on the
   homepage; from other routes (e.g. project detail) it navigates home first. */
export default function TopNav() {
  const { t } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const LINKS = [
    { id: "home", label: t.nav.home },
    { id: "about-full", label: t.nav.about }, // About → page 4 (detailed about)
    { id: "work", label: t.nav.work },
  ];

  const go = (id: string) => {
    if (pathname !== "/") {
      router.push(id === "home" ? "/" : `/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-5 z-[200] mix-blend-difference sm:top-7">
      <div className="flex justify-center gap-7">
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className="label pointer-events-auto text-white transition-opacity duration-300 hover:opacity-60"
          >
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
