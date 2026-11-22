import { BackLink } from "@/components/projects/BackLink";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { CaseFacts } from "@/components/projects/CaseFacts";
import { HeroVideo } from "@/components/projects/HeroVideo";
import { PosterGallery } from "@/components/projects/PosterGallery";
import { TapToEnlarge } from "@/components/projects/TapToEnlarge";
import { DesignButton } from "@/components/home/DesignButton";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = pageMetadata({
  title: "Kindred · Axel Garland",
  description:
    "Kindred, a generative illustration system: hand-drawn tiles and coded rules of symmetry that make an endless family of faces.",
  path: "/work/kindred",
});

/** The five steps of the live site, as stills, in the order they appear there. */
const HOW_IT_WORKS = [
  { file: "kindred/grid.jpg", w: 2400, h: 1502, alt: "Kindred: a five by five grid, twenty-five cells that make nine parts of a face" },
  { file: "kindred/tiles.jpg", w: 2400, h: 1633, alt: "Kindred: the twenty-seven hand-drawn tiles every face is built from" },
  { file: "kindred/symmetry.jpg", w: 2400, h: 1545, alt: "Kindred: drawing half a face and mirroring the rest, one part at a time" },
  { file: "kindred/add-a-relative.jpg", w: 2400, h: 1787, alt: "Kindred: ten words roll a new face that joins the line of relatives" },
  { file: "kindred/one-word-apart.jpg", w: 2400, h: 1758, alt: "Kindred: swapping one word changes only a few tiles, so the faces read as family" },
] as const;

const POSTERS = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    file: `Facettes/פוסטרים להדפסה-${n}.png`,
    alt: `Kindred poster, crowd ${i + 1}`,
  };
});

export default function KindredPage() {
  const project = getProject("kindred");
  if (!project) notFound();

  return (
    <>
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Hero — the showreel sits beside the headline so it plays on the very first screen */}
        <header className="pb-16 pt-36 sm:pb-20 sm:pt-36">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div className="order-2 md:order-1">
              <h1 className="mb-8 type-title font-display text-ink">
                Of the same kind. <em className="italic text-accent">Never the same.</em>
              </h1>
              <p className="mb-6 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                Kindred is a generative illustration tool I designed and built. It combines 27 hand-drawn tiles with rules
                for arranging and mirroring them to create families of different faces.
              </p>
              <CaseFacts className="mb-8">Illustration, interface design, and code · Web app</CaseFacts>
              {project.liveUrl ? (
                <DesignButton href={project.liveUrl} external label="Open Kindred" />
              ) : null}
            </div>
            <div className="relative order-1 aspect-video w-full overflow-hidden bg-black md:order-2">
              <HeroVideo
                src={pictureSrc("kindred/showreel.mp4")}
                mobileSrc={pictureSrc("kindred/showreel-mobile.mp4")}
                poster={pictureSrc("kindred/showreel-poster.jpg")}
                label="Kindred showreel: crowds of colorful geometric faces that keep changing"
                soundToggle
                expandOnMobile
                playOnce
              />
            </div>
          </div>
        </header>

        {/* Idea */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
              <div>
                <h2 className="type-section font-display text-ink">
                  Where code, algorithms, and illustration meet
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  A face is built from many separate perceptions of others and of ourselves, so every face here is
                  assembled from shared parts. Swapping one word changes only a few tiles, so related faces read as
                  relatives.
                </p>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  I draw each part once and mirror it, so every face stays balanced, and the rules keep any combination
                  reading as a face.
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                  27 hand-drawn tiles
                  <span aria-hidden className="mx-2 text-accent">&rarr;</span>
                  <span className="sr-only">, then </span>
                  rules
                  <span aria-hidden className="mx-2 text-accent">&rarr;</span>
                  <span className="sr-only">, then </span>
                  generated faces
                  <span aria-hidden className="mx-2 text-accent">&rarr;</span>
                  <span className="sr-only">, then </span>
                  posters
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works: the five steps of the live site as stills, then a link to the real thing */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <ol className="mx-auto flex max-w-[72rem] flex-col gap-3 bg-[#07090a] p-3 md:gap-4 md:p-4">
              {HOW_IT_WORKS.map((step) => (
                <li key={step.file} className="relative">
                  <Image
                    src={pictureSrc(step.file)}
                    alt={step.alt}
                    width={step.w}
                    height={step.h}
                    className="h-auto w-full"
                    sizes="(max-width: 1152px) 100vw, 1152px"
                  />
                  <TapToEnlarge file={step.file} alt={step.alt} width={step.w} height={step.h} openWidth={900} />
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-6 max-w-[72rem] text-sm leading-relaxed text-ink-muted">
              Stills from the live app. Prompts such as &ldquo;Pick a part, or hover a cell&rdquo; belong to the
              interactive version.
            </p>
            {project.liveUrl ? (
              <div className="mx-auto mt-10 flex max-w-[72rem] justify-center md:mt-14">
                <DesignButton href={project.liveUrl} external label="Open Kindred" />
              </div>
            ) : null}
          </div>
        </section>

        {/* Posters — text on the left, the gallery on the right, like the opening */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div>
              <h2 className="mb-5 type-title font-display text-ink">
                Crowds for the wall
              </h2>
              <p className="max-w-[40ch] text-lg leading-relaxed text-ink-muted">
                Each poster is a crowd of 12 faces drawn from the same rules. Prints are
                available on request:{" "}
                <Link
                  href="/contact"
                  className="text-ink underline underline-offset-4 transition-colors duration-300 hover:text-accent"
                >
                  get in touch
                </Link>
                .
              </p>
            </div>
            <PosterGallery posters={POSTERS} label="Crowd" />
          </div>
        </section>
        <MoreProjects current="kindred" />
      </main>
      <SiteFooter />
    </>
  );
}
