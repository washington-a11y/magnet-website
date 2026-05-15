"use client";

import dynamic from "next/dynamic";
import { TransitionProvider } from "./TransitionContext";
import TransitionOverlay from "./TransitionOverlay";
import HeadingAnimator from "./HeadingAnimator";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const SmoothScroll  = dynamic(() => import("./SmoothScroll"),  { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionProvider>
      <SmoothScroll>
        <CustomCursor />
        {children}
      </SmoothScroll>
      {/* Curtain lives outside SmoothScroll so it's never affected by scroll offset */}
      <TransitionOverlay />
      {/* Global heading animator — picks up any .animated-header in the DOM */}
      <HeadingAnimator />
    </TransitionProvider>
  );
}
