import NavScroll          from "../components/NavScroll";
import AboutHeroSection   from "../components/AboutHeroSection";
import OurApproachSection from "../components/OurApproachSection";
import WhatWeDoSection    from "../components/WhatWeDoSection";
import AboutStatsSection  from "../components/AboutStatsSection";
import CTASection         from "../components/CTASection";
import Footer             from "../components/Footer";

export const metadata = {
  title: "About — Magnet Studio",
  description:
    "We're a Canadian-based design agency crafting awesome brands and websites since 2018.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Sticky nav — hidden until user scrolls up */}
      <NavScroll />

      {/* 1. Hero — dark bg, logo + tagline + description */}
      <AboutHeroSection />

      {/* 2. Our Approach — dark bg, Map / Design / Build */}
      <OurApproachSection />

      {/* 3. What We Do — yellow bg, service rows (reused from home) */}
      <WhatWeDoSection />

      {/* 4. About / Stats — light bg, team photo + stats */}
      <AboutStatsSection />

      {/* 5. CTA — blue bg (reused from home) */}
      <CTASection />

      {/* 6. Footer (reused from home) */}
      <Footer />
    </main>
  );
}
