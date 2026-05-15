"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POSTS } from "../data/posts";
import TransitionLink from "./TransitionLink";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const cards = POSTS.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Cards stagger up
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
      className="blog-section relative w-full bg-[#f9faff] px-[32px] py-[96px] flex flex-col gap-[48px]"
    >
      {/* ── Title — animated by global HeadingAnimator ── */}
      <h2
        className="animated-header blog-section-title font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[48px] text-[#111921] leading-[1.05]"
        data-animate-start="top 88%"
        data-animate-stagger="0.12"
      >
        What&apos;s New
      </h2>

      {/* ── Card grid ── */}
      <div className="blog-grid flex gap-[32px] items-start w-full">
        {cards.map((post) => (
          <TransitionLink
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card flex flex-col gap-[10px] cursor-pointer flex-1"
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
          </TransitionLink>
        ))}
      </div>
    </section>
  );
}
