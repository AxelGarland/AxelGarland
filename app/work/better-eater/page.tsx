import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Better Eater · Axel Garland",
  description: "Better Eater, a personalized meal-planning and recipe app.",
};

const TAGS = ["Product Design", "Mobile App", "Interactive Course"];

const SCREENS = [
  {
    file: "bettereater/iPhone 14 Pro Space Black Mockup-2.png",
    alt: "Better Eater home screen: a greeting, the user's progress, and the next meals to plan",
    title: "Home",
    body: "A greeting, the user's progress so far, and the next meals waiting to be chosen.",
  },
  {
    file: "bettereater/iPhone 14 Pro Space Black Mockup-1.png",
    alt: "Better Eater recommended meal plan: breakfast, lunch, and dinner for a chosen day",
    title: "Meal Plan",
    body: "A recommended breakfast, lunch, and dinner for each day, with an ingredients-to-shopping-list shortcut.",
  },
  {
    file: "bettereater/iPhone 14 Pro Space Black Mockup.png",
    alt: "Better Eater recipe detail: time, difficulty, servings, and ingredients and instructions tabs",
    title: "Recipe",
    body: "Time, difficulty, servings, and step-by-step instructions, ending in a single Start Cooking button.",
  },
];

const FLOW = [
  "Plan the week",
  "Get a recommendation",
  "See the recipe",
  "Cook it",
  "Shop for the next one",
];

export default function BetterEaterPage() {
  const project = getProject("better-eater");
  if (!project || !project.caseStudy) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        {/* Hero */}
        <header className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[10%] -top-[10%] h-[55%] w-[55%] rounded-full bg-teal-soft blur-[100px]"
          />
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              aria-label="Back to Work"
              className="mb-8 inline-flex h-10 w-10 items-center justify-center text-teal/60 transition-colors duration-300 hover:text-teal"
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
              Case Studies
            </p>
            <p className="mb-6 text-sm uppercase tracking-[0.06em] text-ink-subtle">
              Better Eater
            </p>
            <h1 className="mb-6 max-w-[18ch] font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
              Eating, made <em className="italic text-teal">better</em>
            </h1>
            <p className="mb-8 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
              {project.summary} Designed around the user&rsquo;s own preferences.
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

            <Image
              src={pictureSrc("bettereater/wordmark.png")}
              alt="Better Eater, the app"
              width={1231}
              height={315}
              className="mx-auto mb-10 h-auto w-full max-w-[26rem] md:mb-14 md:max-w-[32rem]"
            />

            <div className="relative aspect-[1335/1093] w-full overflow-hidden">
              <Image
                src={pictureSrc(project.hero)}
                alt="Better Eater: recommended meal plan, home screen, and recipe detail"
                fill
                priority
                className="object-contain"
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                  The Brief
                </p>
                <h2 className="font-display text-3xl font-semibold leading-[1.15] text-ink">
                  Meet Amit, who we designed it for
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy.problem}
                </p>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy.process}
                </p>
                <p className="max-w-[64ch] text-base leading-relaxed text-ink-subtle">
                  {project.caseStudy.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screens — the three key screens, each shown whole */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-12 max-w-[56ch] md:mb-16">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                The Screens
              </p>
              <h2 className="font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                From a greeting to a recipe
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-8">
              {SCREENS.map((screen, i) => (
                <div key={screen.file}>
                  <div className="relative mx-auto aspect-[505/1023] w-full max-w-[16rem]">
                    <Image
                      src={pictureSrc(screen.file)}
                      alt={screen.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 256px, 30vw"
                    />
                  </div>
                  <div className="mx-auto mt-6 max-w-[16rem]">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm leading-none text-ink-subtle">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm font-semibold text-ink">{screen.title}</p>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{screen.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcome — the loop, as a flow instead of plain text */}
        <section className="border-t border-line bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
              The Outcome
            </p>
            <h2 className="mb-10 max-w-[36ch] font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl md:mb-12">
              The full loop, designed
            </h2>
            <ol className="grid grid-cols-1 gap-5 sm:grid-cols-5">
              {FLOW.map((step, i) => (
                <li
                  key={step}
                  className="border border-surface/15 bg-surface/5 p-5"
                >
                  <span className="mb-3 block font-display text-lg leading-none text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-semibold text-surface">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
