"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgArrow      = "/assets/d21a42eef70b1132442b60a26f9a64292f1d49ad.svg";
const imgDecoration = "/assets/f57279020869342de2017fda5b0a94e77b0a5472.svg";

const STEPS = [
  {
    title: "map",
    description: "We map all the information to start our visual navigation",
  },
  {
    title: "design",
    description: "We create a design experience that matches the journey",
  },
  {
    title: "build",
    description:
      "We build it all into a tangible destination ready for your audience to explore.",
  },
];

export default function OurApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading + body reveal
      gsap.from(".approach-header", {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".approach-header",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".approach-body", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: ".approach-body",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Steps stagger
      gsap.from(".approach-step", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".approach-steps",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Decorative illustration float
      gsap.to(".approach-deco", {
        y: -12,
        duration: 3,
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
      className="relative flex flex-col justify-between w-full bg-[#111921] px-[32px] py-[96px] overflow-hidden"
      style={{ minHeight: "792px" }}
    >
      {/* Top — heading + description */}
      <div className="flex flex-col gap-[32px] items-start w-[640px]">
        <h2
          className="approach-header font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#fafafa] tracking-[-0.99px] uppercase leading-none"
        >
          our approach
        </h2>

        <div className="approach-body flex flex-col gap-[32px] items-start w-full">
          <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#99a1af] tracking-[0.32px] leading-[1.5]">
            Our method is designed to get you to market quicker, so we can start
            listening to feedback sooner. Looking first, so you don't do anything
            dumb, then leaping, before you lose your edge or your nerve.
          </p>

          <a
            href="/contact"
            className="flex items-center gap-1 group"
          >
            <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#fafafa] leading-[31px] capitalize">
              contact us
            </span>
            <img
              src={imgArrow}
              alt=""
              className="w-[30px] h-[30px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>

      {/* Decorative illustration — centred, absolute */}
      <div
        className="approach-deco absolute"
        style={{ left: "125px", top: "426px", width: "880px", height: "123px" }}
      >
        <img src={imgDecoration} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Bottom — 3 steps */}
      <div className="approach-steps flex items-center justify-center w-full mt-[96px]">
        <div className="flex items-start justify-between w-[1019px]">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="approach-step flex flex-col gap-[10px] items-start w-[256px]"
            >
              <h3 className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#fafafa] tracking-[-0.99px] uppercase leading-none">
                {step.title}
              </h3>
              <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#99a1af] tracking-[0.32px] leading-[1.5]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
