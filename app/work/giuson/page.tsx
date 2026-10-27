import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { InfoSources } from "@/components/projects/InfoSources";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { TagLine } from "@/components/projects/TagLine";
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

/** The friction points the recruitment team described, which the tool was built around. */
const FRICTION = [
  "Information spread across a PDF, a spreadsheet, personal notes and Google Maps",
  "Open positions that change constantly, in places all over the country",
  "Salaries that differ by profession and seniority, hard to explain mid-conversation",
  "Grants, scholarships and perks buried in different documents",
  "Candidates in the periphery willing to commute farther, with no easy way to search by radius",
  "Field managers without the same information as the recruitment office",
];

const SCREENS = [
  {
    file: "giuson/smart-map.jpg",
    alt: "Recruitment search: open positions on a live map within the chosen radius, with a list of the nearest facilities",
    title: "Recruitment",
    body: "Type a location, pick a radius and, if needed, a role. The map shows every facility with open positions nearby, with the closest first, so a recruiter can answer a candidate in seconds.",
  },
  {
    file: "giuson/smart-info.jpg",
    alt: "Information hub: professional roles, requirements and salary ladders, with tabs for each topic",
    title: "Information",
    body: "Everything a recruiter needs to know about each role, in one place: requirements, salary ladders, grants and scholarships, training and more, in the order a conversation needs it.",
  },
  {
    file: "giuson/new-salary.jpg",
    alt: "Salary calculator: hourly rates, overtime percentages and a shift planner for each day of the week",
    title: "Salary calculator",
    body: "A way to explain pay clearly while the candidate is on the line: set the shifts for each day and see the different salaries add up, overtime and weekend rates included.",
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
        {/* Hero: the text on the left, the monitor mockup (cut out of the banner, with its own screen) on the right */}
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
                src={pictureSrc("giuson/computer-mockup-3.png")}
                alt="Giuson on a desktop monitor: the home screen of the graduate recruitment tool, with four entry points: recruiting, information, learning and salary calculator"
                width={673}
                height={541}
                priority
                className="h-auto w-full max-w-[22rem] drop-shadow-[0_24px_30px_rgba(26,25,22,0.18)] md:max-w-[30rem]"
                sizes="(max-width: 768px) 352px, 480px"
              />
            </div>
          </div>
        </header>

        {/* Problem: the scattered-sources sum on the left, the text on the right */}
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="order-2 md:order-1">
                <InfoSources />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-4 font-display text-2xl font-semibold leading-[1.15] text-ink">
                  Too much to know,
                  <br />
                  constantly changing
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
            <div className="mb-24 grid grid-cols-1 items-start gap-10 md:mb-40 md:grid-cols-2 md:gap-16">
              <div className="max-w-[56ch]">
                <h2 className="mb-4 font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
                  A tool tailored to their needs
                </h2>
                <p className="text-base leading-relaxed text-ink-muted">
                  {project.caseStudy?.process}
                </p>
              </div>
              <ul className="flex flex-col gap-4 md:pt-2">
                {FRICTION.map((point) => (
                  <li key={point} className="flex items-start gap-4 text-base leading-snug text-ink">
                    <span aria-hidden className="mt-[0.5em] h-2 w-2 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-20 md:gap-32">
              {SCREENS.map((screen, i) => {
                const imageRight = i % 2 === 0;
                return (
                  <div
                    key={screen.file}
                    className={`grid grid-cols-1 items-center gap-8 md:gap-14 lg:gap-16 ${
                      imageRight ? "md:grid-cols-[5fr_8fr]" : "md:grid-cols-[8fr_5fr]"
                    }`}
                  >
                    <div className={`${imageRight ? "md:order-1" : "md:order-2"} max-w-[40ch]`}>
                      <h3 className="mb-3 font-display text-xl font-semibold leading-[1.15] text-ink sm:text-2xl">
                        {screen.title}
                      </h3>
                      <p className="text-base leading-relaxed text-ink-muted">{screen.body}</p>
                    </div>
                    <div
                      className={`relative aspect-[16/10] w-full overflow-hidden border border-line bg-white shadow-[0_24px_50px_-34px_rgba(26,25,22,0.28)] ${
                        imageRight ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <Image
                        src={pictureSrc(screen.file)}
                        alt={screen.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                );
              })}
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
