"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      {children}
    </SmoothScroll>
  );
}
