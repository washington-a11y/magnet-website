"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { PAGE_REVEAL_DELAY } from "./TransitionContext";

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
  const heroTextRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const flagRef     = useRef<HTMLImageElement>(null);

  // useLayoutEffect runs synchronously before the browser paints —
  // so gsap.set() fires before the user ever sees the elements.
  // This eliminates the "flash of visible content" entirely.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const navItems    = gsap.utils.toArray<HTMLElement>(".nav-item");
      const logoLetters = gsap.utils.toArray<HTMLElement>(".logo-letter");
      const heroText    = heroTextRef.current;
      const videoBox    = videoBoxRef.current;

      // ── 1. Set every animated element to its start state immediately ──
      // (before any paint — no flash)
      gsap.set(navItems,    { y: -16, opacity: 0 });
      gsap.set(logoLetters, { y: 48, opacity: 0 });
      gsap.set(heroText,    { y: 40, opacity: 0 });
      gsap.set(videoBox,    { scale: 0.94, opacity: 0 });

      // ── 2. Main reveal timeline ──
      // Wait for all 3 transition panels to fully clear before starting
      // (PAGE_REVEAL_DELAY = panel total ~0.96s + 0.15s breathing pause)
      const tl = gsap.timeline({
        delay: PAGE_REVEAL_DELAY,
        defaults: { ease: "expo.out" },
      });

      // Nav — drops in cleanly from above
      tl.to(navItems, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.07,
      })

      // Logo letters — stamp up from below, tight stagger for a wave effect
      .to(logoLetters, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.055,
        ease: "expo.out",
      }, "-=0.45")

      // Hero tagline — slides up with a hint of scale
      .to(heroText, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power4.out",
      }, "-=0.55")

      // Video — scale in, slightly lagging behind text
      .to(videoBox, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.65")

      // Clean up all inline transform styles so CSS/hover takes over cleanly
      .call(() => {
        gsap.set([navItems, logoLetters, heroText, videoBox], { clearProps: "will-change" });
      });

      // ── 3. Flag wave — continuous ambient motion ──
      const flag = flagRef.current;
      if (flag) {
        gsap.to(flag, {
          skewX: 7,
          scaleX: 0.94,
          duration: 0.9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "left center",
        });
        gsap.to(flag, {
          rotation: 2.5,
          duration: 1.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "left center",
          delay: 0.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sticky top-0 z-0 flex flex-col items-center justify-between w-full h-screen min-h-[700px] bg-[#111921] px-[96px] py-[32px]"
    >
      {/* ── Nav ── */}
      <div className="flex flex-col gap-4 items-start w-full">
        <div className="flex items-center justify-between w-full">
          {NAV_LINKS.map((link) => (
            <div key={link} className="nav-item" style={{ willChange: "transform, opacity" }}>
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
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{ aspectRatio: "1229 / 165" }}
        >
          {[
            { letter: "M", img: imgVectorM, style: { inset: "2.1% 81.04% 2.5% 0" } },
            { letter: "A", img: imgVectorA, style: { inset: "2.5% 63.09% 1.93% 20.03%" } },
            { letter: "G", img: imgVectorG, style: { inset: "0 46.8% 0 36.36%" } },
            { letter: "N", img: imgVectorN, style: { inset: "2.5% 30.12% 2.5% 54.39%" } },
            { letter: "E", img: imgVectorE, style: { inset: "2.5% 15.44% 2.47% 71.1%" } },
            { letter: "T", img: imgVectorT, style: { inset: "2.5% 0 1.93% 86.19%" } },
          ].map(({ letter, img, style }) => (
            <div
              key={letter}
              className="logo-letter absolute"
              style={{ ...style, willChange: "transform, opacity" }}
            >
              <img src={img} alt={letter} className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom row: tagline + video ── */}
      <div className="flex items-end justify-between w-full">
        {/* Hero tagline */}
        <div ref={heroTextRef} className="relative" style={{ willChange: "transform, opacity" }}>
          <h1 className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[48px] uppercase text-[#fafafa] leading-tight max-w-[746px]">
            <span className="block">
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
            </span>
            <span className="block -mt-1">
              design agency crafting awesome
              <br />
              brands and websites
            </span>
          </h1>
        </div>

        {/* Hero video */}
        <div
          ref={videoBoxRef}
          className="relative rounded-[8px] overflow-hidden shrink-0"
          style={{ width: "391px", height: "264px", willChange: "transform, opacity" }}
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
