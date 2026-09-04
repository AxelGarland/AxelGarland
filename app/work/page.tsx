import { IllustrationWork } from "@/components/sections/IllustrationWork";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Axel Garland",
  description: "UX/UI case studies and illustration work — Alutit, Giuson, and more.",
};

export default function WorkPage() {
  return (
    <>
      <GrainOverlay />
      <main id="main" className="flex min-h-[100dvh] min-h-[100svh] flex-col bg-surface">
        <header className="border-b border-line pb-12 pt-32 sm:pb-14 sm:pt-36">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm uppercase tracking-[0.12em] text-accent">Work</p>
            <h1 className="max-w-[16ch] font-display text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.05] tracking-tight text-ink">
              Case studies &amp; illustration
            </h1>
          </div>
        </header>

        <div className="flex-1">
          <IllustrationWork />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
