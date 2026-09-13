import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SlideStackGallery } from "@/components/projects/SlideStackGallery";
import { VideoHero } from "@/components/projects/VideoHero";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Facettes · Axel Garland",
  description:
    "Facettes, a generative illustration experiment where choosing different attributes builds a different illustrated face each time.",
};

const POSTERS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    file: `Facettes/פוסטרים להדפסה-${n}.png`,
    alt: `Facettes print poster, color variation ${i + 1}`,
  };
});

const WEBSITE_SHOTS = [
  { file: "Facettes/facettes website landing.png", alt: "Facettes website: landing screen", caption: "Landing" },
  { file: "Facettes/facettes website generator.png", alt: "Facettes website: a generated face with its caption", caption: "The Generator" },
];

export default function FacettesPage() {
  const project = getProject("facettes");
  if (!project) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <div className="pt-32 sm:pt-36">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              className="mb-8 inline-block text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              &larr; Work
            </Link>
          </div>
        </div>

        {/* Hero — the video poster, clicking plays the demo inline */}
        <section className="pb-4">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden border border-line">
              <VideoHero
                file={project.hero}
                alt={`${project.title}, hero`}
                videoUrl={project.videoUrl!}
                priority
              />
            </div>
          </div>
        </section>

        {/* Text explaining the project */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto max-w-[68ch] text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                Other Work
              </p>
              <h1 className="mb-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                {project.title}
              </h1>
              <p className="text-lg leading-relaxed text-ink-muted">{project.summary}</p>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-ink-muted underline underline-offset-4 transition-colors duration-300 hover:text-ink"
                >
                  View the live project
                  <span aria-hidden>&#8599;</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* Posters — the print set */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
              Posters
            </p>
            <h2 className="mb-10 max-w-[24ch] font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl md:mb-12">
              A print set, one per color combination
            </h2>
            <SlideStackGallery images={POSTERS} aspect="aspect-[842/1191]" />
          </div>
        </section>

        {/* Website — how the live tool looks */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
              The Website
            </p>
            <h2 className="mb-6 max-w-[28ch] font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
              Pick attributes, get a face and a caption
            </h2>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-10 inline-flex items-center gap-2 text-sm text-ink-muted underline underline-offset-4 transition-colors duration-300 hover:text-ink md:mb-12"
              >
                Try it yourself
                <span aria-hidden>&#8599;</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {WEBSITE_SHOTS.map((shot) => (
                <div key={shot.file}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
                    <Image
                      src={pictureSrc(shot.file)}
                      alt={shot.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <p className="mt-3 text-sm text-ink-subtle">{shot.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
