"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RelatedProject } from "../types";

gsap.registerPlugin(ScrollTrigger);

export default function WorkItemRelated({ projects }: { projects: RelatedProject[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".related-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".related-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards stagger in
      gsap.from(".related-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".related-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Hover interactions per card
      gsap.utils.toArray<HTMLElement>(".related-card").forEach((card) => {
        const img     = card.querySelector<HTMLElement>(".related-card-image");
        const overlay = card.querySelector<HTMLElement>(".related-card-overlay");
        if (overlay) gsap.set(overlay, { autoAlpha: 0 });

        card.addEventListener("mouseenter", () => {
          if (img)     gsap.to(img,     { scale: 1.05, duration: 0.4, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          if (img)     gsap.to(img,     { scale: 1,    duration: 0.4, ease: "power2.out" });
          if (overlay) gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: "power2.in" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="related-section w-full bg-[#f9faff] px-[32px] py-[96px] flex flex-col gap-[32px]"
    >
      <h2 className="related-heading font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#111921] tracking-[-0.99px] uppercase leading-none">
        Related Projects
      </h2>

      <div className="related-grid grid grid-cols-2 gap-[32px]">
        {projects.map((p) => (
          <a
            key={p.slug}
            href={`/work/${p.slug}`}
            className="related-card flex flex-col gap-[16px] cursor-pointer"
          >
            {/* Image + overlay */}
            <div className="relative h-[356px] rounded-[8px] overflow-hidden w-full">
              <div className="related-card-image absolute inset-0">
                <img
                  src={p.img}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div
                className="related-card-overlay absolute inset-0 bg-[rgba(17,25,33,0.45)] flex items-end p-[20px]"
                style={{ opacity: 0, visibility: "hidden" }}
              >
                <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#fafafa] tracking-[0.28px] uppercase">
                  View project →
                </span>
              </div>
            </div>

            {/* Meta row */}
            <div className="related-card-meta flex items-center justify-between w-full">
              <p className="related-card-name font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5]">
                {p.name}
              </p>
              <span className="related-card-category font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5] capitalize bg-[#f9faff] border border-[rgba(17,25,33,0.15)] px-[16px] py-[6px] rounded-[100px] shrink-0">
                {p.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
