"use client";

import { DesignButton } from "@/components/home/DesignButton";
import { PaintedName } from "@/components/home/PaintedName";
import { useEffect, useRef, useState } from "react";

const HEADER_CSS = `
  body > header { transition: opacity 0.35s ease, transform 0.35s ease; }
  html:not([data-hero-released]) body > header:not(:focus-within) { opacity: 0; transform: translateY(-100%); pointer-events: none; }
  @media (prefers-reduced-motion: reduce) { body > header { transition: none; } }
  /* Where the role boxes are drawn (wide screens), the buttons wait until both roles are in. */
  @media (min-width: 768px) {
    .hero-actions:not([data-ready]) .design-btn { opacity: 0; pointer-events: none; }
    .hero-actions[data-ready] .design-btn { animation: hero-btn-in 0.5s ease-out both; }
    .hero-actions[data-ready] .design-btn:nth-child(2) { animation-delay: 0.15s; }
  }
  @keyframes hero-btn-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .hero-actions[data-ready] .design-btn { animation: none; } }
`;

/** A test copy of the home hero with the animated portrait in place of the photo. The hero stays pinned
 *  while the page scrolls through its runway, and that scroll releases the stars; when the runway ends
 *  the hero moves on and the stars have fallen toward the work below. Under reduced motion the portrait
 *  stays still. */
export function HeroLab({
  portrait = "cut",
}: {
  portrait?: "cut" | "panel" | "fade";
}) {
  const runway = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const roles = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  /** The role boxes tell the page when both have appeared; a timer covers the case where they never do. */
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source === roles.current?.contentWindow && e.data?.type === "roles-done") setReady(true);
    };
    window.addEventListener("message", onMessage);
    const t = window.setTimeout(() => setReady(true), 7000);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const send = () => {
      raf = 0;
      const el = runway.current;
      if (!el) return;
      const room = el.offsetHeight - window.innerHeight;
      const value = Math.min(
        1,
        Math.max(0, -el.getBoundingClientRect().top / Math.max(1, room)),
      );
      el.style.setProperty("--p", value.toFixed(3));
      if (!still)
        frame.current?.contentWindow?.postMessage(
          { type: "progress", value },
          "*",
        );
      document.documentElement.toggleAttribute(
        "data-hero-released",
        el.getBoundingClientRect().bottom <= window.innerHeight + 2,
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(send);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    send();
    return () => {
      document.documentElement.removeAttribute("data-hero-released");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={runway}
      id="hero-runway"
      className="relative h-[240svh] bg-white"
    >
      {/* Part of the page's own markup, so it applies from the first paint and the bar never flashes on reload.
          The bar is hidden until the hero has been scrolled past, then slides in. Keyboard focus inside it
          brings it back, and without scripts it is simply shown. */}
      <style>{HEADER_CSS}</style>
      <noscript>
        <style>
          {
            "body > header { opacity: 1 !important; transform: none !important; pointer-events: auto !important; }"
          }
        </style>
      </noscript>
      <header className="sticky top-0 h-[100svh] overflow-hidden bg-white">
        <div className="mx-auto flex h-full max-w-content flex-col px-6 sm:px-10 md:flex-row md:justify-between md:gap-10 md:px-14 lg:gap-16 lg:px-16">
          <div className="relative z-10 pt-8 md:min-w-0 md:flex-1 md:self-center md:pt-0">
            {/* One column as wide as the name: the role boxes and the buttons are drawn to its width, so the
                name, the roles and the buttons share a left edge and a right edge. */}
            <div className="w-fit max-w-full">
              <div className="mb-7 sm:mb-8">
                <PaintedName />
              </div>
              {/* On wide screens two boxes grow in and type the roles; the same words are read out as text. */}
              <p className="mb-10 text-xl text-ink-muted sm:text-2xl md:sr-only">
                product designer
                <span aria-hidden className="mx-3 text-accent">
                  &middot;
                </span>
                illustrator
              </p>
              <div className="pointer-events-none relative mb-6 hidden aspect-[620/112] w-full md:block">
                <iframe
                  ref={roles}
                  src="/home/axel-role-labels.html"
                  title="Two boxes appear and type Product Designer and Illustrator"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="eager"
                />
              </div>
              {/* On wide screens each button sits under its role box, at the same width and gap. */}
              <div data-ready={ready ? "" : undefined} className="hero-actions flex flex-wrap items-center gap-x-6 gap-y-5 md:grid md:w-full md:grid-cols-[56.3%_37.9%] md:gap-x-[5.5%]">
                <DesignButton
                  href="#work"
                  label="See my work"
                  variant="solid"
                />
                <DesignButton
                  href="/contact"
                  label="Get in touch"
                  variant="line"
                />
              </div>
            </div>
          </div>
          <div className="relative mx-auto min-h-0 w-full flex-1 md:mx-0 md:aspect-[1122/1500] md:h-full md:w-auto md:flex-none md:shrink-0">
            <iframe
              ref={frame}
              src={
                portrait === "cut"
                  ? "/home/axel-falling-stars-hero.html?bg=cut&stars=off"
                  : portrait === "fade"
                    ? "/home/axel-falling-stars-hero.html?bg=white"
                    : "/home/axel-falling-stars-hero.html"
              }
              title="Painted portrait of Axel. As the page scrolls, the stars on his shirt fall."
              className="absolute left-0 top-0 h-[120%] w-full border-0"
              loading="eager"
            />
          </div>
        </div>
      </header>
    </section>
  );
}
