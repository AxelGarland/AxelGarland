import type { Metadata } from "next";
import {
  Bebas_Neue,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Outfit,
  Playfair_Display,
  Space_Grotesk,
  Syne,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axel Garland — Illustration, Interaction & Systems",
  description:
    "Multidisciplinary creative working across illustration, interaction design, and AI-assisted design systems. Tel Aviv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${bebasNeue.variable} ${playfair.variable} ${spaceGrotesk.variable} ${syne.variable} font-sans bg-surface text-ink antialiased`}
      >
        <a
          href="#main"
          className="absolute left-[min(1rem,5vw)] top-4 z-[100] -translate-y-[200%] rounded border border-ink/15 bg-surface-raised px-3 py-2 text-sm text-ink transition-transform duration-300 focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-accent"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
