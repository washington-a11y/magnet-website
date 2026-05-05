import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./components/CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("./components/SmoothScroll"), { ssr: false });

export const metadata: Metadata = {
  title: "Magnet Studio — Design Agency Crafting Awesome Brands & Websites",
  description:
    "We're a design agency crafting awesome brands and websites. Based in Canada, building brands for the modern world since 2018.",
  openGraph: {
    title: "Magnet Studio",
    description:
      "Brand Strategy, Digital Design & Print — all for one predictable monthly fee.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ cursor: "none" }}>
      <body style={{ cursor: "none" }}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
