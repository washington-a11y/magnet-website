"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PAGE_REVEAL_DELAY } from "./TransitionContext";

// Same SVG assets as HeroSection
const imgVectorM = "/assets/5bf92d92120899ea625773fc465a6a74df5decfa.svg";
const imgVectorA = "/assets/36dfdab13d470f1cedc8845d1a22a5425beed4ff.svg";
const imgVectorG = "/assets/e629751f536d67c0c11462459e513c38c37526f1.svg";
const imgVectorN = "/assets/41fba5acd42a6b72dbb6b9903ddb58ae8130ad71.svg";
const imgVectorE = "/assets/6d774790104d0cb6fcd56ada474b7ad2abfdae42.svg";
const imgVectorT = "/assets/87c3d4ed9eac32e0cc620d2b7afe0734556df8cf.svg";

const NAV_LINKS = ["Work", "About", "Blog", "Contact us"];

export default function AboutHeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: PAGE_REVEAL_DELAY, defaults: { ease: "power3.out" } });

      // Same sequence as HeroSection — nav down, logo fan-in, bottom row up
      tl.from(".nav-item", {
          y: -20, opacity: 0, duration: 0.6, stagger: 0.08,
        })
        .from(".logo-letter", {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.06,
        }, "-=0.3")
        .from(heroTextRef.current, {
          y: 60, opacity: 0, duration: 0.9,
        }, "-=0.4")
        .from(descRef.current, {
          y: 60, opacity: 0, duration: 0.9,
        }, "-=0.7");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-between w-full h-screen min-h-[700px] bg-[#111921] px-[96px] py-[32px]"
    >
      {/* ── Nav + Logo — identical to home ── */}
      <div className="flex flex-col gap-4 items-start w-full">
        <div className="flex items-center justify-between w-full">
          {NAV_LINKS.map((link) => (
            <div key={link} className="nav-item">
              <a
                href={`/${link.toLowerCase().replace(" ", "-")}`}
                className="nav-link font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[16px] uppercase tracking-wide text-[#fafafa] leading-[1.5]"
              >
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* MAGNET logo — same structure as home */}
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ aspectRatio: "1229 / 165" }}
        >
          <div className="logo-letter absolute" style={{ inset: "2.1% 81.04% 2.5% 0" }}>
            <img src={imgVectorM} alt="M" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
          </div>
          <div className="logo-letter absolute" style={{ inset: "2.5% 63.09% 1.93% 20.03%" }}>
            <img src={imgVectorA} alt="A" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
          </div>
          <div className="logo-letter absolute" style={{ inset: "0 46.8% 0 36.36%" }}>
            <img src={imgVectorG} alt="G" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
          </div>
          <div className="logo-letter absolute" style={{ inset: "2.5% 30.12% 2.5% 54.39%" }}>
            <img src={imgVectorN} alt="N" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
          </div>
          <div className="logo-letter absolute" style={{ inset: "2.5% 15.44% 2.47% 71.1%" }}>
            <img src={imgVectorE} alt="E" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
          </div>
          <div className="logo-letter absolute" style={{ inset: "2.5% 0 1.93% 86.19%" }}>
            <img src={imgVectorT} alt="T" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
          </div>
        </div>
      </div>

      {/* ── Bottom row: tagline + description (replaces video) ── */}
      <div className="flex items-end justify-between w-full">
        {/* Tagline — same style as home */}
        <div ref={heroTextRef}>
          <h1 className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[48px] uppercase text-[#fafafa] leading-tight max-w-[746px]">
            Your design partner
          </h1>
        </div>

        {/* Description paragraph — replaces the video box */}
        <div ref={descRef} className="max-w-[391px]">
          <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#99a1af] tracking-[0.32px] leading-[1.6]">
            We strive to create designs that not only meet the expectations of
            our clients but also reflect the pride and creativity of our studio.
            Our goal is to ensure that every project we undertake showcases
            innovative solutions and aesthetic appeal.
          </p>
        </div>
      </div>
    </section>
  );
}
