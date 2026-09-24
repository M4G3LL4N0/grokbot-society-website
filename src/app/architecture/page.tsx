import type { Metadata } from "next";
import { GodKernelVisual } from "@/components/architecture/GodKernelVisual";
import { ProviderIndependence } from "@/components/architecture/ProviderIndependence";
import { SectionPage } from "@/components/ui/SectionPage";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Explore the deterministic God Kernel pipeline and provider-neutral intelligence boundary.",
  alternates: { canonical: "/architecture" },
  openGraph: { url: "/architecture" },
};

export default function ArchitecturePage() {
  return (
    <SectionPage>
      <GodKernelVisual />
      <ProviderIndependence />
    </SectionPage>
  );
}
