import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SlideStackGallery } from "@/components/projects/SlideStackGallery";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Mundos Mejores — Axel Garland",
  description:
    "Mundos Mejores — a series of retablo-inspired boxes combining traditional Peruvian craft with illustration, Axel Garland's final project at Shenkar.",
};

const BOXES = [
  {
    title: "Familia",
    images: [
      { file: "mundos mejores/Familia 1.jpg", alt: "The \"Mundos Mejores\" box — a family of figures standing arm in arm" },
      { file: "mundos mejores/familia 2.jpg", alt: "Family box, detail view" },
      { file: "mundos mejores/familia 3.jpg", alt: "Family box, detail view" },
    ],
  },
  {
    title: "Between the Stars",
    images: [
      { file: "mundos mejores/between the stars.jpg", alt: "A figure swinging among hanging painted stars" },
      { file: "mundos mejores/between the stars1.jpg", alt: "Stars box, detail view" },
      { file: "mundos mejores/between the stars2.jpg", alt: "Stars box, detail view" },
      { file: "mundos mejores/between stars 3.jpg", alt: "Stars box, detail view" },
    ],
  },
  {
    title: "Biblioteca",
    images: [
      { file: "mundos mejores/biblioteca1.jpg", alt: "A figure reading among towering stacks of books" },
      { file: "mundos mejores/biblioteca 2.jpg", alt: "Library box, detail view" },
      { file: "mundos mejores/biblioteca 3.jpg", alt: "Library box, detail view" },
    ],
  },
  {
    title: "Underwater",
    images: [
      { file: "mundos mejores/underwater1.jpg", alt: "A figure in a swimsuit and flippers, suspended underwater" },
      { file: "mundos mejores/underwater 2.jpg", alt: "Underwater box, detail view" },
      { file: "mundos mejores/underwater 3.jpg", alt: "Underwater box, detail view" },
    ],
  },
  {
    title: "Summer",
    images: [
      { file: "mundos mejores/summer 1.jpg", alt: "A figure basking beneath a smiling sun and blooming flowers" },
      { file: "mundos mejores/summer 2.jpg", alt: "Summer box, detail view" },
      { file: "mundos mejores/summer 3.jpg", alt: "Summer box, detail view" },
      { file: "mundos mejores/summer 4.jpg", alt: "Summer box, detail view" },
    ],
  },
];

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
              className="mb-8 inline-block text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              &larr; Work
            </Link>
          </div>

          <div className="relative mx-auto aspect-[6544/2521] w-full max-w-4xl px-6 sm:px-10">
            <Image
              src={pictureSrc(project.hero)}
              alt="The “Mundos Mejores” box — a family of figures standing arm in arm beneath the project's title"
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

        {/* One box per scene */}
        {BOXES.map((box, i) => (
          <section
            key={box.title}
            className={`py-16 md:py-24 ${
              i % 2 === 1 ? "border-t border-line bg-paper" : "border-t border-line"
            }`}
          >
            <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
                Box {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mb-10 font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl md:mb-12">
                {box.title}
              </h2>
              <SlideStackGallery images={box.images} aspect="aspect-[4/3]" />
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
