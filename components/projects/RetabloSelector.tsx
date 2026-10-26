"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export type RetabloImage = {
  file: string;
  alt: string;
  /** The photo's own size, so it can be shown whole at its true proportions. */
  width?: number;
  height?: number;
  /** Taller-than-wide photo — gets a tall, narrower frame so it isn't cropped to a thin band. */
  portrait?: boolean;
};

export type RetabloOpen = {
  prefix: string;
  width: number;
  height: number;
  left: number;
  right: number;
  lid: number;
};

export type RetabloBox = {
  /** URL segment for the box's own page: /work/mundos-mejores/[slug]. */
  slug: string;
  title: string;
  /** Name painted on the retablo's lid. */
  lid: string;
  /** A few lines on what the box shows and stands for. */
  description?: string;
  /** Closed-box photo (tightly cropped, transparent) used as the clickable tile. */
  retablo: string;
  retabloWidth: number;
  retabloHeight: number;
  /** What the box's own page needs to play the doors-opening animation: the cut-out pieces under
   *  `public/pictures/<prefix>-{center,left-front,left-back,right-front,right-back}.webp`, the open
   *  photo's size, where the box's frame starts and ends across it (`left`, `right`) and the height of
   *  the lid (`lid`), all in that photo's pixels. Boxes without one show the closed photo. */
  open?: RetabloOpen;
  images: RetabloImage[];
};

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
