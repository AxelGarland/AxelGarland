import { GrainOverlay } from "@/components/GrainOverlay";
import { HoverCollage } from "@/components/projects/HoverCollage";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Alutit · Axel Garland",
  description:
    "Alutit, an illustrated recruitment character designed for Alut, Israel's national organization for people with autism.",
};

const TAGS = ["Character Design", "Illustration", "Social Media", "Recruitment", "Merchandise"];

type Deliverable = {
  num: string;
  title: string;
  body: string;
  /** Use a light tile background instead of the default dark one — for images (like flyer
   *  mockups) whose own drop shadows were composed against a light backdrop. */
  lightTiles?: boolean;
  images: { file: string; alt: string; caption: string }[];
};

const DELIVERABLES: Deliverable[] = [
  {
    num: "01",
    title: "Social & Video",
    body: "Alutit fronts the recruitment account's ongoing social content and short-form video, the consistent face behind an otherwise rotating set of postings.",
    images: [
      { file: "alutit/social media.png", alt: "Alutit at her desk, shown as a social media post", caption: "At Her Desk" },
      { file: "alutit/social media 1.png", alt: "Alutit in a garden, shown as a social media post", caption: "In the Garden" },
      { file: "alutit/social media 3.png", alt: "Alutit in front of the Eiffel Tower, shown as an Instagram Reels-style post", caption: "Reels Style" },
    ],
  },
  {
    num: "02",
    title: "Character Illustrations",
    body: "The same base design (curly orange hair, glasses) redressed into role-specific outfits: tool belt and hard hat for maintenance, scrubs and stethoscope for care roles, cap and gown for milestones. A visual way to explain the actual range of jobs at Alut that a standard listing can't.",
    images: [
      { file: "alutit/alutit handyman.png", alt: "Alutit dressed as a maintenance worker with a tool belt and hard hat", caption: "Maintenance" },
      { file: "alutit/alutit nurse.png", alt: "Alutit dressed as a care worker in scrubs with a stethoscope", caption: "Care Staff" },
      { file: "alutit/Alutit physiotherapist.png", alt: "Alutit as a physiotherapist working with a client", caption: "Physiotherapy" },
      { file: "alutit/alutit speech therapist.png", alt: "Alutit as a speech therapist using a communication board with a client", caption: "Speech Therapy" },
      { file: "alutit/alutit on unicorn.png", alt: "Alutit in a graduation cap, riding a unicorn across a rainbow", caption: "Milestones" },
    ],
  },
  {
    num: "03",
    title: "Recruitment Materials",
    body: "Alutit carries the same character system into printed, campus-facing recruitment materials.",
    lightTiles: true,
    images: [
      { file: "alutit/alutit flyer 2.png", alt: "Printed recruitment booklet for social workers, \"Your career starts at Alut,\" featuring Alutit in a graduation cap on a unicorn", caption: "Social Workers Flyer" },
      { file: "alutit/alutit flyer 1.png", alt: "Printed recruitment booklet for students, \"Come to Alut, the perfect job for students\"", caption: "Student Flyer" },
      { file: "alutit/אלוטית תיק.png", alt: "The Alutit tote bag handed out at campus recruitment events", caption: "Tote Bag" },
    ],
  },
  {
    num: "04",
    title: "Branded Merchandise",
    body: "Her illustration translated to physical products, tote bags among them, handed out at university campus events, extending the character past digital channels.",
    images: [
      { file: "alutit/אלוטית תיק.png", alt: "The Alutit tote bag handed out at campus recruitment events", caption: "Tote Bag" },
    ],
  },
];

/** Placeholder metrics — swap the `value` for the real numbers before shipping. Labels describe
 *  the metric the case study already claims (candidates sourced, campus signups, sustained
 *  channel) so the stat block matches the outcome copy above it. */
const STATS = [
  { value: "—", label: "Candidates sourced from social per month" },
  { value: "—", label: "Tote bags handed out at campus events" },
  { value: "—", label: "Months the channel has run without a campaign refresh" },
];

/** Column count per deliverable's image row — a literal lookup (not computed) so Tailwind's
 *  scanner can see every class name in the source file. */
const IMAGE_GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export default function AlutitPage() {
  const project = getProject("alutit");
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
          <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 sm:px-10 md:grid-cols-2 md:gap-16 md:px-14 lg:px-16">
            <div>
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
              <div className="mb-6 flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
                  Alutit
                </span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
                <span className="text-sm uppercase tracking-[0.06em] text-ink-subtle">
                  Brand Character Design
                </span>
              </div>
              <h1 className="mb-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-ink">
                A character
                <br />
                with <em className="italic text-indigo">purpose</em>
              </h1>
              <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                Alutit is an illustrated character designed for Alut, Israel&rsquo;s national
                organization for people with autism, giving their recruitment office a warm,
                recognizable face across social media, video, print, and merchandise.
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

            <div className="relative aspect-[9/11] w-full">
              <Image
                src={pictureSrc(project.hero)}
                alt="Alutit in her branded sweater, holding up a rainbow"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 45vw"
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
                  Building presence through character
                </h2>
              </div>
              <div className="flex flex-col gap-6">
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy?.problem}
                </p>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy?.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables — dark inverted, matching the footer's treatment */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-[10%] -left-[10%] h-[55%] w-[55%] rounded-full bg-indigo/10 blur-[100px]"
          />
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
              Deliverables
            </p>
            <h2 className="mb-14 max-w-[20ch] font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl md:mb-16">
              Where Alutit appears
            </h2>

            <div className="flex flex-col gap-10">
              {DELIVERABLES.map((item) => (
                <div key={item.num} className="bg-surface/5 p-6 md:p-8">
                  <div className="mb-3 flex items-baseline gap-4">
                    <span className="font-display text-lg leading-none text-surface/30">
                      {item.num}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-surface">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mb-6 max-w-[64ch] text-sm leading-relaxed text-surface/70">
                    {item.body}
                  </p>
                  {item.num === "02" ? (
                    <HoverCollage images={item.images} />
                  ) : (
                    <div
                      className={`grid gap-3 ${
                        IMAGE_GRID_COLS[item.images.length] ?? "grid-cols-2 sm:grid-cols-4"
                      } ${item.images.length === 1 ? "max-w-xs" : ""}`}
                    >
                      {item.images.map((img) => (
                        <div
                          key={img.file}
                          className={`relative aspect-[3/4] w-full overflow-hidden ${
                            item.lightTiles ? "bg-[#E4E3DF]" : "bg-surface/10"
                          }`}
                        >
                          <Image
                            src={pictureSrc(img.file)}
                            alt={img.alt}
                            fill
                            className="object-contain p-3"
                            sizes="(max-width: 640px) 45vw, 25vw"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="border-t border-line bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto max-w-[70ch]">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo">
                The Outcome
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                A recruitment channel people actually follow
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                {project.caseStudy?.outcome}
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-14 sm:grid-cols-3 md:mt-16 md:pt-16">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-5xl font-semibold text-indigo">{stat.value}</p>
                  <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
