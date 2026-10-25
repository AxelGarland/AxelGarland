import { GrainOverlay } from "@/components/GrainOverlay";
import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main id="main" className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <SelectedWork />
      </main>
      <SiteFooter />
    </>
  );
}
