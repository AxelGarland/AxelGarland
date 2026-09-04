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

const PAIN_POINTS = [
  {
    icon: (
      <path
        d="M4 5h6v6H4V5Zm10 0h6v6h-6V5ZM4 15h6v4H4v-4Zm10 2h6v2h-6v-2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
    title: "Three separate sources",
    body: "Open positions lived in a Google Sheet, call scripts in personal notebooks, and reference standards in a separate PDF — nothing in one place.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    title: "Only one or two recruiters could handle it",
    body: "Care-staff roles (נשות טיפול) were complicated enough that the rest of the team avoided recruiting for them entirely.",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    title: "Every call meant juggling all three",
    body: "Switching between the sheet, the notebook, and the PDF mid-call — every single time, for every candidate.",
  },
];

const FEATURES = [
  {
    icon: (
      <>
        <path
          d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
    title: "Location & Radius Search",
    body: "Search by location and role to see which frameworks have open positions within a chosen radius of a candidate.",
  },
  {
    icon: (
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z M19 3v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
    title: "Role & Info Hub",
    body: "Requirements, standards, and admission conditions for every role — replacing the scattered notebooks and PDF.",
  },
  {
    icon: (
      <path
        d="M3 4h18v16H3V4Zm0 6h18M3 15h18M9 4v16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
    title: "Reference Tables, Instant",
    body: "Detailed data — like weekly staffing hours by classroom size — surfaced clearly instead of buried in a document.",
  },
];

const STEPS = [
  {
    title: "Noticed the bottleneck",
    body: "Recruiting for care-staff roles depended entirely on the one or two people comfortable with how complicated the information was.",
  },
  {
    title: "Consolidated three sources into two entry points",
    body: "Rebuilt the sheet, the notebooks, and the PDF as one tool: a search mode and an information mode.",
  },
  {
    title: "Shipped, and it stuck",
    body: "Now in daily use by the recruitment team and by field workers who need the same information.",
  },
];

export default function GiusonPage() {
  const project = getProject("giuson");
  if (!project || !project.prototype) notFound();

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

            <div className="relative">
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
              <div className="absolute -bottom-5 -left-5 flex items-center gap-2.5 bg-ink px-5 py-3.5 shadow-lg sm:-left-6">
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-teal" />
                <span className="font-display text-lg font-semibold text-surface">
                  In Daily Use
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Problem */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                  The Problem
                </p>
                <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-ink">
                  A process built on a sheet, a notebook, and a PDF
                </h2>
                <p className="max-w-[42ch] text-base leading-relaxed text-ink-muted">
                  {project.caseStudy?.problem.split("Every call")[0]}
                </p>
              </div>
              <ul className="flex flex-col gap-6">
                {PAIN_POINTS.map((p) => (
                  <li key={p.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line text-teal">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                        {p.icon}
                      </svg>
                    </span>
                    <div>
                      <p className="mb-1 font-display text-lg font-semibold text-ink">
                        {p.title}
                      </p>
                      <p className="text-sm leading-relaxed text-ink-muted">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-14 max-w-[56ch] md:mb-16">
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
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="border border-line bg-paper p-7 transition-colors duration-300 hover:border-teal"
                >
                  <span className="mb-5 flex h-11 w-11 items-center justify-center bg-teal-soft text-teal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      {f.icon}
                    </svg>
                  </span>
                  <h3 className="mb-2 font-display text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-10 max-w-[56ch] md:mb-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                Preview
              </p>
              <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                See it in context
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">
                A quick clickthrough, not the live tool — pick a path on the home screen to see
                where it leads.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr] md:items-start">
              <PrototypeMockup prototype={project.prototype} title="Giuson prototype" />
              <div className="border border-line bg-surface">
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line">
                  <Image
                    src={pictureSrc("giuson/giuson hours table.png")}
                    alt="Weekly staffing hours by classroom size, looked up instantly instead of calculated by hand"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-1 text-xs uppercase tracking-[0.08em] text-ink-subtle">
                    Inside the Info Hub
                  </p>
                  <p className="font-display text-lg font-semibold text-ink">
                    Weekly Hours by Classroom Size
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-ink py-20 md:py-28">
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 sm:px-10 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-14 lg:px-16">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                How It Was Built
              </p>
              <h2 className="mb-4 font-display text-3xl font-semibold leading-[1.15] text-surface">
                From bottleneck to shipped tool
              </h2>
              <p className="max-w-[42ch] text-base leading-relaxed text-surface/70">
                {project.caseStudy?.role}
              </p>
            </div>
            <ol className="flex flex-col">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-b border-surface/15 py-6 first:pt-0 last:border-b-0 last:pb-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-teal/40 bg-teal/10 font-display text-sm font-semibold text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="mb-1 font-display text-lg font-semibold text-surface">
                      {step.title}
                    </p>
                    <p className="text-sm leading-relaxed text-surface/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Outcome */}
        <section className="border-t border-line bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="border border-line bg-paper p-8 md:p-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-teal">
                The Outcome
              </p>
              <p className="max-w-[70ch] text-lg leading-relaxed text-ink-muted">
                {project.caseStudy?.outcome}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
