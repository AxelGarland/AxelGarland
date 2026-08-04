import { BottomCategoryStrip } from "@/components/sections/BottomCategoryStrip";
import { IllustrationWork } from "@/components/sections/IllustrationWork";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Illustration — Axel Garland",
  description: "Illustration, selected work, and visual projects.",
};

export default function IllustrationPage() {
  return (
    <>
      <GrainOverlay />
      <main
        id="main"
        className="flex min-h-[100dvh] min-h-[100svh] flex-col bg-surface"
      >
        <header className="px-6 pb-12 pt-24 sm:px-10 sm:pb-14 sm:pt-28 md:px-14 lg:px-16">
          <div className="mx-auto max-w-content">
            <Link
              href="/"
              className="text-sm text-ink-muted transition-colors duration-500 hover:text-ink"
            >
              ← Home
            </Link>
            <h1 className="mt-10 font-display text-[clamp(2rem,6vw,3.75rem)] font-medium tracking-tight text-ink md:mt-12">
              Illustration
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgba(12,12,14,0.85)] md:text-lg">
              Selected illustration, editorial, and object work.
            </p>
          </div>
        </header>

        <div className="flex-1 px-6 pb-12 sm:px-10 md:px-14 lg:px-16">
          <IllustrationWork />
        </div>

        <BottomCategoryStrip />
      </main>
      <SiteFooter />
    </>
  );
}
