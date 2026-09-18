"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useEffect, useState } from "react";

type Frame = { file: string; alt: string };

/** Cycles through a few stills as a stand-in for an animation that can't be exported as a
 *  static image. With reduced motion on, it shows the frames side by side instead. */
export function LoadingLoop({ frames, intervalMs = 1400 }: { frames: Frame[]; intervalMs?: number }) {
  const reduce = useHydrationSafeReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % frames.length), intervalMs);
    return () => clearInterval(id);
  }, [reduce, frames.length, intervalMs]);

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
    <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-black">
      {frames.map((frame, i) => (
        <Image
          key={frame.file}
          src={pictureSrc(frame.file)}
          alt={i === active ? frame.alt : ""}
          aria-hidden={i !== active}
          fill
          className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 768px) 100vw, 400px"
        />
      ))}
    </div>
  );
}
