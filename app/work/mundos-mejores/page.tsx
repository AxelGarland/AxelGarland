import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { RetabloSelector } from "@/components/projects/RetabloSelector";
import { RetabloShowcase } from "@/components/projects/RetabloShowcase";
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
        {/* Header — the text on the left, the boxes opening one after another on the right */}
        <header className="pb-12 pt-32 sm:pt-36 md:pb-16">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div className="order-2 md:order-1">
              <h1 className="mb-6 font-display text-[clamp(1.95rem,3.9vw,3.51rem)] font-light leading-[1.02] tracking-tight text-ink">
                {project.title}
              </h1>
              <p className="max-w-[46ch] text-lg leading-relaxed text-ink-muted">{project.reflection}</p>
            </div>
            <RetabloShowcase boxes={MUNDOS_BOXES} className="order-1 md:order-2" />
          </div>
        </header>

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
