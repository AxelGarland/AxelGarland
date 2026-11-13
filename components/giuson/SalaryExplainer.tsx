"use client";

import { useId, useState } from "react";

/** The proposed salary component: it starts from the candidate's conditions, names the scale that
 *  applies, shows the rate, and then shows why. The reasoning is the interface, not the number.
 *  The figures are samples for this case study, not ALUT's rates. */

type Status = "qualified" | "student";

/** Sample hourly rates. Qualified: a base rate plus a step for each recognized year. */
const QUALIFIED_BASE = 62;
const QUALIFIED_STEPS = [0, 3, 6, 9, 11, 12];
const STUDENT_RATES = { 3: 40, 4: 55 } as const;

const MAX_YEARS = QUALIFIED_STEPS.length - 1;

function Segmented<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; text: string }[];
  onChange: (v: T) => void;
}) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id}>
      <span id={id} className="mb-2 block text-[1.1rem] font-semibold text-gj-navy">
        {label}
      </span>
      <div className="inline-flex w-full overflow-hidden rounded-[3px] border border-gj-line bg-white">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o.value)}
              className={`min-h-[44px] flex-1 px-4 text-[1.1rem] font-semibold transition-colors duration-200 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gj-blue ${
                on ? "bg-gj-navy text-white" : "text-gj-navy hover:bg-gj-soft"
              }`}
            >
              {o.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="mt-[2px] h-5 w-5 shrink-0 text-gj-muted" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.6" />
      <path d="M8 12.4l2.7 2.7L16 9.6" />
    </svg>
  );
}

export function SalaryExplainer() {
  const [status, setStatus] = useState<Status>("qualified");
  const [years, setYears] = useState(3);
  const [studentYear, setStudentYear] = useState<3 | 4>(3);
  const yearsId = useId();

  const rate = status === "qualified" ? QUALIFIED_BASE + QUALIFIED_STEPS[years] : STUDENT_RATES[studentYear];

  const reasons: [string, string][] = [
    ["Profession", "Speech therapists are on the paramedical staff scale"],
    ["Status", status === "qualified" ? "Qualified, holds a license" : "Still a student"],
    status === "qualified"
      ? [
          "Experience",
          years === 0
            ? "No seniority yet, so the base rate applies"
            : `${years} ${years === 1 ? "year" : "years"} counted from when training was completed: seniority tier ${years}`,
        ]
      : ["Experience", `${studentYear === 3 ? "Third" : "Fourth"} year of study: the student rate applies`],
  ];

  const stepper =
    "min-h-[44px] w-14 text-[1.1rem] font-semibold text-gj-navy hover:bg-gj-soft disabled:text-gj-muted/40 disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gj-blue";

  return (
    <div className="overflow-hidden rounded-[4px] border border-gj-line bg-white shadow-[0_1px_2px_rgba(11,27,51,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-gj-line bg-gj-tint px-6 py-3 sm:px-8">
        <p className="font-sans text-[1.1rem] font-semibold text-gj-navy">Pay and employment terms</p>
        <span className="whitespace-nowrap border border-gj-muted/50 px-2 py-0.5 text-[1.1rem] uppercase tracking-[0.08em] text-gj-muted">
          Proposed redesign · sample figures
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* 1. The candidate's conditions */}
        <div className="flex flex-col gap-6 p-6 sm:p-8 md:col-start-1 md:row-start-1">
          <p className="text-[1.1rem] uppercase tracking-[0.08em] text-gj-muted">Candidate</p>

          <div>
            <span className="mb-1 block text-[1.1rem] font-semibold text-gj-navy">Profession</span>
            <p className="m-0 text-[1.1rem] text-gj-navy">Speech therapist</p>
          </div>

          <Segmented
            label="Professional status"
            value={status}
            onChange={setStatus}
            options={[
              { value: "qualified", text: "Qualified" },
              { value: "student", text: "Student" },
            ]}
          />

          {status === "qualified" ? (
            <div>
              <span id={yearsId} className="mb-2 block text-[1.1rem] font-semibold text-gj-navy">
                Recognized experience
              </span>
              <div role="group" aria-labelledby={yearsId} className="flex items-stretch overflow-hidden rounded-[3px] border border-gj-line">
                <button type="button" aria-label="One year less" disabled={years === 0} onClick={() => setYears((y) => Math.max(0, y - 1))} className={stepper}>
                  &minus;
                </button>
                <output className="flex flex-1 items-center justify-center border-x border-gj-line text-[1.1rem] font-semibold tabular-nums text-gj-navy" aria-live="polite">
                  {years} {years === 1 ? "year" : "years"}
                </output>
                <button type="button" aria-label="One year more" disabled={years === MAX_YEARS} onClick={() => setYears((y) => Math.min(MAX_YEARS, y + 1))} className={stepper}>
                  +
                </button>
              </div>
            </div>
          ) : (
            <Segmented
              label="Year of study"
              value={studentYear}
              onChange={setStudentYear}
              options={[
                { value: 3 as const, text: "Third" },
                { value: 4 as const, text: "Fourth" },
              ]}
            />
          )}
        </div>

        {/* 2. The scale, the rate, and why */}
        <div className="border-t border-gj-line p-6 sm:p-8 md:col-start-2 md:row-start-1 md:border-l md:border-t-0">
          <p className="text-[1.1rem] uppercase tracking-[0.08em] text-gj-muted">Applicable scale</p>
          <p className="mt-1 font-sans text-[1.1rem] font-semibold leading-tight text-gj-navy">Paramedical staff</p>

          <p className="mt-5 flex items-baseline gap-2 text-gj-navy" aria-live="polite">
            <span className="font-sans text-[clamp(1.7rem,2.3vw,2.2rem)] font-semibold leading-none text-gj-navy">₪</span>
            <span className="font-display text-[clamp(1.7rem,2.3vw,2.2rem)] leading-none text-gj-navy tabular-nums">{rate}</span>
            <span className="ml-1 text-[1.1rem] font-medium text-gj-muted">per hour</span>
          </p>

          <div className="mt-7 border-t border-gj-line pt-5">
            <p className="mb-3 font-sans text-[1.1rem] font-semibold text-gj-navy">Why this rate?</p>
            <dl className="m-0 flex flex-col gap-3">
              {reasons.map(([k, v]) => (
                <div key={k} className="flex items-start gap-3">
                  <Check />
                  <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-[7rem_1fr]">
                    <dt className="text-[1.1rem] font-semibold text-gj-navy">{k}</dt>
                    <dd className="m-0 text-[1.1rem] leading-snug text-gj-muted">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 3. What to watch for */}
        <div className="border-t border-gj-line bg-gj-tint p-6 sm:px-8 sm:py-5 md:col-span-2 md:row-start-2">
          <p className="mb-2 font-sans text-[1.1rem] font-semibold text-gj-navy">Important notes</p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[1.1rem] leading-snug text-gj-muted md:grid md:grid-cols-2 md:gap-10">
            <li>Seniority counts from the year training was completed, once documents are presented.</li>
            <li>Freelancers use a different scale: confirm how the candidate is employed before quoting.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
