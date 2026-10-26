"use client";

import { useEffect, useRef, useState } from "react";

/** The live Kindred site, running inside this page, from "Twenty-five cells, nine jobs" through
 *  "Add a relative". It is an ordinary frame of the real site, so the tiles turn, the words swap and
 *  Roll makes new faces. The frame is made exactly as tall as those five sections and opened at the
 *  first one, so nothing above or below them shows, and the live site's own header bar is cropped
 *  off the top. It has two layouts, because the site changes layout on phones: a wide one scaled to
 *  fit, and the narrow phone one. Measured against https://mask-facette-app.vercel.app/, which hides
 *  its own Try it out buttons when it is shown inside a frame. */

const SRC = "https://mask-facette-app.vercel.app/#rules";
const WIDE = { width: 1280, height: 4713, crop: 64 };
const NARROW = { width: 390, height: 5780, crop: 60 };

export function KindredEmbed() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; layout: typeof WIDE } | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const layout = w >= 700 ? WIDE : NARROW;
      setBox({ scale: Math.min(1, w / layout.width), layout });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const height = box ? (box.layout.height - box.layout.crop) * box.scale : 640;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[72rem] overflow-hidden border border-line bg-[#07090a]"
      style={{ height }}
    >
      {box ? (
        <iframe
          key={box.layout.width}
          src={SRC}
          title="Kindred, the live site: the grid, the tiles, the rules of symmetry, and rolling a new face"
          loading="lazy"
          scrolling="no"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          className="absolute left-0 top-0 border-0"
          style={{
            width: box.layout.width,
            height: box.layout.height,
            transform: `scale(${box.scale}) translateY(-${box.layout.crop}px)`,
            transformOrigin: "0 0",
          }}
        />
      ) : null}
    </div>
  );
}
