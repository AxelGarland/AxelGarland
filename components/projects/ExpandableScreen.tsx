"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useEffect, useRef } from "react";

/** A screenshot preview that opens the whole screen, top to bottom, full screen. The preview shows
 *  only the top of the screen; the full-screen view is the long image, which scrolls on its own. Esc,
 *  the close button, or a click on the dark edge closes it. Built on the native <dialog>, so focus is
 *  held inside while it is open and returns to the preview afterwards. */
export function ExpandableScreen({
  file,
  large,
  alt,
  width,
  height,
  className = "",
  sizes,
}: {
  file: string;
  /** The long, full-length screenshot shown in the full-screen view. */
  large: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  // The page behind must not scroll while the expanded view is open.
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
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Open the full screen: ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden border border-line bg-white text-left shadow-[0_24px_50px_-34px_rgba(26,25,22,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
      >
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={pictureSrc(file)}
            alt=""
            fill
            className="object-cover object-top transition-transform duration-[900ms] ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
            sizes={sizes}
          />
        </div>
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-black/35">
          <span className="rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-ink shadow-md transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
            Open the full screen
          </span>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={alt}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-black/90 p-0 backdrop:bg-black/90"
      >
        <div className="h-full overflow-auto overscroll-contain" onClick={(e) => e.target === e.currentTarget && close()}>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:right-6 md:top-6"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="mx-auto w-[900px] md:w-full md:max-w-[64rem]">
            <Image
              src={pictureSrc(large)}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
