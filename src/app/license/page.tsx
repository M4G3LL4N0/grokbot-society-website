import { Metadata } from "next";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { LicensePage } from "@/components/meta/LicensePage";

export const metadata: Metadata = {
  title: "License",
  description: "Apache License 2.0 — GrokBot Society is licensed under the Apache License, Version 2.0.",
};

export default function LicensePageRoute() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <LicensePage />
      </main>
      <Footer />
    </div>
  );
}