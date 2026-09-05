import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Alutit — Axel Garland",
  description:
    "Alutit — an illustrated recruitment character designed for Alut, Israel's national organization for people with autism.",
};

const TAGS = ["Character Design", "Illustration", "Social Media", "Recruitment", "Merchandise"];

const DELIVERABLES = [
  {
    num: "01",
    title: "Social & Video",
    body: "Alutit fronts the recruitment account's ongoing social content and short-form video — the consistent face behind an otherwise rotating set of postings.",
    images: [
      { file: "alutit/alutit social.png", alt: "Alutit standing in front of an Alut kindergarten, shown as a phone-screen social media post", caption: "Social Post" },
    ],
  },
  {
    num: "02",
    title: "Role-Specific Illustration",
    body: "The same base design — curly orange hair, glasses — redressed into role-specific outfits: tool belt and hard hat for maintenance, scrubs and stethoscope for care roles, cap and gown for milestones. A visual way to explain the actual range of jobs at Alut that a standard listing can't.",
    images: [
      { file: "alutit/alutit handyman.png", alt: "Alutit dressed as a maintenance worker with a tool belt and hard hat", caption: "Maintenance" },
      { file: "alutit/alutit nurse.png", alt: "Alutit dressed as a care worker in scrubs with a stethoscope", caption: "Care Staff" },
      { file: "alutit/alutit on unicorn.png", alt: "Alutit in a graduation cap, riding a unicorn across a rainbow", caption: "Milestones" },
    ],
  },
  {
    num: "03",
    title: "Recruitment Materials",
    body: "Alutit carries the same character system into printed and campus-facing recruitment materials, including a \"bring a friend\" referral program.",
    images: [
      { file: "alutit/alutit flyer 2.png", alt: "Printed recruitment booklet for social workers, \"Your career starts at Alut,\" featuring Alutit in a graduation cap on a unicorn", caption: "Social Workers Flyer" },
      { file: "alutit/alutit flyer 1.png", alt: "Printed recruitment booklet for students, \"Come to Alut — the perfect job for students\"", caption: "Student Flyer" },
      { file: "alutit/חבר מביא חבר לוגו.png", alt: "Alutit fronting Alut's \"bring a friend\" referral program logo", caption: "Referral Logo" },
      { file: "alutit/חבר מביא סושיאל לוגו.png", alt: "Alutit fronting the social-media version of the referral program logo", caption: "Social Variant" },
    ],
  },
  {
    num: "04",
    title: "Branded Merchandise",
    body: "Her illustration translated to physical products — tote bags among them — handed out at university campus events, extending the character past digital channels.",
    images: [
      { file: "alutit/אלוטית תיק.png", alt: "The Alutit tote bag handed out at campus recruitment events", caption: "Tote Bag" },
    ],
  },
];

/** The remaining real photos/illustrations, given their own showcase rather than crammed into
 *  the deliverable cards — the character's whole point is range, so seeing several roles side
 *  by side does real work here. */
const GALLERY = [
  { file: "alutit/Alutit physiotherapist.png", alt: "Alutit as a physiotherapist working with a client", caption: "Physiotherapist", aspect: "aspect-[3/4]" },
  { file: "alutit/alutit speech therapist.png", alt: "Alutit as a speech therapist using a communication board with a client", caption: "Speech Therapist", aspect: "aspect-square" },
  { file: "alutit/alutit onesie.png", alt: "Alutit wearing a unicorn onesie", caption: "Off Duty", aspect: "aspect-[3/4]" },
  { file: "alutit/alutit desk.png", alt: "Alutit at her desk in an Alutit-branded shirt", caption: "At Her Desk", aspect: "aspect-square" },
  { file: "alutit/alutit office.png", alt: "Alutit in an office setting with recruitment materials on the wall", caption: "In the Office", aspect: "aspect-[4/3]" },
  { file: "alutit/אלוטית גן.JPG", alt: "Alutit in front of an Alut kindergarten facility", caption: "Kindergarten Visit", aspect: "aspect-[4/3]" },
];

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
            className="pointer-events-none absolute -right-[10%] -top-[10%] h-[55%] w-[55%] rounded-full bg-coral-soft blur-[100px]"
          />
          <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 sm:px-10 md:grid-cols-2 md:gap-16 md:px-14 lg:px-16">
            <div>
              <Link
                href="/work"
                className="mb-8 inline-block text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
              >
                &larr; Work
              </Link>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-coral">
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
                with <em className="italic text-coral">purpose</em>
              </h1>
              <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                Alutit is an illustrated character designed for Alut, Israel&rsquo;s national
                organization for people with autism — giving their recruitment office a warm,
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
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-coral">
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
            className="pointer-events-none absolute -bottom-[10%] -left-[10%] h-[55%] w-[55%] rounded-full bg-coral/10 blur-[100px]"
          />
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-coral">
              Deliverables
            </p>
            <h2 className="mb-14 max-w-[20ch] font-display text-3xl font-semibold leading-[1.15] text-surface sm:text-4xl md:mb-16">
              Where Alutit appears
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {DELIVERABLES.map((item) => (
                <div
                  key={item.num}
                  className="grid grid-cols-[2.5rem_1fr] gap-5 border border-surface/15 bg-surface/5 p-7 transition-colors duration-300 hover:border-coral/50 hover:bg-coral/10"
                >
                  <span className="pt-0.5 font-display text-2xl leading-none text-surface/30">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="mb-2 font-display text-xl font-semibold text-surface">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-surface/70">{item.body}</p>
                    {item.images.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {item.images.map((img) => (
                          <div key={img.file} className="w-20">
                            <div className="relative aspect-[4/5] overflow-hidden border border-surface/15 bg-surface/10">
                              <Image
                                src={pictureSrc(img.file)}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                sizes="90px"
                              />
                            </div>
                            <p className="mt-1.5 text-center text-[0.65rem] uppercase tracking-[0.06em] text-surface/50">
                              {img.caption}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.1em] text-coral">
              Gallery
            </p>
            <h2 className="mb-4 max-w-[24ch] font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
              One character, every context
            </h2>
            <p className="mb-14 max-w-[52ch] text-base leading-relaxed text-ink-muted md:mb-16">
              The same design, carried across the range of roles Alut actually hires for —
              proof the character system holds up outside the hero shot.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
              {GALLERY.map((img) => (
                <div key={img.file} className={`group relative overflow-hidden border border-line bg-surface ${img.aspect}`}>
                  <Image
                    src={pictureSrc(img.file)}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-xs font-medium uppercase tracking-[0.08em] text-surface">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="border-t border-line bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
              <div className="flex flex-col gap-6">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-coral">
                  The Outcome
                </p>
                <h2 className="font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                  A recruitment channel people actually follow
                </h2>
                <p className="max-w-[52ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy?.outcome}
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    "A sustained social presence the recruitment team runs on their own",
                    "One character system scaling from Instagram stories to printed flyers",
                    "Tote bags students traded contact details for at campus events",
                    "An ongoing, passive stream of candidates sourced from social — not a one-off campaign",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-3 text-base text-ink-muted">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="border border-line bg-paper p-8">
                  <p className="mb-2 font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-coral">
                    4+
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    Distinct formats — social, video, print, and merchandise — carried by a single
                    character system
                  </p>
                </div>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-line">
                  <Image
                    src={pictureSrc("alutit/אלוטית מרצ׳.png")}
                    alt="Alutit merchandise flat-lay — tote bag, notebook, and game board"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
