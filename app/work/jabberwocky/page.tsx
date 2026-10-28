import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { SlideStackGallery } from "@/components/projects/SlideStackGallery";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Jabberwocky · Axel Garland",
  description: "Jabberwocky, a fully illustrated book of Lewis Carroll's nonsense poem.",
};

export default function JabberwockyPage() {
  const project = getProject("jabberwocky");
  if (!project) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Header — the title and text on the left, the book mockup smaller on the right */}
        <header className="pb-16 pt-32 sm:pt-36 md:pb-20">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[1fr_1fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div className="order-2 md:order-1">
              <h1 className="mb-6 font-display text-[clamp(1.95rem,3.9vw,3.51rem)] font-light leading-[1.02] tracking-tight text-ink">
                {project.title}
              </h1>
              <p className="max-w-[46ch] text-lg leading-relaxed text-ink-muted">{project.reflection}</p>
            </div>
            <div className="relative order-1 mx-auto aspect-[5145/3780] w-full max-w-[30rem] md:order-2 md:max-w-none">
              <Image
                src={pictureSrc("jabberwocky/book-mockup.jpg")}
                alt="Jabberwocky, printed book mockup"
                fill
                priority
                className="object-contain mix-blend-multiply"
                sizes="(max-width: 768px) 90vw, 560px"
              />
            </div>
          </div>
        </header>

        {/* The book's own spreads, original lettering and illustration together */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <SlideStackGallery
              images={project.gallery}
              aspect="aspect-[2800/840]"
              maxWidth="max-w-5xl"
              sizes="(max-width: 1024px) 100vw, 1024px"
              expandOnMobile
            />
          </div>
        </section>
        <MoreProjects current="jabberwocky" />
      </main>
      <SiteFooter />
    </>
  );
}
