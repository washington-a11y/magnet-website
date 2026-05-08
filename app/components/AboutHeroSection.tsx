"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const imgVectorM = "/assets/5bf92d92120899ea625773fc465a6a74df5decfa.svg";
const imgVectorA = "/assets/36dfdab13d470f1cedc8845d1a22a5425beed4ff.svg";
const imgVectorG = "/assets/e629751f536d67c0c11462459e513c38c37526f1.svg";
const imgVectorN = "/assets/41fba5acd42a6b72dbb6b9903ddb58ae8130ad71.svg";
const imgVectorE = "/assets/6d774790104d0cb6fcd56ada474b7ad2abfdae42.svg";
const imgVectorT = "/assets/87c3d4ed9eac32e0cc620d2b7afe0734556df8cf.svg";

const NAV_LINKS = ["Work", "About", "Blog", "Contact us"];

export default function AboutHeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".about-nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
      })
        .from(
          ".about-logo-letter",
          { y: 40, opacity: 0, duration: 0.8, stagger: 0.06 },
          "-=0.3"
        )
        .from(
          ".about-hero-text",
          { y: 50, opacity: 0, duration: 0.9 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-start justify-between w-full min-h-screen bg-[#111921] px-[32px] pt-[32px] pb-[96px]"
    >
      {/* Nav + Logo */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        <div className="flex items-center justify-between w-full">
          {NAV_LINKS.map((link) => (
            <div key={link} className="about-nav-item">
              <a
                href={`/${link.toLowerCase().replace(" ", "-")}`}
                className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[16px] uppercase tracking-wide text-[#fafafa] leading-[1.5] hover:opacity-70 transition-opacity"
              >
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* MAGNET logo */}
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ aspectRatio: "1229 / 165" }}
        >
          {[
            { src: imgVectorM, alt: "M", inset: "2.1% 81.04% 2.5% 0" },
            { src: imgVectorA, alt: "A", inset: "2.5% 63.09% 1.93% 20.03%" },
            { src: imgVectorG, alt: "G", inset: "0 46.8% 0 36.36%" },
            { src: imgVectorN, alt: "N", inset: "2.5% 30.12% 2.5% 54.39%" },
            { src: imgVectorE, alt: "E", inset: "2.5% 15.44% 2.47% 71.1%" },
            { src: imgVectorT, alt: "T", inset: "2.5% 0 1.93% 86.19%" },
          ].map(({ src, alt, inset }) => (
            <div key={alt} className="about-logo-letter absolute" style={{ inset }}>
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 w-full h-full"
                style={{ maxWidth: "none" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row — tagline + description */}
      <div className="about-hero-text flex items-start gap-[271px] w-full">
        <p
          className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#fafafa] tracking-[-0.99px] uppercase whitespace-nowrap leading-none"
        >
          your design partner
        </p>
        <p className="flex-1 font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#fafafa] tracking-[0.32px] leading-[1.5]">
          We strive to create designs that not only meet the expectations of our
          clients but also reflect the pride and creativity of our studio. Our
          goal is to ensure that every project we undertake showcases innovative
          solutions and aesthetic appeal, resulting in spaces that everyone can
          admire.
        </p>
      </div>
    </section>
  );
}
