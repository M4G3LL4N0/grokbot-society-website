import type { Metadata } from "next";
import { DeveloperQuickstart } from "@/components/society/DeveloperQuickstart";
import { SectionPage } from "@/components/ui/SectionPage";

export const metadata: Metadata = {
  title: "Developers",
  description: "Install GrokBot Society, run the zero-cost demo, and use the operator CLI.",
  alternates: { canonical: "/developers" },
  openGraph: { url: "/developers" },
};

export default function DevelopersPage() {
  return (
    <SectionPage>
      <DeveloperQuickstart />
    </SectionPage>
  );
}
