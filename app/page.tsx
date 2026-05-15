import NavScroll       from "./components/NavScroll";
import HeroSection     from "./components/HeroSection";
import WorkSection     from "./components/WorkSection";
import WhatWeDoSection from "./components/WhatWeDoSection";
import ClientsSection  from "./components/ClientsSection";
import ResultsSection  from "./components/ResultsSection";
import BlogSection     from "./components/BlogSection";
import CTASection      from "./components/CTASection";
import Footer          from "./components/Footer";

export default function Home() {
  return (
    <main>
      {/* Sticky nav — hidden until user scrolls up */}
      <NavScroll />

      {/* 1. Hero — dark bg, full-screen, sticky — sections scroll over it */}
      <HeroSection />

      {/* 2. Work — light bg, staggered image grid */}
      <WorkSection />

      {/* 3. What We Do — yellow bg, service accordion rows */}
      <WhatWeDoSection />

      {/* 4. Clients + Stats + Work Carousel — light bg */}
      <ClientsSection />

      {/* 5. Real Results — dark bg, marquee + testimonial card */}
      <ResultsSection />

      {/* 6. What's New (Blog) — light bg, 3-column posts */}
      <BlogSection />

      {/* 7. Ready to be Magnetic (CTA) — blue bg */}
      <CTASection />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
