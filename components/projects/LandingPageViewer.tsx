"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useEffect, useRef } from "react";

const FILE = "afterlife/landing page.png";
const WIDTH = 1920;
const HEIGHT = 7728;

/** The landing page as a preview of its first screen. Clicking it opens the whole page full screen,
 *  where it scrolls on its own. Esc, the close button, or a click on the dark edge closes it. Built
 *  on the native <dialog>, so focus is held inside while it is open and returns to the preview. */
export function LandingPageViewer({ alt, className = "" }: { alt: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  // The page behind must not scroll while the full-screen view is open.
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

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open the AfterLife landing page full screen"
        className={`group relative block w-full cursor-zoom-in overflow-hidden border border-line bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
      >
        <div className="relative aspect-video w-full">
          <Image
            src={pictureSrc(FILE)}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 960px) 100vw, 960px"
          />
        </div>
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-black/45">
          <span className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink shadow-md transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
            Open the landing page
          </span>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label="AfterLife landing page"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-black/90 p-0 backdrop:bg-black/90"
      >
        <div className="h-full overflow-y-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-6 md:top-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="mx-auto w-full max-w-[72rem]">
            <Image
              src={pictureSrc(FILE)}
              alt={alt}
              width={WIDTH}
              height={HEIGHT}
              className="h-auto w-full"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
