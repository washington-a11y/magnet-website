"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Project data ── */
const PROJECTS = [
  { id: 1, name: "NorthGuide",          category: "government",  slug: "northguide",    img: "/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png", imgH: 343 },
  { id: 2, name: "MedMe",               category: "health care", slug: "medme",         img: "/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png", imgH: 300 },
  { id: 3, name: "ThreeW International",category: "agencies",    slug: "",              img: "/assets/09f9d3f9191adcf0afa33899ed81158015a968b3.png", imgH: 281 },
  { id: 4, name: "Golden Diner",        category: "restaurants", slug: "golden-diner",  img: "/assets/d29099a355c65750667c69a33a39dc4ce6897c90.png", imgH: 232 },
  { id: 5, name: "Covalent",            category: "tech",        slug: "covalent",      img: "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png", imgH: 344 },
  { id: 6, name: "Jades",               category: "restaurants", slug: "jades",         img: "/assets/jades/image 1.png",                           imgH: 233 },
  { id: 7, name: "StackDeck",           category: "tech",        slug: "stackdeck",     img: "/assets/e0273bf3c6ebff83f16c5a210e87202778a7d4d3.png", imgH: 198 },
  { id: 8, name: "Epoch",               category: "tech",        slug: "epoch",         img: "/assets/28d3e35ba177c27b89b63a405db317b1d920ce1d.png", imgH: 281 },
  { id: 9, name: "Spanning Labs",       category: "fintech",     slug: "spanning-labs", img: "/assets/a15ee6970401f72f8376e623a0d7f379a2f5a5b7.png", imgH: 222 },
];

const FILTERS = [
  "All",
  "Tech",
  "Restaurants",
  "Agencies",
  "Government",
  "Health Care",
  "Fintech",
];

/* ── Card component ── */
function ProjectCard({
  project,
  onNavigate,
}: {
  project: (typeof PROJECTS)[0];
  onNavigate: (slug: string) => void;
}) {
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    gsap.to(imgRef.current, { scale: 1.05, duration: 0.4, ease: "power2.out" });
    gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
  };
  const handleLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.25 });
  };

  return (
    <div
      className="work-card flex flex-col gap-[16px] mb-[32px] cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => project.slug && onNavigate(project.slug)}
    >
      {/* Image — viewTransitionName matches the hero on the project page */}
      <div
        className="work-card-image relative rounded-[8px] overflow-hidden w-full"
        style={{
          height: `${project.imgH}px`,
          viewTransitionName: project.slug ? `project-${project.slug}` : undefined,
        } as React.CSSProperties}
      >
        <div ref={imgRef} className="absolute inset-0">
          <img
            src={project.img}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="work-card-overlay absolute inset-0 bg-[rgba(17,25,33,0.45)] flex items-end p-[20px]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#fafafa] tracking-[0.28px] uppercase">
            View project →
          </span>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between w-full">
        <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5]">
          {project.name}
        </p>
        <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5] capitalize bg-[#f9faff] border border-[rgba(17,25,33,0.15)] px-[16px] py-[6px] rounded-[100px] shrink-0">
          {project.category}
        </span>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const router = useRouter();
  const [, startReactTransition] = useTransition();

  function handleNavigate(slug: string) {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      sessionStorage.setItem("vt-slug", slug);
      (document as any).startViewTransition(() => {
        startReactTransition(() => router.push(`/work/${slug}`));
      });
    } else {
      router.push(`/work/${slug}`);
    }
  }

  /* Filter */
  const filtered =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );

  /* Distribute into 3 columns */
  const cols: (typeof PROJECTS)[] = [[], [], []];
  filtered.forEach((p, i) => cols[i % 3].push(p));

  /* Heading + filter reveal on mount */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".works-heading", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".works-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Re-animate cards when filter changes */
  useEffect(() => {
    gsap.fromTo(
      ".work-card",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }
    );
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      className="works-section w-full bg-[#f9faff] px-[32px] py-[96px] flex flex-col gap-[48px]"
    >
      {/* Heading */}
      <h2 className="works-heading font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#111921] tracking-[-0.99px] uppercase leading-none">
        Feature Projects
      </h2>

      {/* Filter pills */}
      <div className="works-filters flex flex-wrap gap-[12px]">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`works-filter-pill font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] tracking-[0.28px] leading-[1.5] capitalize px-[20px] py-[8px] rounded-[100px] border transition-colors duration-200 ${
              activeFilter === f
                ? "bg-[#111921] text-[#fafafa] border-[#111921]"
                : "bg-transparent text-[#111921] border-[rgba(17,25,33,0.3)] hover:border-[#111921]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 3-column masonry grid */}
      <div className="grid grid-cols-3 gap-x-[32px] items-start">
        {cols.map((col, ci) => (
          <div key={ci} className="flex flex-col">
            {col.map((project) => (
              <ProjectCard key={project.id} project={project} onNavigate={handleNavigate} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
