import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { RetabloSelector } from "@/components/projects/RetabloSelector";
import { MUNDOS_BOXES } from "@/lib/mundos";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="pt-32 sm:pt-36">
          <div className="relative mx-auto aspect-[6544/2521] w-full max-w-4xl px-6 sm:px-10">
            <Image
              src={pictureSrc(project.hero)}
              alt="The “Mundos Mejores” box: a family of figures standing arm in arm beneath the project's title"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </div>

        {/* Text explaining the project */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto max-w-[68ch] text-center">
              <h1 className="mb-6 font-display text-[clamp(1.76rem,3.9vw,2.73rem)] font-light leading-[1.05] tracking-tight text-ink">
                {project.title}
              </h1>
              <p className="text-lg leading-relaxed text-ink-muted">{project.reflection}</p>
            </div>
          </div>
        </section>

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
