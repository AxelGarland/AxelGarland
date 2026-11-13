import { GrainOverlay } from "@/components/GrainOverlay";
import { BackLink } from "@/components/projects/BackLink";
import { FloatingLikes } from "@/components/projects/FloatingLikes";
import { HalftoneStars } from "@/components/projects/HalftoneStars";
import { MoreProjects } from "@/components/projects/MoreProjects";
import { ReelPhones } from "@/components/projects/ReelPhones";
import { CaseFacts } from "@/components/projects/CaseFacts";
import { TagLine } from "@/components/projects/TagLine";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pictureSrc } from "@/lib/pictures";
import { getProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { cardTags } from "@/lib/workCards";
import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { notFound } from "next/navigation";

export const metadata: Metadata = pageMetadata({
  title: "Alutit · Axel Garland",
  description:
    "Alutit, an illustrated recruitment character designed by Axel Garland for ALUT, the Israeli Society for Children and Adults with Autism.",
  path: "/work/alutit",
});

const REELS = [
  [
    { file: "reel-playground", label: "Alutit in front of a preschool playground, talking to the camera" },
    { file: "reel-paris", label: "Alutit in Paris with a baguette, in front of the Eiffel Tower" },
    { file: "reel-garden", label: "Alutit in a sun hat in a garden, talking to the camera" },
  ],
  [
    { file: "reel-desk", label: "Alutit at her desk, talking to the camera" },
    { file: "reel-unicorn", label: "Alutit in a unicorn onesie against a rainbow background" },
    { file: "reel-chef", label: "Alutit in a chef’s uniform in a kitchen, talking to the camera" },
    { file: "reel-graduate", label: "Alutit in a graduation gown in front of a university building, with Hebrew captions" },
  ],
] as const;

const TAGS = cardTags("alutit");

/** The character in her different roles, cut out as die-cut stickers (the white border and soft
 *  shadow are part of each file). A row of three above a row of four, all the same size. */
/** The brief, in three short lines: what was wrong, what I made, and how it works. */
const BRIEF = [
  ["Problem", "Our recruitment social media read like a noticeboard for job openings, with no point of view."],
  [
    "Response",
    "A recognizable character, inspired by the warmth and energy of our recruitment coordinators and built in our own colors. She became the face of our social media.",
  ],
  [
    "System",
    "One base design, redressed in costumes and situations for each role, so she can show the range of jobs a listing can\u2019t, and adapt to each campaign.",
  ],
] as const;

/** Real pieces she appears on. */
const APPLICATIONS = [
  {
    caption: "Recruitment flyers",
    span: "md:col-span-2",
    images: [
      { file: "alutit/apps-flyer-1.webp", alt: "A stack of Alutit recruitment brochures, the cover showing two friends on a bicycle" },
      { file: "alutit/apps-flyer-2.webp", alt: "A stack of Alutit recruitment brochures, the cover showing Alutit in a graduation gown on a unicorn" },
    ],
  },
  {
    caption: "Merchandise",
    span: "",
    images: [{ file: "alutit/apps-merch.webp", alt: "Alutit merchandise laid out together: a tote bag, notebooks and stickers" }],
  },
  {
    caption: "Friend-brings-friend campaign",
    span: "",
    images: [{ file: "alutit/apps-referral.webp", alt: "The Alutit friend-brings-friend campaign logo: Alutit with four friends in circles around her" }],
  },
] as const;

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
              <h1 className="mb-6 type-title font-display text-ink">
                A character
                <br />
                with <em className="italic text-accent">purpose</em>
              </h1>
              <p className="mb-8 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
                Alutit is an illustrated character I designed for the recruitment department at ALUT,
                the Israeli Society for Children and Adults with Autism. She is the face of our
                recruitment on social media, video, print and merchandise.
              </p>
              <TagLine tags={TAGS} className="" />
              <CaseFacts className="mt-3">Character design and social media content · ALUT recruitment department</CaseFacts>
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
                <h2 className="type-section font-display text-ink">
                  Building presence through character
                </h2>
                <dl className="m-0 flex max-w-[64ch] flex-col gap-5">
                  {BRIEF.map(([term, text]) => (
                    <div key={term} className="grid grid-cols-1 gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
                      <dt className="text-sm font-semibold uppercase tracking-[0.1em] text-ink sm:pt-[0.35em]">{term}</dt>
                      <dd className="m-0 text-lg leading-relaxed text-ink-muted">{text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Reels — five muted clips in phones that open out into a row as they scroll into view */}
        <FloatingLikes className="border-t border-line bg-surface py-20 md:py-28">
          <div className="mx-auto mb-14 max-w-content px-6 sm:px-10 md:mb-20 md:px-14 lg:px-16">
            <h2 className="type-section font-display text-ink">
              Recruitment videos for <em className="italic text-accent">social media</em>
            </h2>
          </div>
          <ReelPhones rows={REELS} />
          <div className="mx-auto mt-16 max-w-content px-6 sm:px-10 md:mt-24 md:px-14 lg:px-16">
            <p className="max-w-[40ch] font-display text-xl !font-semibold !normal-case leading-snug text-ink sm:text-2xl md:text-3xl">
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
                      A costume for{" "}
                      <em className="italic text-accent-light">every role</em> we hire for
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

        {/* Applications — the real pieces she appears on */}
        <section className="border-t border-line bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <h2 className="mb-10 type-section font-display text-ink md:mb-14">Where she appears</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-x-8">
              {APPLICATIONS.map((group) => (
                <figure key={group.caption} className={`m-0 ${group.span}`}>
                  <div className={`grid gap-4 ${group.images.length > 1 ? "grid-cols-2 md:gap-8" : "grid-cols-1"}`}>
                    {group.images.map((img) => (
                      <div key={img.file} className="relative aspect-[4/5]">
                        <Image
                          src={pictureSrc(img.file)}
                          alt={img.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 80vw, 24vw"
                        />
                      </div>
                    ))}
                  </div>
                  <figcaption className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink-muted">
                    {group.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Impact — the figure stands on the bottom edge, cropped at the waist */}
        <section className="overflow-hidden border-t border-line bg-surface pt-20 md:pt-28">
          <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
            <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16">
              <div className="max-w-[70ch] md:self-center md:pb-28">
                <h2 className="type-section font-display text-ink">
                  What <em className="italic text-accent">changed</em>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                  The Alutit page became our second-biggest source of steady applicants and hires,
                  especially counselors (madrichim) and assistants (סייעות), with more than 60 hires.
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
      <SiteFooter closing={false} />
    </>
  );
}
