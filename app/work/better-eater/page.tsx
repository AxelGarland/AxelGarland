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
              Cooking, made <em className="italic text-teal">approachable</em>
            </h1>
            <p className="mb-8 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
              {project.summary} Designed around one real persona, someone with no prior kitchen
              experience, rather than a generic user.
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
                  Starting from a persona, not a generic user
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

        {/* Prototype — the live, clickable Figma prototype */}
        {project.figmaEmbedUrl ? (
          <section className="bg-surface py-20 md:py-28">
            <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
              <div className="mx-auto mb-10 max-w-[56ch] text-center md:mb-12">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                  Prototype
                </p>
                <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                  Try the full flow
                </h2>
                <p className="text-base leading-relaxed text-ink-muted">
                  The real Figma prototype, live and clickable: plan a week, get a
                  recommendation, and follow a recipe through to the shopping list.
                </p>
              </div>
              <div className="mx-auto aspect-[3/4] w-full max-w-xl overflow-hidden border border-line bg-ink">
                <iframe
                  src={project.figmaEmbedUrl}
                  title="Better Eater, Figma prototype"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </section>
        ) : null}

        {/* Outcome — the loop, as a flow instead of plain text */}
        <section className="border-t border-line bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
              The Outcome
            </p>
            <h2 className="mb-10 max-w-[36ch] font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl md:mb-12">
              A working, tested loop: start to finish
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
