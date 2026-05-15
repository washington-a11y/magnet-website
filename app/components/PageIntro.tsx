"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * PageIntro — full-screen curtain that covers the page on load.
 *
 * Why it exists:
 *   React renders HTML before JS runs, so elements are briefly visible
 *   at their natural (un-animated) position. This curtain hides that flash,
 *   giving GSAP time to set all initial states before anything is revealed.
 *
 * The curtain slides upward using clipPath so the reveal feels like
 * a theatrical opening — intentional, not just a fade.
 */
export default function PageIntro() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = curtainRef.current;
    if (!el) return;

    // Hold briefly so GSAP can set hero element initial states,
    // then wipe the curtain upward.
    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(el, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      onComplete: () => el.remove(),
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#111921",
        zIndex: 9999,
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
