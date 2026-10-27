import type { ReactNode } from "react";

/** A landscape tablet drawn in CSS around whatever fills its screen: a dark bezel with rounded
 *  corners, a front camera on the left edge, and a soft shadow. The screen is 16:9, the shape the
 *  AfterLife screens were designed in, so nothing in them is cropped. */
export function TabletFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-[1.6rem] bg-[#1b1b1d] p-[2.8%] shadow-[0_28px_60px_-28px_rgba(26,25,22,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.12)] sm:rounded-[2rem] ${className}`}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[0.7rem] bg-black sm:rounded-[0.9rem]">{children}</div>
      <span
        aria-hidden
        className="absolute left-[1.1%] top-1/2 h-[1.1%] min-h-[3px] w-[0.6%] min-w-[3px] -translate-y-1/2 rounded-full bg-[#3a3a3f]"
      />
    </div>
  );
}
