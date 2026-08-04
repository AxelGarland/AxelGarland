import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectPicture } from "@/components/projects/ProjectPicture";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { getProject, PROJECTS, SECTION_LABELS, type AccentColor } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ACCENT_BORDER: Record<AccentColor, string> = {
  coral: "border-coral",
  teal: "border-teal",
  indigo: "border-indigo",
  gold: "border-gold",
};

const ACCENT_TEXT: Record<AccentColor, string> = {
  coral: "text-coral",
  teal: "text-teal",
  indigo: "text-indigo",
  gold: "text-gold",
};

const ACCENT_BG_SOFT: Record<AccentColor, string> = {
  coral: "bg-coral-soft",
  teal: "bg-teal-soft",
  indigo: "bg-indigo-soft",
  gold: "bg-gold-soft",
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project — Axel Garland" };
  return {
    title: `${project.title} — Axel Garland`,
    description: project.summary,
  };
}

function CaseStudySection({
  label,
  body,
  accent,
}: {
  label: string;
  body: string;
  accent?: AccentColor;
}) {
  return (
    <div className={`border-l-2 pl-5 ${accent ? ACCENT_BORDER[accent] : "border-ink/15"}`}>
      <p
        className={`text-xs font-medium uppercase tracking-[0.22em] ${
          accent ? ACCENT_TEXT[accent] : "text-ink-subtle"
        }`}
      >
        {label}
      </p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-[rgba(12,12,14,0.85)] md:text-lg">
        {body}
      </p>
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const accent = project.accentColor;
  const gridImages = project.gallery.filter((img) => img.file !== project.hero);
  const hasHeroImage = !project.awaitingAssets && !!project.hero;

  return (
    <>
      <GrainOverlay />
      <main id="main" className="min-h-[100dvh] bg-surface">
        <article className="pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              className="text-sm text-ink-muted transition-colors duration-500 hover:text-ink"
            >
              &larr; Work
            </Link>

            <p
              className={`mt-10 text-xs font-medium uppercase tracking-[0.24em] ${
                accent ? ACCENT_TEXT[accent] : "text-ink-subtle"
              }`}
            >
              {SECTION_LABELS[project.section]}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tight text-ink">
              {project.title}
            </h1>
            {!project.caseStudy ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[rgba(12,12,14,0.85)] md:text-lg">
                {project.reflection ?? project.summary}
              </p>
            ) : null}

            <div
              className={`relative mt-10 aspect-[16/10] overflow-hidden rounded-lg border md:mt-12 ${
                accent ? ACCENT_BORDER[accent] : "border-ink/8"
              } ${accent ? ACCENT_BG_SOFT[accent] : "bg-surface-raised"}`}
            >
              {hasHeroImage ? (
                <ProjectPicture
                  file={project.hero}
                  alt={`${project.title} — hero`}
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
                    Image coming soon
                  </span>
                </div>
              )}
            </div>

            {project.caseStudy ? (
              <div className="mt-12 space-y-10 md:mt-16 md:space-y-12">
                <CaseStudySection label="Problem / Context" body={project.caseStudy.problem} accent={accent} />
                <CaseStudySection label="Role" body={project.caseStudy.role} accent={accent} />
                <CaseStudySection label="Process" body={project.caseStudy.process} accent={accent} />
                <CaseStudySection label="Outcome" body={project.caseStudy.outcome} accent={accent} />
              </div>
            ) : null}

            {gridImages.length > 0 ? (
              <div className="mt-12 md:mt-16">
                <h2 className="mb-6 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                  Gallery
                </h2>
                <ProjectGallery
                  images={gridImages}
                  lightboxImages={project.gallery}
                  lightboxFeatured={project.lightboxFeatured}
                  heroFile={project.hero}
                />
              </div>
            ) : null}

            {project.upcomingImages && project.upcomingImages.length > 0 ? (
              <div className="mt-12 md:mt-16">
                <h2 className="mb-6 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
                  Coming soon
                </h2>
                <ul className="grid list-none gap-4 sm:grid-cols-2">
                  {project.upcomingImages.map((slot) => (
                    <li
                      key={slot.label}
                      className="flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-ink/15 bg-surface-raised/40"
                    >
                      <span className="text-center text-xs font-medium uppercase tracking-[0.18em] text-ink-subtle">
                        {slot.label}
                        <span className="mt-1 block normal-case tracking-normal text-ink-muted">
                          Placeholder
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
