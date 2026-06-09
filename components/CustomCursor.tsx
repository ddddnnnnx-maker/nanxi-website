"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* Custom cursor — a small square that follows the mouse. mix-blend-difference is
   applied on the moving element itself so it truly inverts against each page's
   background colour. */

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 650, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 650, damping: 40, mass: 0.4 });
  const sqx = useTransform(sx, (v) => v - 8);
  const sqy = useTransform(sy, (v) => v - 8);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sqx, y: sqy }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 bg-white mix-blend-difference"
    />
  );
}
