"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";
import Contact from "./Contact";

/* Page 2 — About (black). The content floats in ONLY AFTER the background has
   fully turned black. Reveal is driven by scroll progress (s = scrollY in
   viewport heights), the same clock ScrollBackground uses: black is complete by
   s≈0.95, so the content fades+rises in over s≈1.0 → 1.45, staggered
   (photo → name → role → intro). The section is 200vh with a sticky inner, so
   the content is pinned/centred while this happens. */

export default function SecondSection() {
  const { t } = useLang();
  const { scrollY } = useScroll();
  const s = useTransform(scrollY, (v) => v / (typeof window !== "undefined" ? window.innerHeight : 800));
  const sp = useSpring(s, { stiffness: 80, damping: 30, restDelta: 0.0004 });

  const photoO = useTransform(sp, [1.0, 1.25], [0, 1]);
  const photoY = useTransform(sp, [1.0, 1.25], [36, 0]);
  const nameO = useTransform(sp, [1.07, 1.32], [0, 1]);
  const nameY = useTransform(sp, [1.07, 1.32], [36, 0]);
  const roleO = useTransform(sp, [1.13, 1.38], [0, 1]);
  const roleY = useTransform(sp, [1.13, 1.38], [36, 0]);
  const introO = useTransform(sp, [1.19, 1.46], [0, 1]);
  const introY = useTransform(sp, [1.19, 1.46], [36, 0]);
  const contactO = useTransform(sp, [1.26, 1.54], [0, 1]);
  const contactY = useTransform(sp, [1.26, 1.54], [36, 0]);

  return (
    // tall section + sticky inner = the page "holds" / pauses on black while you scroll
    <section id="about" className="relative h-[200vh]">
      <div className="sticky top-0 flex min-h-screen items-center px-6 py-24 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* left — vertical 3:4 photo */}
          <motion.div style={{ opacity: photoO, y: photoY }}>
            <div className="relative aspect-[3/4] w-full max-w-[440px] overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b20]">
              <Image
                src="/slide2/1.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 90vw, 440px"
                draggable={false}
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* right — name / role / intro */}
          <div className="text-left">
            <motion.h2
              style={{ opacity: nameO, y: nameY }}
              className="ml-[-0.04em] text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[0.98] tracking-[-0.02em]"
            >
              {t.second.name}
            </motion.h2>

            <motion.p style={{ opacity: roleO, y: roleY }} className="label mt-4 text-white/55">
              {t.second.role}
            </motion.p>

            <motion.p
              style={{ opacity: introO, y: introY }}
              className="mt-9 max-w-[46ch] text-[clamp(1rem,1.4vw,1.18rem)] leading-relaxed text-white/70"
            >
              {t.second.intro}
            </motion.p>

            <motion.div style={{ opacity: contactO, y: contactY }}>
              <Contact compact className="mt-9 border-t border-white/10 pt-8" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
