"use client";

import { useRef, useEffect, useState } from "react";
import { Shield, Heart, Users, Globe, FileText, Mail } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export function CodeOfConductPage() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <div className="section">
          <div className="container-custom max-w-3xl" ref={containerRef}>
            <div
              className="text-center mb-12"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary" style={{ backgroundColor: "hsl(var(--primary)/10)" }}>
                  <Heart className="h-7 w-7" />
                </div>
                <h1 className="text-display-lg font-display font-bold text-foreground">Code of Conduct</h1>
              </div>
              <p className="text-body-lg text-muted-foreground">
                Our commitment to a welcoming, inclusive, and harassment-free experience for everyone.
              </p>
            </div>

            {/* Our Pledge */}
            <Section title="Our Pledge" icon={Heart} delay={0}>
              <p className="text-muted-foreground mb-4">
                We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
              </p>
            </Section>

            {/* Our Standards */}
            <Section title="Our Standards" icon={Users} delay={100}>
              <h3 className="font-semibold text-foreground mb-3">Positive Behavior</h3>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground mb-8">
                <li><strong>Be respectful</strong> — Value different viewpoints and experiences</li>
                <li><strong>Be constructive</strong> — Give actionable feedback, not personal criticism</li>
                <li><strong>Be inclusive</strong> — Welcome newcomers, help them learn</li>
                <li><strong>Be collaborative</strong> — Share knowledge, credit others&apos; work</li>
                <li><strong>Be honest</strong> — Admit mistakes, ask for help when needed</li>
              </ul>

              <h3 className="font-semibold text-foreground mb-3">Unacceptable Behavior</h3>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>Harassment, insults, or discriminatory language</li>
                <li>Trolling, baiting, or deliberate disruption</li>
                <li>Publishing private information without consent</li>
                <li>Sexualized language or imagery</li>
                <li>Advocating for harmful or illegal actions</li>
                <li>Spam or off-topic promotion</li>
              </ul>
            </Section>

            {/* Scope */}
            <Section title="Scope" icon={Globe} delay={200}>
              <p className="text-muted-foreground mb-4">
                This Code of Conduct applies in all project spaces:
              </p>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>GitHub (issues, PRs, discussions, wiki)</li>
                <li>Project Discord/Slack (if any)</li>
                <li>Project events (virtual or in-person)</li>
                <li>Any space where you represent the project</li>
              </ul>
            </Section>

            {/* Enforcement */}
            <Section title="Enforcement" icon={Shield} delay={300}>
              <h3 className="font-semibold text-foreground mb-3">Reporting</h3>
              <p className="text-muted-foreground mb-4">
                For non-sensitive conduct concerns, open an issue in the project repository. Do not include personal or sensitive information in a public report.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Keep reports factual and limited to what is necessary. Include what happened, who was involved, when/where, and relevant context.
              </p>

              <h3 className="font-semibold text-foreground mb-3">Consequences</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Level</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Behavior</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Consequence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-mono text-sm text-foreground">1</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Minor (off-topic, tone)</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Private warning, clarification of standards</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-mono text-sm text-foreground">2</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Moderate (disrespect, repeated minor)</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Temporary ban from project spaces (7 days)</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-mono text-sm text-foreground">3</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Serious (harassment, discrimination)</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Permanent ban from project spaces</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-mono text-sm text-foreground">4</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Severe (threats, doxxing, illegal)</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">Permanent ban + report to platform/authorities</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Maintainers enforce consistently. Decisions are final.
              </p>
            </Section>

            {/* Attribution */}
            <Section title="Attribution" icon={FileText} delay={400}>
              <p className="text-muted-foreground">
                This Code of Conduct is adapted from the <a href="https://www.contributor-covenant.org/version/2/1/code_of_conduct.html" target="_blank" rel="noopener noreferrer" className="link">Contributor Covenant v2.1</a>.
              </p>
            </Section>

            {/* Contact */}
            <Section title="Contact" icon={Mail} delay={500}>
              <p className="text-muted-foreground">
                Non-sensitive conduct concerns can be reported through the project&apos;s GitHub issue tracker.
              </p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, icon: Icon, children, delay }: { title: string; icon: React.ElementType; children: React.ReactNode; delay: number }) {
  return (
    <section className="mb-12" style={{ opacity: 1, transform: "translateY(0)", transitionDelay: `${delay}ms` }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary" style={{ backgroundColor: "hsl(var(--primary)/10)" }}>
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="font-display font-semibold text-heading-lg text-foreground">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  );
}