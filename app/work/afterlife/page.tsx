import { GrainOverlay } from "@/components/GrainOverlay";
import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "AfterLife · Axel Garland",
  description:
    "AfterLife, a landing page and app for an invented service that helps you celebrate your life as you move into the afterlife.",
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
    file: "afterlife/Frame 33.png",
    alt: "AfterLife app screen: You were a dreamer, with illustrated flowers",
    title: "One thing at a time",
    body: "Each screen states one fact about your life, like being a dreamer who spent nights creating fantasy lands in your head.",
  },
  {
    file: "afterlife/Frame 41.png",
    alt: "AfterLife app screen: Your heart was full of love, with hearts connected like a constellation",
    title: "Your heart was full of love",
    body: "Hearts joined like a constellation stand in for the people you loved.",
  },
  {
    file: "afterlife/Frame 43.png",
    alt: "AfterLife app statistics screen: a flower-shaped chart with leaves labeled friends, love, dreams, and more",
    title: "Your statistics",
    body: "The numbers of a life drawn as a flower, with a leaf for each part: friends, love, dreams, achievements, laughter, and more.",
  },
  {
    file: "afterlife/Frame 44.png",
    alt: "AfterLife app screen: It's okay to cry, with tear drops showing 8 liters of tears, 50% of joy",
    title: "It's okay to cry",
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
  { file: "afterlife/Fold 33.png", alt: "AfterLife screen: a skull between violet leaves, labeled Die" },
  { file: "afterlife/Fold 37.png", alt: "AfterLife screen: a teal flower between red leaves, labeled Celebrate" },
  { file: "afterlife/Fold 38.png", alt: "AfterLife screen: a red heart between teal leaves, labeled Live" },
];

export default function AfterLifePage() {
  const project = getProject("afterlife");
  if (!project) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        {/* Hero */}
        <header className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[10%] -top-[10%] h-[55%] w-[55%] rounded-full bg-indigo-soft blur-[100px]"
          />
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              aria-label="Back to Work"
              className="mb-8 inline-flex h-10 w-10 items-center justify-center text-indigo/60 transition-colors duration-300 hover:text-indigo"
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
              Selected Work
            </p>
            <h1 className="mb-6 max-w-[18ch] font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
              Your life, <em className="italic text-indigo">wrapped</em>
            </h1>
            <p className="mb-8 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
              A landing page and an app for AfterLife, an invented service that helps you
              celebrate your life as you move into the afterlife.
            </p>
            <div className="mb-12 flex flex-wrap gap-2.5">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="border border-line px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.06em] text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              <Image
                src={pictureSrc(project.hero)}
                alt="AfterLife: a skeleton welcoming you to the afterlife"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            </div>
          </div>
        </header>

        {/* Brief */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
                  The Brief
                </p>
                <h2 className="font-display text-3xl font-semibold leading-[1.15] text-ink">
                  Death, but positive
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  The assignment was to design a landing page, then an app for it. I worked on it
                  solo, and I wanted a subject that could be heavy and warm at once. So I chose
                  death, and made it a celebration.
                </p>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  AfterLife is an invented service that helps you move to the other side. Its
                  centerpiece is a recap, like Spotify Wrapped, but for your whole life: a look
                  back at your memories and your statistics before you move on.
                </p>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  The tone is deadpan on purpose. The copy talks like an upbeat startup (&ldquo;Yes
                  you are dead&rdquo;), while the illustrations bring the color and warmth of
                  Day-of-the-Dead imagery.
                </p>
                <p className="max-w-[64ch] text-base leading-relaxed text-ink-subtle">
                  A solo school project. Concept, copy, illustration, and UI design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Landing page */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-10 max-w-[56ch] md:mb-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
                The Landing Page
              </p>
              <h2 className="font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                Welcome. Yes, you are dead.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                One long page that explains the service, sells it with a straight face, and ends
                in a set of FAQs. Scroll inside the frame to see all of it.
              </p>
            </div>
            <div className="mx-auto mb-10 flex max-w-[60rem] flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
              <div className="w-full max-w-[24rem] shrink-0">
                <LoadingLoop frames={OPENERS} />
              </div>
              <p className="max-w-[40ch] text-base leading-relaxed text-ink-muted">
                Before the page opens, a short loading animation runs through three words: Die,
                Celebrate, Live. It sets the tone before a single line of copy.
              </p>
            </div>
            <div
              tabIndex={0}
              role="region"
              aria-label="AfterLife landing page, scrollable"
              className="mx-auto max-h-[38rem] max-w-[60rem] overflow-y-auto border border-line bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo"
            >
              <Image
                src={pictureSrc("afterlife/Frame 6.png")}
                alt="The full AfterLife landing page: welcome, the pitch, stats, and FAQs"
                width={1920}
                height={10978}
                className="h-auto w-full"
                sizes="(max-width: 960px) 100vw, 960px"
              />
            </div>
          </div>
        </section>

        {/* Illustrations */}
        <section className="bg-black py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
              The Illustrations
            </p>
            <h2 className="mb-6 max-w-[28ch] font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl">
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
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
                The App
              </p>
              <h2 className="font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                A recap for a whole life
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                The app walks you through your life in four stages: Video, Memories, Statistics,
                and Ready to move on. Each screen says one thing about your life, gently and with
                a little humor.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {APP_FRAMES.map((frame) => (
                <div key={frame.file} className={frame.wide ? "md:col-span-2" : ""}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-black">
                    <Image
                      src={pictureSrc(frame.file)}
                      alt={frame.alt}
                      fill
                      className="object-cover"
                      sizes={frame.wide ? "(max-width: 768px) 100vw, 1152px" : "(max-width: 768px) 100vw, 560px"}
                    />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink">{frame.title}</p>
                  <p className="mt-1.5 max-w-[56ch] text-sm leading-relaxed text-ink-muted">
                    {frame.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice */}
        <section className="border-t border-line bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
              The Voice
            </p>
            <h2 className="mb-8 max-w-[28ch] font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl">
              Will it hurt moving into the afterlife?
            </h2>
            <p className="max-w-[40ch] font-display text-2xl font-light leading-snug text-surface/90 sm:text-3xl">
              Of course not. Quite the opposite, it&rsquo;s a great sensation. At least we think,
              no one remembers how it feels.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
