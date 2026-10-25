import { CardPreview } from "@/components/projects/CardPreview";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { pictureSrc } from "@/lib/pictures";
import { projectThumbnailSrc, type Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** How each project's picture sits inside its circle. `contain` shows a whole picture on a soft
 *  backdrop; `cover` fills the circle and crops the edges. */
const CROP: Record<string, { fit: "cover" | "contain"; position?: string; backdrop?: string; scale?: string }> = {
  kindred: { fit: "cover", position: "50% 50%" },
  giuson: { fit: "cover", position: "50% 55%" },
  "mundos-mejores": { fit: "cover", position: "50% 42%" },
  "better-eater": { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.12]" },
  alutit: { fit: "cover", position: "50% 38%" },
  afterlife: { fit: "cover", position: "50% 50%", backdrop: "bg-black" },
  jabberwocky: { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.04]" },
};

function Row({ project, index }: { project: Project; index: number }) {
  const left = index % 2 === 0;
  const thumb = projectThumbnailSrc(project);
  const crop = CROP[project.slug] ?? { fit: "cover" as const };

  return (
    <MotionReveal amount={0.2}>
      <Link
        href={`/work/${project.slug}`}
        className={`group flex flex-col gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent md:items-center md:gap-14 lg:gap-24 ${
          left ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        <div
          className={`relative aspect-square w-[78%] shrink-0 overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(26,25,22,0.08)] md:w-[min(46vw,36rem)] ${
            left ? "self-start" : "self-end"
          } ${crop.backdrop ?? "bg-surface-raised"}`}
        >
          {thumb ? (
            <Image
              src={thumb}
              alt={project.title}
              fill
              className={`transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] ${
                crop.fit === "cover" ? "object-cover" : `object-contain ${crop.scale ?? ""}`
              } ${project.thumbnailBlend ? "mix-blend-multiply" : ""}`}
              style={crop.position ? { objectPosition: crop.position } : undefined}
              sizes="(max-width: 768px) 78vw, 36rem"
            />
          ) : null}
          {project.previewVideo ? <CardPreview src={project.previewVideo} /> : null}
          {project.clientLogo ? (
            <div className="absolute bottom-[10%] left-[10%] flex h-11 w-11 items-center justify-center rounded-md bg-surface/95 p-1.5 shadow-sm sm:h-12 sm:w-12">
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

        <div className={`min-w-0 flex-1 ${left ? "self-start text-left md:self-center" : "self-end text-left md:self-center md:text-right"}`}>
          <p className="mb-4 text-sm tabular-nums text-ink-subtle">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mb-3 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-light leading-[1.02] tracking-tight text-ink">
            <span className="underline decoration-transparent decoration-1 underline-offset-[8px] transition-colors duration-300 group-hover:decoration-accent">
              {project.title}
            </span>
          </h3>
          {project.discipline ? <p className="mb-4 text-sm text-ink-muted">{project.discipline}</p> : null}
          <p className={`max-w-[38ch] text-base leading-relaxed text-ink-muted ${left ? "" : "md:ml-auto"}`}>
            {project.summary}
          </p>
        </div>
      </Link>
    </MotionReveal>
  );
}

export function WorkCircles({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      {projects.map((project, i) => (
        <Row key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}
