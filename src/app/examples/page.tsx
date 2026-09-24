import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { ExamplesPage } from "@/components/examples/ExamplesPage";

export const metadata: Metadata = {
  title: "Examples",
  description: "Runnable examples for GrokBot Society — create people, assign roles, build circles, run scenes, and more.",
};

export default function ExamplesPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <ExamplesPage />
      </main>
      <Footer />
    </div>
  );
}