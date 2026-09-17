import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Interview for Success · Axel Garland",
  description:
    "Interview for Success (ראיון להצלחה), an AI-assisted interview toolkit for Alut's non-recruiter managers.",
};

const TAGS = ["AI Agent", "Internal Tool", "Recruitment"];

const SCREENS = [
  {
    file: "interview-assistant/interview-prep.png",
    alt: "Interview prep: candidate and role details in, a set of tailored interview questions out",
    title: "Interview Prep",
    body: "Fill in the candidate's details and the role, get 7–10 tailored interview questions back.",
  },
  {
    file: "interview-assistant/recommender.png",
    alt: "Reference-check script: structure and questions for the recommender phone call",
    title: "Reference Check",
    body: "A structured script for the recommender call: what to ask, and how to keep the conversation professional and useful.",
  },
  {
    file: "interview-assistant/rating.png",
    alt: "Rating questionnaire: weighted scoring across categories, rolled into one comparable number",
    title: "Rating Questionnaire",
    body: "Interview signals scored across categories, weighted automatically by role, into one comparable number.",
  },
  {
    file: "interview-assistant/faq.png",
    alt: "Labor-law FAQ: quick, compliant answers for hiring managers",
    title: "Labor-Law FAQ",
    body: "Quick, compliant answers to the questions a first-time interviewer is most likely to get wrong.",
  },
];

export default function InterviewAssistantPage() {
  const project = getProject("interview-assistant");
  if (!project || !project.caseStudy) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        {/* Hero */}
        <header className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[10%] -top-[10%] h-[55%] w-[55%] rounded-full bg-gold-soft blur-[100px]"
          />
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              aria-label="Back to Work"
              className="mb-8 inline-flex h-10 w-10 items-center justify-center text-gold/60 transition-colors duration-300 hover:text-gold"
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
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-gold">
              Case Studies
            </p>
            <p className="mb-6 text-sm uppercase tracking-[0.06em] text-ink-subtle">
              Interview for Success (ראיון להצלחה) &middot; Alut Recruitment Department
            </p>
            <h1 className="mb-6 max-w-[20ch] font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
              Anyone can run <em className="italic text-gold">a good interview</em>
            </h1>
            <p className="mb-8 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
              {project.summary}
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

            <div className="relative aspect-[2560/1800] w-full overflow-hidden border border-line bg-paper shadow-[0_24px_64px_-24px_rgba(228,179,85,0.35)]">
              <Image
                src={pictureSrc(project.hero)}
                alt="Interview for Success: three modules, interview prep, reference check, and rating"
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-gold">
                  The Brief
                </p>
                <h2 className="font-display text-3xl font-semibold leading-[1.15] text-ink">
                  Hiring, without a hiring background
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy.problem}
                </p>
                <p className="max-w-[64ch] text-base leading-relaxed text-ink-subtle">
                  {project.caseStudy.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution — the four modules */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-12 max-w-[64ch] md:mb-14">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-gold">
                The Solution
              </p>
              <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                Four tools, one interview
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">
                {project.caseStudy.process}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {SCREENS.map((screen, i) => (
                <div key={screen.file}>
                  <div className="relative aspect-[2560/1800] w-full overflow-hidden border border-line bg-paper">
                    <Image
                      src={pictureSrc(screen.file)}
                      alt={screen.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-display text-sm leading-none text-ink-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-ink">{screen.title}</p>
                  </div>
                  <p className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-ink-muted">
                    {screen.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcome */}
        <section className="border-t border-line bg-ink py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto max-w-[70ch]">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-gold">
                The Outcome
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl">
                A repeatable process, <em className="italic text-gold">not a personal skill</em>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-surface/70">
                {project.caseStudy.outcome}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
