import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
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
        {/* Book mockup — a plain white banner, no boxed border, before any text */}
        <div className="pb-10 pt-28 sm:pb-14 sm:pt-32">
          <div className="relative mx-auto aspect-[5145/3780] w-full max-w-3xl px-6 sm:px-10">
            <Image
              src={pictureSrc("jabberwocky/book-mockup.jpg")}
              alt="Jabberwocky, printed book mockup"
              fill
              priority
              className="object-contain mix-blend-multiply"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>

        {/* Text explaining the project — flanked by two mirrored corner flourishes, cut from the
            book cover's own Jabberwock head, sized to the title text so they read as an ornament
            rather than an illustration competing with it. */}
        <section className="py-16 md:py-20">
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Image
              src={pictureSrc("jabberwocky title no background.png")}
              alt=""
              aria-hidden
              width={200}
              height={200}
              className="absolute left-6 -top-[20px] h-[100px] w-[100px] object-contain sm:left-10 sm:h-[124px] sm:w-[124px] md:left-14 md:h-[156px] md:w-[156px] lg:left-16"
            />
            <Image
              src={pictureSrc("jabberwocky title no background.png")}
              alt=""
              aria-hidden
              width={200}
              height={200}
              className="absolute right-6 -top-[20px] h-[100px] w-[100px] -scale-x-100 object-contain sm:right-10 sm:h-[124px] sm:w-[124px] md:right-14 md:h-[156px] md:w-[156px] lg:right-16"
            />
            <div className="mx-auto max-w-[68ch] text-center">
              <h1 className="mb-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                {project.title}
              </h1>
              <p className="text-lg leading-relaxed text-ink-muted">{project.reflection}</p>
            </div>
          </div>
        </section>

        {/* The book's own spreads, original lettering and illustration together */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <SlideStackGallery
              images={project.gallery}
              aspect="aspect-[2800/840]"
              maxWidth="max-w-5xl"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
