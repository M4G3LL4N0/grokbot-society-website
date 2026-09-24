"use client";

import { useRef, useEffect, useState } from "react";
import { Shield, Database, Lock, Eye, Server, Globe, CheckCircle, AlertTriangle, Users, ArrowRight, XCircle, Mail, Clock, BookOpen, Settings, FileText } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export function PrivacyPage() {
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
                  <Shield className="h-7 w-7" />
                </div>
                <h1 className="text-display-lg font-display font-bold text-foreground">Privacy Policy</h1>
              </div>
              <p className="text-body-lg text-muted-foreground">
                GrokBot Society is local-first. No tracking. No data collection. Your society, your data.
              </p>
            </div>

            {/* Core Principle */}
            <Section title="Core Principle" icon={Shield} delay={0}>
              <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center">
                <h3 className="font-display font-semibold text-heading-lg text-foreground mb-4">
                  Your Data Never Leaves Your Machine
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  GrokBot Society runs entirely on your machine. No telemetry sent to external servers. No analytics. No user tracking. No account creation required. The SQLite database lives on your disk.
                </p>
              </div>
            </Section>

            {/* What We Don't Collect */}
            <Section title="What We Don't Collect" icon={XCircle} delay={100}>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>No personal identification information (PII)</li>
                <li>No IP addresses or location data</li>
                <li>No usage analytics or telemetry sent externally</li>
                <li>No cookies or tracking pixels</li>
                <li>No third-party scripts or analytics</li>
                <li>No account creation or authentication</li>
                <li>No social media integration</li>
                <li>No crash reports sent externally</li>
              </ul>
            </Section>

            {/* What Stays Local */}
            <Section title="What Stays on Your Machine" icon={Database} delay={200}>
              <div className="grid md:grid-cols-2 gap-6">
                <LocalDataCard
                  title="Social Graph"
                  description="Persons, roles, relationships, circles, memberships"
                  icon={Users}
                />
                <LocalDataCard
                  title="Memories & Landmarks"
                  description="HOT/WARM/COLD memories, shared-history landmarks"
                  icon={Database}
                />
                <LocalDataCard
                  title="Relationships"
                  description="7-dimension bidirectional edges with inertia"
                  icon={Users}
                />
                <LocalDataCard
                  title="Events & Timeline"
                  description="Event-driven audit trail with stages and statuses"
                  icon={Clock}
                />
                <LocalDataCard
                  title="Sessions"
                  description="Long-session context (rolling window + participant cards)"
                  icon={BookOpen}
                />
                <LocalDataCard
                  title="Configuration"
                  description="Budget limits, provider routes, user preferences"
                  icon={Settings}
                />
              </div>
            </Section>

            {/* Provider Credentials */}
            <Section title="Provider Credentials" icon={Lock} delay={300}>
              <div className="rounded-xl border bg-destructive/5 border-destructive/20 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">API Keys Never Leave Your Environment</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      <li>API keys read ONLY from environment variables at provider initialization</li>
                      <li>Never stored in SQLite, memory, cache, telemetry, or event payloads</li>
                      <li>.env files excluded via .gitignore</li>
                      <li>Keys read only at provider initialization via process.env</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            {/* Model Interactions */}
            <Section title="Model Interactions" icon={Server} delay={400}>
              <p className="text-muted-foreground mb-4">
                 When using paid providers (opt-in only), inference requests go directly from your machine to the provider&apos;s API. GrokBot Society does not proxy, log, or inspect the content of these requests.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>Requests go directly: Your Machine → Provider API (OpenAI, Anthropic, xAI, etc.)</li>
                <li>No intermediary proxy or logging by GrokBot Society</li>
                <li>Provider&apos;s own privacy policy applies to the request content</li>
                <li>BudgetGovernor enforces local spend limits before any request</li>
              </ul>
            </Section>

            {/* No Network Server by Default */}
            <Section title="No Network Server by Default" icon={Globe} delay={500}>
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-start gap-4">
                  <Server className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Single-Process, Local-First</h3>
                    <p className="text-muted-foreground">
                      GrokBot Society runs as a single Node.js process on your machine. No HTTP server, no WebSocket server, no background services. The CLI and demo run in-process. Your data never traverses a network unless you explicitly configure a real provider.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Your Rights */}
            <Section title="Your Rights" icon={CheckCircle} delay={600}>
              <div className="grid md:grid-cols-3 gap-6">
                <RightCard
                  title="Full Control"
                  description="Delete the SQLite file anytime. Your society, your rules."
                  icon={Database}
                />
                <RightCard
                  title="No Lock-in"
                  description="Export your society as JSONL. Move to another tool if you want."
                  icon={ArrowRight}
                />
                <RightCard
                  title="Transparent"
                  description="Open source. Audit every line. No hidden behavior."
                  icon={Eye}
                />
              </div>
            </Section>

            {/* Children's Privacy */}
            <Section title="Children&apos;s Privacy" icon={Shield} delay={700}>
              <p className="text-muted-foreground">
                GrokBot Society is not directed at children under 13. We do not knowingly collect personal information from children. Since we collect no personal information at all, this is inherent.
              </p>
            </Section>

            {/* Changes to This Policy */}
            <Section title="Changes to This Policy" icon={FileText} delay={800}>
              <p className="text-muted-foreground mb-4">
                We may update this policy. Changes will be posted in the repository with version history. Continued use after changes constitutes acceptance.
              </p>
            </Section>

            {/* Contact */}
            <Section title="Contact" icon={Mail} delay={900}>
              <div className="rounded-xl border bg-card p-6 text-center">
                <h3 className="font-semibold text-foreground mb-2">Privacy Questions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Open a GitHub issue for policy questions. Do not submit personal data.
                </p>
                <p className="text-sm text-muted-foreground">GitHub Issues for public questions</p>
              </div>
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

function LocalDataCard({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
  return (
    <div className="rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-elevation-2">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function RightCard({ title, description, icon: Icon }: { title: string; description: string; icon: React.ElementType }) {
  return (
    <div className="rounded-xl border bg-card p-5 text-center transition-all duration-300 hover:shadow-elevation-2">
      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}