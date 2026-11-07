import { HalftoneArrowBox } from "@/components/projects/HalftoneArrowBox";
import Link from "next/link";

/** A "back to work" button at the top of a project page. At rest it's just the site's arrow box; on
 *  hover or keyboard focus it slides out its label. Zero height, so it never pushes the page content
 *  around, and it scrolls away with the page instead of hovering over the text. The header's Work
 *  link is always there for getting back. */
export function BackLink() {
  return (
    <div className="relative top-[84px] z-40 h-0">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <Link
          href="/#work"
          aria-label="Back to Work"
          className="group inline-flex items-stretch bg-surface shadow-[0_8px_22px_-12px_rgba(26,25,22,0.45)] transition-colors duration-300 hover:bg-ink hover:text-surface focus-visible:bg-ink focus-visible:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <HalftoneArrowBox dir="left" className="!h-11 !w-11" />
          <span
            aria-hidden
            className="max-w-0 self-center overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:mr-5 group-hover:max-w-[5rem] group-hover:opacity-100 group-focus-visible:mr-5 group-focus-visible:max-w-[5rem] group-focus-visible:opacity-100"
          >
            Work
          </span>
        </Link>
      </div>
    </div>
  );
}
