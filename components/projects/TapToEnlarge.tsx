"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useEffect, useRef } from "react";

/** On phones a product screen is shown at the page's width, so its small text cannot be read. This is
 *  a button laid over the screen that opens it full screen at a readable size, where it can be panned
 *  and pinched. Wide screens do not need it. Built on the native <dialog>, so Esc and the close
 *  button work and focus returns to the screen afterwards. */
const TONES = {
  giuson: {
    focus: "focus-visible:outline-gj-blue",
    badge: "bg-gj-navy/85",
    dialog: "bg-gj-navy",
    close: "text-gj-navy",
  },
  ink: {
    focus: "focus-visible:outline-accent",
    badge: "bg-ink/85",
    dialog: "bg-ink",
    close: "text-ink",
  },
} as const;

export function TapToEnlarge({
  file,
  alt,
  width,
  height,
  tone = "ink",
  openWidth = 780,
}: {
  file: string;
  alt: string;
  width: number;
  height: number;
  tone?: keyof typeof TONES;
  /** How wide the picture is shown when opened, in px. Wider for pictures with small text. */
  openWidth?: number;
}) {
  const t = TONES[tone];
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const restore = () => {
      document.body.style.overflow = "";
    };
    d.addEventListener("close", restore);
    return () => {
      d.removeEventListener("close", restore);
      restore();
    };
  }, []);

  const open = () => {
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={open}
        aria-label={`Open full screen: ${alt}`}
        className={`absolute inset-0 block h-full w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] ${t.focus}`}
      >
        <span
          aria-hidden
          className={`absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full text-white ${t.badge}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2h4v4M6 14H2v-4M14 2l-4.5 4.5M2 14l4.5-4.5" />
          </svg>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={alt}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        className={`m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden border-0 p-0 backdrop:bg-black/80 ${t.dialog}`}
      >
        {/* Larger than the phone, so it scrolls in both directions; the browser's own pinch also works. */}
        <div className="h-full w-full overflow-auto overscroll-contain [touch-action:pan-x_pan-y_pinch-zoom]">
          <div className="p-3 pt-16">
            <div style={{ width: `max(${openWidth}px, 100%)` }} className="overflow-hidden rounded-[4px] bg-white">
              <Image src={pictureSrc(file)} alt={alt} width={width} height={height} sizes={`${Math.max(openWidth, 1400)}px`} className="block h-auto w-full" />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className={`fixed right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${t.close}`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </dialog>
    </div>
  );
}
