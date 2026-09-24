import { Hero } from "@/components/hero/Hero";
import { CoreDistinction } from "@/components/society/CoreDistinction";
import { SocietyOverview } from "@/components/society/SocietyOverview";
import { WhyArchitecture } from "@/components/society/WhyArchitecture";
import { RolesShowcase } from "@/components/society/RolesShowcase";
import { OneInferenceMultiple } from "@/components/society/OneInferenceMultiple";
import { GodKernelVisual } from "@/components/architecture/GodKernelVisual";
import { ProviderIndependence } from "@/components/architecture/ProviderIndependence";
import { CostArchitecture } from "@/components/cost/CostArchitecture";
import { OpenSource } from "@/components/society/OpenSource";
import { DeveloperQuickstart } from "@/components/society/DeveloperQuickstart";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <Hero />
        <CoreDistinction />
        <SocietyOverview />
        <WhyArchitecture />
        <RolesShowcase />
        <OneInferenceMultiple />
        <GodKernelVisual />
        <ProviderIndependence />
        <CostArchitecture />
        <OpenSource />
        <DeveloperQuickstart />
      </main>
      <Footer />
    </div>
  );
}