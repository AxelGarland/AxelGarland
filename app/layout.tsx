import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { StarField } from "@/components/StarField";

const bodySans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axel Garland — Designer, Illustration & AI",
  description:
    "Axel Garland — Designer working across illustration, branding, and applied AI. Portfolio and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${bodySans.variable} font-sans bg-surface text-mist antialiased`}
      >
        <a
          href="#main"
          className="absolute left-[min(1rem,5vw)] top-4 z-[100] -translate-y-[200%] rounded border border-ink/15 bg-paper px-3 py-2 text-sm text-ink transition-transform duration-300 focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-accent"
        >
          Skip to main content
        </a>
        <StarField />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
