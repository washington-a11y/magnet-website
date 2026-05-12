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

const NAV_LINKS = [
  { label: "Work",       href: "/work" },
  { label: "About",      href: "/about" },
  { label: "Blog",       href: "/blog" },
  { label: "Contact us", href: "/contact" },
];

export default function NavScroll({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const navRef      = useRef<HTMLElement>(null);
  const linksRef    = useRef<HTMLAnchorElement[]>([]);
  const lastScrollY = useRef(0);
  const isVisible   = useRef(false);

  useEffect(() => {
    // ── Always-visible mode (pages with no hero) ──
    if (alwaysVisible) {
      gsap.set(navRef.current, { yPercent: 0 });
      isVisible.current = true;
      // No scroll listener needed — nav stays put
      return;
    }

    // ── 1. Hide nav above viewport on mount ──
    gsap.set(navRef.current, { yPercent: -100 });

    // ── 2. Track whether user has scrolled past the hero ──
    let pastHero = false;

    const heroEl = document.querySelector("main > section:first-of-type") as HTMLElement | null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        // Scrolled back up into the hero → force-hide the sticky nav
        if (!pastHero) hide();
      },
      { threshold: 0 }
    );
    if (heroEl) observer.observe(heroEl);

    // ── 3. Scroll-up reveal logic ──
    const show = () => {
      if (isVisible.current) return;
      isVisible.current = true;
      gsap.to(navRef.current, { yPercent: 0, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    };
    const hide = () => {
      if (!isVisible.current) return;
      isVisible.current = false;
      gsap.to(navRef.current, { yPercent: -100, duration: 0.35, ease: "power3.in", overwrite: "auto" });
    };

    const onScroll = () => {
      if (!pastHero) {
        lastScrollY.current = window.scrollY;
        return;
      }
      const y = window.scrollY;
      if (y < lastScrollY.current) {
        show();
      } else {
        hide();
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // ── 3. Hover underline animation ──
    const cleanups: (() => void)[] = [];

    linksRef.current.forEach((anchor) => {
      if (!anchor) return;
      const line = anchor.querySelector<HTMLSpanElement>(".nav-underline");
      if (!line) return;

      // Initialise: scaleX 0 from the left
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

      const enter = () =>
        gsap.to(line, { scaleX: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      const leave = () =>
        gsap.to(line, { scaleX: 0, duration: 0.25, ease: "power2.in", transformOrigin: "right center", overwrite: "auto",
          onComplete: () => gsap.set(line, { transformOrigin: "left center" }),
        });

      anchor.addEventListener("mouseenter", enter);
      anchor.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        anchor.removeEventListener("mouseenter", enter);
        anchor.removeEventListener("mouseleave", leave);
      });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [alwaysVisible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#f9faff] border-b border-[rgba(65,71,77,0.3)] px-[32px] py-[18px]"
      style={{ willChange: "transform" }}
    >
      <div className="flex items-center justify-between w-full">

        {/* Logo — 180×24 dark version */}
        <a href="/" aria-label="Magnet home">
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
        {NAV_LINKS.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            ref={(el) => { if (el) linksRef.current[i] = el; }}
            className="relative font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[16px] text-[#111921] uppercase leading-[1.5] tracking-wide pb-[2px]"
          >
            {label}
            {/* Animated underline */}
            <span
              className="nav-underline absolute bottom-0 left-0 w-full h-[1px] bg-[#111921] block"
            />
          </a>
        ))}
      </div>
    </nav>
  );
}
