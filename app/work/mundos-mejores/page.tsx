import { BackLink } from "@/components/projects/BackLink";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { MundosHeader } from "@/components/projects/MundosHeader";
import { RetabloSelector } from "@/components/projects/RetabloSelector";
import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import Link from "next/link";
import { MUNDOS_BOXES } from "@/lib/mundos";
import { getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = pageMetadata({
  title: "Mundos Mejores · Axel Garland",
  description:
    "Mundos Mejores, five retablo boxes with sculpted figures about life, death, and memory: Axel Garland’s final project at Shenkar.",
  path: "/work/mundos-mejores",
});


export default function MundosMejoresPage() {
  const project = getProject("mundos-mejores");
  if (!project) notFound();

  return (
    <>
      <main id="main" className="bg-surface">
        <BackLink />
        {/* The text, and the boxes opening one after another */}
        <MundosHeader title={project.title} intro={project.reflection ?? ""} boxes={MUNDOS_BOXES} />

        {/* The five closed boxes: one on top, two on each side. Each opens its own page. */}
        <section className="overflow-x-clip border-t border-line pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <RetabloSelector boxes={MUNDOS_BOXES} />
          </div>
        </section>
        {/* The inside of every box, so all five scenes can be seen from here. */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <h2 className="mb-10 type-section font-display text-ink md:mb-14">Inside the boxes</h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-6">
              {MUNDOS_BOXES.map((box, i) => (
                <li key={box.slug} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                  <Link
                    href={`/work/mundos-mejores/${box.slug}`}
                    className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-raised">
                      <Image
                        src={pictureSrc(box.images[0].file)}
                        alt={box.images[0].alt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="mt-4 type-sub font-display text-ink decoration-accent underline-offset-4 group-hover:underline">
                      {box.title}
                    </h3>
                    {box.verse ? (
                      <p className="mt-2 max-w-[40ch] text-base italic leading-relaxed text-ink-muted">{box.verse.join(" ")}</p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <MoreProjects current="mundos-mejores" />
      </main>
      <SiteFooter />
    </>
  );
}
