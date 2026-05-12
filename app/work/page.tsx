import NavScroll    from "../components/NavScroll";
import WorksSection from "../components/WorksSection";
import CTASection   from "../components/CTASection";
import Footer       from "../components/Footer";

export const metadata = {
  title: "Work — Magnet Studio",
  description:
    "Featured projects by Magnet Studio — branding, web design, and digital experiences.",
};

export default function WorkPage() {
  return (
    <main>
      {/* Always-visible nav — no hero on this page */}
      <NavScroll alwaysVisible />

      {/* 1. Projects grid + filter — pt clears the fixed nav (~61px) */}
      <div className="pt-[61px]">
        <WorksSection />
      </div>

      {/* 2. CTA */}
      <CTASection />

      {/* 3. Footer */}
      <Footer />
    </main>
  );
}
