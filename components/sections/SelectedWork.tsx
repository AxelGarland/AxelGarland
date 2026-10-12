import { MotionReveal } from "@/components/motion/MotionReveal";
import { WorkGrid } from "@/components/projects/WorkGrid";
import { getOrderedProjects } from "@/lib/projects";

export function SelectedWork() {
  const projects = getOrderedProjects();

  return (
    <section id="work" className="bg-surface pb-28 pt-24 md:pb-40 md:pt-36">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 md:mb-24">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm text-ink-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Selected work
              </p>
              <h2 className="max-w-[14ch] font-display text-[clamp(2.75rem,6vw,5rem)] font-light leading-[0.98] tracking-tight text-ink">
                Ideas built <em className="italic text-accent">to be used</em>
              </h2>
            </div>
            <p className="max-w-[36ch] text-base leading-relaxed text-ink-muted">
              Generative design, product tools and illustration, each one made for a real
              purpose.
            </p>
          </div>
        </MotionReveal>

        <WorkGrid projects={projects} />
      </div>
    </section>
  );
}
