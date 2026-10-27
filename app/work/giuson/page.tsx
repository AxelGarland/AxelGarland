import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { TagLine } from "@/components/projects/TagLine";
import { PrototypeMockup } from "@/components/projects/PrototypeMockup";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Giuson · Axel Garland",
  description:
    "Giuson, a recruitment website built for Alut: a live map of open positions and everything recruiters need to know, in one place.",
};

const TAGS = ["Product Design", "Internal Tool", "Recruitment"];

const DECISIONS = [
  {
    title: "Everything in one flow",
    body: "The map, the role explanations, the salary ladders, and the grants and perks live in one place, in the order a recruiter needs them during a call.",
  },
  {
    title: "A radius, not a fixed distance",
    body: "Some candidates in the periphery of Israel are willing to commute farther, depending on the area. So the search takes a radius the recruiter can set, instead of a single fixed distance.",
  },
  {
    title: "A library for the field",
    body: "Managers who hire on site get constant access to the same information as the recruitment office, instead of relying on whoever remembers it.",
  },
];

const SCREENS = [
  {
    file: "giuson/giuson recruitment map.png",
    alt: "Recruitment search: open positions by location and distance",
    caption: "Location & Radius Search",
  },
  {
    file: "giuson/giuson role detail.png",
    alt: "Role detail: requirements, licensing, and staffing model",
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
        <BackLink />
        {/* Hero: the text on the left, the monitor mockup (cut out of the banner) on the right */}
        <header className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36">
          <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[1fr_1fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div>
              <p className="mb-6 text-sm uppercase tracking-[0.06em] text-ink-subtle">
                Giuson &middot; Alut Recruitment Department
              </p>
              <h1 className="mb-6 max-w-[16ch] font-display text-[clamp(1.95rem,4.29vw,3.51rem)] font-light leading-[1.05] tracking-tight text-ink">
                Everything a recruiter needs,
                <br />
                <em className="italic text-accent">in one place</em>
              </h1>
              <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                Giuson is a recruitment website for Alut: a live map of open positions, plus
                everything recruiters need to know about each role, built for the recruitment
                department.
              </p>
              <TagLine tags={TAGS} />
            </div>

            <div className="flex items-center justify-center">
              <Image
                src={pictureSrc("giuson/computer-mockup-2.png")}
                alt="Giuson on a desktop monitor: the recruitment search map with a list of open positions"
                width={673}
                height={541}
                priority
                className="h-auto w-full max-w-[22rem] drop-shadow-[0_24px_30px_rgba(26,25,22,0.18)] md:max-w-[30rem]"
                sizes="(max-width: 768px) 352px, 480px"
              />
            </div>
          </div>
        </header>

        {/* Problem: the Alut logo on the left, the text on the right */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="order-2 flex items-center justify-center md:order-1">
                <Image
                  src={pictureSrc("giuson/alut-logo-2.png")}
                  alt="Alut, the Israeli Society for Children and Adults with Autism: the 50th anniversary logo"
                  width={670}
                  height={618}
                  className="h-auto w-full max-w-[17rem] md:max-w-[26rem]"
                  sizes="(max-width: 768px) 272px, 416px"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-4 font-display text-2xl font-semibold leading-[1.15] text-ink">
                  Too much to know, and all of it changing
                </h2>
                <div className="flex max-w-[46ch] flex-col gap-4">
                  {project.caseStudy?.problem.split("\n\n").map((para) => (
                    <p key={para.slice(0, 24)} className="text-base leading-relaxed text-ink-muted">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution — the real screens, not icon cards */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mb-12 max-w-[56ch] md:mb-14">
              <h2 className="mb-4 font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
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

        {/* Design decisions */}
        <section className="border-t border-line bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
              <div className="md:sticky md:top-28 md:self-start">
                <h2 className="max-w-[16ch] font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
                  Built around how recruiters actually work
                </h2>
              </div>
              <ol className="border-t border-line">
                {DECISIONS.map((item, i) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-line py-8 sm:grid-cols-[3rem_1fr_1.25fr] sm:gap-x-8"
                  >
                    <span className="pt-1.5 font-display text-sm tabular-nums text-ink-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl font-medium leading-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="col-start-2 text-base leading-relaxed text-ink-muted sm:col-start-3">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Prototype — the visual centerpiece */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto mb-10 max-w-[56ch] text-center md:mb-12">
              <h2 className="mb-4 font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
                See it in context
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">
                A quick clickthrough, not the live tool: pick a path on the home screen to see
                where it leads. Built for the recruitment department.
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
              <p className="font-display text-xl font-light italic leading-snug text-surface sm:text-2xl">
                {outcomeQuote}
              </p>
              <p className="mt-8 text-base leading-relaxed text-surface/60">{outcomeLead}</p>
            </div>
          </div>
        </section>
        <MoreProjects current="giuson" />
      </main>
      <SiteFooter />
    </>
  );
}
