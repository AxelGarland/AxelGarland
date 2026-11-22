import { BeforeWorkflow, Evidence, FlowCompare } from "@/components/giuson/Diagrams";
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

const ANNOTATIONS = [
  ["Candidate context", "Location, profession, and radius define the search."],
  ["Live opportunities", "Vacancies reflect staffing needs maintained by site managers."],
  ["Geography + detail", "The list supports comparison while the map makes proximity visible."],
] as const;

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
                <Body className="mt-6">
                  I designed and built an internal tool for ALUT&rsquo;s recruitment team. It brings live vacancies, role
                  information, and call guidance together so coordinators can find relevant positions and answer questions
                  during candidate calls.
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
                <p className={`mt-4 text-gj-muted ${TEXT}`}>
                  The screens on this page show my redesign of the interface, in English. The version used at ALUT is in
                  Hebrew.
                </p>
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
                  I was first asked to update the recruitment PDF. That would not fix the real problem: coordinators still had to learn, remember, and cross-reference changing information during candidate calls.
                </Body>
                <p className={`max-w-[62ch] font-semibold text-gj-navy ${TEXT}`}>
                  How could changing information be easier to use during a call?
                </p>
              </div>

              <div className="col-span-4 mt-12 md:col-span-10 md:col-start-2">
                <BeforeWorkflow />
              </div>

              <div className={`col-span-4 md:col-span-12 ${PART} md:mt-12`}>
                <Body className="mb-8 max-w-[70ch]">
                  I joined professional meetings, listened to recruitment calls, reviewed the existing material, and worked with the Head of Recruitment and the coordinator who already handled specialized healthcare calls.
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
                  Recruiting mode takes a coordinator from candidate context to relevant vacancies, facility information,
                  and call guidance without switching between tools.
                </Body>
                <p className={`mt-4 text-gj-muted ${TEXT}`}>
                  Vacancy data stays connected to the Google Sheets that site managers already maintain.
                </p>
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

        {/* 03 Design decisions: each observation from a week of use sits beside the decision it led to */}
        <section className={`bg-gj-tint ${CHAPTER}`}>
          <Container>
            <div className={GRID}>
              <SectionLabel n="03">Design decisions</SectionLabel>
              <H2 className="col-span-4 md:col-span-5">A week of use shaped three decisions.</H2>
              <Body className="col-span-4 mt-6 md:col-span-5 md:col-start-7 md:mt-0">
                Recruitment coordinators and site managers used the first version for a week. I noted what they needed
                during calls, and each observation led to a change.
              </Body>
            </div>

            {/* Decision 1: text 4, diagram 8 */}
            <div className={`${GRID} ${PART} mt-12 gap-y-8`}>
              <div className="col-span-4 md:col-span-4">
                <h3 className={`text-gj-navy ${HEADING}`}>One continuous workspace</h3>
                <div className={`mt-4 flex flex-col gap-3 ${TEXT}`}>
                  <p className="text-gj-navy">
                    <span className="font-semibold">Observation</span> Conversations moved between topics.
                  </p>
                  <p className="text-gj-muted">
                    The first version separated information across pages. Candidates moved between questions about
                    location, the role, salary, and benefits. Now everything sits in one workspace, so coordinators get
                    information in the order the conversation needs it.
                  </p>
                </div>
                <div className="relative mt-6 aspect-[4/3] w-44 overflow-hidden rounded-[3px] border border-gj-line bg-gj-tint">
                  <Image
                    src={pictureSrc("giuson/sg-workspace.webp")}
                    alt="The continuous workspace: the map and the selected facility on one scrolling page"
                    fill
                    sizes="176px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <div className="col-span-4 md:col-span-8">
                <FlowCompare />
              </div>
            </div>

            {/* Decision 2: text 4, UI 8 */}
            <div className={`${GRID} ${PART} gap-y-8 md:items-center`}>
              <div className="col-span-4 md:col-span-4">
                <h3 className={`text-gj-navy ${HEADING}`}>A six-part checklist</h3>
                <div className={`mt-4 flex flex-col gap-3 ${TEXT}`}>
                  <p className="text-gj-navy">
                    <span className="font-semibold">Observation</span> Coordinators could miss important topics.
                  </p>
                  <p className="text-gj-muted">
                    Coordinators needed help remembering what to cover, and a fixed sequence of steps would not fit a real
                    conversation. The six topics can be covered in any order.
                  </p>
                </div>
                <div className="relative mt-6 aspect-[4/3] w-44 overflow-hidden rounded-[3px] border border-gj-line bg-gj-tint">
                  <Image
                    src={pictureSrc("giuson/sg-checklist.webp")}
                    alt="The six-item recruitment checklist"
                    fill
                    sizes="176px"
                    className="object-cover object-top"
                  />
                </div>
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

            {/* Decision 3: the wide product moment, 10 columns */}
            <div className={`${GRID} ${PART} gap-y-8`}>
              <div className="col-span-4 md:col-span-4">
                <h3 className={`text-gj-navy ${HEADING}`}>Location-based matching</h3>
              </div>
              <div className={`col-span-4 flex flex-col gap-3 md:col-span-6 md:col-start-5 ${TEXT}`}>
                <p className="text-gj-navy">
                  <span className="font-semibold">Observation</span> Candidate location affected which opportunities were
                  suitable.
                </p>
                <p className="text-gj-muted">
                  Profession, address, radius, and live vacancies appear together, so coordinators can find relevant
                  facilities without leaving the call.
                </p>
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
          </Container>
        </section>

        {/* 04 Information mode: text 4, UI 8 */}
        <section className={`bg-gj-tint ${CHAPTER}`}>
          <Container>
            <div className={`${GRID} gap-y-8`}>
              <SectionLabel n="04">Information mode</SectionLabel>
              <div className="col-span-4 md:col-span-4">
                <H2>The information became useful beyond recruitment calls.</H2>
                <div className="mt-5 flex flex-col gap-3">
                  <Body>
                    Information mode holds role requirements, the pay scale, grants, scholarships, and employment terms in
                    one searchable place. I added the pay scale information myself and gave it its own tab, so coordinators
                    can pass accurate salary information on to applicants during a call.
                  </Body>
                  <Body>
                    Site managers also do their own hiring. They use it to check the same information instead of asking
                    the recruitment team or relying on personal notes.
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
              <SectionLabel n="05" dark>
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
                    In summer 2026, at least four coordinators ran specialized healthcare recruitment calls, compared with one before. The tool made this kind of recruitment easier, so more coordinators could do it.
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
                  Listening to recruitment calls changed what I designed. Coordinators needed to move between topics as the
                  conversation unfolded, so I organized the tool around that flexibility.
                </Body>
              </div>
            </div>
          </Container>
        </section>

        <MoreProjects current="giuson" />
      </main>
      <SiteFooter />
    </>
  );
}
