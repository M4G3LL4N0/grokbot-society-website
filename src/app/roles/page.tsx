import type { Metadata } from "next";
import { RolesShowcase } from "@/components/society/RolesShowcase";
import { SectionPage } from "@/components/ui/SectionPage";

export const metadata: Metadata = {
  title: "Roles",
  description: "Browse reusable, zero-inference roles that compose into ephemeral actors.",
  alternates: { canonical: "/roles" },
  openGraph: { url: "/roles" },
};

export default function RolesPage() {
  return (
    <SectionPage>
      <RolesShowcase />
    </SectionPage>
  );
}
