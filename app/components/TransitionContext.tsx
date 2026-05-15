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
