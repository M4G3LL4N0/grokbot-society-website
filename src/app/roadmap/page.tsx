import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { RoadmapPage } from "@/components/roadmap/RoadmapPage";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "GrokBot Society roadmap — DONE, NEXT, and EXPERIMENTAL. Clear separation of shipped vs planned.",
};

export default function RoadmapPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <RoadmapPage />
      </main>
      <Footer />
    </div>
  );
}