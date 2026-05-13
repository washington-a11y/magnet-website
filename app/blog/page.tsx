import NavScroll   from "../components/NavScroll";
import BlogSection from "../components/BlogSection";
import CTASection  from "../components/CTASection";
import Footer      from "../components/Footer";

export const metadata = {
  title: "Blog — Magnet Studio",
  description: "Design Shift: insights on branding, strategy, and design from Magnet Studio.",
};

export default function BlogPage() {
  return (
    <main>
      <NavScroll alwaysVisible />
      <div className="pt-[61px]">
        <BlogSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
