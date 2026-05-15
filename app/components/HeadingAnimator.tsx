"use client";

/**
 * HeadingAnimator — global heading animation driver.
 *
 * Any element with the class `animated-header` gets an automatic
 * word-split clip-emerge scroll animation. No per-component wiring needed.
 *
 * Per-element overrides via data attributes:
 *   data-animate-start="top 80%"   (ScrollTrigger start, default "top 88%")
 *   data-animate-stagger="0.1"     (word stagger seconds, default 0.07)
 *   data-animate-duration="0.9"    (per-word duration, default 0.75)
 *   data-animate-delay="0.1"       (initial delay, default 0)
 *
 * Usage:
 *   <h2 className="animated-header ...">Your heading</h2>
 *   <h2 className="animated-header ..." data-animate-start="top 75%" data-animate-stagger="0.12">
 *     Your heading
 *   </h2>
 */

import { useEffect } from "react";
import { animateHeading } from "../utils/animateHeading";

export default function HeadingAnimator() {
  useEffect(() => {
    const cleanupMap = new Map<Element, () => void>();

    const initEl = (el: HTMLElement) => {
      if (cleanupMap.has(el)) return; // already initialised

      const opts = {
        start:    el.dataset.animateStart    ?? undefined,
        stagger:  el.dataset.animateStagger  ? parseFloat(el.dataset.animateStagger)  : undefined,
        duration: el.dataset.animateDuration ? parseFloat(el.dataset.animateDuration) : undefined,
        delay:    el.dataset.animateDelay    ? parseFloat(el.dataset.animateDelay)    : undefined,
      };

      // Strip undefined keys so animateHeading uses its own defaults
      const filtered = Object.fromEntries(
        Object.entries(opts).filter(([, v]) => v !== undefined)
      ) as Parameters<typeof animateHeading>[1];

      cleanupMap.set(el, animateHeading(el, filtered));
    };

    const cleanupEl = (el: Element) => {
      const cleanup = cleanupMap.get(el);
      if (cleanup) { cleanup(); cleanupMap.delete(el); }
    };

    // ── Init all elements already in the DOM ──
    document.querySelectorAll<HTMLElement>(".animated-header").forEach(initEl);

    // ── Watch for elements added / removed by Next.js route changes ──
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          if (el.classList?.contains("animated-header")) initEl(el);
          el.querySelectorAll<HTMLElement>(".animated-header").forEach(initEl);
        });

        m.removedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as HTMLElement;
          cleanupEl(el);
          (el as HTMLElement).querySelectorAll?.(".animated-header").forEach(cleanupEl);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupMap.forEach((cleanup) => cleanup());
      cleanupMap.clear();
    };
  }, []);

  return null;
}
