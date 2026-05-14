"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BlogPost } from "../data/posts";

export default function BlogItemHero({ post }: { post: BlogPost }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        scale: 1.04, opacity: 0, duration: 1.2, ease: "power3.out",
        clearProps: "opacity,scale",
      });
      gsap.from(cardRef.current, {
        y: 32, opacity: 0, duration: 0.8, delay: 0.3, ease: "power2.out",
        clearProps: "opacity,y",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="post-hero w-full bg-[#f9faff] px-[32px] pb-[0] pt-[0]">
      <div className="post-hero-wrapper relative w-full rounded-[15px] overflow-hidden">
        {/* Image */}
        <div ref={imgRef} className="post-hero-image w-full h-[569px] overflow-hidden rounded-[15px]">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay card */}
        <div
          ref={cardRef}
          className="post-hero-card absolute bottom-[29px] left-[12px] bg-[#f9faff] rounded-[8px] p-[32px] w-[731px] flex flex-col gap-[8px]"
        >
          <div className="post-hero-meta flex gap-[4px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#41474d] tracking-[0.28px] leading-[1.5]">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="post-hero-title font-['Swis721_Cn_BT',sans-serif] font-bold text-[64px] text-[#111921] tracking-[-0.99px] uppercase leading-none">
            {post.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
