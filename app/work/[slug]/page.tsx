import MorphSlider from "@/components/MorphSlider";
import { PrototypeMockup } from "@/components/projects/PrototypeMockup";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectPicture } from "@/components/projects/ProjectPicture";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
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

/** Dense reading content always lives in a white paper card floating on the dark page. */
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
    <div
      className={`rounded-lg border-l-4 bg-paper p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] md:p-7 ${
        accent ? ACCENT_BORDER[accent] : "border-ink/15"
      }`}
    >
      <p
        className={`text-xs font-medium uppercase tracking-[0.22em] ${
          accent ? ACCENT_TEXT[accent] : "text-ink-subtle"
        }`}
      >
        {label}
      </p>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink md:text-lg">{body}</p>
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
      <main id="main" className="min-h-[100dvh]">
        <article className="pb-16 pt-24 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work"
              className="text-sm text-mist-muted transition-colors duration-500 hover:text-mist"
            >
              &larr; Work
            </Link>

            <p
              className={`mt-10 text-xs font-medium uppercase tracking-[0.24em] ${
                accent ? ACCENT_TEXT[accent] : "text-mist-subtle"
              }`}
            >
              {SECTION_LABELS[project.section]}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tight text-mist">
              {project.title}
            </h1>
            {!project.caseStudy ? (
              <div
                className={`mt-6 max-w-2xl rounded-lg border-l-4 bg-paper p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)] md:p-7 ${
                  accent ? ACCENT_BORDER[accent] : "border-ink/15"
                }`}
              >
                <p className="text-base leading-relaxed text-ink md:text-lg">
                  {project.reflection ?? project.summary}
                </p>
              </div>
            ) : null}

            {project.prototype ? (
              <div className="mt-10 md:mt-12">
                <PrototypeMockup prototype={project.prototype} title={`${project.title} prototype`} />
                <p className="mt-3 text-sm text-mist-muted">
                  A quick clickthrough, not the live tool — pick a path on the home screen to see
                  where it leads.
                </p>
              </div>
            ) : project.useMorphSlider && project.gallery.length > 0 ? (
              <div
                className={`relative mt-10 aspect-[16/10] overflow-hidden rounded-lg border md:mt-12 ${
                  accent ? ACCENT_BORDER[accent] : "border-mist/15"
                }`}
              >
                <MorphSlider
                  items={project.gallery.map((img) => ({ image: pictureSrc(img.file), caption: img.alt }))}
                  transition="melt"
                  intensity={0.5}
                  aberration={0.25}
                  drift={0.3}
                  loop
                  radius={0}
                  overlayColor="#0a0a0e"
                />
              </div>
            ) : (
              <div
                className={`relative mt-10 aspect-[16/10] overflow-hidden rounded-lg border md:mt-12 ${
                  accent ? ACCENT_BORDER[accent] : "border-mist/15"
                } bg-paper-raised`}
              >
                {hasHeroImage ? (
                  <ProjectPicture
                    file={project.hero}
                    alt={`${project.title} — hero`}
                    priority
                    className={project.heroFit === "contain" ? "object-contain p-6" : "object-cover"}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
                      Image coming soon
                    </span>
                  </div>
                )}
              </div>
            )}

            {project.caseStudy ? (
              <div className="mt-12 space-y-8 md:mt-16 md:space-y-10">
                <CaseStudySection label="Problem / Context" body={project.caseStudy.problem} accent={accent} />
                <CaseStudySection label="Role" body={project.caseStudy.role} accent={accent} />
                <CaseStudySection label="Process" body={project.caseStudy.process} accent={accent} />
                <CaseStudySection label="Outcome" body={project.caseStudy.outcome} accent={accent} />
              </div>
            ) : null}

            {!project.useMorphSlider && gridImages.length > 0 ? (
              <div className="mt-12 md:mt-16">
                <h2 className="mb-6 font-display text-xl font-medium tracking-tight text-mist md:text-2xl">
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
                <h2 className="mb-6 font-display text-xl font-medium tracking-tight text-mist md:text-2xl">
                  Coming soon
                </h2>
                <ul className="grid list-none gap-4 sm:grid-cols-2">
                  {project.upcomingImages.map((slot) => (
                    <li
                      key={slot.label}
                      className="flex aspect-[4/3] items-center justify-center rounded-md border border-dashed border-mist/20 bg-surface-elevated/60"
                    >
                      <span className="text-center text-xs font-medium uppercase tracking-[0.18em] text-mist-subtle">
                        {slot.label}
                        <span className="mt-1 block normal-case tracking-normal text-mist-muted">
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
