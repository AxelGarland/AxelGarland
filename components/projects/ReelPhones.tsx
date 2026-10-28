"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Reel = { file: string; label: string };

/** Alternate phones sit lower on wide screens so the row reads as a rhythm, not a line. */
const DROP = ["md:mt-0", "max-md:mt-10 md:mt-16"];

/** Phone width on wide screens is fixed by the widest row (four phones and three gaps of 2rem), so
 *  a row of three has the same size phones, centred. */
const ROW_MAX = 4;

/** A muted, looping clip inside a phone. It only plays while it is on screen. With reduced
 *  motion it stays on its first frame. */
function PhoneVideo({ file, label, still }: { file: string; label: string; still: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  return (
    <video
      ref={ref}
      className="block aspect-[540/954] w-full bg-ink object-cover"
      src={`/videos/alutit/${file}.mp4`}
      poster={`/videos/alutit/${file}.jpg`}
      aria-label={label}
      muted
      loop
      playsInline
      preload={still ? "none" : "metadata"}
    />
  );
}

function Phone({
  reel,
  index,
  count,
  progress,
  spread,
  still,
}: {
  reel: Reel;
  index: number;
  count: number;
  progress: MotionValue<number>;
  /** Wide screens only: the phones start fanned in a pile and open out into a row. */
  spread: boolean;
  still: boolean;
}) {
  const d = index - (count - 1) / 2;
  const move = spread && !still;
  const x = useTransform(progress, [0, 1], move ? [`${-d * 85}%`, "0%"] : ["0%", "0%"]);
  const rotate = useTransform(progress, [0, 1], move ? [d * 7, 0] : [0, 0]);
  const scale = useTransform(progress, [0, 1], move ? [0.9, 1] : [1, 1]);
  const y = useTransform(progress, [0, 1], !move && !still ? [48, 0] : [0, 0]);

  return (
    <motion.div
      className={`relative w-full md:w-[calc((100%-6rem)/4)] ${DROP[index % DROP.length]} ${
        index === count - 1 && count % 2 === 1 ? "max-md:col-span-2 max-md:mx-auto max-md:w-[calc(50%-0.5rem)]" : ""
      }`}
      style={{ x, y, rotate, scale, zIndex: count - Math.round(Math.abs(d)) }}
    >
      <div className="relative rounded-[2.1rem] bg-ink p-[7px] shadow-[0_28px_44px_-12px_rgba(26,25,22,0.45),inset_0_0_0_1.5px_rgba(255,255,255,0.14)]">
        <div className="relative overflow-hidden rounded-[1.65rem] bg-ink">
          <PhoneVideo file={reel.file} label={reel.label} still={still} />
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[2.2%] h-[2.4%] w-[27%] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
        <span aria-hidden className="absolute -right-[2px] top-[22%] h-[7%] w-[3px] rounded-r bg-ink" />
        <span aria-hidden className="absolute -left-[2px] top-[18%] h-[4.5%] w-[3px] rounded-l bg-ink" />
        <span aria-hidden className="absolute -left-[2px] top-[25%] h-[7%] w-[3px] rounded-l bg-ink" />
      </div>
    </motion.div>
  );
}

function Row({ reels, spread, still }: { reels: readonly Reel[]; spread: boolean; still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center 58%"] });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 items-start gap-x-4 gap-y-8 md:flex md:justify-center md:gap-x-8 md:gap-y-0"
    >
      {reels.map((reel, i) => (
        <Phone
          key={reel.file}
          reel={reel}
          index={i}
          count={reels.length}
          progress={scrollYProgress}
          spread={spread}
          still={still}
        />
      ))}
    </div>
  );
}

/** Phones in rows, each playing a muted clip. As a row scrolls into view its phones open out from a
 *  fanned pile into an evenly spaced row. On narrow screens they sit in a two-column grid and
 *  simply rise into place. */
export function ReelPhones({ rows }: { rows: readonly (readonly Reel[])[] }) {
  const reduce = useHydrationSafeReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-y-8 px-6 sm:px-10 md:gap-y-28 md:px-14 lg:px-16">
      {rows.map((reels) => (
        <Row key={reels[0].file} reels={reels.slice(0, ROW_MAX)} spread={wide} still={reduce} />
      ))}
    </div>
  );
}
