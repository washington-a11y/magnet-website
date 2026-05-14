"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogPost } from "../data/posts";

gsap.registerPlugin(ScrollTrigger);

export default function BlogItemRelated({ posts }: { posts: BlogPost[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".post-related-heading", {
        y: 24, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".post-related-heading", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".post-related-card", {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: ".post-related-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });

      // Hover: image scale
      gsap.utils.toArray<HTMLElement>(".post-related-card").forEach((card) => {
        const img = card.querySelector<HTMLElement>(".post-related-image");
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
      className="post-related w-full bg-[#f9faff] px-[32px] py-[96px] flex flex-col gap-[32px]"
    >
      <h2 className="post-related-heading font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#111921] tracking-[-0.99px] uppercase leading-none">
        Related articles
      </h2>

      <div className="post-related-grid flex flex-wrap gap-[32px] items-start w-full">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="post-related-card flex flex-col gap-[10px] w-[384px] cursor-pointer"
          >
            <div className="relative rounded-[8px] overflow-hidden w-full h-[323px]">
              <div className="post-related-image absolute inset-0">
                <img
                  src={post.img}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="post-related-title font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[24px] text-[#111921] leading-[1.05] w-full">
              {post.title}
            </p>
            <p className="post-related-date font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[14px] text-[#a0a3a6] tracking-[0.28px] uppercase leading-none">
              {post.date}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
