"use client";

import { RetabloPieces } from "@/components/projects/OpeningRetablo";
import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type RetabloImage = {
  file: string;
  alt: string;
  /** The photo's own size, so it can be shown whole at its true proportions. */
  width?: number;
  height?: number;
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
  /** Two or so lines of verse shown under the title on the box's own page. */
  verse?: string[];
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

/** How far the doors swing when the pointer is over a box: enough to start opening and show the
 *  inside between them, not so far that they reach into the next box. */
const PEEK_ANGLE = 68;

/** One closed retablo. Pointing at it (with a mouse) or focusing it with the keyboard starts its doors
 *  opening; moving away closes them. Boxes without opening pieces just show the closed photo. */
function RetabloTile({ box, width }: { box: RetabloBox; width: string }) {
  const reduce = useHydrationSafeReducedMotion();
  const [peek, setPeek] = useState(false);
  const open = box.open;
  const canPeek = !!open && !reduce;

  const frame = open ? (
    <div className={`relative ${width} transition duration-300 group-hover:-translate-y-1`} style={{ aspectRatio: `${box.retabloWidth} / ${box.retabloHeight}` }}>
      {/* The scene is wider than the shut box, because the doors swing out past it. It is placed so
          the shut box lines up with the tile. */}
      <div
        className="absolute top-0 h-full"
        style={{
          width: `${(open.width / (open.right - open.left)) * 100}%`,
          left: `${(-open.left / (open.right - open.left)) * 100}%`,
          perspective: "1800px",
        }}
      >
        <RetabloPieces open={open} lid={box.lid} opened={canPeek && peek} openAngle={PEEK_ANGLE} duration={reduce ? 0 : 750} />
      </div>
    </div>
  ) : (
    <Image
      src={pictureSrc(box.retablo)}
      alt={`The closed “${box.lid}” retablo`}
      width={box.retabloWidth}
      height={box.retabloHeight}
      className={`${width} h-auto drop-shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:drop-shadow-xl`}
      sizes="(max-width: 768px) 50vw, 360px"
    />
  );

  return (
    <Link
      href={`/work/mundos-mejores/${box.slug}`}
      aria-label={`${box.title}. Open this box`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPeek(true);
      }}
      onPointerLeave={() => setPeek(false)}
      onFocus={() => setPeek(true)}
      onBlur={() => setPeek(false)}
      className="group flex w-full flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {frame}
      <span className="mt-3 font-display text-base leading-tight text-ink decoration-accent underline-offset-4 group-hover:underline sm:text-lg">
        {box.title}
      </span>
    </Link>
  );
}

/** The five closed retablos. Each one opens that box's own page. */
export function RetabloSelector({ boxes }: { boxes: RetabloBox[] }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 items-end gap-x-6 gap-y-10 md:grid-cols-[1fr_1.5fr_1fr] md:gap-x-10 md:gap-y-12">
      {boxes.map((box, i) => (
        <div key={box.slug} className={`flex ${PLACEMENT[i].cell}`}>
          <div className="flex w-full flex-col items-center">
            <RetabloTile box={box} width={PLACEMENT[i].width} />
          </div>
        </div>
      ))}
    </div>
  );
}
