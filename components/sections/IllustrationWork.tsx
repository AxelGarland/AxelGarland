import { ProjectCard } from "@/components/projects/ProjectCard";
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
    <div className="mx-auto max-w-content space-y-20 md:space-y-28">
      {SECTIONS.map((section) => {
        const items = PROJECTS.filter((p) => p.section === section);
        if (items.length === 0) return null;

        return (
          <section key={section} aria-labelledby={`section-${section}`}>
            <MotionReveal>
              <h2
                id={`section-${section}`}
                className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl"
              >
                {SECTION_LABELS[section]}
              </h2>
            </MotionReveal>
            <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:gap-8">
              {items.map((project, i) => (
                <MotionReveal key={project.slug} delay={0.05 * i} className="contents">
                  <li>
                    <ProjectCard project={project} />
                  </li>
                </MotionReveal>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
