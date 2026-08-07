import { MasonryProjectGrid } from "@/components/projects/MasonryProjectGrid";
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

export function IllustrationWork() {
  return (
    <div className="mx-auto max-w-content space-y-20 px-6 sm:px-10 md:space-y-28 md:px-14 lg:px-16">
      {SECTIONS.map((section) => {
        const items = PROJECTS.filter((p) => p.section === section);
        if (items.length === 0) return null;

        return (
          <section key={section} aria-labelledby={`section-${section}`}>
            <MotionReveal>
              <h2
                id={`section-${section}`}
                className="font-display text-2xl font-medium tracking-tight text-mist md:text-3xl"
              >
                {SECTION_LABELS[section]}
              </h2>
            </MotionReveal>
            <div className="mt-8">
              <MasonryProjectGrid projects={items} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
