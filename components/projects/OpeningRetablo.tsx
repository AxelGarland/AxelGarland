"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import type { RetabloOpen } from "@/components/projects/RetabloSelector";
import Image from "next/image";
import { useEffect, useState } from "react";

/** A retablo that starts shut and swings its doors open. The doors are two panels hinged at the
 *  outer edges of the box: the front face is the closed photo, the back face is the inside of the
 *  door from the open photo, so a half turn lands them where the open photo has them. Clicking the
 *  box closes it again, and clicking once more reopens it. With reduced motion it simply shows open. */
/** Size and perspective for the box that holds a retablo's pieces. `fit` is a CSS length the box
 *  should not be taller than; the width follows from the photo's proportions. */
export function retabloFrameStyle(open: RetabloOpen, fit = "62vh"): React.CSSProperties {
  return {
    aspectRatio: `${open.width} / ${open.height}`,
    maxWidth: `min(100%, calc(${fit} * ${open.width / open.height}))`,
    perspective: "2800px",
  };
}

/** The retablo's pieces: the middle of the box, and two doors that swing on their outer hinges. */
export function RetabloPieces({
  open,
  lid,
  opened,
  openAngle = 180,
  duration = 1500,
  priority = false,
}: {
  open: RetabloOpen;
  lid: string;
  opened: boolean;
  /** How far the doors swing when `opened`, in degrees: 180 lays them flat like the open photo, less
   *  only starts them opening. */
  openAngle?: number;
  /** Milliseconds the doors take to swing. */
  duration?: number;
  priority?: boolean;
}) {
  const { width: W, height: H, left, right, lid: lidBottom } = open;
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const doorW = (right - left) / 2;
  const ease = "cubic-bezier(0.65, 0, 0.2, 1)";

  const door = (side: "left" | "right") => {
    const isLeft = side === "left";
    const turn = opened ? (isLeft ? -openAngle : openAngle) : 0;
    return (
      <div
        className="absolute"
        style={{
          left: pct(isLeft ? left : left + doorW, W),
          width: pct(doorW, W),
          top: pct(lidBottom, H),
          height: pct(H - lidBottom, H),
          transformOrigin: isLeft ? "0% 50%" : "100% 50%",
          transformStyle: "preserve-3d",
          transform: `rotateY(${turn}deg)`,
          transition: `transform ${duration}ms ${ease} ${isLeft || duration === 0 ? 0 : 90}ms`,
        }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <Image
            src={pictureSrc(`${open.prefix}-${side}-front.webp`)}
            alt=""
            fill
            priority={priority}
            className="object-fill"
            sizes="(max-width: 768px) 50vw, 360px"
          />
        </div>
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <Image
            src={pictureSrc(`${open.prefix}-${side}-back.webp`)}
            alt=""
            fill
            priority={priority}
            className="object-fill"
            sizes="(max-width: 768px) 50vw, 360px"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="absolute" style={{ left: pct(left, W), width: pct(right - left, W), top: 0, height: "100%" }}>
        <Image
          src={pictureSrc(`${open.prefix}-center.webp`)}
          alt={`The “${lid}” retablo`}
          fill
          priority={priority}
          className="object-fill drop-shadow-md"
          sizes="(max-width: 768px) 100vw, 640px"
        />
      </div>
      {door("left")}
      {door("right")}
    </>
  );
}

/** A retablo that starts shut and swings its doors open. The doors are two panels hinged at the
 *  outer edges of the box: the front face is the closed photo, the back face is the inside of the
 *  door from the open photo, so a half turn lands them where the open photo has them. Clicking the
 *  box closes it again, and clicking once more reopens it. With reduced motion it simply shows open. */
export function OpeningRetablo({ open, lid }: { open: RetabloOpen; lid: string }) {
  const reduce = useHydrationSafeReducedMotion();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setOpened(true), reduce ? 0 : 450);
    return () => clearTimeout(id);
  }, [reduce]);

  return (
    <button
      type="button"
      onClick={() => setOpened((v) => !v)}
      aria-label={opened ? `Close the “${lid}” retablo` : `Open the “${lid}” retablo`}
      className="relative block w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
      style={retabloFrameStyle(open)}
    >
      <RetabloPieces open={open} lid={lid} opened={opened} duration={reduce ? 0 : 1500} priority />
    </button>
  );
}
