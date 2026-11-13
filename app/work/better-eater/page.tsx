import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { CaseFacts } from "@/components/projects/CaseFacts";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { TagLine } from "@/components/projects/TagLine";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { cardTags } from "@/lib/workCards";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = pageMetadata({
  title: "Better Eater · Axel Garland",
  description:
    "Better Eater, a meal-planning and recipe app: a Shenkar team project I co-designed, focused on mobile interface design from onboarding to cooking.",
  path: "/work/better-eater",
});

const TAGS = cardTags("better-eater");

/** The core flow, in order: onboarding, the weekly plan, the recipe, cooking. */
const FLOW = [
  {
    file: "bettereater/how often do you want to cook.png",
    alt: "Better Eater onboarding: a slider to choose how often to cook, with every 3 days recommended",
    title: "Set your pace",
    body: "Choose how often to cook, from every day to every seven days.",
  },
  {
    file: "bettereater/recommended meal plan.png",
    alt: "Better Eater recommended meal plan: breakfast, lunch, and dinner for a chosen day",
    title: "Get a weekly plan",
    body: "A recommended breakfast, lunch, and dinner for each day, with time, taste, and difficulty at a glance, and a shortcut to add every ingredient to the shopping list.",
  },
  {
    file: "bettereater/iPhone 14 Pro Space Black Mockup.png",
    alt: "Better Eater recipe detail: time, difficulty, servings, and ingredients and instructions tabs",
    title: "See the recipe",
    body: "Time, difficulty, servings, and step-by-step instructions, ending in a single Start Cooking button.",
  },
] as const;

const COOK = {
  file: "bettereater/cook-instructions-landscape.png",
  alt: "Better Eater cooking mode: a captioned step video beside the recipe’s ingredients and instructions",
  title: "Cook along",
  body: "A captioned video of each step, with the ingredients and instructions right beside it.",
} as const;

const DECISIONS = [
  {
    title: "A recommended pace",
    body: "The cooking-frequency scale runs from every day to once a week. Every three days is marked as recommended: a bigger batch that saves time and stays realistic for a student who also works.",
  },
  {
    title: "Video beside the written steps",
    body: "Each step combines written instructions with video, so beginners can see the technique instead of interpreting it from text alone.",
  },
  {
    title: "A soft green palette",
    body: "A soft green palette keeps the interface associated with food and freshness without leaning into the clinical language of diet apps.",
  },
] as const;

export default function BetterEaterPage() {
  const project = getProject("better-eater");
  if (!project) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Hero: the app's wordmark as the title with the text beneath it, the screens on the right */}
        <header className="relative overflow-hidden pb-16 pt-36 sm:pb-20">
          <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[1fr_1fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div>
              <h1 className="mb-8 w-full max-w-[26rem] md:max-w-[30rem]">
                <Image
                  src={pictureSrc("bettereater/wordmark-title-spaced.png")}
                  alt="Better Eater"
                  width={1235}
                  height={164}
                  priority
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 90vw, 480px"
                />
              </h1>
              <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                A meal-planning and recipe app that helps you move toward the way of eating you want to try.
              </p>
              <TagLine tags={TAGS} />
              <CaseFacts className="mt-3">
                Shenkar course project, with Yuval Sa’ar · Persona, wireframes, visual design, branding, prototype
              </CaseFacts>
            </div>
            <div className="relative mx-auto aspect-[1335/1093] w-full max-w-[34rem] overflow-hidden md:max-w-none">
              <Image
                src={pictureSrc(project.hero)}
                alt="Better Eater: recommended meal plan, home screen, and recipe detail"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
          </div>
        </header>

        {/* Context: what it is, who it is for. Short. */}
        <section className="border-t border-line bg-paper py-14 md:py-20">
          <div className="mx-auto grid max-w-content grid-cols-1 gap-6 px-6 sm:px-10 md:grid-cols-[1fr_2fr] md:gap-16 md:px-14 lg:px-16">
            <h2 className="type-section font-display text-ink">Who it&rsquo;s for</h2>
            <div className="flex max-w-[64ch] flex-col gap-4 text-lg leading-relaxed text-ink-muted">
              <p>
                Amit has always wanted to eat vegan. The pain point isn&rsquo;t wanting to eat well. It&rsquo;s not
                knowing where to begin, and not having room in a busy week to work it out. She&rsquo;s a composite
                of two people we interviewed who wanted to change their diet.
              </p>
              <p>
                Better Eater supports whichever way of eating you want to try, whether that&rsquo;s vegan,
                vegetarian, keto, or something else, and makes cooking easy at any level.
              </p>
            </div>
          </div>
        </section>

        {/* The core flow: onboarding, weekly plan, recipe, cooking */}
        <section className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-12 max-w-[56ch] md:mb-16">
              <h2 className="type-section font-display text-ink">From plan to plate</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                From choosing how often to cook, to a plan for the week, to following along in the kitchen.
              </p>
            </div>
            <ol className="m-0 grid list-none grid-cols-1 gap-14 p-0 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,2.1fr)] lg:items-center">
              {[...FLOW, COOK].map((screen, i) => {
                const wide = screen === COOK;
                return (
                  <li key={screen.file} className={wide ? "sm:col-span-2 lg:col-span-1" : ""}>
                    <div
                      className={`relative mx-auto w-full ${
                        wide ? "aspect-[1023/505] max-w-[34rem]" : "aspect-[505/1023] max-w-[16rem]"
                      }`}
                    >
                      <Image
                        src={pictureSrc(screen.file)}
                        alt={screen.alt}
                        fill
                        className="object-contain"
                        sizes={wide ? "(max-width: 1024px) 100vw, 34rem" : "(max-width: 640px) 256px, 25vw"}
                      />
                    </div>
                    <div className={`mx-auto mt-6 ${wide ? "max-w-[34rem]" : "max-w-[16rem]"}`}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-sm leading-none text-ink-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-semibold text-ink">{screen.title}</p>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{screen.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Interface decisions: three, specific, and no screen shown twice */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <h2 className="mb-10 type-section font-display text-ink md:mb-14">Interface decisions</h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-10 p-0 md:grid-cols-3 md:gap-x-10">
              {DECISIONS.map((item) => (
                <li key={item.title} className="border-t border-ink/25 pt-5">
                  <h3 className="mb-3 type-sub font-display text-ink">{item.title}</h3>
                  <p className="max-w-[40ch] text-base leading-relaxed text-ink-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The last picture: the full-screen cooking video, a screen not shown above. The page ends here. */}
        <section className="bg-surface py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="relative mx-auto aspect-[1023/505] w-full max-w-[44rem]">
              <Image
                src={pictureSrc("bettereater/cook-video-landscape.png")}
                alt="Better Eater full-screen cooking video with chapters: Prep, Bake, Roast, Chickpeas, Bake"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 44rem"
              />
            </div>
            <p className="mx-auto mt-6 max-w-[44rem] text-sm leading-relaxed text-ink-muted">
              Full-screen chapters like Prep, Bake, and Roast make it easy to skip ahead or replay a step without
              losing your place.
            </p>
          </div>
        </section>

        <MoreProjects current="better-eater" />
      </main>
      <SiteFooter closing={false} />
    </>
  );
}
