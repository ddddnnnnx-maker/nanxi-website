import Hero from "@/components/Hero";
import SecondSection from "@/components/SecondSection";
import ThirdSection from "@/components/ThirdSection";
import FourthSection from "@/components/FourthSection";

export default function Home() {
  return (
    <main>
      {/* page transitions (off-white ⇄ black) + glow trails are driven by
          ScrollBackground (in layout). */}

      {/* 1 — Hero: seamless infinite 3D carousel */}
      <Hero />

      {/* 2 — About / intro (black) */}
      <SecondSection />

      {/* 3 — Works overview (off-white) */}
      <ThirdSection />

      {/* 4 — About, detailed (black) */}
      <FourthSection />
    </main>
  );
}
