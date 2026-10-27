import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { TagLine } from "@/components/projects/TagLine";
import { HeroVideo } from "@/components/projects/HeroVideo";
import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { TabletFrame } from "@/components/projects/TabletFrame";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AfterLife · Axel Garland",
  description:
    "AfterLife, a conceptual landing page and app for a service that gives you a wrap-up of your life, so you can celebrate it and move on.",
};

const TAGS = ["Illustration", "Landing Page", "Web App"];

const ILLUSTRATIONS = [
  { file: "afterlife/Group 38.png", alt: "A dancing skeleton wearing a blue flower crown" },
  { file: "afterlife/Group 48.png", alt: "A dancing skeleton wearing an orange flower crown" },
  { file: "afterlife/Group 19.png", alt: "A skeleton dancing with teal joints" },
  { file: "afterlife/Group 24.png", alt: "A red heart with a skull and violet wings" },
];

const APP_FRAMES = [
  {
    file: "afterlife/Frame 40.png",
    alt: "AfterLife app welcome screen: a skeleton with open arms and a Let's start button",
    title: "Welcome",
    body: "The app opens with a friendly skeleton who tells you that yes, you just died, but don't worry, and offers to help you celebrate your life.",
    wide: true,
  },
  {
    file: "afterlife/Frame 43.png",
    alt: "AfterLife app statistics screen: a flower-shaped chart with leaves labeled friends, love, dreams, and more",
    title: "Your statistics",
    body: "The numbers of a life drawn as a flower, with a leaf for each part: friends, love, dreams, achievements, laughter, and more. Each leaf leads to its own screen.",
  },
  {
    file: "afterlife/Frame 33.png",
    alt: "AfterLife app screen: You were a dreamer, with illustrated flowers",
    title: "Dreams",
    body: "One leaf opens into a screen about the dreamer you were, who spent nights creating fantasy lands in your head.",
  },
  {
    file: "afterlife/Frame 41.png",
    alt: "AfterLife app screen: Your heart was full of love, with hearts connected like a constellation",
    title: "Love",
    body: "Another leaf becomes hearts joined like a constellation, standing in for the people you loved.",
  },
  {
    file: "afterlife/Frame 44.png",
    alt: "AfterLife app screen: It's okay to cry, with tear drops showing 8 liters of tears, 50% of joy",
    title: "Tears",
    body: "Even the sad numbers get gentle treatment: 8 liters of tears, half of them from joy.",
  },
  {
    file: "afterlife/Frame 27.png",
    alt: "AfterLife app final screen: You made it, with two dancing skeletons and an I'm ready button",
    title: "You made it",
    body: "The last stage, Ready to move on, ends with a celebration and a single button: I'm ready.",
  },
  {
    file: "afterlife/Frame 37.png",
    alt: "AfterLife app help screen: Need help? Ask death anything you want, with a skeleton and a microphone",
    title: "Ask death anything",
    body: "A helper you can talk to whenever you're unsure, in the same deadpan voice as the rest of the app.",
  },
];

const OPENERS = [
  { file: "afterlife/Fold 38.png", alt: "AfterLife loading screen: a red heart between teal leaves, labeled Live" },
  { file: "afterlife/Fold 33.png", alt: "AfterLife loading screen: a skull between violet leaves, labeled Die" },
  { file: "afterlife/Fold 37.png", alt: "AfterLife loading screen: a teal flower between red leaves, labeled Celebrate" },
];

export default function AfterLifePage() {
  const project = getProject("afterlife");
  if (!project) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Hero — full-bleed, the entrance animation fills the width and fades into the black below */}
        <header className="bg-black pt-[68px]">
          {/* Never wider than the screen's height allows, so the whole frame fits instead of being
              cropped top and bottom on wide windows; the black page fills either side. */}
          <div className="relative mx-auto aspect-video w-full max-w-[calc((100svh-68px)*16/9)] overflow-hidden">
            <HeroVideo
              src={pictureSrc("afterlife/entrance animation.mp4")}
              poster={pictureSrc("afterlife/entrance-poster.jpg")}
              label="AfterLife's landing page entrance: two skeletons dance beside the logo"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent"
            />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent" />
          </div>
          <div className="mx-auto max-w-content px-6 pb-16 pt-6 sm:px-10 sm:pb-20 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-end gap-x-16 gap-y-6 md:grid-cols-[1.1fr_1fr]">
              <h1 className="font-display text-[clamp(2.15rem,4.68vw,4.29rem)] font-light leading-[1] tracking-tight text-surface">
                Your life, <em className="italic text-accent">wrapped</em>
              </h1>
              <div>
                <p className="mb-5 max-w-[48ch] text-lg leading-relaxed text-surface/75">
                  A conceptual landing page and app for AfterLife, a service that gives you a
                  wrap-up of your life. You celebrate it, and your soul is ready to move on.
                </p>
                <TagLine tags={TAGS} tone="dark" />
              </div>
            </div>
          </div>
        </header>

        {/* Landing page */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            {/* Same two columns as the header above: the animation in the wide one, the words in the other */}
            <div className="mb-12 grid grid-cols-1 items-center gap-x-16 gap-y-8 md:mb-16 md:grid-cols-[1.1fr_1fr]">
              <LoadingLoop frames={OPENERS} />
              <div>
                <h2 className="mb-4 font-display text-[clamp(1.75rem,3.2vw,2.9rem)] font-light leading-[1.02] tracking-tight text-ink">
                  Loading page animation and <em className="italic text-accent">landing page</em>
                </h2>
                <p className="max-w-[40ch] text-lg leading-relaxed text-ink-muted">Animated and designed in Figma.</p>
              </div>
            </div>
            {/* The whole landing page as one image, so the page itself does the scrolling */}
            <div className="mx-auto max-w-[60rem] border border-line bg-black">
              <Image
                src={pictureSrc("afterlife/landing page.png")}
                alt="The full AfterLife landing page: the pitch, stats, and FAQs"
                width={1920}
                height={7728}
                className="h-auto w-full"
                sizes="(max-width: 960px) 100vw, 960px"
              />
            </div>
          </div>
        </section>

        {/* Illustrations */}
        <section className="bg-black py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-light">
              The illustrations
            </p>
            <h2 className="mb-6 max-w-[28ch] font-display text-2xl font-semibold leading-[1.15] text-surface sm:text-3xl">
              A small cast, drawn in Illustrator
            </h2>
            <p className="mb-12 max-w-[60ch] text-lg leading-relaxed text-surface/70 md:mb-16">
              Dancing skeletons, winged skull-hearts, flowers, and leaves, in a palette of black,
              teal, violet, and yellow. They work as characters and as framing, so every screen
              feels like part of the same world.
            </p>
            <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-4">
              {ILLUSTRATIONS.map((art) => (
                <div key={art.file} className="relative h-56 sm:h-64">
                  <Image
                    src={pictureSrc(art.file)}
                    alt={art.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 45vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-12 max-w-[56ch] md:mb-16">
              <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-ink">
                The app
              </p>
              <h2 className="font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
                A recap for a whole life
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                The app walks you through your life in four stages: Video, Memories, Statistics,
                and Ready to move on. At the center is a flower-shaped statistics chart, and each
                leaf opens into a screen about one part of your life, told gently and with a little humor.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {APP_FRAMES.map((frame) => (
                <div key={frame.file} className={frame.wide ? "mx-auto w-full max-w-[44rem] md:col-span-2" : ""}>
                  <TabletFrame>
                    <Image
                      src={pictureSrc(frame.file)}
                      alt={frame.alt}
                      fill
                      className="object-contain"
                      sizes={frame.wide ? "(max-width: 768px) 100vw, 704px" : "(max-width: 768px) 100vw, 560px"}
                    />
                  </TabletFrame>
                  <p className="mt-4 text-sm font-semibold text-ink">{frame.title}</p>
                  <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-ink-muted">
                    {frame.body}
                  </p>
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
