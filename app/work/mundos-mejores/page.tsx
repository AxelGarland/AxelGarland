import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MundosExplorer } from "@/components/projects/MundosExplorer";
import { PhotoGrid } from "@/components/projects/PhotoGrid";
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

        {/* All the photos, whole, in a grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <PhotoGrid photos={MUNDOS_BOXES.flatMap((box) => box.images).filter((photo) => !photo.omitFromGrid)} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
