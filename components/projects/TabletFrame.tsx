import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import type { ReactNode } from "react";

/** The photographed iPad (`afterlife/ipad-frame.webp`, cut out with a clear screen) laid over
 *  whatever fills its screen. The frame is 1157 × 837 px and its screen opening is 1070 × 749 px,
 *  46 px in from the left and 45 from the top. The content box is 8 px larger than the opening on
 *  every side, so no gap shows at the edge, and the frame sits on top of it, which also gives the
 *  screen its rounded corners. */
const FRAME = { w: 1157, h: 837, sx: 38, sy: 37, sw: 1086, sh: 765 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function TabletFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-full drop-shadow-[0_24px_36px_rgba(26,25,22,0.28)] ${className}`}
      style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}
    >
      <div
        className="absolute overflow-hidden bg-black"
        style={{
          left: pct(FRAME.sx, FRAME.w),
          top: pct(FRAME.sy, FRAME.h),
          width: pct(FRAME.sw, FRAME.w),
          height: pct(FRAME.sh, FRAME.h),
        }}
      >
        {children}
      </div>
      <Image
        src={pictureSrc("afterlife/ipad-frame.webp")}
        alt=""
        aria-hidden
        width={1600}
        height={1157}
        className="pointer-events-none absolute inset-0 h-full w-full"
        sizes="(max-width: 768px) 100vw, 704px"
      />
    </div>
  );
}
