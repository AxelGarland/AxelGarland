"use client";

import { ImageCarousel } from "@/components/projects/ImageCarousel";
import { RetabloShowcase } from "@/components/projects/RetabloShowcase";
import type { RetabloBox } from "@/components/projects/RetabloSelector";
import Link from "next/link";
import { useState } from "react";

/** The page's top: the project's text beside the boxes you can scrub through, and underneath it a
 *  section for whichever box is on show, with its name, what it stands for, and its photos. */
export function MundosExplorer({ title, intro, boxes }: { title: string; intro: string; boxes: RetabloBox[] }) {
  const [selected, setSelected] = useState(0);
  const box = boxes[selected];

  return (
    <>
      <header className="pb-12 pt-32 sm:pt-36 md:pb-16">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
          <div className="order-2 md:order-1">
            <h1 className="mb-6 font-display text-[clamp(1.95rem,3.9vw,3.51rem)] font-light leading-[1.02] tracking-tight text-ink">
              {title}
            </h1>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink-muted">{intro}</p>
          </div>
          <RetabloShowcase boxes={boxes} onChange={setSelected} className="order-1 md:order-2" />
        </div>
      </header>

      <section className="border-t border-line bg-paper py-16 md:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
          <div>
            <h2 className="mb-5 font-display text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-[1.05] tracking-tight text-ink">
              {box.lid}
            </h2>
            {box.description ? (
              <p className="mb-7 max-w-[46ch] text-lg leading-relaxed text-ink-muted">{box.description}</p>
            ) : null}
            <Link
              href={`/work/mundos-mejores/${box.slug}`}
              className="inline-block border-b border-accent pb-0.5 text-sm font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:text-accent-ink"
            >
              See the whole box
            </Link>
          </div>
          <ImageCarousel key={box.slug} slides={box.images} label={`${box.lid}, photos`} />
        </div>
      </section>
    </>
  );
}
