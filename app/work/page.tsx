import { IllustrationWork } from "@/components/sections/IllustrationWork";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Axel Garland",
  description: "Case studies and selected work — illustration, branding, and digital experiences.",
};

export default function WorkPage() {
  return (
    <>
      <GrainOverlay />
      <main
        id="main"
        className="flex min-h-[100dvh] min-h-[100svh] flex-col"
      >
        <header className="pb-12 pt-24 sm:pb-14 sm:pt-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <h1 className="font-display text-[clamp(2rem,6vw,3.75rem)] font-medium tracking-tight text-mist">
              Work
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist-muted md:text-lg">
              Case studies, selected work, and other projects.
            </p>
          </div>
        </header>

        <div className="flex-1 pb-20">
          <IllustrationWork />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
