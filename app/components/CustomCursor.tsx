"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Smooth-follow using GSAP quickTo — slight lag gives a natural feel
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    // Start offscreen so it doesn't flash at (0,0)
    gsap.set(el, { x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Scale down on click for tactile feedback
    const onDown = () => gsap.to(el, { scale: 0.75, duration: 0.15, ease: "power2.out" });
    const onUp   = () => gsap.to(el, { scale: 1,    duration: 0.2,  ease: "back.out(2)" });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Offset so the arrow tip (upper-right of the SVG) sits on the mouse point
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ transform: "translate(-78%, -8%)" }}
      aria-hidden
    >
      <img
        src="/assets/cutom-cursor.svg"
        alt=""
        width={36}
        height={41}
        draggable={false}
      />
    </div>
  );
}
