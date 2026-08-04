import { BottomCategoryStrip } from "@/components/sections/BottomCategoryStrip";
import { GrainOverlay } from "@/components/GrainOverlay";
import { HeroSection } from "@/components/sections/HeroSection";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main
        id="main"
        className="flex min-h-[100dvh] min-h-[100svh] flex-col bg-surface"
      >
        <HeroSection />
        <BottomCategoryStrip />
      </main>
      <SiteFooter />
    </>
  );
}
