import { AccordionRow } from "@/components/projects/AccordionRow";
import { MotionReveal } from "@/components/motion/MotionReveal";
import {
  PROJECTS,
  SECTION_LABELS,
  type ProjectSection,
} from "@/lib/projects";

const SECTIONS: ProjectSection[] = [
  "case-study",
  "selected-work",
  "other-work",
];

/** Alternating left/right composition per section — the whole block (heading + row)
 *  shifts sides instead of every section stacking in an identical, centered column. */
const ZIGZAG = [
  { justify: "justify-start", width: "md:w-[92%] lg:w-[88%]", align: "text-left", from: "mr-auto" },
  { justify: "justify-end", width: "md:w-[92%] lg:w-[88%]", align: "text-right", from: "ml-auto" },
  { justify: "justify-start", width: "md:w-[92%] lg:w-[88%]", align: "text-left", from: "mr-auto" },
] as const;

export function IllustrationWork() {
  return (
    <div className="mx-auto max-w-content space-y-20 px-6 sm:px-10 md:space-y-28 md:px-14 lg:px-16">
      {SECTIONS.map((section, i) => {
        const items = PROJECTS.filter((p) => p.section === section);
        if (items.length === 0) return null;
        const z = ZIGZAG[i % ZIGZAG.length];

        return (
          <section key={section} aria-labelledby={`section-${section}`}>
            <div className={`flex ${z.justify}`}>
              <div className={`w-full ${z.width} ${z.from}`}>
                <MotionReveal>
                  <h2
                    id={`section-${section}`}
                    className={`font-display text-2xl font-medium tracking-tight text-mist md:text-3xl ${z.align}`}
                  >
                    {SECTION_LABELS[section]}
                  </h2>
                </MotionReveal>
                <div className="mt-8">
                  <AccordionRow projects={items} />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
