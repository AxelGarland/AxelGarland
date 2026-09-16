import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { RetabloSelector } from "@/components/projects/RetabloSelector";
import { MUNDOS_BOXES } from "@/lib/mundos";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
        <div className="pt-32 sm:pt-36">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              aria-label="Back to Work"
              className="mb-8 inline-flex h-10 w-10 items-center justify-center text-gold/60 transition-colors duration-300 hover:text-gold"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 4.5 6 10l6.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                Selected Work
              </p>
              <h1 className="mb-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
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
