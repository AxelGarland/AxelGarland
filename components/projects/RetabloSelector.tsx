import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import Link from "next/link";

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

/** The five closed retablos. Each one opens that box's own page. */
export function RetabloSelector({ boxes }: { boxes: RetabloBox[] }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 items-end gap-x-6 gap-y-10 md:grid-cols-[1fr_1.5fr_1fr] md:gap-x-10 md:gap-y-12">
      {boxes.map((box, i) => (
        <Link
          key={box.slug}
          href={`/work/mundos-mejores/${box.slug}`}
          aria-label={`${box.title}. Open this box`}
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
          <span className="mt-3 font-display text-base leading-tight text-ink decoration-accent underline-offset-4 group-hover:underline sm:text-lg">
            {box.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
