import { MoreWorkGrid } from "@/components/projects/MoreWorkGrid";
import { WorkCircles } from "@/components/projects/WorkCircles";
import { getFeaturedProjects, getMoreProjects } from "@/lib/projects";

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-16 bg-surface pb-28 pt-20 md:pb-40 md:pt-28">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <WorkCircles projects={getFeaturedProjects()} />

        <div className="mt-28 border-t border-line pt-14 md:mt-40 md:pt-20">
          <h2 className="mb-12 font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl md:mb-16">
            More work
          </h2>
          <MoreWorkGrid projects={getMoreProjects()} />
        </div>
      </div>
    </section>
  );
}
