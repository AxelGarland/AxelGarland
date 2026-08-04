import type { ReactNode } from "react";

const base =
  "pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-surface/90";

export function IllustrationVisual(): ReactNode {
  return (
    <>
      <div className={`${base}`} />
      <div className="absolute left-1/2 top-1/2 h-[120%] w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_40%_30%,rgba(109,126,179,0.28),transparent_55%)] opacity-90 mix-blend-multiply" />
      <div className="absolute -left-[20%] bottom-0 h-3/5 w-3/5 rotate-12 rounded-full bg-accent-soft blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern
            id="illo-lines"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 16H32M16 0V32"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-ink"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#illo-lines)" />
      </svg>
    </>
  );
}

export function InteractiveSystemsVisual(): ReactNode {
  return (
    <>
      <div className={`${base}`} />
      <div className="absolute inset-[12%] rounded-sm border border-ink/10 bg-surface/40">
        <div className="absolute left-[22%] top-[28%] h-[18%] w-[56%] rounded-[2px] bg-gradient-to-r from-accent/25 to-transparent" />
        <div className="absolute left-[22%] top-[54%] h-px w-[40%] bg-ink/15" />
        <div className="absolute left-[22%] top-[62%] h-px w-[28%] bg-ink/10" />
        <div className="absolute right-[18%] top-[38%] h-8 w-8 rotate-45 border border-accent/30" />
      </div>
      <div className="absolute -right-[15%] top-[10%] h-1/2 w-1/2 rounded-full bg-[rgba(109,126,179,0.1)] blur-3xl" />
    </>
  );
}

export function AiDesignVisual(): ReactNode {
  return (
    <>
      <div className={`${base}`} />
      <div className="absolute left-[8%] top-[12%] flex h-[76%] w-[84%] items-center justify-center">
        <div className="relative h-full w-full rounded-sm border border-ink/8 bg-gradient-to-b from-surface-elevated/60 to-surface/20">
          {[
            "M40 120 Q120 40 200 120 T360 120",
            "M40 160 Q140 80 220 160 T400 160",
            "M20 200 Q100 100 200 200 T380 200",
          ].map((d, i) => (
            <svg
              key={i}
              className="absolute inset-0 h-full w-full text-accent/40"
              viewBox="0 0 420 240"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
                className="opacity-60"
              />
            </svg>
          ))}
        </div>
      </div>
    </>
  );
}

export function MotionVisual(): ReactNode {
  return (
    <>
      <div className={`${base}`} />
      <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(109,126,179,0.1),transparent_40%,rgba(109,126,179,0.05),transparent_75%)] opacity-90" />
      <div className="absolute left-1/2 top-1/2 h-[140%] w-[40%] -translate-x-1/2 -translate-y-1/2 skew-y-[-12deg] bg-gradient-to-b from-accent/20 via-transparent to-transparent blur-2xl" />
    </>
  );
}

export function BrandingVisual(): ReactNode {
  return (
    <>
      <div className={`${base}`} />
      <div className="absolute inset-[18%] flex items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-ink/12 bg-surface/30 md:h-28 md:w-28">
          <div className="h-10 w-10 rounded-sm bg-gradient-to-tr from-ink/25 to-accent/35 md:h-12 md:w-12" />
        </div>
      </div>
      <div className="absolute bottom-[12%] left-[14%] h-16 w-24 border border-ink/8 bg-surface/20" />
    </>
  );
}

export function ExperimentalVisual(): ReactNode {
  return (
    <>
      <div className={`${base}`} />
      <div className="absolute -left-[10%] top-[20%] h-3/4 w-3/4 rotate-6 border border-dashed border-ink/12 bg-surface-elevated/25" />
      <div className="absolute right-[8%] top-[18%] h-2/5 w-2/5 -rotate-3 bg-[repeating-linear-gradient(135deg,rgba(12,12,14,0.05)_0,rgba(12,12,14,0.05)_1px,transparent_1px,transparent_9px)]" />
    </>
  );
}
