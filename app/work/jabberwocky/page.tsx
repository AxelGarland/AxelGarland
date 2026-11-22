import { BackLink } from "@/components/projects/BackLink";
import { CaseFacts } from "@/components/projects/CaseFacts";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { SlideStackGallery } from "@/components/projects/SlideStackGallery";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata: Metadata = pageMetadata({
  title: "Jabberwocky · Axel Garland",
  description:
    "Jabberwocky, my illustrated edition of Lewis Carroll’s poem, drawn in colored pencil.",
  path: "/work/jabberwocky",
});

/** Two strong spreads shown whole before the gallery, so the drawing and the lettering can be judged at once. */
const FEATURED = ["jabberwocky/spread-04.jpg", "jabberwocky/spread-11.jpg"];

export default function JabberwockyPage() {
  const project = getProject("jabberwocky");
  if (!project) notFound();
  const featured = project.gallery.filter((img) => FEATURED.includes(img.file));
  const rest = project.gallery.filter((img) => !FEATURED.includes(img.file));

  return (
    <>
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Header — the title and text on the left, the book mockup smaller on the right */}
        <header className="pb-16 pt-36 md:pb-20">
          <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[1fr_1fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
            <div className="order-2 md:order-1">
              <h1 className="mb-6 type-title font-display text-ink">
                {project.title}
              </h1>
              <p className="max-w-[46ch] text-lg leading-relaxed text-ink-muted">{project.reflection}</p>
              <CaseFacts className="mt-5">Solo project for a Children&rsquo;s Books course at Shenkar · Illustration, lettering, layout, and cover · Poem by Lewis Carroll</CaseFacts>
            </div>
            <div className="relative order-1 mx-auto aspect-[5145/3780] w-full max-w-[30rem] md:order-2 md:max-w-none">
              <Image
                src={pictureSrc("jabberwocky/book-mockup.jpg")}
                alt="Jabberwocky, printed book mockup"
                fill
                priority
                className="object-contain mix-blend-multiply"
                sizes="(max-width: 768px) 90vw, 560px"
              />
            </div>
          </div>
        </header>

        {/* Two spreads, whole */}
        <section className="border-t border-line bg-surface py-16 md:py-24">
          <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 sm:px-10 md:px-14 lg:px-16">
            {featured.map((img) => (
              <div key={img.file} className="relative aspect-[2800/840] w-full overflow-hidden">
                <Image src={pictureSrc(img.file)} alt={img.alt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 1024px" />
              </div>
            ))}
          </div>
        </section>

        {/* The rest of the book's spreads, original lettering and illustration together */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <SlideStackGallery
              images={rest}
              aspect="aspect-[2800/840]"
              maxWidth="max-w-5xl"
              sizes="(max-width: 1024px) 100vw, 1024px"
              expandOnMobile
            />
          </div>
        </section>
        <MoreProjects current="jabberwocky" />
      </main>
      <SiteFooter />
    </>
  );
}
