import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { TapToEnlarge } from "@/components/projects/TapToEnlarge";
import type { ReactNode } from "react";

/** Shared pieces of the Smart Giuson case study: one page grid, three type sizes, and the
 *  product-screen frame. Every section places its content on the same 12 columns. */

/** The page container: 1400px, 24px gutters on a phone, 64px on a desktop. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-content px-6 sm:px-10 md:px-14 lg:px-16 ${className}`}>{children}</div>;
}

/** The grid: 4 columns on a phone, 12 on a desktop, 24px between columns. Children say which columns
 *  they take, so every heading and block lands on the same vertical lines down the page. */
export const GRID = "grid grid-cols-4 gap-x-4 md:grid-cols-12 md:gap-x-6";

/** Spacing scale: a chapter's padding, the gap between a chapter's parts, and text to visual. */
export const CHAPTER = "py-12 md:py-[3.75rem]";
export const PART = "mt-8 border-t border-gj-line pt-8";
export const TO_VISUAL = "mt-8 md:mt-10";

/* ---- The three type sizes of the whole case study ----
 * 1. DISPLAY: the project title only.
 * 2. HEADING: every section and subsection heading.
 * 3. TEXT: body, labels, captions, metadata, annotations. Weight, capitals, tracking and colour tell
 *    these apart, never another size. */
export const DISPLAY = "font-display text-[clamp(2.5rem,4.4vw,4.25rem)] leading-[1] tracking-tight";
export const HEADING = "font-display !font-semibold !normal-case text-[clamp(1.7rem,2.3vw,2.2rem)] leading-[1.15]";
export const TEXT = "text-[1.1rem] leading-[1.55]";
export const LABEL = `${TEXT} uppercase tracking-[0.08em]`;

/** The label that opens a chapter: "01 / The problem". The number is the only blue in it, the name is
 *  in sentence case, and a hairline across the grid marks where the chapter starts. Always at column 1. */
export function SectionLabel({ n, children, dark = false }: { n: string; children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={`col-span-4 mb-8 border-t pt-4 md:col-span-12 ${dark ? "border-white/40" : "border-gj-navy/60"}`}
    >
      <p className={`${TEXT} ${dark ? "text-white/80" : "text-gj-muted"}`}>
        <span className={`font-semibold ${dark ? "text-gj-sky" : "text-gj-blue"}`}>{n}</span> / {children}
      </p>
    </div>
  );
}

/** A section or subsection heading. */
export function H2({ children, className = "", dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
  return <h2 className={`${HEADING} ${dark ? "text-white" : "text-gj-navy"} ${className}`}>{children}</h2>;
}

/** A quiet number above a subsection heading. */
export function DecisionLabel({ children }: { children: ReactNode }) {
  return <p className={`mb-3 ${LABEL} text-gj-muted`}>{children}</p>;
}

/** Body copy, with a restrained measure. */
export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-[62ch] ${TEXT} text-gj-muted ${className}`}>{children}</p>;
}

/** Captions, notes and disclaimers: the same size, in grey. */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`${TEXT} text-gj-muted ${className}`}>{children}</p>;
}

/** Emphasis inside copy is weight, not colour. */
export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-gj-navy">{children}</strong>;
}

const FRAME =
  "overflow-hidden rounded-[6px] border border-gj-line bg-white shadow-[0_1px_2px_rgba(11,27,51,0.06),0_16px_34px_-20px_rgba(11,27,51,0.32)]";

/** A product screen. On phones it fits the screen width and opens full screen on tap, where it can be
 *  panned and pinched at a readable size. */
export function Screen({
  file,
  alt,
  width,
  height,
  priority = false,
  sizes = "(max-width: 768px) 100vw, min(96vw, 1280px)",
  aspect,
  className = "",
  children,
}: {
  file: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  /** Crop the screen to this width / height ratio, keeping its top edge. */
  aspect?: number;
  className?: string;
  /** Overlays (numbered markers), positioned against the screen itself. */
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="relative">
        <div className={FRAME}>
          {/* A thin window bar, so the picture reads as a screen and not as a graphic. */}
          <div aria-hidden className="flex h-7 items-center gap-1.5 border-b border-gj-line bg-gj-tint px-3">
            <span className="h-2 w-2 rounded-full bg-gj-muted/35" />
            <span className="h-2 w-2 rounded-full bg-gj-muted/35" />
            <span className="h-2 w-2 rounded-full bg-gj-muted/35" />
          </div>
          <div className="relative" style={aspect ? { aspectRatio: String(aspect) } : undefined}>
            {aspect ? (
              <Image src={pictureSrc(file)} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
            ) : (
              <Image
                src={pictureSrc(file)}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                sizes={sizes}
                className="block h-auto w-full"
              />
            )}
            {children}
            <TapToEnlarge file={file} alt={alt} width={width} height={height} tone="giuson" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** A small numbered marker sitting on a screen; its explanation lives outside the screen. The only
 *  blue on a screen. */
export function Pin({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <span
      aria-hidden
      className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gj-blue text-[0.8rem] font-semibold leading-none text-white md:h-7 md:w-7 md:text-[1.1rem]"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {n}
    </span>
  );
}

/** The same marker, beside the text that explains it. */
export function Marker({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gj-blue text-[1.1rem] font-semibold leading-none text-white"
    >
      {n}
    </span>
  );
}

/** A thin, one-colour icon drawn on a 24 x 24 grid. */
export function Icon({ d, className = "h-6 w-6" }: { d: readonly string[]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}

export const ICONS = {
  pdf: ["M7 3h7l4 4v14H7z", "M14 3v4h4", "M9.5 12h5", "M9.5 16h5"],
  sheet: ["M4 5h16v14H4z", "M4 10h16", "M4 15h16", "M10 5v14"],
  note: ["M5 4h14v11l-5 5H5z", "M14 20v-5h5", "M8.5 9h7", "M8.5 12.5h4"],
  pin: ["M12 21s-6.5-5.7-6.5-11a6.5 6.5 0 0 1 13 0c0 5.3-6.5 11-6.5 11z", "M9.7 10a2.3 2.3 0 1 0 4.6 0a2.3 2.3 0 1 0 -4.6 0"],
  person: ["M8.5 8a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0 -7 0", "M4.5 20a7.5 7.5 0 0 1 15 0"],
  headset: ["M5 14v-2a7 7 0 0 1 14 0v2", "M5 14h2.5v4.5H5z", "M16.5 14H19v4.5h-2.5z", "M19 18.5c0 1.8-2 2.5-5 2.5"],
} as const;
