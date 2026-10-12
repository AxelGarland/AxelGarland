import { MotionReveal } from "@/components/motion/MotionReveal";
import { pictureSrc } from "@/lib/pictures";
import { projectThumbnailSrc, type Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

type Slot = { span: string; aspect: string; sizes: string };

/** An asymmetric 12-column rhythm: one wide opener, then pairs that alternate a wide card with
 *  a tall one. Bottoms are aligned (`items-end` on the grid), so captions sit on one line while
 *  the image tops step up and down. */
const SLOTS: Record<string, Slot> = {
  kindred: { span: "md:col-span-12", aspect: "aspect-[4/3] md:aspect-[2/1]", sizes: "(max-width: 1440px) 94vw, 1408px" },
  afterlife: { span: "md:col-span-7", aspect: "aspect-[16/9]", sizes: "(max-width: 768px) 94vw, 58vw" },
  alutit: { span: "md:col-span-5", aspect: "aspect-[4/5]", sizes: "(max-width: 768px) 94vw, 42vw" },
  "mundos-mejores": { span: "md:col-span-5", aspect: "aspect-[4/5]", sizes: "(max-width: 768px) 94vw, 42vw" },
  jabberwocky: { span: "md:col-span-7", aspect: "aspect-[16/10]", sizes: "(max-width: 768px) 94vw, 58vw" },
  giuson: { span: "md:col-span-6", aspect: "aspect-[16/10]", sizes: "(max-width: 768px) 94vw, 47vw" },
  "interview-assistant": { span: "md:col-span-6", aspect: "aspect-[16/10]", sizes: "(max-width: 768px) 94vw, 47vw" },
};

const FALLBACK: Slot = { span: "md:col-span-6", aspect: "aspect-[4/3]", sizes: "(max-width: 768px) 94vw, 47vw" };

function WorkCard({ project, index }: { project: Project; index: number }) {
  const slot = SLOTS[project.slug] ?? FALLBACK;
  const thumb = projectThumbnailSrc(project);

  return (
    <MotionReveal className={slot.span} amount={0.15}>
      <Link
        href={`/work/${project.slug}`}
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
      >
        <div className={`relative overflow-hidden bg-surface-raised ${slot.aspect}`}>
          {thumb ? (
            <Image
              src={thumb}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] ${project.thumbnailBlend ? "mix-blend-multiply" : ""}`}
              sizes={slot.sizes}
            />
          ) : null}
          {project.clientLogo ? (
            <div className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-md bg-surface/95 p-1.5 shadow-sm sm:h-12 sm:w-12">
              <Image
                src={pictureSrc(project.clientLogo)}
                alt={`${project.title}: real client work`}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-6">
          <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink sm:text-[1.75rem]">
            <span className="mr-3 align-middle text-sm font-normal tabular-nums text-ink-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-accent">
              {project.title}
            </span>
          </h3>
          {project.discipline ? (
            <span className="shrink-0 text-right text-[0.8rem] text-ink-muted">{project.discipline}</span>
          ) : null}
        </div>
        <p className="mt-1.5 line-clamp-2 max-w-[54ch] text-[0.95rem] leading-relaxed text-ink-muted">
          {project.summary}
        </p>
      </Link>
    </MotionReveal>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  const firstProduct = projects.findIndex((p) => p.discipline === "Product design");

  return (
    <div className="grid grid-cols-1 items-end gap-x-8 gap-y-16 md:grid-cols-12 md:gap-x-10 md:gap-y-24">
      {projects.map((project, i) => (
        <div key={project.slug} className="contents">
          {i === firstProduct ? (
            <div className="border-t border-line pt-8 md:col-span-12">
              <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
                <h3 className="font-display text-3xl font-light tracking-tight text-ink sm:text-4xl">
                  Product design
                </h3>
                <p className="max-w-[44ch] text-[0.95rem] leading-relaxed text-ink-muted">
                  Two tools for Alut&rsquo;s recruitment department, both in daily use.
                </p>
              </div>
            </div>
          ) : null}
          <WorkCard project={project} index={i} />
        </div>
      ))}
    </div>
  );
}
