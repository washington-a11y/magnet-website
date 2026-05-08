"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgPhoto       = "/assets/ed58c179e57173645b1ed6af2aa618e6c524d1a9.png";
const imgAwardIcon   = "/assets/33184bad12d3d7d2f11598e5d5e1b1821f66eb06.svg";
const imgSatisfyIcon = "/assets/3dd4fc9e48b393815e0b723e52b0541127d54f4b.svg";

const STATS = [
  {
    icon: imgAwardIcon,
    value: null,
    label: "Award Winning",
    sub: "Featured in Awwwards, CSS Design Awards, and Dribbble",
  },
  {
    icon: null,
    value: "6+",
    label: "Years",
    sub: "Established in 2018 with 500+ projects completed",
  },
  {
    icon: imgSatisfyIcon,
    value: "98%",
    label: "Client Satisfaction",
    sub: null,
  },
];

export default function AboutStatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo parallax
      gsap.to(".about-photo", {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-photo",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Heading reveal
      gsap.from(".about-stats-header", {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-stats-header",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Italic quote
      gsap.from(".about-quote", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-quote",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Stat cards stagger
      gsap.from(".about-stat-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-stats-grid",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col gap-[64px] items-center w-full bg-[#f9faff] px-[32px] py-[96px]"
    >
      {/* Full-width photo */}
      <div className="about-photo relative w-full rounded-[8px] overflow-hidden" style={{ height: "518px" }}>
        <img
          src={imgPhoto}
          alt="Magnet Studio team"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* "More than just work" heading + description */}
      <div className="about-stats-header flex items-start gap-[271px] w-full">
        <h2
          className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#111921] tracking-[-0.99px] uppercase whitespace-nowrap leading-none shrink-0"
        >
          More than just work
        </h2>
        <p className="flex-1 font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] tracking-[0.32px] leading-[1.5]">
          We believe in challenging ourselves to be different so we can take your
          ideas to the next level.
        </p>
      </div>

      {/* Italic quote */}
      <p className="about-quote font-['Gyst_Variable',sans-serif] italic text-[21px] text-[#111921] leading-[1.2] w-[360px] text-left">
        We are passionate designers, creative thinkers, and curious folks...
      </p>

      {/* Stat cards */}
      <div className="about-stats-grid flex items-start justify-between w-[828px]">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="about-stat-card flex flex-col gap-[4px] items-center justify-center"
          >
            {stat.icon && (
              <div className="w-[120px] h-[109px] relative shrink-0">
                <img src={stat.icon} alt="" className="absolute inset-0 w-full h-full object-contain" />
              </div>
            )}
            {stat.value && (
              <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-bold text-[80px] text-[#111921] leading-none whitespace-nowrap">
                {stat.value}
              </p>
            )}
            <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-bold text-[32px] text-[#111921] text-center leading-[1.5] whitespace-nowrap">
              {stat.label}
            </p>
            {stat.sub && (
              <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#41474d] text-center tracking-[0.28px] leading-[1.5] w-[219px]">
                {stat.sub}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
