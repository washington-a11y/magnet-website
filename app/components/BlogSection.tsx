"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POSTS } from "../data/posts";

gsap.registerPlugin(ScrollTrigger);

const designShiftLogo = "/assets/jades/blog/Design Shift.svg";

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = POSTS.find((p) => p.featured)!;
  const cards    = POSTS.filter((p) => !p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header: logo slides from left, desc from right
      gsap.from(".blog-header-logo", {
        x: -40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-header", start: "top 82%", toggleActions: "play none none reverse" },
      });
      gsap.from(".blog-header-desc", {
        x: 40, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-header", start: "top 82%", toggleActions: "play none none reverse" },
      });

      // Featured image scales in
      gsap.from(".blog-featured-image", {
        scale: 1.04, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".blog-featured", start: "top 85%", toggleActions: "play none none reverse" },
      });

      // Featured card slides up after image
      gsap.from(".blog-featured-card", {
        y: 32, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".blog-featured", start: "top 80%", toggleActions: "play none none reverse" },
      });

      // Blog cards stagger up
      gsap.from(".blog-card", {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".blog-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });

      // Card hover: image scale
      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card) => {
        const img = card.querySelector<HTMLElement>(".blog-card-image");
        card.addEventListener("mouseenter", () => {
          if (img) gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="blog-section w-full bg-[#f9faff] px-[32px] py-[96px] flex flex-col gap-[32px]"
    >
      {/* ── Header ── */}
      <div className="blog-header flex items-start justify-between w-full pb-[32px]">
        <div className="blog-header-logo shrink-0 w-[322px] h-[112px] relative">
          <img
            src={designShiftLogo}
            alt="Design Shift"
            className="absolute inset-0 w-full h-full object-contain object-left"
          />
        </div>
        <p className="blog-header-desc font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5] w-[523px] shrink-0">
          A knowledgeable client is the best partner. "Design Shift" is our commitment to education. We want to demystify the design process, explain the "why" behind our strategic choices, and empower business owners to make better-informed decisions.
        </p>
      </div>

      {/* ── Featured post ── */}
      <a href={`/blog/${featured.slug}`} className="blog-featured relative w-full rounded-[15px] overflow-hidden block cursor-pointer">
        {/* Image */}
        <div className="blog-featured-image w-full h-[569px] overflow-hidden rounded-[15px]">
          <img
            src={featured.img}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay card */}
        <div className="blog-featured-card absolute bottom-[29px] left-[12px] bg-[#f9faff] rounded-[8px] p-[32px] w-[731px] flex flex-col gap-[8px]">
          <div className="blog-featured-meta flex gap-[4px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#41474d] tracking-[0.28px] leading-[1.5]">
            <span>{featured.date}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
          <h2 className="blog-featured-title font-['Swis721_Cn_BT',sans-serif] font-bold text-[64px] text-[#111921] tracking-[-0.99px] uppercase leading-none">
            {featured.title}
          </h2>
        </div>
      </a>

      {/* ── Card grid ── */}
      <div className="blog-grid flex flex-wrap gap-[32px] items-start w-full pt-[16px]">
        {cards.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card flex flex-col gap-[10px] cursor-pointer w-[384px]"
          >
            <div className="relative rounded-[8px] overflow-hidden w-full h-[323px]">
              <div className="blog-card-image absolute inset-0">
                <img
                  src={post.img}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="blog-card-title font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[24px] text-[#111921] leading-[1.05] w-full">
              {post.title}
            </p>
            <p className="blog-card-date font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[14px] text-[#a0a3a6] tracking-[0.28px] uppercase leading-none">
              {post.date}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
