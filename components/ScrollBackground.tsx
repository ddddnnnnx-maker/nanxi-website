"use client";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

/* Scroll-driven cinematic transitions across 4 full-height pages.
   Background colour: off-white (p1) -> black (p2) -> off-white (p3) -> black (p4).
   ALL THREE transitions use the SAME warm "sunrise" glow (orange/red), a dome
   rising from the bottom; only the core colour differs to carry the next page's
   background up (black or off-white). Localized, never a full-screen gradient.
   `s` = scrollY in viewport heights. */

const OFF = "#F5F4EF";
const BLACK = "#000000";

function GlowSunrise({ progress, core }: { progress: MotionValue<number>; core: string }) {
  const opacity = useTransform(progress, [0, 0.45, 0.8, 1], [0, 1, 0.85, 0]);
  const scale = useTransform(progress, [0, 1], [0.85, 1.6]);
  const y = useTransform(progress, [0, 1], ["10%", "-18%"]);
  const hazeOpacity = useTransform(progress, [0, 0.45, 1], [0, 0.5, 0]);
  const hazeScale = useTransform(progress, [0, 1], [0.8, 1.5]);
  return (
    <>
      <motion.div
        style={{
          y, scale, opacity, transformOrigin: "50% 100%",
          background: `radial-gradient(ellipse 135% 100% at 50% 120%, ${core} 0%, ${core} 11%, rgba(255,150,70,0.95) 26%, rgba(232,74,38,0.85) 40%, rgba(120,38,40,0.5) 58%, rgba(20,12,16,0) 80%)`,
          filter: "blur(55px)",
        }}
        className="absolute inset-0"
      />
      <motion.div
        style={{
          scale: hazeScale, opacity: hazeOpacity, transformOrigin: "50% 100%",
          background: "radial-gradient(ellipse 90% 70% at 50% 112%, rgba(255,120,60,0.5) 0%, rgba(200,60,50,0.25) 45%, rgba(200,60,50,0) 72%)",
          filter: "blur(110px)",
        }}
        className="absolute inset-x-0 bottom-0 h-[80vh] mix-blend-screen"
      />
    </>
  );
}

export default function ScrollBackground() {
  const { scrollY } = useScroll();
  const s = useTransform(scrollY, (v) => v / (typeof window !== "undefined" ? window.innerHeight : 800));
  const sp = useSpring(s, { stiffness: 80, damping: 30, restDelta: 0.0004 });

  // base colour across 4 pages
  const baseColor = useTransform(
    sp,
    [0.5, 0.95, 2.7, 3.0, 3.6, 4.1],
    [OFF, BLACK, BLACK, OFF, OFF, BLACK]
  );

  const t1 = useTransform(sp, [0.45, 1.0], [0, 1]); // p1 -> p2  (core black)
  const t2 = useTransform(sp, [2.4, 3.0], [0, 1]); // p2 -> p3  (core off-white)
  const t3 = useTransform(sp, [3.6, 4.1], [0, 1]); // p3 -> p4  (core black)

  const pathname = usePathname();
  // only the homepage has the scroll-driven 4-page transitions; other routes
  // (e.g. project detail) get a plain off-white background.
  if (pathname !== "/") {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ backgroundColor: "#ffffff" }} />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [isolation:isolate]">
      <motion.div style={{ backgroundColor: baseColor }} className="absolute inset-0" />
      <GlowSunrise progress={t1} core={BLACK} />
      <GlowSunrise progress={t2} core={OFF} />
      <GlowSunrise progress={t3} core={BLACK} />
    </div>
  );
}
