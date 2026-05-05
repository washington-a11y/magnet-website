import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

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
        {children}
      </body>
    </html>
  );
}
