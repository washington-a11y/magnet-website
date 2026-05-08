"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Figma asset URLs (localhost Figma server — swap for your hosted assets)
const imgVectorM   = "/assets/5bf92d92120899ea625773fc465a6a74df5decfa.svg";
const imgVectorA   = "/assets/36dfdab13d470f1cedc8845d1a22a5425beed4ff.svg";
const imgVectorG   = "/assets/e629751f536d67c0c11462459e513c38c37526f1.svg";
const imgVectorN   = "/assets/41fba5acd42a6b72dbb6b9903ddb58ae8130ad71.svg";
const imgVectorE   = "/assets/6d774790104d0cb6fcd56ada474b7ad2abfdae42.svg";
const imgVectorT   = "/assets/87c3d4ed9eac32e0cc620d2b7afe0734556df8cf.svg";
const imgGroup1698 = "/assets/b26ad21cd114f5a0799cb0e084f0474030a60ff3.svg";

const NAV_LINKS = ["Work", "About", "Blog", "Contact us"];

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const navRef      = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const flagRef     = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Nav links fade-down
      tl.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
      })
        // Logo letters fan in
        .from(
          ".logo-letter",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.06,
          },
          "-=0.3"
        )
        // Hero text slide up
        .from(
          heroTextRef.current,
          {
            y: 60,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.4"
        )
        // Video box scale + fade
        .from(
          videoBoxRef.current,
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.7"
        );

      // Flag wave — anchored on the left (flagpole side)
      gsap.to(flagRef.current, {
        skewX: 7,
        scaleX: 0.94,
        duration: 0.9,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "left center",
      });
      // Second, slightly offset oscillation for a natural ripple
      gsap.to(flagRef.current, {
        rotation: 2.5,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "left center",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-between w-full h-screen min-h-[700px] bg-[#111921] px-[96px] py-[32px]"
    >
      {/* ── Nav ── */}
      <div ref={navRef} className="flex flex-col gap-4 items-start w-full">
        {/* Menu items */}
        <div className="flex items-center justify-between w-full">
          {NAV_LINKS.map((link) => (
            <div key={link} className="nav-item">
              <a
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="nav-link font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[16px] uppercase tracking-wide text-[#fafafa] leading-[1.5]"
              >
                {link}
              </a>
            </div>
          ))}
        </div>

        {/* Logo — 6 SVG letter-paths */}
        {/* Each letter is a wrapper div (with inset) containing an img — this prevents
            the browser from stretching the SVG content to fill a mis-sized box. */}
        <div
          ref={logoRef}
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

      {/* ── Bottom row: tagline + video ── */}
      <div className="flex items-end justify-between w-full">
        {/* Hero tagline */}
        <div ref={heroTextRef} className="relative">
          {/* Inline flag image (emoji replacement) */}
          <div className="relative">
            <p className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[48px] uppercase text-[#fafafa] leading-tight max-w-[746px]">
              We&apos;re a{" "}
              <span className="relative inline-block">
                <img
                  ref={flagRef}
                  src={imgGroup1698}
                  alt="🇨🇦"
                  className="inline-block align-middle"
                  style={{ width: "89px", height: "56px" }}
                />
              </span>{" "}
              <span
                className="font-['Neue_Haas_Grotesk_Display_Pro',sans-serif] font-bold"
                style={{ marginLeft: "4px" }}
              >
                based
              </span>
            </p>
            <p className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[48px] uppercase text-[#fafafa] leading-tight max-w-[746px] -mt-1">
              design agency crafting awesome
              <br />
              brands and websites
            </p>
          </div>
        </div>

        {/* Hero video */}
        <div
          ref={videoBoxRef}
          className="relative rounded-[8px] overflow-hidden shrink-0"
          style={{ width: "391px", height: "264px" }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
