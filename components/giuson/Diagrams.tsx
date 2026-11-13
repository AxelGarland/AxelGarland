import { ICONS, Icon, LABEL, TEXT } from "@/components/giuson/parts";

/** The diagrams of the Smart Giuson case study. They are drawn with type, thin rules and almost no
 *  colour: the product screens carry the colour, and blue appears here only where it marks a real
 *  difference (the free movement in the revised structure). All text is the page's body size. */

/* ------------------------------------------------------------------ Before Giuson */

const SOURCES = [
  { title: "Interactive PDF", sub: "Role information", icon: ICONS.pdf, cls: "left-0 top-0", from: [27, 12] },
  { title: "Google Sheets", sub: "Current staffing needs", icon: ICONS.sheet, cls: "right-0 top-0", from: [73, 12] },
  { title: "Personal notes", sub: "Updates and exceptions", icon: ICONS.note, cls: "bottom-0 left-0", from: [27, 88] },
  { title: "Google Maps", sub: "Candidate location", icon: ICONS.pin, cls: "bottom-0 right-0", from: [73, 88] },
] as const;

function SourceCard({ title, sub, icon }: { title: string; sub: string; icon: readonly string[] }) {
  return (
    <div className="flex items-center gap-4 rounded-[3px] border border-gj-line bg-white px-5 py-4">
      <Icon d={icon} className="h-6 w-6 shrink-0 text-gj-muted" />
      <span className={TEXT}>
        <span className="block font-semibold leading-tight text-gj-navy">{title}</span>
        <span className="block leading-snug text-gj-muted">{sub}</span>
      </span>
    </div>
  );
}

function CoordinatorCard() {
  return (
    <div className="flex items-center gap-4 rounded-[3px] bg-gj-navy px-6 py-5 text-white">
      <Icon d={ICONS.headset} className="h-6 w-6 shrink-0" />
      <span className={TEXT}>
        <span className="block font-semibold leading-tight">Recruitment coordinator</span>
        <span className="block leading-snug text-white/75">on a candidate call</span>
      </span>
    </div>
  );
}

export function BeforeWorkflow() {
  return (
    <figure className="m-0">
      {/* Wide screens: the coordinator in the middle, the four sources around them. */}
      <div className="relative hidden h-[300px] md:block">
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {SOURCES.map((s) => (
            <line
              key={s.title}
              x1={s.from[0]}
              y1={s.from[1]}
              x2={50}
              y2={50}
              vectorEffect="non-scaling-stroke"
              stroke="#9AA6BB"
              strokeWidth={1}
            />
          ))}
        </svg>
        {SOURCES.map((s) => (
          <div key={s.title} className={`absolute w-[34%] ${s.cls}`}>
            <SourceCard title={s.title} sub={s.sub} icon={s.icon} />
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 w-[36%] -translate-x-1/2 -translate-y-1/2">
          <CoordinatorCard />
        </div>
      </div>

      {/* Phones: the same idea, stacked. */}
      <div className="flex flex-col items-stretch gap-3 md:hidden">
        <CoordinatorCard />
        {SOURCES.map((s) => (
          <SourceCard key={s.title} title={s.title} sub={s.sub} icon={s.icon} />
        ))}
      </div>

      <figcaption className={`mt-8 max-w-[44rem] font-semibold text-gj-navy ${TEXT}`}>
        One call. Four information sources. A lot to learn, remember, and cross-reference.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ Discovery */

const EVIDENCE = [
  {
    title: "Calls didn’t follow a script",
    body: "Candidates moved between topics in different orders, so coordinators needed flexible access to information during the call.",
  },
  {
    title: "Accuracy was critical",
    body: "Salary, grants, and employment terms depended on role, status, and experience, leaving little room for error.",
  },
  {
    title: "Coordinators couldn’t memorize everything",
    body: "Many coordinators worked part-time, so the tool needed to support them during the call rather than rely on memory.",
  },
] as const;

/** Three columns on the page grid (4 + 4 + 4), separated by thin rules. */
export function Evidence() {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-x-6">
      {EVIDENCE.map((e) => (
        <li key={e.title} className="border-t border-gj-navy/40 pt-4">
          <h3 className={`mb-2 font-semibold text-gj-navy ${TEXT}`}>{e.title}</h3>
          <p className={`max-w-[36ch] text-gj-muted ${TEXT}`}>{e.body}</p>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ Before / after structure */

const BEFORE = ["Candidate", "Location", "Position", "Salary", "Benefits"];
const AFTER = ["Candidate context", "Vacancies + map", "Selected facility", "Position information", "Salary and conditions", "Checklist"];

/** Block height and gap, in px, shared by both columns so the arcs can be placed exactly. */
const BLOCK = 40;
const GAP = 14;
const cy = (i: number) => i * (BLOCK + GAP) + BLOCK / 2;
/** Free movement between steps: pairs of block indices and how far each arc bulges. */
const ARCS = [
  { a: 0, b: 4, w: 54 },
  { a: 1, b: 3, w: 28 },
  { a: 2, b: 5, w: 40 },
] as const;

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mx-auto" width="18" height={GAP} preserveAspectRatio="xMidYMid meet" fill="none" stroke="#9AA6BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M6 15l6 6 6-6" />
    </svg>
  );
}

function TwoWay() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mx-auto" width="18" height={GAP} preserveAspectRatio="xMidYMid meet" fill="none" stroke="#9AA6BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5" />
    </svg>
  );
}

export function FlowCompare() {
  const afterHeight = AFTER.length * BLOCK + (AFTER.length - 1) * GAP;
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
      {/* Before: a one-way line that follows the system. */}
      <figure className="m-0">
        <p className={`mb-4 text-gj-muted ${LABEL}`}>Initial structure</p>
        <ol className="m-0 list-none p-0">
          {BEFORE.map((step, i) => (
            <li key={step}>
              <div
                className={`flex items-center rounded-[3px] border border-gj-line bg-white px-4 font-semibold text-gj-navy ${TEXT}`}
                style={{ height: BLOCK }}
              >
                {step}
              </div>
              {i < BEFORE.length - 1 ? <Arrow /> : null}
            </li>
          ))}
        </ol>
        <figcaption className={`mt-5 text-gj-muted ${TEXT}`}>Reconstructed from the original flow</figcaption>
      </figure>

      {/* After: one continuous workspace you can move around in. */}
      <figure className="m-0">
        <p className={`mb-4 text-gj-muted ${LABEL}`}>Revised structure</p>
        <div className="flex items-start">
          <ol className="m-0 min-w-0 flex-1 list-none rounded-[3px] border border-gj-navy/50 bg-white p-0" style={{ height: afterHeight + 32 }}>
            <li className="sr-only">One continuous workspace</li>
            {AFTER.map((step, i) => (
              <li key={step} className="px-3" style={{ marginTop: i === 0 ? 16 : GAP, height: BLOCK }}>
                <div className={`relative flex h-full items-center rounded-[2px] bg-gj-tint px-3 font-semibold leading-tight text-gj-navy sm:px-4 ${TEXT}`}>
                  <span>{step}</span>
                  {i < AFTER.length - 1 ? (
                    <span className="absolute left-1/2 top-full -translate-x-1/2">
                      <TwoWay />
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <svg
            aria-hidden
            width="72"
            height={afterHeight + 32}
            viewBox={`0 0 72 ${afterHeight + 32}`}
            className="ml-1 shrink-0 overflow-visible"
            fill="none"
          >
            {ARCS.map((arc) => {
              const y1 = cy(arc.a) + 16;
              const y2 = cy(arc.b) + 16;
              return (
                <g key={arc.a} stroke="#0A5CE6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={`M0 ${y1} C${arc.w} ${y1}, ${arc.w} ${y2}, 0 ${y2}`} />
                  <path d={`M7 ${y1 - 5}L0 ${y1}L7 ${y1 + 5}`} />
                  <path d={`M7 ${y2 - 5}L0 ${y2}L7 ${y2 + 5}`} />
                </g>
              );
            })}
          </svg>
        </div>
      </figure>
    </div>
  );
}
