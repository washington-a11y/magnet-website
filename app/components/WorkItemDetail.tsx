"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectData } from "../types";

gsap.registerPlugin(ScrollTrigger);

export default function WorkItemDetail({ project }: { project: ProjectData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overview columns slide in from opposite sides
      gsap.from(leftRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Gallery blocks fade + slide up on scroll
      gsap.utils.toArray<HTMLElement>(".project-gallery-block").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="project-detail w-full bg-[#f9faff] px-[32px] py-[96px] flex flex-col gap-[32px]"
    >
      {/* ── Overview row ── */}
      <div className="project-overview flex gap-[32px] items-start pb-[96px] border-b border-[rgba(17,25,33,0.1)]">

        {/* Left: meta + title + services */}
        <div
          ref={leftRef}
          className="project-overview-left flex flex-col gap-[32px] w-[640px] shrink-0"
        >
          {/* Client / Industry meta */}
          <div className="project-meta flex gap-[32px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] leading-[1.5] tracking-[0.32px]">
            <div className="project-meta-item flex gap-[8px] items-center">
              <span className="project-meta-label text-[#41474d]">Client:</span>
              <span className="project-meta-value text-[#111921]">{project.client}</span>
            </div>
            <div className="project-meta-item flex gap-[8px] items-center">
              <span className="project-meta-label text-[#41474d]">Industry:</span>
              <span className="project-meta-value text-[#111921]">{project.industry}</span>
            </div>
          </div>

          {/* Big tagline */}
          <h1 className="project-title font-['Swis721_Cn_BT',sans-serif] font-bold text-[64px] text-[#111921] tracking-[-0.99px] uppercase leading-none">
            {project.tagline}
          </h1>

          {/* Services list */}
          <ul className="project-services list-disc ml-[24px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#41474d] tracking-[0.32px] leading-[1.5] flex flex-col gap-[4px]">
            {project.services.map((s) => (
              <li key={s} className="project-service-item">{s}</li>
            ))}
          </ul>
        </div>

        {/* Right: challenge + solution */}
        <div
          ref={rightRef}
          className="project-overview-right flex flex-col gap-[48px] flex-1 min-w-0"
        >
          <div className="project-block flex flex-col gap-[24px]">
            <p className="project-block-label font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[19.2px] text-[#41474d] leading-[1.2] opacity-70">
              The Challenge
            </p>
            <p className="project-block-text font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5]">
              {project.challenge}
            </p>
          </div>
          <div className="project-block flex flex-col gap-[24px]">
            <p className="project-block-label font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[19.2px] text-[#41474d] leading-[1.2] opacity-70">
              The Solution
            </p>
            <p className="project-block-text font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5]">
              {project.solution}
            </p>
          </div>
        </div>
      </div>

      {/* ── Gallery blocks ── */}
      <div className="project-gallery flex flex-col gap-[32px] pt-[32px]">
        {project.gallery.map((block, i) =>
          block.type === "full" ? (
            <div key={i} className="project-gallery-block project-gallery-full relative w-full h-[637px] rounded-[8px] overflow-hidden">
              <img
                src={block.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ) : (
            <div key={i} className="project-gallery-block project-gallery-row flex gap-[32px]">
              <div className="project-gallery-item relative flex-1 h-[542px] rounded-[8px] overflow-hidden">
                <img
                  src={block.imgs[0]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="project-gallery-item relative flex-1 h-[542px] rounded-[8px] overflow-hidden">
                <img
                  src={block.imgs[1]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
