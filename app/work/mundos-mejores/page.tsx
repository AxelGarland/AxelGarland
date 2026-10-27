import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MundosHeader } from "@/components/projects/MundosHeader";
import { PhotoGrid } from "@/components/projects/PhotoGrid";
import { RetabloSelector } from "@/components/projects/RetabloSelector";
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
        {/* The text, and the boxes opening one after another */}
        <MundosHeader title={project.title} intro={project.reflection ?? ""} boxes={MUNDOS_BOXES} />

        {/* The five closed boxes: one on top, two on each side. Each opens its own page. */}
        <section className="border-t border-line pb-4 pt-16 md:pt-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <RetabloSelector boxes={MUNDOS_BOXES} />
          </div>
        </section>

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
