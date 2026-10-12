import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { TagLine } from "@/components/projects/TagLine";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Interview for Success · Axel Garland",
  description:
    "Interview for Success (ראיון להצלחה), an interview toolkit for Alut's non-recruiter managers.",
};

const TAGS = ["Product Design", "Internal Tool", "Recruitment"];

const OUTCOME_BEATS = [
  {
    title: "Presented to managers",
    body: "We showed it in a meeting held for managers, and they were excited to have a tool that would help them.",
  },
  {
    title: "Asked for more",
    body: "Managers use it, and they keep asking us to add more roles.",
  },
  {
    title: "Part of intake",
    body: "The scores then became part of the intake process, so for certain intakes managers have to use it.",
  },
];

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
        <BackLink />
        {/* Hero */}
        <header className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-6 text-sm uppercase tracking-[0.06em] text-ink-subtle">
              Interview for Success{" "}
              <span style={{ fontFamily: "var(--font-hebrew)" }}>(ראיון להצלחה)</span> &middot; Alut
              Recruitment Department
            </p>
            <h1 className="mb-6 max-w-[20ch] font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
              Anyone can run <em className="italic text-accent">a good interview</em>
            </h1>
            <p className="mb-8 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
              {project.summary}
            </p>
            <TagLine tags={TAGS} className="mb-12" />

            <div className="relative aspect-[2560/1800] w-full overflow-hidden border border-line bg-paper shadow-[0_32px_70px_-34px_rgba(26,25,22,0.28)]">
              <Image
                src={pictureSrc(project.hero)}
                alt="Interview for Success: intro video, and the three module cards"
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
                <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-ink">
                  The brief
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
              <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-ink">
                The solution
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
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
              <div>
                <p className="mb-3 text-sm font-medium tracking-[0.01em] text-accent-light">
                  The outcome
                </p>
                <h2 className="max-w-[16ch] font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl">
                  A repeatable process, <em className="italic text-accent">not a personal skill</em>
                </h2>
              </div>
              <ol className="relative border-l border-surface/20 pl-8 sm:pl-10">
                {OUTCOME_BEATS.map((beat) => (
                  <li key={beat.title} className="relative pb-10 last:pb-0">
                    <span
                      aria-hidden
                      className="absolute -left-[2.3rem] top-2 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[2.8rem]"
                    />
                    <h3 className="mb-2 font-display text-2xl font-medium text-surface">
                      {beat.title}
                    </h3>
                    <p className="max-w-[48ch] text-base leading-relaxed text-surface/70">
                      {beat.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
