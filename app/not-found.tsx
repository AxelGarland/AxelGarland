import { DesignButton } from "@/components/home/DesignButton";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata = { title: "Page not found · Axel Garland" };

export default function NotFound() {
  return (
    <>
      <main id="main" className="bg-surface">
        <div className="mx-auto flex min-h-[70svh] max-w-content flex-col justify-center px-6 pb-16 pt-32 sm:px-10 md:px-14 lg:px-16">
          <h1 className="mb-6 max-w-[14ch] type-title font-display text-ink">
            This page <em className="italic text-accent">doesn&rsquo;t exist.</em>
          </h1>
          <p className="mb-10 max-w-[44ch] text-lg leading-relaxed text-ink-muted">
            The link may be old, or the page may have moved.
          </p>
          <div>
            <DesignButton href="/#work" label="See my work" />
          </div>
        </div>
      </main>
      <SiteFooter closing={false} />
    </>
  );
}
