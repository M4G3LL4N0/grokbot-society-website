import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ContributingPage } from "@/components/meta/ContributingPage";

export const metadata: Metadata = {
  title: "Contributing",
  description: "How to contribute to GrokBot Society — development workflow, architectural invariants, and test requirements.",
};

export default function ContributingPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <ContributingPage />
      </main>
      <Footer />
    </div>
  );
}