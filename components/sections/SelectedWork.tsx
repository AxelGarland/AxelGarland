import { WorkCircles } from "@/components/projects/WorkCircles";
import { getOrderedProjects } from "@/lib/projects";

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-16 bg-surface pb-28 pt-20 md:pb-40 md:pt-28">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <WorkCircles projects={getOrderedProjects()} />
      </div>
    </section>
  );
}
