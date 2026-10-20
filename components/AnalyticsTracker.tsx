"use client";

import { Analytics, type BeforeSend } from "@vercel/analytics/next";

/** The key `/exclude-me` writes into a browser's localStorage. */
export const ANALYTICS_OPT_OUT_KEY = "ag-analytics-off";

/** Vercel Web Analytics with a per-browser opt-out, so the owner's own visits don't count.
 *  A browser that has visited `/exclude-me` sends nothing; everyone else is tracked as usual. */
const beforeSend: BeforeSend = (event) => {
  try {
    if (window.localStorage.getItem(ANALYTICS_OPT_OUT_KEY) === "1") return null;
  } catch {
    // localStorage can be blocked; fall through and count the visit.
  }
  if (new URL(event.url, window.location.origin).pathname.startsWith("/exclude-me")) return null;
  return event;
};

export function AnalyticsTracker() {
  return <Analytics beforeSend={beforeSend} />;
}
