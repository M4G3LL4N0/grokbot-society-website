import type { Metadata } from "next";
import { SocietyOverview } from "@/components/society/SocietyOverview";
import { SectionPage } from "@/components/ui/SectionPage";

export const metadata: Metadata = {
  title: "Society",
  description: "See how durable people become relationships, circles, and an evolving synthetic society.",
  alternates: { canonical: "/society" },
  openGraph: { url: "/society" },
};

export default function SocietyPage() {
  return (
    <SectionPage>
      <SocietyOverview />
    </SectionPage>
  );
}
