"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { works } from "@/lib/works";

/* Project detail. Row 1 = first image (left, 4:3 like the thumbnail) + title &
   description (right). Below: the project's images shown FULL WIDTH at their own
   natural ratio (no cropping) — same container width, so widths line up and a
   taller image simply reads as "enlarged". Falls back to placeholder frames for
   ids that have no images yet. */

function Pic({ src, dark }: { src: string; dark?: boolean }) {
  // natural ratio, full width, framed
  return (
    <div className={`overflow-hidden border ${dark ? "border-white/10" : "border-black/10"}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" draggable={false} className="block h-auto w-full" />
    </div>
  );
}

function youTubeId(url: string): string {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return m ? m[1] : "";
}

function Frame({ ratio }: { ratio: string }) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className="w-full overflow-hidden border border-black/10 bg-gradient-to-br from-[#ECEAE3] to-[#D7D4CA]"
    >
      <div className="grid h-full w-full place-items-center">
        <span className="label text-black/20">Image</span>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { t, lang } = useLang();
  const params = useParams();
  const id = String(params?.id ?? "");
  const [kind = "ui", numRaw = "1"] = id.split("-");
  const num = String(numRaw).padStart(2, "0");
  const label =
    kind === "product" ? t.work.filters.product : kind === "other" ? t.work.filters.other : t.work.filters.ui;
  const title = `${label} ${num}`;
  const work = works[id];
  const dark = work?.theme === "dark";

  return (
    <main
      className={`relative min-h-screen px-6 pb-32 pt-28 sm:px-10 lg:px-16 ${
        dark ? "bg-black text-white" : "text-ink"
      }`}
    >
      {/* fixed back button — stays top-left while scrolling; returns to Works */}
      <Link
        href="/#work"
        className="label fixed left-5 top-16 z-[200] inline-flex items-center gap-2 text-white mix-blend-difference transition-opacity duration-300 hover:opacity-60 sm:left-7 sm:top-20"
      >
        <span>←</span> {t.detail.back}
      </Link>

      <div className="mx-auto w-full max-w-6xl">
        {/* row 1 — first image (4:3) left, title + description right */}
        <div className="mt-10 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {work ? <Pic src={work.cover} dark={dark} /> : <Frame ratio="4 / 3" />}
          <div>
            <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              {work?.title ?? title}
            </h1>
            {work?.types && (
              <div className={`label mt-4 ${dark ? "text-white/55" : "text-ink/55"}`}>{work.types[lang]}</div>
            )}
            {work?.date && (
              <div className={`label mt-1 ${dark ? "text-white/45" : "text-ink/40"}`}>{work.date}</div>
            )}
            {work?.collab && (
              <div className={`label mt-1 ${dark ? "text-white/45" : "text-ink/40"}`}>
                {lang === "zh" ? "合作项目" : "Collaboration project"}
              </div>
            )}
            {work?.solo && (
              <div className={`label mt-1 ${dark ? "text-white/45" : "text-ink/40"}`}>
                {lang === "zh" ? "个人项目" : "Individual work"}
              </div>
            )}
            <p
              className={`mt-6 max-w-[52ch] text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed ${
                dark ? "text-white/70" : "text-ink/60"
              }`}
            >
              {work?.description ? work.description[lang] : t.detail.description}
            </p>
          </div>
        </div>

        {/* process shots — full width, one per row */}
        <div className="mt-10 flex flex-col gap-8 sm:mt-12">
          {work
            ? work.images.map((src) => <Pic key={src} src={src} dark={dark} />)
            : [0, 1, 2, 3].map((i) => <Frame key={i} ratio="16 / 6" />)}
        </div>

        {/* hero / finished shots — full width by default, or N per row if heroCols set */}
        {work?.heroshots && work.heroshots.length > 0 && (
          work.heroCols && work.heroCols > 1 ? (
            <div
              className="mt-8 grid gap-6 sm:mt-10"
              style={{ gridTemplateColumns: `repeat(${work.heroCols}, minmax(0, 1fr))` }}
            >
              {work.heroshots.map((src) => (
                <div key={src} className={`overflow-hidden border ${dark ? "border-white/10" : "border-black/10"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" draggable={false} className="block aspect-[4/3] w-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-8 sm:mt-10">
              {work.heroshots.map((src) => <Pic key={src} src={src} dark={dark} />)}
            </div>
          )
        )}

        {/* embedded video — 16:9, at the very end */}
        {work?.video && youTubeId(work.video) && (
          <div className={`mt-8 overflow-hidden border sm:mt-10 ${dark ? "border-white/10" : "border-black/10"}`}>
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${youTubeId(work.video)}`}
                title="Project video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
