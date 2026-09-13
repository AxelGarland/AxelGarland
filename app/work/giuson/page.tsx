import { GrainOverlay } from "@/components/GrainOverlay";
import { PrototypeMockup } from "@/components/projects/PrototypeMockup";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Giuson — Axel Garland",
  description:
    "Giuson — a recruitment and information tool built for Alut, replacing three disconnected sources with one.",
};

const TAGS = ["Product Design", "Internal Tool", "Recruitment"];

const SCREENS = [
  {
    file: "giuson/giuson recruitment map.png",
    alt: "Recruitment search — open positions by location and distance",
    caption: "Location & Radius Search",
  },
  {
    file: "giuson/giuson role detail.png",
    alt: "Role detail — requirements, licensing, and staffing model",
    caption: "Role & Info Hub",
  },
  {
    file: "giuson/giuson hours table.png",
    alt: "Weekly staffing hours by classroom size, consolidated into one table",
    caption: "Reference Tables, Instant",
  },
];

export default function GiusonPage() {
  const project = getProject("giuson");
  if (!project || !project.prototype) notFound();

  const outcomeSentences = (project.caseStudy?.outcome ?? "").split(". ");
  const outcomeQuote = outcomeSentences[outcomeSentences.length - 1];
  const outcomeLead =
    outcomeSentences.slice(0, -1).join(". ") + (outcomeSentences.length > 1 ? "." : "");

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
          <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 sm:px-10 md:grid-cols-2 md:gap-16 md:px-14 lg:px-16">
            <div>
              <Link
                href="/work"
                className="mb-8 inline-block text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                &larr; Work
              </Link>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                Giuson &middot; Alut Recruitment Department
              </p>
              <h1 className="mb-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                Three sources,
                <br />
                <em className="italic text-teal">one tool</em>
              </h1>
              <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                Giuson replaces a Google Sheet, a set of personal notebooks, and a reference PDF
                with one fast recruitment workflow — built for Alut&rsquo;s own recruitment team.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="border border-line px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.06em] text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-paper shadow-[0_24px_64px_-24px_rgba(28,184,140,0.3)]">
              <Image
                src={pictureSrc("giuson/giuson recruitment map.png")}
                alt="Recruitment search — open positions by location and distance"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </header>

        {/* Problem — one short paragraph, one screenshot, instead of three text cards */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                  The Problem
                </p>
                <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-ink">
                  A process built on a sheet, a notebook, and a PDF
                </h2>
                <p className="max-w-[46ch] text-base leading-relaxed text-ink-muted">
                  {project.caseStudy?.problem.split("Every call")[0]}
                </p>
              </div>
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-surface">
                  <Image
                    src={pictureSrc("giuson/giuson home.png")}
                    alt="Giuson home — two entry points instead of three separate sources"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
                <p className="mt-3 text-sm text-ink-subtle">
                  Replacing 3 disconnected sources with 2 clear entry points
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution — the real screens, not icon cards */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-12 max-w-[56ch] md:mb-14">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                The Solution
              </p>
              <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                One tool, two ways in
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">
                {project.caseStudy?.process}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {SCREENS.map((screen) => (
                <div key={screen.file}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-paper">
                    <Image
                      src={pictureSrc(screen.file)}
                      alt={screen.alt}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-ink">{screen.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prototype — the visual centerpiece */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto mb-10 max-w-[56ch] text-center md:mb-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                Preview
              </p>
              <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                See it in context
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">
                A quick clickthrough, not the live tool — pick a path on the home screen to see
                where it leads. Built solo, end to end.
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <PrototypeMockup prototype={project.prototype} title="Giuson prototype" />
            </div>
          </div>
        </section>

        {/* Outcome — pull-quote instead of a paragraph in a box */}
        <section className="border-t border-line bg-ink py-24 md:py-32">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto max-w-[64ch] text-center">
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                The Outcome
              </p>
              <p className="font-display text-2xl font-light italic leading-snug text-surface sm:text-3xl">
                &ldquo;{outcomeQuote}&rdquo;
              </p>
              <p className="mt-8 text-base leading-relaxed text-surface/60">{outcomeLead}</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
