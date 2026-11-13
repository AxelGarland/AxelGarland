import { BeforeWorkflow, Evidence, FlowCompare } from "@/components/giuson/Diagrams";
import { SalaryExplainer } from "@/components/giuson/SalaryExplainer";
import { WalkthroughVideo } from "@/components/giuson/WalkthroughVideo";
import {
  Body,
  CHAPTER,
  Container,
  DISPLAY,
  GRID,
  H2,
  HEADING,
  Marker,
  PART,
  Pin,
  Screen,
  SectionLabel,
  TEXT,
  TO_VISUAL,
} from "@/components/giuson/parts";
import { BackLink } from "@/components/projects/BackLink";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = pageMetadata({
  title: "Smart Giuson · Axel Garland",
  description:
    "Smart Giuson, an internal recruitment tool for ALUT that combines live vacancies, role information, and call guidance in one place.",
  path: "/work/giuson",
});

const ITERATION = [
  { feedback: "Jumping between pages", change: "Continuous workspace" },
  { feedback: "Important call topics could be missed", change: "Six-step checklist" },
  { feedback: "Salary information wasn’t immediately intuitive", change: "Salary explained step by step (concept)" },
] as const;

const ANNOTATIONS = [
  ["Candidate context", "Location, profession, and radius define the search."],
  ["Live opportunities", "Vacancies reflect staffing needs maintained by site managers."],
  ["Geography + detail", "The list supports comparison while the map makes proximity visible."],
] as const;

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 40 24" className="hidden h-5 w-8 shrink-0 text-gj-muted md:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h34M28 4l8 8-8 8" />
    </svg>
  );
}

export default function GiusonPage() {
  return (
    <>
      <main id="main" className="bg-white font-sans text-gj-navy selection:bg-gj-blue selection:text-white">
        <BackLink />

        {/* Hero: 4 columns of text, 8 of product. The home screen introduces the two sides of the product. */}
        <header className="bg-white pb-12 pt-36 md:pb-[3.75rem] md:pt-40">
          <Container>
            <div className={`${GRID} gap-y-10`}>
              <div className="col-span-4 md:col-span-4">
                <h1 className={`${DISPLAY} text-gj-navy`}>Smart Giuson</h1>
                <p className={`mt-6 text-gj-navy ${HEADING}`}>
                  Making complex recruitment information easier to use during real calls.
                </p>
                <Body className="mt-5">
                  An internal recruitment tool for ALUT that combines live vacancies, role information, and call guidance
                  in one place.
                </Body>
                <p className={`mt-8 border-t border-gj-line pt-4 text-gj-navy ${TEXT}`}>
                  Product Design &amp; Development &middot; ALUT &middot; 2.5 months
                </p>
                <p className={`mt-3 text-gj-navy ${TEXT}`}>
                  <span className="font-semibold">Outcome</span> Used in regular recruitment work, with at least four
                  coordinators handling specialized healthcare calls instead of one.
                </p>
              </div>

              <div className="col-span-4 md:col-span-8">
                <Screen
                  file="giuson/sg-home.webp"
                  alt="The redesigned Smart Giuson home screen: Find Open Positions, to search available positions by location and profession, and Recruitment Knowledge, to explore roles, salaries, benefits and employment terms"
                  width={2880}
                  height={1800}
                  priority
                  minWidth={680}
                  sizes="(max-width: 768px) 680px, 66vw"
                />
              </div>
            </div>
          </Container>
        </header>

        {/* 01 The problem, with the research folded in */}
        <section className={`bg-gj-tint ${CHAPTER}`}>
          <Container>
            <div className={GRID}>
              <SectionLabel n="01">The problem</SectionLabel>
              <H2 className="col-span-4 md:col-span-5">The information changed. Another PDF wasn&rsquo;t enough.</H2>
              <div className="col-span-4 mt-6 flex flex-col gap-4 md:col-span-5 md:col-start-7 md:mt-0">
                <Body>
                  ALUT changed how its education programs run, so the information coordinators relied on changed with
                  it: roles, staffing needs, salary scales, grants, scholarships, and employment terms.
                </Body>
                <Body>
                  The immediate request was to update the existing recruitment PDF. But updating the document would not
                  solve the larger problem: coordinators still had to learn, remember, and cross-reference a large amount
                  of changing information during candidate calls.
                </Body>
                <p className={`max-w-[62ch] font-semibold text-gj-navy ${TEXT}`}>
                  How could I make changing recruitment information easier to use while recruiting?
                </p>
              </div>

              <div className="col-span-4 mt-12 md:col-span-10 md:col-start-2">
                <BeforeWorkflow />
              </div>

              <div className={`col-span-4 md:col-span-12 ${PART} md:mt-12`}>
                <Body className="mb-8 max-w-[70ch]">
                  To understand the process, I joined professional meetings, listened to recruitment calls, reviewed the
                  existing material, and worked closely with the Head of Recruitment and the coordinator already handling
                  specialized healthcare recruitment.
                </Body>
                <Evidence />
              </div>
            </div>
          </Container>
        </section>

        {/* 02 How it works: text 4, video 8 */}
        <section className={`bg-white ${CHAPTER}`}>
          <Container>
            <div className={`${GRID} gap-y-8`}>
              <SectionLabel n="02">How it works</SectionLabel>
              <div className="col-span-4 md:col-span-4">
                <H2>One call. One workspace.</H2>
                <Body className="mt-4">
                  A coordinator can move from candidate context to relevant vacancies, facility information, and call
                  guidance without switching between tools.
                </Body>
                <div className="mt-8 flex flex-col gap-5 border-t border-gj-line pt-6">
                  <div>
                    <h3 className={`mb-1 font-semibold text-gj-navy ${TEXT}`}>Recruiting</h3>
                    <p className={`text-gj-muted ${TEXT}`}>
                      Supports candidate calls with location, live vacancies, facility information, employment terms, and
                      call guidance.
                    </p>
                  </div>
                  <div>
                    <h3 className={`mb-1 font-semibold text-gj-navy ${TEXT}`}>Information</h3>
                    <p className={`text-gj-muted ${TEXT}`}>
                      Gives coordinators and site managers direct access to role information, salary ladders, grants,
                      scholarships, and employment terms.
                    </p>
                  </div>
                  <p className={`text-gj-muted ${TEXT}`}>
                    Vacancy data stays connected to the Google Sheets that site managers already maintain.
                  </p>
                </div>
              </div>
              <div className="col-span-4 md:col-span-8">
                <WalkthroughVideo
                  src="/videos/giuson/walkthrough.mp4"
                  poster="/videos/giuson/walkthrough.jpg"
                  label="A silent walkthrough: entering Tel Aviv and Speech therapist, choosing a facility on the map, and working through the call checklist"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* 03 Design decisions */}
        <section className={`bg-gj-tint ${CHAPTER}`}>
          <Container>
            <div className={GRID}>
              <SectionLabel n="03">Design decisions</SectionLabel>
              <H2 className="col-span-4 md:col-span-6">Three decisions that shaped the product</H2>
            </div>

            {/* Decision 1: text 4, diagram 8 */}
            <div className={`${GRID} ${PART} mt-12 gap-y-8`}>
              <div className="col-span-4 md:col-span-4">
                <h3 className={`text-gj-navy ${HEADING}`}>A call doesn&rsquo;t follow a fixed sequence</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <Body>
                    The first version separated information across pages. In practice, candidates moved between questions
                    about location, the role, salary, and benefits.
                  </Body>
                  <Body>
                    I moved the experience into one continuous workspace so coordinators could access information in the
                    order the conversation required.
                  </Body>
                </div>
              </div>
              <div className="col-span-4 md:col-span-8">
                <FlowCompare />
              </div>
            </div>

            {/* Decision 2: the wide product moment, 10 columns */}
            <div className={`${GRID} ${PART} gap-y-8`}>
              <div className="col-span-4 md:col-span-4">
                <h3 className={`text-gj-navy ${HEADING}`}>Location-based matching</h3>
              </div>
              <div className="col-span-4 flex flex-col gap-3 md:col-span-6 md:col-start-5">
                <Body>Candidate location directly affects which opportunities are realistic.</Body>
                <Body>
                  Combining profession, address, search radius, and live staffing needs allowed coordinators to find
                  relevant facilities without leaving the recruitment workflow.
                </Body>
              </div>

              <div className="col-span-4 md:col-span-10 md:col-start-2">
                <Screen
                  file="giuson/sg-map.webp"
                  alt="The redesigned Recruiting screen: location Tel Aviv, role Speech therapist, a 25 km radius, a list of facilities with open positions, and a map of markers around the candidate"
                  width={2880}
                  height={1380}
                  minWidth={900}
                  sizes="(max-width: 768px) 900px, 1100px"
                >
                  <Pin n={1} x={58.2} y={19} />
                  <Pin n={2} x={33.5} y={34} />
                  <Pin n={3} x={77} y={63} />
                </Screen>
                <ol className="m-0 mt-6 grid list-none grid-cols-1 gap-5 border-t border-gj-line p-0 pt-5 md:grid-cols-3 md:gap-x-6">
                  {ANNOTATIONS.map(([t, d], i) => (
                    <li key={t} className="flex gap-3">
                      <Marker n={i + 1} />
                      <div className={TEXT}>
                        <p className="font-semibold text-gj-navy">{t}</p>
                        <p className="mt-1 text-gj-muted">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Decision 3: text 4, UI 8 */}
            <div className={`${GRID} ${PART} gap-y-8 md:items-center`}>
              <div className="col-span-4 md:col-span-4">
                <h3 className={`text-gj-navy ${HEADING}`}>Call guidance</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <Body>
                    Coordinators needed help remembering what had to be covered, but a rigid wizard would not match a real
                    conversation.
                  </Body>
                  <Body>I introduced a six-part checklist that works as a memory aid rather than a script.</Body>
                </div>
                <p className={`mt-4 font-semibold text-gj-navy ${TEXT}`}>6 essential topics. No forced order.</p>
              </div>
              <div className="col-span-4 md:col-span-8">
                <Screen
                  file="giuson/sg-facility.webp"
                  alt="The redesigned facility view: the facility name and distance, its open positions, the selected role's requirements, and a six-item call checklist beside them"
                  width={2880}
                  height={1590}
                  minWidth={700}
                  sizes="(max-width: 768px) 700px, 66vw"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* 04 Iteration, with the salary example */}
        <section className={`bg-white ${CHAPTER}`}>
          <Container>
            <div className={GRID}>
              <SectionLabel n="04">Iteration</SectionLabel>
              <H2 className="col-span-4 md:col-span-5">Real use showed what still needed work.</H2>
              <Body className="col-span-4 mt-6 md:col-span-5 md:col-start-7 md:mt-0">
                A week of use with recruitment coordinators and site managers led directly to changes in navigation,
                guidance, and information hierarchy.
              </Body>

              <ol className={`col-span-4 m-0 list-none p-0 md:col-span-10 md:col-start-2 md:mt-12 ${TO_VISUAL}`}>
                {ITERATION.map((row, i) => (
                  <li
                    key={row.change}
                    className="grid grid-cols-1 items-center gap-3 border-t border-gj-line py-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_6rem] md:gap-8"
                  >
                    <p className={`leading-snug text-gj-navy ${TEXT}`}>{row.feedback}</p>
                    <Arrow />
                    <p className={`font-semibold leading-snug text-gj-navy ${TEXT}`}>{row.change}</p>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] border border-gj-line bg-gj-tint max-md:w-28">
                      {i === 0 ? (
                        <Image
                          src={pictureSrc("giuson/sg-workspace.webp")}
                          alt="The continuous workspace: the map and the selected facility on one scrolling page"
                          fill
                          sizes="112px"
                          className="object-cover object-top"
                        />
                      ) : null}
                      {i === 1 ? (
                        <Image
                          src={pictureSrc("giuson/sg-checklist.webp")}
                          alt="The six-item recruitment checklist"
                          fill
                          sizes="112px"
                          className="object-cover object-top"
                        />
                      ) : null}
                      {i === 2 ? (
                        <div className={`flex h-full flex-col justify-center whitespace-nowrap px-2 ${TEXT}`}>
                          <p className="font-semibold leading-none text-gj-navy">₪71</p>
                          <p className="mt-1 leading-none text-gj-muted">per hour</p>
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
                <li aria-hidden className="border-t border-gj-line" />
              </ol>
            </div>

            {/* Salary information: text 4, UI 8 */}
            <div className={`${GRID} ${PART} mt-12 gap-y-8`}>
              <div className="col-span-4 md:col-span-4">
                <h3 className={`text-gj-navy ${HEADING}`}>Salary information</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <Body>Salary depends on profession, professional status, and recognized experience.</Body>
                  <Body>
                    The initial presentation still required too much interpretation, so I explored a clearer relationship
                    between candidate details, the applicable scale, and the resulting rate.
                  </Body>
                </div>
              </div>
              <div className="col-span-4 md:col-span-8">
                <SalaryExplainer />
              </div>
            </div>
          </Container>
        </section>

        {/* 05 Shared knowledge: text 4, UI 8 */}
        <section className={`bg-gj-tint ${CHAPTER}`}>
          <Container>
            <div className={`${GRID} gap-y-8`}>
              <SectionLabel n="05">Shared knowledge</SectionLabel>
              <div className="col-span-4 md:col-span-4">
                <H2>The information became useful beyond recruitment calls.</H2>
                <div className="mt-5 flex flex-col gap-3">
                  <Body>
                    Site managers also conduct their own hiring and need access to the same role and employment
                    information.
                  </Body>
                  <Body>
                    Information mode gives them a central place to check requirements, salary ladders, grants,
                    scholarships, and employment terms without relying on recruitment-team documents or personal notes.
                  </Body>
                </div>
              </div>
              <div className="col-span-4 md:col-span-8">
                <Screen
                  file="giuson/sg-info.webp"
                  alt="The redesigned Information screen: a search field, topic tabs, and a list of roles with a speech therapist entry expanded to show its requirements"
                  width={2880}
                  height={2120}
                  minWidth={720}
                  sizes="(max-width: 768px) 720px, 66vw"
                >
                  <Pin n={1} x={51.8} y={13.9} />
                </Screen>
                <p className={`mt-4 flex items-center gap-3 ${TEXT}`}>
                  <Marker n={1} />
                  <span className="font-semibold text-gj-navy">Search roles, benefits, or conditions</span>
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* 06 Impact */}
        <section className={`bg-gj-navy text-white ${CHAPTER} md:py-[5rem]`}>
          <Container>
            <div className={GRID}>
              <SectionLabel n="06" dark>
                Impact
              </SectionLabel>
              <H2 dark className="col-span-4 md:col-span-8">
                Giuson became part of how recruitment was done.
              </H2>

              <div className="col-span-4 mt-12 grid grid-cols-1 gap-x-6 gap-y-10 md:col-span-12 md:grid-cols-2">
                <div className="border-t border-white/20 pt-6">
                  <h3 className={`mb-2 font-semibold text-white ${TEXT}`}>Less information to memorize</h3>
                  <p className={`max-w-[48ch] text-white/75 ${TEXT}`}>
                    Coordinators could access complex role and employment information during calls instead of learning
                    everything in advance.
                  </p>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <h3 className={`mb-2 font-semibold text-white ${TEXT}`}>More confident, structured calls</h3>
                  <p className={`max-w-[48ch] text-white/75 ${TEXT}`}>
                    Coordinators reported feeling better prepared when discussing specialized roles and employment terms.
                  </p>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <h3 className={`mb-2 font-semibold text-white ${TEXT}`}>Broader participation</h3>
                  <p className={`max-w-[48ch] text-white/75 ${TEXT}`}>
                    At least four coordinators were conducting specialized healthcare recruitment calls during the summer
                    period, compared with one previously.
                  </p>
                  <p className={`mt-4 font-display text-gj-sky !normal-case ${HEADING}`} aria-label="1 to 4 plus">
                    <span aria-hidden>1 &rarr; 4+</span>
                  </p>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <h3 className={`mb-2 font-semibold text-white ${TEXT}`}>Part of the workflow</h3>
                  <p className={`max-w-[48ch] text-white/75 ${TEXT}`}>
                    Giuson became part of regular recruitment work and onboarding. Its use also expanded to site managers,
                    and I later built a similar tool for the rest of the roles.
                  </p>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* Reflection: a quiet ending */}
        <section className={`bg-white ${CHAPTER}`}>
          <Container>
            <div className={GRID}>
              <H2 className="col-span-4 md:col-span-5">Reflection</H2>
              <div className="col-span-4 mt-6 flex flex-col gap-4 md:col-span-5 md:col-start-7 md:mt-0">
                <Body>
                  This project started as an information update and became a working product because I looked at how the
                  information was actually being used.
                </Body>
                <Body>
                  The most important shift was moving from &ldquo;How should this document be updated?&rdquo; to
                  &ldquo;What do people need while doing the work?&rdquo;
                </Body>
                <p className={`max-w-[62ch] font-semibold text-gj-navy ${TEXT}`}>
                  The best solution wasn&rsquo;t a better document. It was a better way to work with the information.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <MoreProjects current="giuson" />
      </main>
      <SiteFooter closing={false} />
    </>
  );
}
