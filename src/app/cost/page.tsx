import type { Metadata } from "next";
import { CostArchitecture } from "@/components/cost/CostArchitecture";
import { SectionPage } from "@/components/ui/SectionPage";

export const metadata: Metadata = {
  title: "Cost Model",
  description: "Explore why population stays cheap while only meaningful interactions invoke intelligence.",
  alternates: { canonical: "/cost" },
  openGraph: { url: "/cost" },
};

export default function CostPage() {
  return (
    <SectionPage>
      <CostArchitecture />
    </SectionPage>
  );
}
