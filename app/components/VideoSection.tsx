"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgPlayIcon = "/assets/280f2250d66a9c75ad075b72b10a7b29f8541f84.svg";

export default function VideoSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLDivElement>(null);
  const subheadRef  = useRef<HTMLParagraphElement>(null);
  const playIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video container reveal
      gsap.from(videoRef.current, {
        scale: 0.94,
        borderRadius: "48px",
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Subheadline stagger reveal
      gsap.from(".video-headline-word", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subheadRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Play icon float
      gsap.to(playIconRef.current, {
        y: -8,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center gap-8 w-full bg-[#111921] px-[32px] py-[32px]"
    >
      {/* Floating sub-headline */}
      <p
        ref={subheadRef}
        className="absolute top-[160px] left-1/2 -translate-x-1/2 text-center text-[#fafafa] text-[31px] leading-snug z-10 pointer-events-none whitespace-nowrap"
      >
        <span className="video-headline-word font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
          Building
        </span>{" "}
        <span className="video-headline-word font-['Gyst_Variable',sans-serif] italic">
          Brands
        </span>
        <br />
        <span className="video-headline-word font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
          For The Modern World
        </span>
        <br />
        <span className="video-headline-word font-['Gyst_Variable',sans-serif] italic">
          Since 2018
        </span>
      </p>

      {/* Main video */}
      <div
        ref={videoRef}
        className="relative rounded-[8px] overflow-hidden w-full"
        style={{ maxWidth: "1270px", height: "858px", margin: "0 auto" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/_videos/v1/71f9263fd7a931f583808277e6961a0fa4cd3351" />
        </video>

        {/* Play / cursor icon */}
        <div
          ref={playIconRef}
          className="absolute"
          style={{ left: "880px", top: "374px", width: "94px", height: "84px" }}
        >
          <img
            src={imgPlayIcon}
            alt=""
            className="w-full h-full"
            style={{ transform: "rotate(10deg)" }}
          />
        </div>
      </div>
    </section>
  );
}
