"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgImage6      = "http://localhost:3845/assets/43adfb967cb30121a49fd2aedf25d0a3e740acf8.png";
const imgRectangle198 = "http://localhost:3845/assets/0f26b35d39dd5fe1e3a377fd3d7ad3e5ffa6f35c.png";
const imgRectangle194 = "http://localhost:3845/assets/d29099a355c65750667c69a33a39dc4ce6897c90.png";
const imgRectangle201 = "http://localhost:3845/assets/e3a1032c2e0214c275d68511daa612859b7e7d3c.png";

const WORK_IMAGES = [
  { src: imgImage6,       style: { top: "32px",  left: "0",    width: "459px", height: "510px" } },
  { src: imgRectangle198, style: { top: "114px", left: "574px", width: "598px", height: "430px" } },
  { src: imgRectangle194, style: { top: "684px", left: "42px",  width: "501px", height: "360px" } },
  { src: imgRectangle201, style: { top: "738px", left: "666px", width: "410px", height: "430px" } },
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
      document.querySelectorAll(".work-image").forEach((img, i) => {
        gsap.to(img, {
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
        {WORK_IMAGES.map(({ src, style }, i) => (
          <div
            key={i}
            className="work-image absolute rounded-[8px] overflow-hidden"
            style={style as React.CSSProperties}
          >
            <img
              src={src}
              alt={`Work ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
