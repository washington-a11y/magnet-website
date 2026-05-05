"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgFrame1806   = "http://localhost:3845/assets/a7d506ddb0d4708d78c4b7abea26668e69a7cc31.png";
const imgClientImage = "http://localhost:3845/assets/a0d43afc8112fbe95229601fe597a5b3c88ca65c.png";
const imgDot         = "http://localhost:3845/assets/c889f38fce03a6ae9c3472b1e5ca9ac76a85fd00.svg";
const imgClientNg    = "http://localhost:3845/assets/c978a3271c9c7951c04cf4e98d4b49b61d54419c.svg";

const RESULTS = [
  { stat: "142%", label: "increase in user engagement" },
  { stat: "3.8X",  label: "conversion lift" },
  { stat: "85%",  label: "reduction in design iteration time" },
  { stat: "45%",  label: "increase in visit duration" },
];

const MARQUEE_TEXT = "REAL RESULTS";
const MARQUEE_ITEMS = Array(6).fill(MARQUEE_TEXT);

export default function ResultsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const marqueeRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee — same visual speed as logo banner
      const track = marqueeRef.current;
      if (track) {
        const totalWidth = track.scrollWidth / 2;
        gsap.to(track, {
          x: `-${totalWidth}px`,
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }

      // Results card fade in
      gsap.from(".results-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".results-card",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stat number counters
      gsap.utils.toArray<HTMLElement>(".result-stat").forEach((el) => {
        const raw    = el.textContent || "";
        const num    = parseFloat(raw.replace(/[^0-9.]/g, ""));
        const suffix = raw.replace(/[0-9.]/g, "");

        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: num,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: num % 1 === 0 ? 1 : 0.1 },
            onUpdate() {
              const v = parseFloat((this as unknown as { targets: () => HTMLElement[] }).targets()[0].textContent || "0");
              el.textContent =
                (num % 1 === 0 ? Math.round(v) : v.toFixed(1)) + suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col gap-[48px] items-center w-full bg-[#111921] px-[96px] py-[96px]"
    >
      {/* ── Marquee ── */}
      <div className="-mx-[96px] overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex items-center gap-[16px] w-max"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, i) => (
            <div key={i} className="flex items-center gap-[16px] shrink-0">
              <p className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[61px] text-[#fafafa] tracking-[-0.99px] whitespace-nowrap">
                {text}
              </p>
              <img src={imgDot} alt="" className="w-[20px] h-[20px]" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Results card ── */}
      <div
        className="results-card flex w-full max-w-[1200px] rounded-[8px] overflow-hidden mx-auto"
        style={{ height: "522px" }}
      >
        {/* Left: project image */}
        <div className="flex-1 relative">
          <img
            src={imgFrame1806}
            alt="Project"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right: testimonial + stats */}
        <div
          className="bg-[#fdc700] flex flex-col gap-[32px] justify-center px-[32px] py-[16px] rounded-tr-[8px] rounded-br-[8px]"
          style={{ width: "715px" }}
        >
          {/* Client + quote */}
          <div className="flex flex-col gap-[32px]">
            <div className="relative shrink-0" style={{ width: "120px", height: "24px" }}>
              <img src={imgClientNg} alt="NG" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>

            <div className="flex flex-col gap-[16px]">
              {/* Avatar */}
              <div className="flex items-center gap-[16px]">
                <img
                  src={imgClientImage}
                  alt="Sarah Mostowich"
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
                <div>
                  <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[18px] text-[#111921] leading-[1.5] tracking-[0.36px]">
                    Sarah Mostowich
                  </p>
                  <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#111921] opacity-80 tracking-[0.28px]">
                    Chief Strategy Officer
                  </p>
                </div>
              </div>
              <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] italic text-[16px] text-[#111921] opacity-80 leading-[1.5] tracking-[0.32px]">
                &ldquo;The team became an invaluable extension of our product division.
                Their strategic insights transformed our entire brand experience.&rdquo;
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-y-[16px] justify-between">
            {RESULTS.map(({ stat, label }) => (
              <div key={label} className="flex flex-col gap-[12px] w-[158px]">
                <p className="result-stat font-['Swis721_Ex_BT',sans-serif] font-bold text-[31px] text-[#111921] leading-[1.5]">
                  {stat}
                </p>
                <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#364153] leading-[1.5] tracking-[0.28px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
