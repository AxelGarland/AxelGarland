import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { RetabloSelector } from "@/components/projects/RetabloSelector";
import { MundosExplorer } from "@/components/projects/MundosExplorer";
import { MUNDOS_BOXES } from "@/lib/mundos";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Mundos Mejores · Axel Garland",
  description:
    "Mundos Mejores, a series of retablo-inspired boxes combining traditional Peruvian craft with illustration, Axel Garland's final project at Shenkar.",
};


export default function MundosMejoresPage() {
  const project = getProject("mundos-mejores");
  if (!project) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <BackLink />
        {/* The text and the boxes you scrub through, and the section for the box on show */}
        <MundosExplorer title={project.title} intro={project.reflection ?? ""} boxes={MUNDOS_BOXES} />

        {/* The five retablos — each opens its own page */}
        <section className="pb-16 pt-4 md:pb-24 md:pt-8">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <RetabloSelector boxes={MUNDOS_BOXES} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
