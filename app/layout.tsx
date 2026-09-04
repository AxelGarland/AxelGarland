import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/sections/SiteHeader";

const bodySans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axel Garland — UX/UI Design & Illustration",
  description:
    "Axel Garland — UX/UI designer and illustrator working across product design, branding, and illustration. Portfolio and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${displaySerif.variable} ${bodySans.variable} font-sans bg-surface text-mist antialiased`}
      >
        <a
          href="#main"
          className="absolute left-[min(1rem,5vw)] top-4 z-[100] -translate-y-[200%] rounded border border-ink/15 bg-paper px-3 py-2 text-sm text-ink transition-transform duration-300 focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-accent"
        >
          Skip to main content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
