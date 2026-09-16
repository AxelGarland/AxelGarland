import { GrainOverlay } from "@/components/GrainOverlay";
import { SlideStackGallery } from "@/components/projects/SlideStackGallery";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
        <div className="pt-32 sm:pt-36">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              aria-label="Back to Work"
              className="mb-8 inline-flex h-10 w-10 items-center justify-center text-coral/60 transition-colors duration-300 hover:text-coral"
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
        </div>

        {/* Book mockup — a plain white banner, no boxed border, before any text */}
        <div className="bg-white py-10 sm:py-14">
          <div className="relative mx-auto aspect-[5145/3780] w-full max-w-3xl px-6 sm:px-10">
            <Image
              src={pictureSrc("book mock up.jpg")}
              alt="Jabberwocky, printed book mockup"
              fill
              priority
              className="object-contain"
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-coral">
                Selected Work
              </p>
              <h1 className="mb-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                {project.title}
              </h1>
              <p className="text-lg leading-relaxed text-ink-muted">{project.reflection}</p>
            </div>
          </div>
        </section>

        {/* Pages — cover through the latest page, swappable via the slide-and-stack switcher */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <SlideStackGallery images={project.gallery} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
