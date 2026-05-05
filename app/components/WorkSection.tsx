"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgImage6      = "/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png";
const imgRectangle198 = "/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png";
const imgRectangle194 = "/assets/d29099a355c65750667c69a33a39dc4ce6897c90.png";
const imgRectangle201 = "/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png";

const WORK_IMAGES = [
  {
    src: imgImage6,
    style: { top: "32px", left: "0", width: "459px", height: "510px" },
    title: "NorthGuide",
    description: "Brand identity, web design & digital strategy for a modern navigation platform.",
    href: "#",
  },
  {
    src: imgRectangle198,
    style: { top: "114px", left: "574px", width: "598px", height: "430px" },
    title: "Elevate Co",
    description: "UI/UX redesign and corporate identity system built for scale.",
    href: "#",
  },
  {
    src: imgRectangle194,
    style: { top: "684px", left: "42px", width: "501px", height: "360px" },
    title: "Forma Studio",
    description: "End-to-end brand development and packaging design for a luxury product line.",
    href: "#",
  },
  {
    src: imgRectangle201,
    style: { top: "738px", left: "666px", width: "410px", height: "430px" },
    title: "Axiom Group",
    description: "Strategic rebrand, web design and keynote presentation suite.",
    href: "#",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sub-headline
      gsap.from(".work-headline-word", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".work-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Staggered image reveals
      gsap.from(".work-image", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-grid",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax scroll on images
      document.querySelectorAll(".work-image").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -40 : 40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // Card flip on hover
      document.querySelectorAll<HTMLElement>(".work-image").forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".card-inner");
        if (!inner) return;
        card.addEventListener("mouseenter", () =>
          gsap.to(inner, { rotateY: 180, duration: 0.55, ease: "power2.inOut" })
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(inner, { rotateY: 0, duration: 0.55, ease: "power2.inOut" })
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f9faff] px-[32px] py-[32px]"
      style={{ minHeight: "1200px" }}
    >
      {/* Sub-headline */}
      <div className="work-headline absolute top-[160px] left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 whitespace-nowrap">
        <p className="text-[31px] text-[#111921]">
          <span className="work-headline-word font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">
            Building
          </span>{" "}
          <span className="work-headline-word font-['Gyst_Variable',sans-serif] italic">
            Brands
          </span>
        </p>
        <p className="work-headline-word font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[31px] text-[#111921] leading-snug">
          For The Modern World
        </p>
        <p className="work-headline-word font-['Gyst_Variable',sans-serif] italic text-[31px] text-[#111921]">
          Since 2018
        </p>
      </div>

      {/* Image grid */}
      <div
        className="work-grid relative mx-auto"
        style={{ width: "1172px", height: "1136px" }}
      >
        {WORK_IMAGES.map(({ src, style, title, description, href }, i) => (
          <div
            key={i}
            className="work-image absolute cursor-pointer"
            style={{ ...(style as React.CSSProperties), perspective: "1000px" }}
          >
            {/* Rotating inner — holds both faces */}
            <div
              className="card-inner relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front face — project image */}
              <div
                className="absolute inset-0 rounded-[8px] overflow-hidden"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
              >
                <img
                  src={src}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Back face — project info */}
              <div
                className="absolute inset-0 rounded-[8px] bg-[#111921] flex flex-col justify-between px-[32px] py-[32px]"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="flex flex-col gap-[12px]">
                  <p className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[24px] text-[#fafafa] leading-[1.2]">
                    {title}
                  </p>
                  <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[rgba(250,250,250,0.7)] leading-[1.6]">
                    {description}
                  </p>
                </div>
                <a
                  href={href}
                  className="inline-flex items-center justify-center self-start bg-[#fdc700] text-[#111921] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-bold text-[13px] tracking-[0.26px] px-[24px] py-[12px] rounded-[96px] hover:opacity-90 transition-opacity"
                >
                  Visit Project →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
