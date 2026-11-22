import { BackLink } from "@/components/projects/BackLink";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { CaseFacts } from "@/components/projects/CaseFacts";
import { TagLine } from "@/components/projects/TagLine";
import { HeroVideo } from "@/components/projects/HeroVideo";
import { LandingPageViewer } from "@/components/projects/LandingPageViewer";
import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { TabletFrame } from "@/components/projects/TabletFrame";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { cardTags } from "@/lib/workCards";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = pageMetadata({
  title: "AfterLife · Axel Garland",
  description:
    "AfterLife, a fictional app that lets you look back on your life after death, before moving on. A concept project in Figma by Axel Garland.",
  path: "/work/afterlife",
});

const TAGS = cardTags("afterlife");

const APP_FRAMES = [
  {
    file: "afterlife/Frame 40.png",
    alt: "AfterLife app welcome screen: a skeleton with open arms and a Let’s start button",
  },
  {
    file: "afterlife/Frame 43.png",
    alt: "AfterLife app statistics screen: a flower-shaped chart with leaves labeled friends, love, dreams, and more",
  },
  {
    file: "afterlife/Frame 33.png",
    alt: "AfterLife app screen: You were a dreamer, with illustrated flowers",
  },
  {
    file: "afterlife/Frame 41.png",
    alt: "AfterLife app screen: Your heart was full of love, with hearts connected like a constellation",
  },
  {
    file: "afterlife/Frame 44.png",
    alt: "AfterLife app screen: It’s okay to cry, with tear drops showing 8 liters of tears, 50% of joy",
  },
  {
    file: "afterlife/Frame 27.png",
    alt: "AfterLife app final screen: You made it, with two dancing skeletons and an I’m ready button",
  },
  {
    file: "afterlife/Frame 37.png",
    alt: "AfterLife app help screen: Need help? Ask death anything you want, with a skeleton and a microphone",
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
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Hero — full-bleed, the entrance animation fills the width and fades into the black below */}
        <header className="bg-black pt-[68px]">
          {/* The premise comes first, above the animation, so the first screen explains the project. */}
          <div className="mx-auto max-w-content px-6 pb-8 pt-20 sm:px-10 md:px-14 md:pt-14 lg:px-16">
            <div className="grid grid-cols-1 items-end gap-x-16 gap-y-5 md:grid-cols-[1.1fr_1fr]">
              <h1 className="type-title font-display text-surface">
                Your life, <em className="italic text-accent">wrapped</em>
              </h1>
              <p className="max-w-[48ch] text-lg leading-relaxed text-surface/75">
                AfterLife is a fictional app that lets you look back on your life after death, before moving on. I designed
                its interface, illustrations, and motion in Figma, using humor and familiar recap formats to approach the
                subject playfully.
              </p>
            </div>
          </div>
          {/* Never wider than the screen's height allows, so the whole frame fits instead of being
              cropped top and bottom on wide windows; the black page fills either side. */}
          <div className="relative mx-auto aspect-video w-full max-w-[calc((100svh-68px-14rem)*16/9)] overflow-hidden">
            <HeroVideo
              src={pictureSrc("afterlife/entrance animation.mp4")}
              mobileSrc={pictureSrc("afterlife/entrance-mobile.mp4")}
              poster={pictureSrc("afterlife/entrance-poster.jpg")}
              label="AfterLife’s landing page entrance: two skeletons dance beside the logo"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent"
            />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent" />
          </div>
          <div className="mx-auto max-w-content px-6 pb-16 pt-6 sm:px-10 sm:pb-20 md:px-14 lg:px-16">
            <TagLine tags={TAGS} tone="dark" />
            <CaseFacts tone="dark" className="mt-3">
              Concept project · Illustration, UI design, and animation in Figma
            </CaseFacts>
          </div>
        </header>

        {/* App — the text on the left and the first screen on the right, then the other screens */}
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-14 grid grid-cols-1 items-center gap-x-16 gap-y-10 md:mb-20 md:grid-cols-[1fr_1.1fr]">
              <div className="order-2 md:order-1">
                <h2 className="type-section font-display text-ink">
                  Four stages
                </h2>
                <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                  The app moves through Video, Memories, Statistics, and Ready to move on.
                </p>
                <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                  At the center is a flower-shaped statistics chart. Each leaf stands for one part of your life, such as
                  friends, love, or dreams, and opens into its own screen. The chart organizes the recap and works as its
                  menu.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <TabletFrame>
                  <Image
                    src={pictureSrc(APP_FRAMES[0].file)}
                    alt={APP_FRAMES[0].alt}
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </TabletFrame>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
              {APP_FRAMES.slice(1).map((frame) => (
                <TabletFrame key={frame.file}>
                  <Image
                    src={pictureSrc(frame.file)}
                    alt={frame.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 560px"
                  />
                </TabletFrame>
              ))}
            </div>
          </div>
        </section>

        {/* Loading animation, then the landing page */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            {/* Same two columns as the header above: the animation in the wide one, the words in the other */}
            <div className="mb-12 grid grid-cols-1 items-center gap-x-16 gap-y-8 md:mb-16 md:grid-cols-[1.1fr_1fr]">
              <LoadingLoop frames={OPENERS} />
              <div>
                <h2 className="mb-4 type-section font-display text-ink">
                  Loading animation and <em className="italic text-accent">landing page</em>
                </h2>
                <p className="max-w-[40ch] text-lg leading-relaxed text-ink-muted">I designed and animated the loading sequence and the landing page in Figma.</p>
              </div>
            </div>
            {/* A preview of the landing page's first screen; clicking opens the whole page full screen */}
            <LandingPageViewer
              alt="The full AfterLife landing page: the pitch, stats, and FAQs"
              className="mx-auto max-w-[60rem]"
            />
          </div>
        </section>

        <MoreProjects current="afterlife" />
      </main>
      <SiteFooter />
    </>
  );
}
