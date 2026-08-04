import { GrainOverlay } from "@/components/GrainOverlay";
import { HeroSection } from "@/components/sections/HeroSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main
        id="main"
        className="flex min-h-[100dvh] min-h-[100svh] flex-col bg-surface"
      >
        <HeroSection />
        <div className="px-6 pb-16 sm:px-10 md:px-14 lg:px-16">
          <div className="mx-auto flex max-w-content items-center gap-6">
            <Link
              href="/work"
              className="inline-block rounded border border-accent px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-500 hover:bg-accent-soft"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="text-sm text-ink-muted underline underline-offset-4 transition-colors duration-500 hover:text-ink"
            >
              Contact
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
