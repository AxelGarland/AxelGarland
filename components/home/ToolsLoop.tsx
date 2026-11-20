"use client";

import { useEffect, useState } from "react";

/** The tools I work with, as four small clay icons turning on white (a six-second loop). It sits
 *  under About in place of a written list; the names are still in the page as hidden text. With reduced
 *  motion it shows the first frame and stays still. */
export function ToolsLoop() {
  const [still, setStill] = useState(false);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  return (
    <div className="mt-10 w-full max-w-[44rem] overflow-hidden bg-white">
      <p className="sr-only">Tools: Figma, Adobe Creative Suite, Cursor, Claude Code</p>
      {still ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/home/tools.jpg" alt="" aria-hidden className="block h-auto w-full" width={920} height={140} />
      ) : (
        <video
          aria-hidden
          className="block h-auto w-full"
          width={920}
          height={140}
          poster="/home/tools.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/home/tools.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
