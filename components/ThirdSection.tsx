"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { works } from "@/lib/works";

/* Page 3 — Works. Fixed top (headline + filters); images in an internal scroll
   window. Tiles are works-driven: a category with real works shows exactly that
   many tiles (else placeholders). Hovering a tile morphs the cursor into an info
   card; clicking opens /work/<id>. Bilingual via useLang. */

type Kind = "ui" | "product" | "other";
type Tile = { kind: Kind; n: number };

const PLACEHOLDER = 6; // tiles shown for a category that has no real works yet
const workCount = (kind: Kind) => Object.keys(works).filter((k) => k.startsWith(`${kind}-`)).length;
const make = (kind: Kind): Tile[] =>
  Array.from({ length: workCount(kind) || PLACEHOLDER }, (_, i) => ({ kind, n: i + 1 }));

const CAT_IDS = ["all", "ui", "product", "other"] as const;
type CatId = (typeof CAT_IDS)[number];

// deterministic hash → stable "random" order (no hydration mismatch)
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function tilesFor(cat: CatId): Tile[] {
  if (cat === "ui") return make("ui");
  if (cat === "product") return make("product");
  if (cat === "other") return make("other");
  // "all" — product first & dominant, then ui, then other; each group lightly
  // shuffled (deterministically) so it doesn't read as rigid columns.
  const rank: Record<Tile["kind"], number> = { product: 0, ui: 1, other: 2 };
  const all = [...make("product"), ...make("ui"), ...make("other")];
  return all.sort((a, b) => {
    if (rank[a.kind] !== rank[b.kind]) return rank[a.kind] - rank[b.kind];
    return (hash(`${a.kind}-${a.n}`) % 100) - (hash(`${b.kind}-${b.n}`) % 100);
  });
}

function UIShot() {
  return (
    <div className="flex h-full w-full flex-col gap-3 bg-[#101015] p-5">
      <div className="mx-auto h-1.5 w-12 rounded-full bg-white/15" />
      <div className="h-[42%] rounded-2xl bg-gradient-to-br from-[#2b2b38] to-[#16161d]" />
      <div className="h-2.5 w-3/4 rounded-full bg-white/20" />
      <div className="h-2.5 w-1/2 rounded-full bg-white/10" />
      <div className="mt-auto flex gap-2">
        <div className="h-9 flex-1 rounded-xl bg-white/90" />
        <div className="h-9 w-9 rounded-xl bg-white/15" />
      </div>
    </div>
  );
}
function ProductShot({ round }: { round: boolean }) {
  return (
    <div className="grid h-full w-full place-items-center bg-gradient-to-b from-[#EEEDE6] to-[#D8D5CB]">
      <div className={`h-[56%] w-[56%] bg-gradient-to-br from-white via-[#cfcabb] to-[#9a9486] shadow-[0_30px_50px_-15px_rgba(0,0,0,0.32)] ${round ? "rounded-full" : "rounded-[34%]"}`} />
    </div>
  );
}
function OtherShot({ i }: { i: number }) {
  const grads = [
    "linear-gradient(135deg,#E7D6C6,#B7C1C8)",
    "linear-gradient(135deg,#D8C9E0,#C7D2BE)",
    "linear-gradient(135deg,#E6CFC2,#CBD4DC)",
  ];
  return (
    <div className="relative h-full w-full" style={{ background: grads[i % grads.length] }}>
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-1/3 w-1/3 rounded-full bg-white/45 blur-2xl" />
      </div>
    </div>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ThirdSection() {
  const { t, lang } = useLang();
  const [cat, setCat] = useState<CatId>("all");
  const tiles = tilesFor(cat);
  const scrollRef = useRef<HTMLDivElement>(null);

  const labelFor = (k: Kind) =>
    k === "ui" ? t.work.filters.ui : k === "product" ? t.work.filters.product : t.work.filters.other;

  return (
    <section id="work" className="relative flex h-screen flex-col px-6 pb-8 pt-28 text-ink sm:px-10 lg:px-16">
      {/* TOP — fixed */}
      <div className="mx-auto w-full max-w-6xl shrink-0 text-center">
        <h2 className="mx-auto max-w-[28ch] text-[clamp(1.4rem,3.1vw,2.4rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink/40">
          {t.work.headline}
        </h2>

        <div className="mt-6 flex flex-wrap justify-center gap-7">
          {CAT_IDS.map((id) => (
            <button
              key={id}
              onClick={() => setCat(id)}
              className={`relative pb-1 text-[clamp(0.95rem,1.2vw,1.1rem)] transition-colors duration-300 ${
                cat === id ? "text-ink" : "text-ink/40 hover:text-ink/70"
              }`}
            >
              {t.work.filters[id]}
              <span
                className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-300 ${
                  cat === id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* BOTTOM — internal scroll window */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="mx-auto mt-9 min-h-0 w-full max-w-6xl flex-1 overflow-y-auto [scrollbar-width:thin]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="grid grid-cols-2 gap-5 pb-2 sm:grid-cols-3 sm:gap-6"
          >
            {tiles.map((tile, i) => {
              const id = `${tile.kind}-${tile.n}`;
              const num = String(tile.n).padStart(2, "0");
              const w = works[id];
              const cover = w?.cover;
              const title = w?.title ?? `${labelFor(tile.kind)} ${num}`;
              const tags = w?.types ? w.types[lang] : t.work.cardBrief;
              return (
                <motion.div
                  key={`${cat}-${id}`}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: scrollRef, once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease, delay: (i % 3) * 0.05 }}
                >
                  {/* hover-flip card: front = image, back = name + design tags */}
                  <Link href={`/work/${id}`} className="group block aspect-[4/3] [perspective:1200px]">
                    <div className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      {/* front */}
                      <div className="absolute inset-0 overflow-hidden border border-black/10 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.25)] [backface-visibility:hidden]">
                        {cover ? (
                          <Image
                            src={cover}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
                            draggable={false}
                            className="object-cover"
                          />
                        ) : tile.kind === "ui" ? (
                          <UIShot />
                        ) : tile.kind === "product" ? (
                          <ProductShot round={tile.n % 2 === 0} />
                        ) : (
                          <OtherShot i={tile.n} />
                        )}
                      </div>
                      {/* back */}
                      <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-ink p-6 text-paper [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <h3 className="text-[clamp(1.05rem,1.6vw,1.4rem)] font-semibold leading-tight tracking-[-0.01em]">
                          {title}
                        </h3>
                        <p className="text-[clamp(0.72rem,0.95vw,0.85rem)] leading-relaxed text-paper/65">
                          {tags}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
