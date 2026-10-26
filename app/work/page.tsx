import { WorkList } from "@/components/projects/WorkList";
import { getOrderedProjects } from "@/lib/projects";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work · Axel Garland",
  description: "Generative design, illustration, sculpture and product design: Kindred, AfterLife, Alutit, Mundos Mejores and more.",
};

export default function WorkPage() {
  return (
    <>
      <GrainOverlay />
      <main id="main" className="flex min-h-[100dvh] min-h-[100svh] flex-col bg-surface">
        <header className="pb-4 pt-32 sm:pt-36">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-4 flex items-center gap-3 text-sm text-ink-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              Work
            </p>
            <h1 className="max-w-[16ch] font-display text-[clamp(1.95rem,4.68vw,3.12rem)] font-light leading-[1.05] tracking-tight text-ink">
              All the work
            </h1>
          </div>
        </header>

        <div className="flex-1 pb-24 pt-10 md:pb-32 md:pt-14">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <WorkList projects={getOrderedProjects()} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
