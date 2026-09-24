import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { DocsPage } from "@/components/docs/DocsPage";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Complete documentation for GrokBot Society — concepts, architecture, API reference, and guides.",
};

export default function DocsPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <DocsPage />
      </main>
      <Footer />
    </div>
  );
}