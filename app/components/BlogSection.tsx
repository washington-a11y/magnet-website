"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  {
    src:   "/assets/43fbd1bbb3d3a3e249e03c79b9ca211a2cbdb973.png",
    title: "How UX/UI Design Converts Visitors into Customers",
    date:  "FEB 24, 2026",
    imgH:  "323px",
  },
  {
    src:   "/assets/d0b77ce149b1f99de71fcc1a20043ef02022cbc8.png",
    title: "How Cohesive Branding Builds Instant Trust",
    date:  "FEB 24, 2026",
    imgH:  "464px",
  },
  {
    src:   "/assets/d7d92b39dd5e592722d0848974ed64eafb321f5c.png",
    title: "The Tangible ROI of Strategic Business Design",
    date:  "FEB 24, 2026",
    imgH:  "335px",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.from(".blog-headline", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Blog cards stagger
      gsap.from(".blog-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Image scale on scroll (subtle parallax)
      document.querySelectorAll(".blog-img").forEach((img) => {
        gsap.to(img, {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-start justify-between w-full bg-[#f9faff] px-[96px] py-[96px] gap-[64px]"
    >
      <h2 className="blog-headline font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#111921] tracking-[-0.99px] uppercase">
        what&apos;s new
      </h2>

      <div className="blog-grid flex gap-[32px] w-full items-start">
        {POSTS.map(({ src, title, date, imgH }, i) => (
          <article
            key={i}
            className="blog-card flex flex-col gap-[10px] flex-1 cursor-pointer group"
          >
            {/* Image container */}
            <div
              className="relative rounded-[8px] overflow-hidden w-full"
              style={{ height: imgH }}
            >
              <img
                src={src}
                alt={title}
                className="blog-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Text */}
            <h3 className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[24px] text-[#111921] leading-[1.05]">
              {title}
            </h3>
            <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[14px] text-[#a0a3a6] tracking-[0.28px] uppercase">
              {date}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
