"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgWhatWeDo   = "/assets/37ab8e7c17520009f6edc01061fcf1609a2341e8.svg";
const imgArrowIcon  = "/assets/54981ac01f676b8630d69c2998ac170543dc058c.svg";
const imgService1   = "/assets/a25b6b5ffc7a5e030ab80baedc939135f1af4c72.png";
const imgService2   = "/assets/9faad5bf3d4f78f8e9d90af477654607626b6168.png";
const imgService3   = "/assets/d3f6da31a406b372959221c94a6b294a784e262e.png";

const SERVICES = [
  {
    title: "Brand Strategy & DNA",
    description:
      "We revitalize and modernize brands, ensuring they reflect current market trends and effectively communicate value, helping companies lead and sell better.",
    services: [
      "Brand Strategy",
      "Naming",
      "Brand Architecture",
      "Messaging",
      "Visual Identity",
      "Verbal Identity",
      "Brand Guidelines",
    ],
    image: imgService1,
  },
  {
    title: "Digital Design",
    description:
      "We design intuitive, user-friendly experiences that keep visitors engaged and encourage repeat visits, enhancing overall satisfaction.",
    services: [
      "Website Design & development",
      "App & Platform Development",
      "User experience Design",
      "AI Integration",
    ],
    image: imgService2,
  },
  {
    title: "Print & Environmental Design",
    description:
      "We design tangible materials and immersive spatial experiences that bring your brand into the physical world, engaging audiences from hand-held collateral to full-scale environments.",
    services: [
      "Marketing Collateral & Packaging",
      "Wayfinding & Signage Systems",
      "Branded Environments & Spaces",
      "Exhibition & Retail Displays",
    ],
    image: imgService3,
  },
];

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // "WHAT WE DO" headline draw-in
      gsap.from(".whatwedo-title", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".whatwedo-title",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Each service row slides in
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Image parallax
        const img = row.querySelector(".service-image");
        if (img) {
          gsap.to(img, {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });

      // Arrow hover bounce on learn-more links
      document.querySelectorAll(".learn-more-arrow").forEach((arrow) => {
        const parent = arrow.closest(".learn-more");
        parent?.addEventListener("mouseenter", () => {
          gsap.to(arrow, { x: 4, y: -4, duration: 0.25, ease: "power2.out" });
        });
        parent?.addEventListener("mouseleave", () => {
          gsap.to(arrow, { x: 0, y: 0, duration: 0.25, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col gap-[64px] items-center w-full bg-[#fdc700] px-[96px] py-[96px]"
    >
      {/* "WHAT WE DO" headline */}
      <div className="w-full border-b border-black pb-[64px]">
        <div
          className="whatwedo-title relative w-full"
          style={{ aspectRatio: "1680/251" }}
        >
          <img
            src={imgWhatWeDo}
            alt="WHAT WE DO"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* Service rows */}
      <div className="flex flex-col gap-[64px] w-full">
        {SERVICES.map((service, i) => (
          <div
            key={i}
            className="service-row flex items-start justify-between pb-[32px] border-b border-[rgba(65,71,77,0.3)]"
          >
            {/* Left: text */}
            <div className="flex flex-col gap-[32px] flex-1 max-w-[800px]">
              <h2 className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[61px] text-[#111921] leading-none">
                {service.title}
              </h2>

              <div className="flex items-start justify-between">
                <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#41474d] leading-[1.5] tracking-[0.32px] max-w-[450px]">
                  {service.description}
                </p>
                <ul className="list-disc text-[16px] text-[#41474d] leading-[1.5] tracking-[0.32px] w-[268px] ml-8">
                  {service.services.map((s) => (
                    <li key={s} className="ms-[24px]">
                      <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="learn-more flex items-center gap-1 cursor-pointer">
                <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] leading-[31px]">
                  Learn more
                </span>
                <img
                  src={imgArrowIcon}
                  alt=""
                  className="learn-more-arrow w-[30px] h-[30px]"
                />
              </div>
            </div>

            {/* Right: image */}
            <div className="service-image relative rounded-[8px] overflow-hidden shrink-0 ml-8"
              style={{ width: "600px", height: "450px" }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
