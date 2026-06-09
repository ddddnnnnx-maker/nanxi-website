"use client";

import { useRef, useState } from "react";

/* Tiny icon-only music toggle, pinned at the bottom-centre (out of the way).
   mix-blend-difference keeps it visible on both the warm-white and black sections.
   Drop an audio file at /public/music/track.mp3 to give it sound. */
export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) { el.pause(); setPlaying(false); }
      else { await el.play(); setPlaying(true); }
    } catch {
      setPlaying(false); // no file yet / autoplay blocked
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 mix-blend-difference sm:bottom-7">
      <button
        onClick={toggle}
        aria-label={playing ? "Stop music" : "Play music"}
        aria-pressed={playing}
        className="block h-3 w-3 border border-white transition-all duration-500 ease-out-soft hover:scale-110"
        style={{ background: playing ? "#fff" : "transparent" }}
      />
      <audio ref={audioRef} src="/music/track.mp3" loop preload="none" />
    </div>
  );
}
