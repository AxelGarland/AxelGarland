import { WorkGrid } from "@/components/projects/WorkGrid";
import { HalftoneTitle } from "@/components/sections/HalftoneTitle";
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
      <main id="main" className="bg-black">
        {/* A black banner with the page's name in white halftone */}
        <header className="bg-black pb-14 pt-[calc(68px+3.5rem)] sm:pb-20 sm:pt-[calc(68px+4.5rem)]">
          <HalftoneTitle text="Work" />
        </header>

        <div className="pb-24 pt-6 md:pb-32 md:pt-10">
          <div className="mx-auto max-w-[90rem] px-6 md:px-8">
            <WorkGrid projects={getOrderedProjects()} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
