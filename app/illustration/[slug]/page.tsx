import { BottomCategoryStrip } from "@/components/sections/BottomCategoryStrip";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectPicture } from "@/components/projects/ProjectPicture";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { getProject, PROJECTS, SECTION_LABELS } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.filter((p) => !p.awaitingAssets).map((p) => ({ slug: p.slug }));
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

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || project.awaitingAssets) notFound();

  const gridImages = project.gallery.filter((img) => img.file !== project.hero);

  return (
    <>
      <GrainOverlay />
      <main id="main" className="min-h-[100dvh] bg-surface">
        <article className="px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 md:px-14 lg:px-16">
          <div className="mx-auto max-w-content">
            <Link
              href="/illustration"
              className="text-sm text-ink-muted transition-colors duration-500 hover:text-ink"
            >
              ← Illustration
            </Link>

            <p className="mt-10 text-xs font-medium uppercase tracking-[0.24em] text-ink-subtle">
              {SECTION_LABELS[project.section]}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tight text-ink">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[rgba(12,12,14,0.85)] md:text-lg">
              {project.summary}
            </p>

            <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-lg border border-ink/8 bg-surface-raised md:mt-12">
              <ProjectPicture
                file={project.hero}
                alt={`${project.title} — hero`}
                priority
                className="object-cover"
              />
            </div>

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
        <BottomCategoryStrip />
      </main>
      <SiteFooter />
    </>
  );
}
