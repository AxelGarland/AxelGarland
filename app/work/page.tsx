import { HalftoneField } from "@/components/projects/HalftoneField";
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
        {/* A white banner with the page's name, small, in black and red halftone */}
        <header className="bg-surface pb-10 pt-[calc(68px+2.5rem)] sm:pb-12 sm:pt-[calc(68px+3rem)]">
          <HalftoneTitle text="Work" maxWidth="17rem" />
        </header>

        <div className="relative overflow-hidden pb-24 pt-10 md:pb-32 md:pt-16">
          {/* Halftone dots behind the pictures that swell and turn red where the pointer is */}
          <HalftoneField />
          <div className="relative mx-auto max-w-[90rem] px-6 md:px-8">
            <WorkGrid projects={getOrderedProjects()} />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
