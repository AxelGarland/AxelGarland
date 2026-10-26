"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useEffect, useState } from "react";

type Frame = { file: string; alt: string };

/** Cycles through a few stills as a stand-in for an animation that can't be exported as a
 *  static image. With reduced motion on, it shows the frames side by side instead. */
export function LoadingLoop({
  frames,
  intervalMs = 1400,
  fill = false,
  still,
}: {
  frames: Frame[];
  intervalMs?: number;
  /** With reduced motion and `fill`, the frame to hold on (default: the last). */
  still?: number;
  /** Fill the parent (which sets the shape) instead of drawing its own 16:9 framed box. With reduced
   *  motion it then holds on the last frame rather than laying the frames side by side. */
  fill?: boolean;
}) {
  const reduce = useHydrationSafeReducedMotion();
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setActive((current) => {
        setPrevious(current);
        return (current + 1) % frames.length;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduce, frames.length, intervalMs]);

  // The frame that was showing stays solid underneath until the next one has fully faded in, so
  // the picture never dips through the backdrop between frames.
  useEffect(() => {
    if (previous === null) return;
    const id = setTimeout(() => setPrevious(null), 600);
    return () => clearTimeout(id);
  }, [previous]);

  if (reduce && fill) {
    const held = frames[still ?? frames.length - 1];
    return <Image src={pictureSrc(held.file)} alt={held.alt} fill className="object-cover" sizes="(max-width: 768px) 66vw, 31rem" />;
  }

  if (reduce) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {frames.map((frame) => (
          <div key={frame.file} className="relative aspect-[16/9] overflow-hidden bg-black">
            <Image src={pictureSrc(frame.file)} alt={frame.alt} fill className="object-cover" sizes="130px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={fill ? "absolute inset-0 bg-black" : "relative aspect-[16/9] w-full overflow-hidden border border-line bg-black"}>
      {frames.map((frame, i) => (
        <Image
          key={frame.file}
          src={pictureSrc(frame.file)}
          alt={i === active ? frame.alt : ""}
          aria-hidden={i !== active}
          fill
          className={`object-cover ${
            i === active ? "z-10 opacity-100 transition-opacity duration-500" : i === previous ? "opacity-100" : "opacity-0"
          }`}
          sizes={fill ? "(max-width: 768px) 66vw, 31rem" : "(max-width: 768px) 100vw, 400px"}
        />
      ))}
    </div>
  );
}
