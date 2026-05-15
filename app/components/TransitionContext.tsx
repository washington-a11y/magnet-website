"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type RefObject,
} from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

// Panel colours — order = z-index (last is on top)
export const PANEL_COLORS = ["#111921", "#FDC6EC", "#FFF085"];

// Entry transition timing (panels peeling off on page load)
export const TRANSITION_ENTRY_DELAY    = 0.05;  // initial hold
export const TRANSITION_ENTRY_DURATION = 0.75;  // each panel slide
export const TRANSITION_ENTRY_STAGGER  = 0.08;  // gap between panels
// Total time until the very last panel clears the screen
export const TRANSITION_ENTRY_TOTAL =
  TRANSITION_ENTRY_DELAY +
  (PANEL_COLORS.length - 1) * TRANSITION_ENTRY_STAGGER +
  TRANSITION_ENTRY_DURATION; // = 0.96s

// Breathing pause before page content starts animating in
export const PAGE_REVEAL_DELAY = TRANSITION_ENTRY_TOTAL + 0.15; // ~1.1s

interface TransitionContextValue {
  containerRef: RefObject<HTMLDivElement>;
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      const container = containerRef.current;
      if (!container) { router.push(href); return; }

      const panels = Array.from(container.children) as HTMLElement[];
      gsap.killTweensOf(panels);

      // Panels rise up from below in a staggered wave (dark → pink → yellow).
      // onComplete fires after the last panel finishes covering the screen.
      const tl = gsap.timeline({
        onComplete: () => router.push(href),
      });

      tl.fromTo(
        panels,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: "power4.inOut",
          stagger: 0.07,
        }
      );
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ containerRef, navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within TransitionProvider");
  return ctx;
}
