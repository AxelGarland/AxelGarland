"use client";

import { useEffect, useRef, useState } from "react";

/** The tools I work with (Cursor, Figma, Claude Code, Adobe) orbiting a clay figure of me with my eyes
 *  closed. Point at a tool, or press it, and it plays a small move; an eye opens to follow the pointer. It is
 *  a p5 sketch in its own page, fetched only when About comes within a screen or so. The page tells it when it is
 *  on screen so it stops drawing when it is not. With reduced motion it holds still. The names are also in
 *  the page as hidden text. */
export function ToolOrbit() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    let visible = false;
    const tell = () => el.contentWindow?.postMessage({ type: "visible", value: visible }, "*");
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      tell();
    });
    io.observe(el);
    // The page is only fetched once About is within a screen or so.
    const close = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "700px 0px" });
    close.observe(el);
    el.addEventListener("load", tell);
    return () => {
      io.disconnect();
      close.disconnect();
      el.removeEventListener("load", tell);
    };
  }, []);

  return (
    <div className="w-full max-w-[44rem] [container-type:inline-size]">
      <p className="sr-only">Tools: Figma, Adobe Creative Suite, Cursor, Claude Code</p>
      <iframe
        ref={frame}
        src={near ? "/home/axel-tool-orbit.html" : undefined}
        title="Clay figure with four orbiting tools: Cursor, Figma, Claude Code and Adobe. Choose a tool to animate it."
        className="block w-full border-0"
        style={{ height: "calc(100cqw * 0.7738 + 30px)" }}
      />
    </div>
  );
}
