import { GrainOverlay } from "@/components/GrainOverlay";
import { HeroSection } from "@/components/sections/HeroSection";
import { IllustrationWork } from "@/components/sections/IllustrationWork";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <main id="main" className="flex flex-col">
        <HeroSection />
        <div id="work" className="pb-20 pt-16 md:pt-20">
          <IllustrationWork />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
