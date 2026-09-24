import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { PrivacyPage } from "@/components/meta/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for GrokBot Society — local-first, no tracking, no data collection.",
};

export default function PrivacyPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <PrivacyPage />
      </main>
      <Footer />
    </div>
  );
}