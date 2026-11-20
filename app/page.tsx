import { HeroLab as Hero } from "@/components/home/HeroLab";
import { StarTrail } from "@/components/home/StarTrail";
import { WorkList } from "@/components/home/WorkList";
import { AboutSection } from "@/components/sections/AboutSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/** The home page: the painted hero (its stars fall on scroll and follow a path into the work heading),
 *  the work as a list with a preview that follows the pointer, About, and the closing contact block
 *  (which is part of the footer, as on every other page). */
export default function Home() {
  return (
    <>
      <main id="main" className="flex flex-col">
        <Hero />
        <StarTrail />
        <WorkList />
        <AboutSection />
      </main>
      <SiteFooter />
    </>
  );
}
