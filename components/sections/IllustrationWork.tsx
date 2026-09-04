import { IllustrationShowcase } from "@/components/projects/IllustrationShowcase";
import { WorkGrid } from "@/components/projects/WorkGrid";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { PROJECTS } from "@/lib/projects";

export function IllustrationWork() {
  const workProjects = PROJECTS.filter((p) => p.section === "case-study");
  const illustrationProjects = PROJECTS.filter(
    (p) => p.section === "selected-work" || p.section === "other-work"
  );

  return (
    <>
      <section id="work" className="bg-ink py-20 md:py-32">
        <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
          <MotionReveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.12em] text-accent">Selected Work</p>
                <h2 className="max-w-[20ch] font-display text-3xl font-semibold leading-[1.1] text-surface sm:text-4xl">
                  Projects that
                  <br />
                  <em className="italic text-accent">move things forward</em>
                </h2>
              </div>
              <p className="max-w-[38ch] self-end text-base leading-relaxed text-surface/70">
                From an AI recruitment tool to an illustrated brand mascot — each piece starts with
                a real problem worth solving.
              </p>
            </div>
          </MotionReveal>

          <WorkGrid projects={workProjects} />
        </div>
      </section>

      <section id="illustration" className="border-t border-line bg-paper py-20 md:py-32">
        <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
          <MotionReveal>
            <IllustrationShowcase projects={illustrationProjects} />
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
