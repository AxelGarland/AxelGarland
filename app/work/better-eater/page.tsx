import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
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
    "Better Eater, a meal-planning and recipe app: a Shenkar team project I co-designed, from persona and wireframes to a Figma prototype.",
  path: "/work/better-eater",
});

const TAGS = cardTags("better-eater");

const SCREENS = [
  {
    file: "bettereater/how often do you want to cook.png",
    alt: "Better Eater onboarding: a slider to choose how often to cook, with every 3 days recommended",
    title: "Set your pace",
    body: "Choose how often to cook, from every day to every seven days. The recommended option is a bigger batch every three days, to save time and stay on track.",
  },
  {
    file: "bettereater/recommended meal plan.png",
    alt: "Better Eater recommended meal plan: breakfast, lunch, and dinner for a chosen day",
    title: "Get a weekly plan",
    body: "A recommended breakfast, lunch, and dinner for each day, with time, taste, and difficulty at a glance, and a shortcut to add every ingredient to the shopping list.",
  },
  {
    file: "bettereater/iPhone 14 Pro Space Black Mockup copy.png",
    alt: "Better Eater home screen: a greeting, progress so far, and the next meals with a Start Cooking button",
    title: "Come back to what’s next",
    body: "A greeting, the progress so far, and the next meals waiting, each one tap away from Start Cooking.",
  },
  {
    file: "bettereater/iPhone 14 Pro Space Black Mockup.png",
    alt: "Better Eater recipe detail: time, difficulty, servings, and ingredients and instructions tabs",
    title: "See the recipe",
    body: "Time, difficulty, servings, and step-by-step instructions, ending in a single Start Cooking button.",
  },
];

const COOK_SCREENS = [
  {
    file: "bettereater/cook-instructions-landscape.png",
    alt: "Better Eater cooking mode: a captioned step video beside the recipe’s ingredients and instructions",
    title: "Cook along",
    body: "A captioned video of each step, with the ingredients and instructions right beside it.",
  },
  {
    file: "bettereater/cook-video-landscape.png",
    alt: "Better Eater full-screen cooking video with chapters: Prep, Bake, Roast, Chickpeas, Bake",
    title: "Jump between steps",
    body: "Full-screen chapters like Prep, Bake, and Roast, so it’s easy to skip ahead or replay a step without losing your place.",
  },
];

const DECISIONS = [
  {
    title: "Every three days is the recommended pace",
    body: "The cooking-frequency scale runs from every day to once a week. The middle, every three days, makes a bigger batch that saves time and stays realistic for a student who also works.",
    file: "bettereater/how often do you want to cook.png",
    alt: "Better Eater onboarding: a slider to choose how often to cook, with every 3 days recommended",
    shape: "portrait",
  },
  {
    title: "Every step comes with a video",
    body: "Written steps are there, but a video of an expert cooking is easier to copy, so a beginner learns the right way.",
    file: "bettereater/cook-video-landscape.png",
    alt: "Better Eater full-screen cooking video with chapters: Prep, Bake, Roast, Chickpeas, Bake",
    shape: "landscape",
  },
  {
    title: "Green, because it’s calm",
    body: "Green reads as fresh and calm. It keeps Better Eater feeling like a helper, not a diet.",
    file: "bettereater/recommended meal plan.png",
    alt: "Better Eater recommended meal plan, in the app’s green",
    shape: "portrait",
  },
] as const;

export default function BetterEaterPage() {
  const project = getProject("better-eater");
  if (!project || !project.caseStudy) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Hero: the app's wordmark as the title with the text beneath it, the screens on the right */}
        <header className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[1fr_1fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div>
              <h1 className="mb-8 w-full max-w-[26rem] md:max-w-[30rem]">
                <Image
                  src={pictureSrc("bettereater/wordmark-title.png")}
                  alt="Better Eater"
                  width={1191}
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
              <p className="mt-3 text-sm text-ink-muted">
                Shenkar course project, with Yuval Sa&rsquo;ar &middot; Persona, wireframes, visual design, branding,
                prototype
              </p>
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

        {/* Brief */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
              <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full md:mx-0 md:w-full md:max-w-[18rem]">
                <Image
                  src={pictureSrc("bettereater/Amit.jpg")}
                  alt="Amit, the persona Better Eater was designed for"
                  fill
                  className="object-cover object-[58%_40%]"
                  sizes="(max-width: 768px) 192px, 288px"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h2 className="type-section font-display text-ink">
                  Meet Amit, the person we designed for
                </h2>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy.problem}
                </p>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy.process}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works — the three key screens, each shown whole, in flow order */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-12 max-w-[56ch] md:mb-16">
              <h2 className="type-section font-display text-ink">
                From plan to plate
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                From choosing how often to cook, to a plan for the week, to following along in the
                kitchen, one step at a time.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
              {SCREENS.map((screen, i) => (
                <div key={screen.file}>
                  <div className="relative mx-auto aspect-[505/1023] w-full max-w-[16rem]">
                    <Image
                      src={pictureSrc(screen.file)}
                      alt={screen.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 256px, 25vw"
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
            <div className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-8">
              {COOK_SCREENS.map((screen, i) => (
                <div key={screen.file}>
                  <div className="relative mx-auto aspect-[1023/505] w-full max-w-[34rem]">
                    <Image
                      src={pictureSrc(screen.file)}
                      alt={screen.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 34rem"
                    />
                  </div>
                  <div className="mx-auto mt-6 max-w-[34rem]">
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-sm leading-none text-ink-subtle">
                        {String(SCREENS.length + i + 1).padStart(2, "0")}
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

        {/* Design decisions */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <h2 className="mb-4 max-w-[36ch] type-section font-display text-ink">
              Three decisions, one goal
            </h2>
            <p className="mb-14 max-w-[56ch] text-lg leading-relaxed text-ink-muted md:mb-20">
              Every choice serves one goal: an easy move toward the way you want to eat, not a diet.
            </p>
            <div className="flex flex-col gap-16 md:gap-24">
              {DECISIONS.map((item, i) => (
                <div
                  key={item.title}
                  className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
                >
                  <div className={`${i % 2 === 1 ? "md:order-2" : ""}`}>
                    <span className="mb-3 block font-display text-lg leading-none text-accent-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-3 max-w-[24ch] type-sub font-display text-ink">
                      {item.title}
                    </h3>
                    <p className="max-w-[48ch] text-lg leading-relaxed text-ink-muted">{item.body}</p>
                  </div>
                  <div
                    className={`relative mx-auto w-full ${
                      item.shape === "landscape"
                        ? "aspect-[1023/505] max-w-[32rem]"
                        : "aspect-[505/1023] max-w-[14rem] md:max-w-[17rem]"
                    } ${i % 2 === 1 ? "md:order-1" : ""}`}
                  >
                    <Image
                      src={pictureSrc(item.file)}
                      alt={item.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 80vw, 512px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Result */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <h2 className="mb-4 type-section font-display text-ink">The result</h2>
            <p className="max-w-[56ch] text-lg leading-relaxed text-ink-muted">
              A full flow, from planning the week to cooking and shopping for the next one, built as a Figma
              prototype.
            </p>
          </div>
        </section>

        <MoreProjects current="better-eater" />
      </main>
      <SiteFooter />
    </>
  );
}
