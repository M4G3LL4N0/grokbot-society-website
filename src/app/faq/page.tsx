import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { FAQPage } from "@/components/faq/FAQPage";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about GrokBot Society — architecture, costs, providers, and common misconceptions.",
};

export default function FAQPageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <FAQPage />
      </main>
      <Footer />
    </div>
  );
}