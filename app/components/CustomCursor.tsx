"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Selectors that trigger the pointer cursor
const POINTER_SELECTORS = "a, button, [role='button'], input, label, select, textarea, [tabindex]";

export default function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Smooth-follow
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    gsap.set(el, { x: -100, y: -100 });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      // Swap cursor when over an interactive element
      const target = e.target as Element;
      setIsPointer(!!target.closest(POINTER_SELECTORS));
    };

    // Click scale feedback
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
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        // Each cursor has a different tip position — swap offset together with the image
        transform: isPointer ? "translate(-29%, -11%)" : "translate(-78%, -8%)",
      }}
      aria-hidden
    >
      <img
        src={isPointer ? "/assets/pointer.svg" : "/assets/cutom-cursor.svg"}
        alt=""
        width={isPointer ? 34 : 36}
        height={isPointer ? 36 : 41}
        draggable={false}
      />
    </div>
  );
}
