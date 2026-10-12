import Link from "next/link";

/** A "Back to work" link that stays put as the page scrolls. It sits on a soft cream pill so it
 *  stays readable over images. Zero height, so it never pushes the page content around. */
export function BackLink() {
  return (
    <div className="sticky top-[84px] z-40 h-0">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <Link
          href="/work"
          className="inline-flex min-h-[36px] items-center gap-2 bg-surface/90 px-3 py-1.5 text-sm text-ink-muted backdrop-blur-sm transition-colors duration-300 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M12.5 4.5 6 10l6.5 5.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Work
        </Link>
      </div>
    </div>
  );
}
