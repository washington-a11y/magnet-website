"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgStar        = "/assets/e3b1833c7b3d8d79e0d2faecc07682d205ff0961.svg";
const imgDeco1       = "/assets/30f40dd0e8d630d95986ae3bc87f3bc9f2ca284b.svg";
const imgDeco2       = "/assets/4d398202905b0e70152ceb1cc8476cc0bd55af24.svg";
const imgDeco3       = "/assets/61aa992793c1430c855f0a55a462f7cdace9b080.svg";
const imgDeco4       = "/assets/c1b8de66591eb992fe5106fe70f217b8f3b6a390.svg";
const imgCalIcon     = "/assets/ee48e31e9c6ce2362b7eb8e8b95bf54f278f3509.svg";

export default function CTASection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef   = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline zoom in
      gsap.from(headlineRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Button bounce in
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Deco illustrations float
      gsap.utils.toArray<HTMLElement>(".cta-deco").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          rotate: i % 2 === 0 ? 3 : -3,
          duration: 2.5 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    // Button hover micro-interaction
    const btn = buttonRef.current;
    const onEnter = () => gsap.to(btn, { scale: 1.04, duration: 0.2 });
    const onLeave = () => gsap.to(btn, { scale: 1,    duration: 0.2 });
    btn?.addEventListener("mouseenter", onEnter);
    btn?.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      btn?.removeEventListener("mouseenter", onEnter);
      btn?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center gap-[32px] w-full bg-[#1c1a96] px-[32px] py-[96px] overflow-hidden"
      style={{ minHeight: "414px" }}
    >
      {/* Headline */}
      <p
        ref={headlineRef}
        className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#fafafa] text-center tracking-[-0.99px] uppercase"
      >
        ready to be magnetic
      </p>

      {/* Decorative star — top right area, ~64% from left */}
      <div className="cta-deco absolute" style={{ left: "64%", top: "20%", width: "26px", height: "33px" }}>
        <img src={imgStar} alt="" className="w-full h-full" />
      </div>

      {/* Bottom decorations — all anchored to bottom: 0               */}
      {/* Horizontal positions as % of the 1920px Figma frame          */}

      {/* Left figure ~26% */}
      <div className="cta-deco absolute" style={{ left: "26%", bottom: "0", width: "86px", height: "110px" }}>
        <img src={imgDeco1} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Right figure ~64% */}
      <div className="cta-deco absolute" style={{ left: "64%", bottom: "0", width: "146px", height: "113px" }}>
        <img src={imgDeco2} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Centre script/wordmark — widest element, ~29% to ~63% */}
      <div className="cta-deco absolute" style={{ left: "28.7%", bottom: "0", width: "33.9%", height: "201px" }}>
        <img src={imgDeco3} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Far-right small figure ~69% */}
      <div className="cta-deco absolute" style={{ left: "69.3%", bottom: "0", width: "91px", height: "146px" }}>
        <img src={imgDeco4} alt="" className="w-full h-full object-contain" />
      </div>

      {/* CTA Button */}
      <button
        ref={buttonRef}
        className="relative z-10 flex items-center gap-[10px] bg-[#111921] text-[#fafafa] rounded-[96px] px-[32px] py-[18px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-bold text-[14px] tracking-[0.28px] leading-[1.5] cursor-pointer border-none"
      >
        <img src={imgCalIcon} alt="" className="w-[16px] h-[16px]" />
        Book Your Free Consultation
      </button>
    </section>
  );
}
