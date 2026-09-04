"use client";

import { pictureSrc } from "@/lib/pictures";
import type { ProjectPrototype } from "@/lib/projects";
import Image from "next/image";
import { useState } from "react";

type PrototypeMockupProps = {
  prototype: ProjectPrototype;
  title: string;
  className?: string;
};

/** A small clickable prototype in a browser-window frame — 2-3 real captured screens with
 *  hotspots over them, swapping which static image is shown rather than embedding the live
 *  product. Used when the real tool shouldn't be open to public visitors, but a flat screenshot
 *  undersells how the thing actually works. */
export function PrototypeMockup({ prototype, title, className = "" }: PrototypeMockupProps) {
  const [activeId, setActiveId] = useState(prototype.startId);
  const screen = prototype.screens.find((s) => s.id === activeId) ?? prototype.screens[0];

  return (
    <div
      className={`overflow-hidden border border-line bg-paper shadow-[0_20px_50px_-30px_rgba(26,25,22,0.35)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-raised px-4 py-3">
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ec6a5e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#61c454]" />
        </div>
        <div className="mx-auto flex min-w-0 items-center gap-2 bg-paper px-4 py-1.5 text-xs text-ink-subtle">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <path
              d="M12 2C9.5 2 7.5 4.5 7.5 8v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1.5V8c0-3.5-2-6-4.5-6Zm0 2c1.7 0 3 1.9 3 4v2H9V8c0-2.1 1.3-4 3-4Z"
              fill="currentColor"
            />
          </svg>
          <span className="truncate">{prototype.domain}</span>
        </div>
      </div>

      <div className="relative aspect-[2560/1800] w-full bg-surface-raised">
        <Image
          key={screen.id}
          src={pictureSrc(screen.file)}
          alt={screen.alt}
          fill
          priority={screen.id === prototype.startId}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />

        {screen.hotspots?.map((h) => (
          <button
            key={h.goTo}
            type="button"
            aria-label={h.label}
            title={title}
            onClick={() => setActiveId(h.goTo)}
            className="absolute transition hover:bg-white/15 hover:ring-2 hover:ring-white/60 focus-visible:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{
              left: `${h.xPct}%`,
              top: `${h.yPct}%`,
              width: `${h.wPct}%`,
              height: `${h.hPct}%`,
            }}
          />
        ))}

        {screen.backTo ? (
          <button
            type="button"
            onClick={() => setActiveId(screen.backTo!)}
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-paper/90 px-3 py-1.5 text-xs font-medium text-ink shadow-md backdrop-blur-sm transition hover:bg-paper"
          >
            &larr; Back
          </button>
        ) : null}
      </div>
    </div>
  );
}
