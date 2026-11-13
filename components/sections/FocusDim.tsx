"use client";

import { useEffect, useRef } from "react";

/** Keyboard focus dims the other work cards, the way hover does for a mouse. The stage gets a flag
 *  while a card has keyboard focus, and loses it as soon as the mouse moves or the page is scrolled
 *  by wheel or touch, so a card focused earlier never leaves the rest of the grid dimmed. */
export function FocusDim() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stage = marker.current?.closest<HTMLElement>(".work-stage");
    if (!stage) return;
    const on = (e: FocusEvent) => {
      if ((e.target as HTMLElement).matches?.(":focus-visible")) stage.setAttribute("data-kbd", "");
    };
    const off = () => stage.removeAttribute("data-kbd");
    stage.addEventListener("focusin", on);
    stage.addEventListener("focusout", off);
    window.addEventListener("pointermove", off, { passive: true });
    window.addEventListener("wheel", off, { passive: true });
    window.addEventListener("touchstart", off, { passive: true });
    return () => {
      stage.removeEventListener("focusin", on);
      stage.removeEventListener("focusout", off);
      window.removeEventListener("pointermove", off);
      window.removeEventListener("wheel", off);
      window.removeEventListener("touchstart", off);
    };
  }, []);

  return <span ref={marker} hidden />;
}
