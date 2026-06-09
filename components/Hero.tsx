"use client";

import { useEffect, useRef, useState } from "react";
import { heroImages } from "@/lib/projects";

/* Seamless, endless horizontal 3D carousel.
   - flat row, every panel the same height (no big->small recede)
   - gentle continuous auto-drift  +  vertical scroll drives horizontal motion
   - drag the band (fine pointers) with inertia on release
   - wraps in BOTH directions: cards leaving one side reappear on the other,
     never reaching a start or an end. */

const AUTO = -20;       // px / s, continuous leftward drift (exhibition wall)
const SCROLL_K = 1.7;   // how strongly vertical scroll pushes the band
const FRICTION = 2.0;   // velocity decay (per second, exponential)

export default function Hero() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const copiesRef = useRef(2);
  const [copies, setCopies] = useState(2);
  copiesRef.current = copies;

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // width of ONE set of cards; wrapping happens by exactly this distance
    let one = track.scrollWidth / copiesRef.current;
    const remeasure = () => {
      const w = track.scrollWidth / copiesRef.current;
      if (w > 0) {
        one = w;
        // render enough copies that the row always covers the viewport after a wrap
        const need = Math.max(2, Math.ceil(window.innerWidth / w) + 1);
        if (need !== copiesRef.current) setCopies(need);
      }
    };
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(track);

    let pos = 0;
    let vel = 0;            // px / s from scroll + drag release
    let dragging = false;
    let lastX = 0;
    let dragVel = 0;
    let lastMoveT = performance.now();

    // vertical scroll -> horizontal velocity (page still scrolls normally)
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      vel -= (y - lastScroll) * SCROLL_K;
      lastScroll = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // drag (mouse only; touch keeps native vertical scroll + auto drift)
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      dragVel = 0;
      lastMoveT = performance.now();
      section.classList.add("is-grabbing");
      try { section.setPointerCapture(e.pointerId); } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(now - lastMoveT, 1);
      const dx = e.clientX - lastX;
      pos += dx;
      dragVel = (dx / dt) * 1000;
      lastX = e.clientX;
      lastMoveT = now;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      vel = dragVel;                 // release -> inertia
      section.classList.remove("is-grabbing");
    };
    if (fine) {
      section.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    }

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!dragging) {
        pos += ((reduce ? 0 : AUTO) + vel) * (dt / 1000);
        vel *= Math.exp((-dt / 1000) * FRICTION);
        if (Math.abs(vel) < 0.02) vel = 0;
      }
      if (one > 0) {
        while (pos <= -one) pos += one;   // wrap left -> right
        while (pos > 0) pos -= one;        // wrap right -> left
      }
      track.style.transform = `translate3d(${pos}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (fine) {
        section.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
      }
    };
  }, [copies]);

  // base set duplicated `copies` times for a gap-free, seamless loop
  const cards = Array.from({ length: copies }).flatMap(() => heroImages);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen select-none items-center overflow-hidden [touch-action:pan-y]"
    >
      {/* eye-level row of side-turned panels (reference angle) — spacing unchanged */}
      <div ref={trackRef} className="flex w-max will-change-transform">
        {cards.map((src, i) => (
          <div
            key={i}
            className="relative mr-8 h-[clamp(250px,30vw,420px)] w-[clamp(150px,15vw,230px)] shrink-0 overflow-hidden rounded-sm bg-[#e9e9e4] shadow-[0_40px_70px_-25px_rgba(17,17,17,0.5)] sm:mr-12"
            style={{ transform: "perspective(900px) rotateY(-34deg)" }}
          >
            {/* any aspect ratio is cropped to the card shape */}
            <img src={src} alt="" draggable={false} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-white/5" />
          </div>
        ))}
      </div>
    </section>
  );
}
