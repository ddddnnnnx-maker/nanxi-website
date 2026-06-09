"use client";

import { motion, type Variants } from "framer-motion";
import { useLang } from "@/lib/i18n";
import Contact from "./Contact";

/* Page 4 — About (detailed). Black background, white text, minimal editorial.
   Everything fades in + rises on scroll, staggered. Bilingual via useLang. */

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

const PHOTOS = [
  "/slide4/1.jpg",
  "/slide4/2.jpg",
  "/slide4/3.jpg",
  "/slide4/4.jpg",
  "/slide4/5.jpg",
  "/slide4/6.jpg",
  "/slide4/7.jpg",
  "/slide4/8.jpg",
  "/slide4/9.jpg",
  "/slide4/10.png",
];

const photoGroup: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const photoItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function Heading({ children }: { children: React.ReactNode }) {
  return <div className="label mb-6 text-white/40">{children}</div>;
}

export default function FourthSection() {
  const { t, lang } = useLang();
  const f = t.fourth;

  return (
    <section id="about-full" className="relative px-6 pb-40 pt-40 text-white sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <span className="label text-white/40">{f.about}</span>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <p className="max-w-[26ch] text-[clamp(1.7rem,3.6vw,3rem)] font-light leading-[1.18] tracking-[-0.02em]">
            {f.statement}
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-12">
          <p className="max-w-[60ch] text-[clamp(1rem,1.4vw,1.18rem)] leading-relaxed text-white/65">
            {f.bio}
          </p>
        </Reveal>

        {/* education */}
        <div className="mt-24">
          <Reveal><Heading>{f.eduHeading}</Heading></Reveal>
          <div className="border-t border-white/10">
            {f.edu.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.06}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/10 py-5">
                  <span className="text-[clamp(1.05rem,1.6vw,1.35rem)]">{e.school}</span>
                  <span className="label text-white/45">{e.year}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* what I learned */}
        <div className="mt-24">
          <Reveal><Heading>{f.learnedHeading}</Heading></Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[62ch] text-[clamp(1rem,1.4vw,1.18rem)] leading-relaxed text-white/65">
              {f.learnedBody}
            </p>
          </Reveal>
        </div>

        {/* skills & tools */}
        <div className="mt-24">
          <Reveal><Heading>{f.skillsHeading}</Heading></Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-[64ch] text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed">
              {f.tools.join("  ·  ")}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="max-w-[60ch] text-[clamp(0.95rem,1.3vw,1.1rem)] leading-relaxed text-white/55">
              {f.skillsNote}
            </p>
          </Reveal>
        </div>

        {/* work experience — placeholder */}
        <div className="mt-24">
          <Reveal><Heading>{f.workExpHeading}</Heading></Reveal>
          <Reveal delay={0.05}>
            <p className="text-white/30">{f.workExpPlaceholder}</p>
          </Reveal>
        </div>

        {/* photo wall */}
        <div className="mt-24">
          <Reveal><Heading>{f.studioHeading}</Heading></Reveal>
          <motion.div
            variants={photoGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="columns-2 gap-4 sm:columns-3 sm:gap-5"
          >
            {PHOTOS.map((src, i) => (
              <motion.div key={i} variants={photoItem} className="mb-4 break-inside-avoid sm:mb-5">
                <div className="group overflow-hidden rounded-lg border border-white/10 transition-transform duration-500 ease-out hover:-translate-y-1 hover:scale-[1.02]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" draggable={false} className="block h-auto w-full" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* contact */}
        <div className="mt-24">
          <Reveal><Heading>{lang === "zh" ? "联系" : "Contact"}</Heading></Reveal>
          <Reveal delay={0.05}>
            <Contact />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
