"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { usePageTransition, PANEL_COLORS } from "./TransitionContext";

/**
 * TransitionOverlay — three stacked full-screen panels that persist
 * across all routes.
 *
 * EXIT  (triggered by TransitionContext.navigate):
 *   Panels rise from below in a staggered wave: dark → pink → yellow.
 *
 * ENTRY (triggered on pathname change via useLayoutEffect):
 *   Panels peel away upward in reverse: yellow → pink → dark,
 *   revealing the new page underneath.
 */
export default function TransitionOverlay() {
  const { containerRef } = usePageTransition();
  const pathname = usePathname();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = Array.from(container.children) as HTMLElement[];
    gsap.killTweensOf(panels);

    // Snap all panels into the covering position first (before paint)
    gsap.set(panels, { yPercent: 0 });

    // Peel away in reverse: yellow first, dark last
    gsap.to(panels, {
      yPercent: -100,
      duration: 0.75,
      ease: "power4.inOut",
      stagger: { each: 0.08, from: "end" },
      delay: 0.05,
    });
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {PANEL_COLORS.map((color) => (
        <div
          key={color}
          style={{
            position: "absolute",
            inset: 0,
            background: color,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
