import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { HeroVideo } from "@/components/projects/HeroVideo";
import { KindredEmbed } from "@/components/projects/KindredEmbed";
import { PosterGallery } from "@/components/projects/PosterGallery";
import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Kindred · Axel Garland",
  description:
    "Kindred, a generative illustration system: hand-drawn tiles and coded rules of symmetry that make an endless family of faces.",
};

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
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Hero — the showreel sits beside the headline so it plays on the very first screen */}
        <header className="pb-16 pt-36 sm:pb-20 sm:pt-36">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div className="order-2 md:order-1">
              <h1 className="mb-8 font-display text-[clamp(1.95rem,3.9vw,3.51rem)] font-light leading-[1.02] tracking-tight text-ink">
                Of the same kind. <em className="italic text-accent">Never the same.</em>
              </h1>
              {project.liveUrl ? (
                <HalftoneButton href={project.liveUrl} external label="Try it yourself" />
              ) : null}
            </div>
            <div className="relative order-1 aspect-video w-full overflow-hidden bg-black md:order-2 md:-mr-4 lg:-mr-10">
              <HeroVideo
                src={pictureSrc("kindred/showreel.mp4")}
                poster={pictureSrc("kindred/showreel-poster.jpg")}
                label="Kindred showreel: crowds of colourful geometric faces that keep changing"
                soundToggle
              />
            </div>
          </div>
        </header>

        {/* Idea */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
              <div>
                <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-ink">
                  The idea
                </p>
                <h2 className="font-display text-2xl font-semibold leading-[1.15] text-ink">
                  Where code, algorithms, and illustration meet
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  Kindred explores where the boundaries between code, algorithms, and illustration
                  meet, producing an endless family of graphic faces, each one generated
                  automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <KindredEmbed />
            <p className="mx-auto mt-4 max-w-[72rem] text-sm text-ink-muted">
              This is the live site. Turn a tile, swap a word, roll a new face.
            </p>
          </div>
        </section>

        {/* Posters — text on the left, the gallery on the right, like the opening */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div>
              <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-ink">Posters</p>
              <h2 className="mb-5 font-display text-[clamp(1.95rem,3.9vw,3.51rem)] font-light leading-[1.02] tracking-tight text-ink">
                Crowds for the wall
              </h2>
              <p className="max-w-[40ch] text-lg leading-relaxed text-ink-muted">
                Each poster is a crowd of twelve faces drawn from the same rules. Prints are
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
      </main>
      <SiteFooter />
    </>
  );
}
