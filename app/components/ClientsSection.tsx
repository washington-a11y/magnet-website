"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Client logos
const logos = [
  { src: "/assets/4f42e92c380197238bb55cca677c987ffb62ab7e.svg", alt: "NG", w: 133, h: 27 },
  { src: "/assets/3e2629b56c31f21c4b03753658638044716b853b.svg", alt: "Agnostiq", w: 101, h: 40 },
  { src: "/assets/2e5d62fd69e0fb7ae5669ad870131a87902719c5.svg", alt: "HostGenius", w: 137, h: 18 },
  { src: "/assets/8688675135c75e4f2ba8e3e02f349d55387287f1.svg", alt: "StackDeck", w: 155, h: 31 },
  { src: "/assets/1abd614a8fc8eecfdb31f407b7f412f6187977b5.svg", alt: "Epoch", w: 119, h: 44 },
  { src: "/assets/efc2050eaeeb437c5dbe262e760da8354b510874.svg", alt: "Saving Box", w: 137, h: 27 },
  { src: "/assets/3d905369f3d2619d6cc19df2a6db734ca80d79cf.svg", alt: "Teamtown", w: 133, h: 20 },
  { src: "/assets/68abfc13d7ccaec57e93ae611ce73d1be87a4d83.svg", alt: "Covalent", w: 133, h: 32 },
];

// Work carousel images
const carouselItems = [
  { src: "/assets/9faad5bf3d4f78f8e9d90af477654607626b6168.png",  label: "Web Design" },
  { src: "/assets/0752151161faa969249a2092707a5c2b8ea43b4f.png",  label: "Design Strategy" },
  { src: "/assets/3060bc63b25193d203a6a0bcc8c7fca8c28c3df3.png",  label: "3D Design" },
  { src: "/assets/9765a166d08477b82315c7b42431cf7010e44222.png",  label: "Motion Design" },
  { src: "/assets/3e250ee9c3916049529f40ff730339ba83248388.png",  label: "Branding" },
  { src: "/assets/79f4c69a18de5baf839446384307f085fd15a31a.png",  label: "Design Consultation" },
  { src: "/assets/942e91d951eb14cbb7e72e650f00fcca3bb0b037.png",  label: "Presentation Design" },
  { src: "/assets/fe40aa7c31db576d420704a8ac0a7e24a1457288.png",  label: "Illustration Design" },
  { src: "/assets/f5794adda0f69053da568b3b48b1fff3132414f4.png",  label: "Packaging Design" },
  { src: "/assets/7f68765c7b3c7d95adb2ff34d7c9b715db5392b3.png",  label: "Social Media Design" },
  { src: "/assets/3d73bff43847107234ad568316f21dd2e1918653.png",  label: "Print Design" },
];

const imgArrowIcon = "/assets/54981ac01f676b8630d69c2998ac170543dc058c.svg";

const STATS = [
  { value: "5+",  label: "Years Average Experience" },
  { value: "50+", label: "Brands Served" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function ClientsSection() {
  const sectionRef        = useRef<HTMLElement>(null);
  const logoTrackRef      = useRef<HTMLDivElement>(null);
  const carouselWrapRef   = useRef<HTMLDivElement>(null);
  const carouselTrackRef  = useRef<HTMLDivElement>(null);

  // Transform-based drag state
  const xOffset        = useRef(0);
  const isDragging     = useRef(false);
  const dragStartX     = useRef(0);
  const dragStartOffset = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo marquee: infinite scroll left
      const track = logoTrackRef.current;
      if (track) {
        const totalWidth = track.scrollWidth / 2;
        gsap.to(track, {
          x: `-${totalWidth}px`,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }

      // Stats counter animation
      gsap.utils.toArray<HTMLElement>(".stat-number").forEach((el) => {
        const finalText = el.textContent || "";
        const finalNum  = parseFloat(finalText.replace(/[^0-9.]/g, ""));
        const suffix    = finalText.replace(/[0-9.]/g, "");

        gsap.fromTo(
          el,
          { textContent: "0" },
          {
            textContent: finalNum,
            duration: 1.8,
            ease: "power2.out",
            snap: { textContent: finalNum % 1 === 0 ? 1 : 0.1 },
            onUpdate() {
              const v = parseFloat((this as unknown as { targets: () => HTMLElement[] }).targets()[0].textContent || "0");
              el.textContent =
                (finalNum % 1 === 0 ? Math.round(v) : v.toFixed(1)) + suffix;
            },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Partner section text reveal
      gsap.from(".partner-headline", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".partner-headline",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    // Carousel autoplay — transform-based, same pattern as logo marquee
    const track = carouselTrackRef.current;
    const tick = () => {
      if (!track) return;
      if (!isDragging.current) {
        xOffset.current -= 0.5; // ~30px/s at 60fps
      }
      // Seamless loop: once we've scrolled one full set of items, reset
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(xOffset.current) >= halfWidth) {
        xOffset.current += halfWidth;
      }
      gsap.set(track, { x: xOffset.current });
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);

  // Drag handlers — modify the shared xOffset so autoplay & drag stay in sync
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current    = true;
    dragStartX.current    = e.pageX;
    dragStartOffset.current = xOffset.current;
  };
  const onMouseUp    = () => { isDragging.current = false; };
  const onMouseLeave = () => { isDragging.current = false; };
  const onMouseMove  = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const delta = (e.pageX - dragStartX.current) * 1.2;
    xOffset.current = dragStartOffset.current + delta;
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-start justify-between w-full bg-[#f9faff] px-[96px] py-[64px] gap-[64px]"
    >
      {/* ── Logo marquee — full bleed ── */}
      <div className="-mx-[96px] overflow-hidden border-b border-[rgba(65,71,77,0.3)] pb-[64px]">
        <div className="flex items-center">
          <div
            ref={logoTrackRef}
            className="flex items-center gap-[64px] shrink-0"
          >
            {/* doubled for seamless loop */}
            {[...logos, ...logos].map(({ src, alt, w, h }, i) => (
              <img
                key={i}
                src={src}
                alt={alt}
                style={{ width: w, height: h, objectFit: "contain", flexShrink: 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Partner info + stats ── */}
      <div className="flex items-start justify-between w-full">
        {/* Left: tagline */}
        <div className="flex flex-col gap-[32px]">
          <h2 className="partner-headline font-['Swis721_Ex_BT',sans-serif] font-bold text-[36px] text-[#111921] tracking-[-0.99px] uppercase">
            your design partner
          </h2>
          <div className="flex flex-col gap-[32px] max-w-[520px]">
            <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#41474d] leading-[1.5] tracking-[0.32px]">
              Partner with senior designers who deliver unlimited revisions, proactive
              strategy, and consistent results—all for one predictable monthly fee.
            </p>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#111921] leading-[31px]">
                Learn more
              </span>
              <img
                src={imgArrowIcon}
                alt=""
                className="w-[30px] h-[30px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </div>
        </div>

        {/* Right: stats */}
        <div className="flex gap-[49px] items-end px-[64px] py-[32px] rounded-[8px]">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-[4px]">
              <p
                className="stat-number font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-bold text-[80px] text-[#111921] leading-none"
              >
                {value}
              </p>
              <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#41474d] tracking-[0.28px] leading-[1.5] max-w-[160px]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Work carousel ── */}
      <div
        ref={carouselWrapRef}
        className="-mx-[96px] overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <div
          ref={carouselTrackRef}
          className="flex gap-[40px] px-[96px] pb-4"
          style={{ willChange: "transform" }}
        >
        {[...carouselItems, ...carouselItems].map(({ src, label }, i) => (
          <div
            key={i}
            className="carousel-card relative rounded-[16px] overflow-hidden shrink-0 flex items-end justify-center"
            style={{ width: "285px", height: "389px" }}
          >
            <img
              src={src}
              alt={label}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient + label */}
            <div
              className="relative z-10 w-full flex items-center justify-center py-[32px]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 52%, rgba(17,25,33,0.5) 100%)",
                backdropFilter: "blur(2.5px)",
              }}
            >
              <p className="font-['Swis721_Blk_BT',sans-serif] font-black text-[20px] text-[#fafafa] text-center tracking-[0.35px]">
                {label}
              </p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
