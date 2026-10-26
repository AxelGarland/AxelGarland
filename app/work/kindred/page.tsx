import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { HeroVideo } from "@/components/projects/HeroVideo";
import { SlideStackGallery } from "@/components/projects/SlideStackGallery";
import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
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

const STEPS = [
  {
    file: "kindred/grid.jpg",
    alt: "Kindred's 5 by 5 grid, with each cell assigned to a part of the face",
    title: "Twenty-five cells, nine jobs",
    body: "Every face sits on the same 5 by 5 grid, and each cell belongs to one part of the face: frame, brow, eyes, nose, cheeks, jaw, chin corners, mouth, and chin.",
  },
  {
    file: "kindred/tiles.jpg",
    alt: "The sheet of twenty-seven hand-drawn tiles in orange and black, with a row of colour swatches",
    title: "Twenty-seven tiles",
    body: "Every shape in every face comes from one sheet. Turn a tile and flip it: one shape, up to eight positions.",
  },
  {
    file: "kindred/symmetry.jpg",
    alt: "Building a face step by step: the nose is drawn on one side and mirrored on the other",
    title: "Draw half, mirror the rest",
    body: "Ten words build each face, one part at a time. Nine choose tiles and the tenth chooses the colour. The rules draw half of each part and mirror the rest.",
  },
  {
    file: "kindred/one-word-apart.jpg",
    alt: "Two nearly identical faces, a parent and a relative, with the two tiles that changed outlined",
    title: "One word apart",
    body: "Swap a single word and only a few tiles change. The rest stays put, which is why the faces read as family.",
  },
  {
    file: "kindred/add-a-relative.jpg",
    alt: "A large face beside a row of colourful relatives, with a Roll button to add another",
    title: "Add a relative",
    body: "Roll ten words and a new face joins the line. The tiles are drawn by hand, the combinations are not.",
  },
];

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
            <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-ink">
              How it works
            </p>
            <h2 className="mb-12 max-w-[28ch] font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl md:mb-16">
              A few rules, and a family of faces
            </h2>
            <div className="mx-auto flex max-w-[60rem] flex-col gap-16 md:gap-20">
              {STEPS.map((step, i) => (
                <div key={step.file}>
                  <div className="relative w-full overflow-hidden border border-line bg-black">
                    <Image
                      src={pictureSrc(step.file)}
                      alt={step.alt}
                      width={2400}
                      height={1600}
                      className="h-auto w-full"
                      sizes="(max-width: 960px) 100vw, 960px"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-sm leading-none text-ink-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-ink">{step.title}</p>
                  </div>
                  <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Posters */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-ink">
              Posters
            </p>
            <h2 className="mb-4 max-w-[24ch] font-display text-xl font-semibold leading-[1.15] text-ink sm:text-2xl">
              Crowds for the wall
            </h2>
            <p className="mb-10 max-w-[56ch] text-base leading-relaxed text-ink-muted md:mb-12">
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
            <SlideStackGallery
              images={POSTERS}
              aspect="aspect-[842/1191]"
              maxWidth="max-w-[19rem] sm:max-w-[22rem]"
              sizes="352px"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
