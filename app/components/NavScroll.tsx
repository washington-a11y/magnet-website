"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Dark-on-light logo letters (different from the hero white-on-dark versions)
const imgM = "/assets/b121895865d4d90aa11d08b92e06de70780fb577.svg";
const imgA = "/assets/06d75213a82ca6ab4ccbfd6f14a5a1cf7c0b5682.svg";
const imgG = "/assets/01a5a20bb1d17468808014a8599af1e5c341d6a5.svg";
const imgN = "/assets/9f0df09b188077ac42b0c6a4e841c8c4b3a5bdf4.svg";
const imgE = "/assets/18c75eec11d300f03e92dd2f7824bf70f06a841c.svg";
const imgT = "/assets/57a4102024d58cfedde822d861444b49cb864b91.svg";

const NAV_LINKS = ["Work", "About", "Blog", "Contact us"];

const SCROLL_THRESHOLD = 80; // px scrolled before nav is eligible to show

export default function NavScroll() {
  const navRef      = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const isVisible   = useRef(false);

  useEffect(() => {
    // Start hidden above viewport
    gsap.set(navRef.current, { yPercent: -100 });

    const show = () => {
      if (isVisible.current) return;
      isVisible.current = true;
      gsap.to(navRef.current, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const hide = () => {
      if (!isVisible.current) return;
      isVisible.current = false;
      gsap.to(navRef.current, {
        yPercent: -100,
        duration: 0.35,
        ease: "power3.in",
      });
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;

      if (currentY < SCROLL_THRESHOLD) {
        // Near the top — always hide (hero nav is visible)
        hide();
      } else if (scrollingUp) {
        show();
      } else {
        hide();
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#f9faff] border-b border-[rgba(65,71,77,0.3)] px-[32px] py-[18px]"
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center justify-between w-full">

        {/* Logo — 180×24 dark version */}
        <a href="#" aria-label="Magnet home">
          <div
            className="relative shrink-0 overflow-hidden"
            style={{ width: "180px", height: "24px" }}
          >
            <div className="absolute" style={{ inset: "2.1% 81.04% 2.5% 0" }}>
              <img src={imgM} alt="M" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
            <div className="absolute" style={{ inset: "2.5% 63.09% 1.93% 20.03%" }}>
              <img src={imgA} alt="A" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
            <div className="absolute" style={{ inset: "0 46.8% 0 36.36%" }}>
              <img src={imgG} alt="G" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
            <div className="absolute" style={{ inset: "2.5% 30.12% 2.5% 54.39%" }}>
              <img src={imgN} alt="N" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
            <div className="absolute" style={{ inset: "2.5% 15.44% 2.47% 71.1%" }}>
              <img src={imgE} alt="E" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
            <div className="absolute" style={{ inset: "2.5% 0 1.93% 86.19%" }}>
              <img src={imgT} alt="T" className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
          </div>
        </a>

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(" ", "-")}`}
            className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[16px] text-[#111921] uppercase leading-[1.5] tracking-wide hover:opacity-60 transition-opacity"
          >
            {link}
          </a>
        ))}
      </div>
    </nav>
  );
}
