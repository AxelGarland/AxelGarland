"use client";

import { FocusDim } from "@/components/sections/FocusDim";
import { ReturnToCard } from "@/components/sections/ReturnToCard";
import { pictureSrc } from "@/lib/pictures";
import { PRODUCT_WORK, VISUAL_WORK } from "@/lib/workCards";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** The work as one list. Each row is the project's name and what it is or who it was for. On a wide screen, pointing at a row (or focusing it) plays that
 *  project in a panel on the right: a clip where one exists, otherwise a slow cross-fade of its pictures.
 *  Phones and touch screens have no hover, so each row carries a small picture instead. The whole row is
 *  the link. */

type Preview = { kind: "video"; src: string; poster: string; backdrop?: string; fit?: "cover" | "contain" };

/** What plays when a row is pointed at: a seven-second piece made for the list. The project's name in the
 *  heavy capitals with the red rule, three keywords arriving one by one, and its key visuals moving in, each
 *  in its own palette. (The earlier screen recordings of the real pages are kept in /public/home/previews-raw.) */
const clip = (slug: string): Preview => ({ kind: "video", src: `/home/previews/${slug}.mp4`, poster: `/home/previews/${slug}.jpg` });

const PREVIEW: Record<string, { context: string; preview: Preview }> = {
  giuson: { context: "ALUT", preview: clip("giuson") },
  "better-eater": { context: "Shenkar course project", preview: clip("better-eater") },
  kindred: { context: "Generative illustration system", preview: clip("kindred") },
  afterlife: { context: "Concept project", preview: clip("afterlife") },
  alutit: { context: "ALUT recruitment", preview: clip("alutit") },
  "mundos-mejores": { context: "Graduation project, Shenkar", preview: clip("mundos") },
  jabberwocky: { context: "Illustrated book", preview: clip("jabberwocky") },
};

/** Only projects with a preview defined; anything newer in the card data (a project still on hold) is left out. */
const ALL_CARDS = [...PRODUCT_WORK, ...VISUAL_WORK].filter((c) => PREVIEW[c.slug]);

/** The list as shown under a project: every other project, starting with the one after this. */
function others(current: string) {
  const at = ALL_CARDS.findIndex((c) => c.slug === current);
  return at < 0 ? ALL_CARDS : [...ALL_CARDS.slice(at + 1), ...ALL_CARDS.slice(0, at)];
}

function ClipShow({ p, active, still }: { p: Extract<Preview, { kind: "video" }>; active: boolean; still: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (active) setArmed(true);
  }, [active]);
  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;
    if (active) void v.play().catch(() => {});
    else v.pause();
  }, [active, armed, still]);
  return (
    <div className="absolute inset-0" style={p.backdrop ? { backgroundColor: p.backdrop } : undefined}>
      {/* The poster shows until the clip is first asked for; the clip itself is only fetched on first hover. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.poster} alt="" className={`absolute inset-0 h-full w-full ${p.fit === "contain" ? "object-contain" : "object-cover"}`} />
      {armed && !still ? (
        <video
          ref={ref}
          src={p.src}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full ${p.fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      ) : null}
    </div>
  );
}

export function WorkList({ current }: { current?: string } = {}) {
  /** Under a project the list is the same thing with a smaller heading, minus the project you are on. */
  const more = current !== undefined;
  const CARDS = more ? others(current) : ALL_CARDS;
  /** The row being pointed at (null when none), and the last one shown, so the panel can fade out in place. */
  const [hover, setHover] = useState<string | null>(null);
  const [shown, setShown] = useState(CARDS[0].slug);
  const [top, setTop] = useState(0);
  const [still, setStill] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  /** Put the panel beside this row: its middle on the row's middle, kept inside the list. */
  const point = (slug: string, row: HTMLElement) => {
    const li = row.closest("li");
    const box = stage.current;
    if (!li || !box) return;
    const h = panel.current?.offsetHeight ?? 0;
    const middle = li.offsetTop + li.offsetHeight / 2;
    setTop(Math.min(Math.max(middle, h / 2), Math.max(h / 2, box.offsetHeight - h / 2)));
    setShown(slug);
    setHover(slug);
  };
  const active = hover;

  return (
    <section
      id={more ? undefined : "work"}
      aria-label={more ? "More projects" : undefined}
      className={`work-stage work-light relative isolate overflow-hidden bg-white ${more ? "border-t border-line py-16 md:py-24" : "scroll-mt-16 py-20 md:py-28"}`}
    >
      {more ? null : <ReturnToCard />}
      <FocusDim />
      <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        {more ? (
          <h2 className="type-section mb-10 font-display text-ink md:mb-14">More projects</h2>
        ) : (
          <h2 className="type-title mb-14 font-display text-ink md:mb-20">Selected work</h2>
        )}

        <div ref={stage} className="relative" onMouseLeave={() => setHover(null)} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHover(null)}>
          <ul className="m-0 list-none border-b border-ink/15 p-0">
            {CARDS.map((card) => {
              const info = PREVIEW[card.slug];
              return (
                <li key={card.slug} className="border-t border-ink/15">
                  <Link
                    href={`/work/${card.slug}`}
                    id={more ? undefined : `work-${card.slug}`}
                    onPointerEnter={(e) => e.pointerType === "mouse" && point(card.slug, e.currentTarget)}
                    onFocus={(e) => point(card.slug, e.currentTarget)}
                    className="group work-card flex scroll-mt-28 items-center gap-5 py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2354e6] md:gap-7 md:py-6"
                  >
                    <div data-card-frame className="flex min-w-0 flex-1 items-center gap-5 md:gap-7">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display type-section leading-[1.05] text-ink transition-[color,transform] duration-300 group-hover:text-[#2354e6] group-focus-visible:text-[#2354e6] motion-safe:group-hover:translate-x-1.5">
                          {card.title}
                        </h3>
                        <p className="mt-1.5 text-base text-ink-muted">
                          {info.context}
                          <span aria-hidden className="mx-2 hidden text-ink/30 sm:inline">&middot;</span>
                          <span className="hidden text-sm uppercase tracking-[0.06em] text-ink-muted/80 sm:inline">{card.meta}</span>
                        </p>
                      </div>
                      {/* No hover on touch screens, so a small picture stands in for the preview. */}
                      <div className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden bg-surface-raised sm:hidden" style={card.backdrop ? { backgroundColor: card.backdrop } : undefined}>
                        <Image
                          src={pictureSrc(card.circle?.image ?? card.image)}
                          alt=""
                          fill
                          sizes="72px"
                          className={card.fit === "contain" && !card.circle ? "object-contain" : "object-cover"}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* The preview: beside the row being pointed at, moving from row to row, and gone when nothing is
              pointed at. All previews are stacked inside it, the current one showing. Pointer only. */}
          <div
            ref={panel}
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 hidden w-[min(42rem,52%)] transition-[transform,opacity] duration-300 ease-out lg:block"
            style={{ transform: `translateY(calc(${top}px - 50%))`, opacity: hover ? 1 : 0 }}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-surface-raised ring-1 ring-ink/10">
              {CARDS.map((card) => {
                const p = PREVIEW[card.slug].preview;
                const on = card.slug === shown;
                return (
                  <div key={card.slug} className={`absolute inset-0 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-0"}`}>
                    <ClipShow p={p} active={on && !!active} still={still} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
