import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { FloatingLikes } from "@/components/projects/FloatingLikes";
import { HalftoneStars } from "@/components/projects/HalftoneStars";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { ReelPhones } from "@/components/projects/ReelPhones";
import { TagLine } from "@/components/projects/TagLine";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Alutit · Axel Garland",
  description:
    "Alutit, an illustrated recruitment character designed for Alut, The Israeli Society for Children and Adults with autism.",
};

const REELS = [
  [
    { file: "reel-playground", label: "Alutit in front of a preschool playground, talking to the camera" },
    { file: "reel-paris", label: "Alutit in Paris with a baguette, in front of the Eiffel Tower" },
    { file: "reel-garden", label: "Alutit in a sun hat in a garden, talking to the camera" },
  ],
  [
    { file: "reel-desk", label: "Alutit at her desk, talking to the camera" },
    { file: "reel-unicorn", label: "Alutit in a unicorn onesie against a rainbow background" },
    { file: "reel-chef", label: "Alutit in a chef's uniform in a kitchen, talking to the camera" },
    { file: "reel-graduate", label: "Alutit in a graduation gown in front of a university building, with Hebrew captions" },
  ],
] as const;

const TAGS = ["Character Design", "Illustration", "Social Media", "Recruitment", "Merchandise"];

/** The character in her different roles, cut out as die-cut stickers (the white border and soft
 *  shadow are part of each file). A row of three above a row of four, all the same size. */
const STICKERS = [
  [
    { file: "alutit/stickers/grad-unicorn-3.webp", alt: "Alutit in a graduation gown, tossing her cap while riding a unicorn over a rainbow" },
    { file: "alutit/stickers/clipboard-3.webp", alt: "Alutit in a lilac sweater, holding a clipboard" },
    { file: "alutit/stickers/summer-3.webp", alt: "Alutit in sunglasses and an Alutit t-shirt, with a tote bag" },
  ],
  [
    { file: "alutit/stickers/handyman-3.webp", alt: "Alutit dressed as a maintenance worker with a hard hat, wrench and drill" },
    { file: "alutit/stickers/nurse-3.webp", alt: "Alutit dressed as a care worker in scrubs with a stethoscope and clipboard" },
    { file: "alutit/stickers/sweater-3.webp", alt: "Alutit in a lilac star sweater" },
    { file: "alutit/stickers/onesie-3.webp", alt: "Alutit in a unicorn onesie" },
  ],
] as const;

export default function AlutitPage() {
  const project = getProject("alutit");
  if (!project) notFound();

  return (
    <>
      <GrainOverlay />
      <main id="main" className="bg-surface">
        <BackLink />
        {/* Hero */}
        <header className="relative overflow-hidden pb-12 pt-36 sm:pb-16 sm:pt-36 md:flex md:min-h-[100svh] md:items-center md:pb-10 md:pt-24">
          <div className="relative mx-auto grid w-full max-w-content grid-cols-1 items-center gap-8 px-6 sm:px-10 md:grid-cols-[1fr_1.15fr] md:gap-10 md:px-14 lg:px-16">
            <div>
              <h1 className="mb-6 font-display text-[clamp(1.95rem,4.29vw,3.51rem)] font-light leading-[1.05] tracking-tight text-ink">
                A character
                <br />
                with <em className="italic text-accent">purpose</em>
              </h1>
              <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                Alutit is an illustrated character designed for Alut, The Israeli Society for Children
                and Adults with autism. The character was designed for the recruitment department, to
                give a warm, colorful, and recognizable face across social media, video, print and
                merchandise.
              </p>
              <TagLine tags={TAGS} className="" />
            </div>

            <div className="relative h-[64svh] min-h-[24rem] w-full md:h-[min(86svh,62rem)]">
              <Image
                src={pictureSrc(project.hero)}
                alt="Alutit in her branded sweater, holding up a rainbow"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        </header>

        {/* Brief */}
        <section className="border-t border-line bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
              <div className="relative mx-auto aspect-[780/842] w-full max-w-[16.8rem] md:max-w-[18.2rem]">
                <Image
                  src={pictureSrc("alutit/alutit flags.webp")}
                  alt="Alutit holding up an Israeli flag and a 50th-anniversary flag"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 270px, 292px"
                />
              </div>
              <div className="flex flex-col gap-6">
                <h2 className="font-display text-2xl font-semibold leading-[1.15] text-ink">
                  Building presence through character
                </h2>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy?.problem}
                </p>
                <p className="max-w-[64ch] text-lg leading-relaxed text-ink-muted">
                  {project.caseStudy?.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reels — five muted clips in phones that open out into a row as they scroll into view */}
        <FloatingLikes className="border-t border-line bg-surface py-20 md:py-28">
          <div className="mx-auto mb-14 max-w-content px-6 sm:px-10 md:mb-20 md:px-14 lg:px-16">
            <h2 className="font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
              Recruitment videos for <em className="italic text-accent">social media</em>
            </h2>
          </div>
          <ReelPhones rows={REELS} />
          <div className="mx-auto mt-16 max-w-content px-6 sm:px-10 md:mt-24 md:px-14 lg:px-16">
            <p className="max-w-[40ch] font-display text-xl font-light leading-snug text-ink sm:text-2xl md:text-3xl">
              Before I took over the page&rsquo;s content, our reels reached around{" "}
              <em className="italic text-accent">73 views</em>. Now they regularly reach{" "}
              <em className="italic text-accent">1,500</em>, and up to{" "}
              <em className="italic text-accent">3,500</em>.
            </p>
          </div>
        </FloatingLikes>

        {/* Stickers — on black, so each white die-cut border stands out */}
        <section className="relative overflow-hidden bg-ink py-20 md:py-28">
          <HalftoneStars />
          <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <h2 className="sr-only">Where Alutit appears</h2>
            <div className="flex flex-col gap-y-10 md:gap-y-14">
              {STICKERS.map((row, rowIndex) => (
                <Fragment key={row[0].file}>
                  {rowIndex === 1 ? (
                    <p className="mx-auto max-w-[30ch] text-center font-display text-xl font-light leading-snug text-surface sm:text-2xl md:text-3xl">
                      Alutit appears in{" "}
                      <em className="italic text-accent-light">
                        recruitment flyers, social media, merch
                      </em>{" "}
                      and internal messaging
                    </p>
                  ) : null}
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
                    {row.map((img) => (
                      <li key={img.file} className="w-[calc(50%-0.5rem)] md:w-[calc((100%-4.5rem)/4)]">
                        <div className="relative aspect-[4/5]">
                          <Image
                            src={pictureSrc(img.file)}
                            alt={img.alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 45vw, 380px"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Impact — the figure stands on the bottom edge, cropped at the waist */}
        <section className="overflow-hidden border-t border-line bg-surface pt-20 md:pt-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
              <div className="max-w-[70ch] md:self-center md:pb-28">
                <h2 className="font-display text-2xl font-semibold leading-[1.15] text-ink sm:text-3xl">
                  And the <em className="italic text-accent">success</em> of it all
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                  A constant weekly influx of applicants comes through our social media presence, with
                  more than 43 hires coming directly from the Alutit page.
                </p>
              </div>
              <div className="relative mx-auto aspect-[581/784] w-full max-w-[15.2rem] md:mx-0 md:ml-auto md:max-w-[17.6rem]">
                <Image
                  src={pictureSrc("alutit/alutit-phone-crop.webp")}
                  alt="Alutit smiling as she looks at her phone"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 768px) 60vw, 282px"
                />
              </div>
            </div>
          </div>
        </section>
        <MoreProjects current="alutit" />
      </main>
      <SiteFooter />
    </>
  );
}
