import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { CodeOfConductPage } from "@/components/meta/CodeOfConductPage";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "Code of Conduct for GrokBot Society contributors and community members.",
};

export default function CodeOfConductPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <CodeOfConductPage />
      </main>
      <Footer />
    </div>
  );
}