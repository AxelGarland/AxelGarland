"use client";

import { ANALYTICS_OPT_OUT_KEY } from "@/components/AnalyticsTracker";
import { useEffect, useState } from "react";

/** A private switch for the site owner: visiting this page stops analytics in this browser, so
 *  testing and checking the site doesn't inflate the visitor numbers. Not linked anywhere. */
export default function ExcludeMePage() {
  const [off, setOff] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(ANALYTICS_OPT_OUT_KEY, "1");
      setOff(true);
    } catch {
      setOff(false);
    }
  }, []);

  return (
    <main id="main" className="bg-surface">
      <div className="mx-auto flex min-h-[70svh] max-w-content flex-col justify-center px-6 pb-16 pt-32 sm:px-10 md:px-14 lg:px-16">
        <h1 className="mb-4 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
          {off === null ? "One moment." : off ? "This browser is excluded." : "Couldn’t save the setting."}
        </h1>
        <p className="mb-8 max-w-[48ch] text-lg leading-relaxed text-ink-muted">
          {off
            ? "Visits from this browser are no longer counted in the analytics. Repeat this on every browser and device you use, including your phone."
            : "This browser is blocking site storage, so the setting can’t be kept."}
        </p>
        {off ? (
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.removeItem(ANALYTICS_OPT_OUT_KEY);
              } catch {}
              setOff(false);
            }}
            className="self-start border-b border-line pb-0.5 text-sm text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            Count this browser again
          </button>
        ) : null}
      </div>
    </main>
  );
}
