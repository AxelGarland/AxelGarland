"use client";

import { useEffect } from "react";

/** When the home page opens at a work card (`/#work-giuson`, from a case study's Back link), the card's
 *  picture gets one slow red ring so you can see where you left off. Nothing happens with reduced
 *  motion, or without a hash. */
export function ReturnToCard() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.location.hash.slice(1);
    if (!id.startsWith("work-")) return;
    const frame = document.getElementById(id)?.querySelector<HTMLElement>("[data-card-frame]");
    if (!frame) return;
    // Wait for the scroll to the card to settle, then ring it once.
    const start = window.setTimeout(() => frame.classList.add("card-returning"), 450);
    const end = window.setTimeout(() => frame.classList.remove("card-returning"), 1600);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
      frame.classList.remove("card-returning");
    };
  }, []);
  return null;
}
