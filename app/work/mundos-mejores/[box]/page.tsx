import { GrainOverlay } from "@/components/GrainOverlay";
import { OpeningRetablo } from "@/components/projects/OpeningRetablo";
import { PhotoCarousel } from "@/components/projects/PhotoCarousel";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { getBox, MUNDOS_BOXES } from "@/lib/mundos";
import { pictureSrc } from "@/lib/pictures";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ box: string }>;
};

export function generateStaticParams() {
  return MUNDOS_BOXES.map((box) => ({ box: box.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = getBox((await params).box);
  if (!found) return {};
  return {
    title: `${found.box.title} · Mundos Mejores · Axel Garland`,
    description: `${found.box.title}, from Mundos Mejores: a retablo-inspired box by Axel Garland.`,
  };
}

export default async function MundosBoxPage({ params }: PageProps) {
  const found = getBox((await params).box);
  if (!found) notFound();
  const { box, index } = found;

  const others = MUNDOS_BOXES.map((b, i) => ({ box: b, index: i })).filter(({ index: i }) => i !== index);

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        {/* Header: back to all boxes, the closed retablo, and the box's name */}
        <section className="pb-12 pt-32 sm:pt-36 md:pb-16">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <Link
              href="/work/mundos-mejores"
              className="mb-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.08em] text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 4.5 6 10l6.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              All boxes
            </Link>

            <div className="flex flex-col items-center text-center">
              {box.open ? (
                <OpeningRetablo open={box.open} lid={box.lid} />
              ) : (
                <Image
                  src={pictureSrc(box.retablo)}
                  alt={`The closed “${box.lid}” retablo`}
                  width={box.retabloWidth}
                  height={box.retabloHeight}
                  priority
                  className={`h-auto drop-shadow-md ${box.retabloWidth > box.retabloHeight ? "w-64 sm:w-80" : "w-28 sm:w-36"}`}
                  sizes="320px"
                />
              )}
              <h1 className="mt-8 font-display text-[clamp(1.76rem,3.9vw,2.73rem)] font-light leading-[1.05] tracking-tight text-ink">
                {box.title}
              </h1>
              {box.verse ? (
                <p className="mt-5 max-w-[48ch] text-[0.9rem] italic sm:text-lg leading-relaxed text-ink-muted">
                  {box.verse.map((line, i) => (
                    <span key={line}>
                      {i > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* The box's own scroll */}
        <div className="px-6 sm:px-10 md:px-14 lg:px-16">
          <PhotoCarousel photos={box.images} label={`${box.title}, photos`} />
        </div>

        {/* The other boxes, as a strip of retablos */}
        <nav aria-label="Other boxes" className="mt-20 border-t border-line py-12 md:mt-28 md:py-16">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <ul className="grid grid-cols-2 items-end gap-x-6 gap-y-10 sm:grid-cols-4 md:gap-x-10">
              {others.map(({ box: other }) => (
                <li key={other.slug}>
                  <Link
                    href={`/work/mundos-mejores/${other.slug}`}
                    aria-label={other.title}
                    className="group flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <Image
                      src={pictureSrc(other.retablo)}
                      alt={`The closed “${other.lid}” retablo`}
                      width={other.retabloWidth}
                      height={other.retabloHeight}
                      className="h-28 w-auto max-w-full object-contain object-bottom drop-shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:drop-shadow-xl sm:h-36 md:h-44"
                      sizes="240px"
                    />
                    <span className="mt-3 font-display text-base leading-tight text-ink decoration-accent underline-offset-4 group-hover:underline sm:text-lg">
                      {other.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
