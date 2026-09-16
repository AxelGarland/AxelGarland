"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type RetabloImage = {
  file: string;
  alt: string;
  /** Taller-than-wide photo — gets a tall, narrower frame so it isn't cropped to a thin band. */
  portrait?: boolean;
};

export type RetabloBox = {
  /** URL segment for the box's own page: /work/mundos-mejores/[slug]. */
  slug: string;
  title: string;
  /** Name painted on the retablo's lid. */
  lid: string;
  /** Closed-box photo (tightly cropped, transparent) used as the clickable tile. */
  retablo: string;
  retabloWidth: number;
  retabloHeight: number;
  images: RetabloImage[];
};

/** Placement per box (index = box number − 1).
 *  Desktop: 3 over 5 on the left, 1 in the middle, 2 over 4 on the right.
 *  Mobile: 1 across the top, then [3, 2] and [5, 4].
 *  `width` scales each photo to the box's real relative width. */
const PLACEMENT = [
  { cell: "col-span-2 md:col-span-1 md:col-start-2 md:row-start-1 md:row-span-2 md:self-start", width: "w-full" },
  { cell: "col-start-2 row-start-2 md:col-start-3 md:row-start-1", width: "w-[67%]" },
  { cell: "col-start-1 row-start-2 md:col-start-1 md:row-start-1", width: "w-[93%]" },
  { cell: "col-start-2 row-start-3 md:col-start-3 md:row-start-2", width: "w-full" },
  { cell: "col-start-1 row-start-3 md:col-start-1 md:row-start-2", width: "w-[82%]" },
];

const boxNumber = (i: number) => String(i + 1).padStart(2, "0");

/** The five closed retablos. Each one opens that box's own page. */
export function RetabloSelector({ boxes }: { boxes: RetabloBox[] }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 items-end gap-x-6 gap-y-10 md:grid-cols-[1fr_1.5fr_1fr] md:gap-x-10 md:gap-y-12">
      {boxes.map((box, i) => (
        <Link
          key={box.slug}
          href={`/work/mundos-mejores/${box.slug}`}
          aria-label={`Box ${boxNumber(i)}: ${box.title}. Open this box`}
          className={`group flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${PLACEMENT[i].cell}`}
        >
          <Image
            src={pictureSrc(box.retablo)}
            alt={`The closed “${box.lid}” retablo`}
            width={box.retabloWidth}
            height={box.retabloHeight}
            className={`${PLACEMENT[i].width} h-auto drop-shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:drop-shadow-xl`}
            sizes="(max-width: 768px) 50vw, 360px"
          />
          <span className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-accent">
            Box {boxNumber(i)}
          </span>
          <span className="font-display text-base leading-tight text-ink decoration-accent underline-offset-4 group-hover:underline sm:text-lg">
            {box.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

/** One photo frame, shaped to the photo's orientation, whose image drifts slightly slower
 *  than the page as it scrolls past. Landscape photos get a wide 3:2 frame; portrait photos get
 *  a narrower 4:5 frame. Both are capped to the viewport height. */
function ParallaxStrip({ image }: { image: RetabloImage }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useHydrationSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  const frame = image.portrait
    ? "aspect-[4/5] max-w-2xl max-h-[88vh]"
    : "aspect-[3/2] max-h-[88vh]";

  return (
    <div ref={ref} className={`relative mx-auto w-full overflow-hidden bg-paper ${frame}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[7%]">
        <Image
          src={pictureSrc(image.file)}
          alt={image.alt}
          fill
          className="object-cover"
          sizes={image.portrait ? "(max-width: 768px) 100vw, 672px" : "(max-width: 1408px) 100vw, 1280px"}
        />
      </motion.div>
    </div>
  );
}

/** A box's photos, stacked as parallax frames — the scroll on each box's own page. */
export function RetabloPhotos({ images }: { images: RetabloImage[] }) {
  return (
    <div className="mx-auto flex max-w-content flex-col gap-4 px-6 sm:px-10 md:gap-6 md:px-14 lg:px-16">
      {images.map((image) => (
        <ParallaxStrip key={image.file} image={image} />
      ))}
    </div>
  );
}
