import { getOrderedProjects } from "@/lib/projects";
import { PRODUCT_WORK, VISUAL_WORK } from "@/lib/workCards";
import Link from "next/link";

const META = Object.fromEntries([...PRODUCT_WORK, ...VISUAL_WORK].map((c) => [c.slug, c.meta]));

/** The other projects, set as a plain typeset index at the end of every case study: the name in the
 *  site's heavy capitals, what kind of work it is, and an arrow. Starts with the project after this
 *  one and wraps round, so every page ends by pointing somewhere. The only motion is the dotted line
 *  that draws under the name and a small nudge of the arrow, and both stop with reduced motion. */
export function MoreProjects({ current }: { current: string }) {
  const all = getOrderedProjects();
  const at = all.findIndex((p) => p.slug === current);
  const others = at < 0 ? all : [...all.slice(at + 1), ...all.slice(0, at)];

  return (
    <section aria-labelledby="more-projects" className="border-t border-line bg-paper py-14 md:py-20">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <h2 id="more-projects" className="type-section mb-8 font-display text-ink md:mb-10">
          More projects
        </h2>
        <ul className="m-0 list-none border-t border-ink/25 p-0">
          {others.map((project) => (
            <li key={project.slug} className="border-b border-ink/25">
              <Link
                href={`/work/${project.slug}`}
                className="group flex items-baseline gap-4 py-5 md:gap-8 md:py-6"
              >
                <span className="type-section font-display text-ink">
                  <span className="dotted-rule">{project.title}</span>
                </span>
                <span className="ml-auto text-right text-sm uppercase tracking-[0.06em] text-ink-subtle max-sm:hidden">
                  {META[project.slug] ?? project.discipline}
                </span>
                <span
                  aria-hidden
                  className="text-xl leading-none text-ink-subtle transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink max-sm:ml-auto"
                >
                  &#8599;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
