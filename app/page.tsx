import NavScroll      from "./components/NavScroll";
import HeroSection    from "./components/HeroSection";
import VideoSection   from "./components/VideoSection";
import WorkSection    from "./components/WorkSection";
import WhatWeDoSection from "./components/WhatWeDoSection";
import ClientsSection from "./components/ClientsSection";
import ResultsSection from "./components/ResultsSection";
import BlogSection    from "./components/BlogSection";
import CTASection     from "./components/CTASection";
import Footer         from "./components/Footer";

export default function Home() {
  return (
    <main>
      {/* Sticky nav — hidden until user scrolls up */}
      <NavScroll />

      {/* 1. Hero — dark bg, full-screen, logo + nav + tagline + video */}
      <HeroSection />

      {/* 2. Video — dark bg, fullwidth video with floating headline */}
      <VideoSection />

      {/* 3. Work — light bg, staggered image grid */}
      <WorkSection />

      {/* 4. What We Do — yellow bg, service accordion rows */}
      <WhatWeDoSection />

      {/* 5. Clients + Stats + Work Carousel — light bg */}
      <ClientsSection />

      {/* 6. Real Results — dark bg, marquee + testimonial card */}
      <ResultsSection />

      {/* 7. What's New (Blog) — light bg, 3-column posts */}
      <BlogSection />

      {/* 8. Ready to be Magnetic (CTA) — blue bg */}
      <CTASection />

      {/* 9. Footer */}
      <Footer />
    </main>
  );
}
