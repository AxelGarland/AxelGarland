import type { AccentColor, Project } from "@/lib/projects";
import { projectThumbnailSrc, SECTION_LABELS } from "@/lib/projects";
import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import Link from "next/link";

/** A thin crisp ring right at the card edge, plus a soft blurred halo bleeding outward from
 *  that same edge — a glow that reads as coming from the border, not a blob behind the card. */
const ACCENT_BORDER_GLOW: Record<AccentColor, string> = {
  coral: "hover:shadow-[0_0_0_1px_#F06479,0_0_16px_-4px_#F06479]",
  teal: "hover:shadow-[0_0_0_1px_#1CB88C,0_0_16px_-4px_#1CB88C]",
  indigo: "hover:shadow-[0_0_0_1px_#8676DE,0_0_16px_-4px_#8676DE]",
  gold: "hover:shadow-[0_0_0_1px_#E4B355,0_0_16px_-4px_#E4B355]",
  violet: "hover:shadow-[0_0_0_1px_#9B5DE5,0_0_16px_-4px_#9B5DE5]",
  blue: "hover:shadow-[0_0_0_1px_#3B82F6,0_0_16px_-4px_#3B82F6]",
};

/** Asymmetric spans + aspect ratios cycled per card index — an editorial rhythm instead of a
 *  uniform grid. The first slot is deliberately the most prominent (full-width) one, since
 *  `PROJECTS`' case-study order puts the strongest project first and the grid should read that
 *  way too, rather than letting a later, visually louder screenshot dominate by accident. */
const LAYOUT = [
  { span: "md:col-span-12", aspect: "aspect-[16/9]" },
  { span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { span: "md:col-span-8", aspect: "aspect-[16/9]" },
] as const;

function WorkCard({ project, layout }: { project: Project; layout: (typeof LAYOUT)[number] }) {
  const thumb = projectThumbnailSrc(project);
  const contain = project.thumbnailFit === "contain";
  const borderGlow = ACCENT_BORDER_GLOW[project.accentColor ?? "gold"];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative bg-surface/5 shadow-none transition-shadow duration-500 ${borderGlow} ${layout.span}`}
    >
      <div
        className={`relative z-10 w-full overflow-hidden ${layout.aspect} ${contain ? "bg-[#E4E3DF]" : ""}`}
      >
        {thumb ? (
          <Image
            src={thumb}
            alt={project.title}
            fill
            className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              contain ? "object-contain p-6" : "object-cover"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-surface/40">
              Image coming soon
            </span>
          </div>
        )}
        {project.clientLogo ? (
          <div className="absolute bottom-3 left-3 z-20 flex h-11 w-11 items-center justify-center rounded-md bg-surface/95 p-1.5 shadow-md backdrop-blur-sm sm:h-12 sm:w-12">
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

      <div className="border-t border-surface/15 p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-surface/50">
          {SECTION_LABELS[project.section]}
        </p>
        <h3 className="mb-1.5 font-display text-xl font-semibold leading-tight text-surface">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-surface/70">{project.summary}</p>
      </div>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {projects.map((project, i) => (
        <WorkCard key={project.slug} project={project} layout={LAYOUT[i % LAYOUT.length]} />
      ))}
    </div>
  );
}
