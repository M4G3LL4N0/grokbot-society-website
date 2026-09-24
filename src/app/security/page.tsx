import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { SecurityPage } from "@/components/meta/SecurityPage";

export const metadata: Metadata = {
  title: "Security",
  description: "Security policy for GrokBot Society — responsible disclosure, threat model, credentials management, and incident response.",
};

export default function SecurityPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <SecurityPage />
      </main>
      <Footer />
    </div>
  );
}