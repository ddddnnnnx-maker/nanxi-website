"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/* When the home page is reached with a hash (e.g. /#work after pressing "back"
   from a detail page, or via the top nav from another route), Next's native
   hash scroll fights Lenis and often lands on the wrong section. This jumps
   precisely to the target section with Lenis once the page has mounted. */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash?.slice(1);
    if (!hash) return;

    let tries = 0;
    const tick = () => {
      const el = document.getElementById(hash);
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: 0, immediate: true });
        else el.scrollIntoView();
      }
      // re-assert a few times in case layout/scroll resets right after mount
      if (++tries < 5) window.setTimeout(tick, 110);
    };
    const id = window.setTimeout(tick, 50);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
