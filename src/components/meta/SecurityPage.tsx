"use client";

import { useRef, useEffect, useState } from "react";
import { Shield, Lock, Database, AlertTriangle, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export function SecurityPage() {
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
                <h1 className="text-display-lg font-display font-bold text-foreground">Security Policy</h1>
              </div>
              <p className="text-body-lg text-muted-foreground">
                Responsible disclosure, threat model, credentials management, and incident response for GrokBot Society.
              </p>
            </div>

            {/* Supported Versions */}
            <Section title="Supported Versions" icon={Shield} delay={0}>
              <div className="rounded-xl border bg-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Version</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Supported</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="px-6 py-4 font-mono text-sm text-foreground">0.1.x</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                          <CheckCircle className="h-3.5 w-3.5" /> Yes
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Reporting a Vulnerability */}
            <Section title="Reporting a Vulnerability" icon={AlertTriangle} delay={100}>
              <div className="rounded-xl border bg-destructive/5 border-destructive/20 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Do not open public issues for security vulnerabilities.</h3>
                    <p className="text-muted-foreground mb-4">
                      Use GitHub private vulnerability reporting: <a href="https://github.com/M4G3LL4N0/grokbot-society/security/advisories/new" target="_blank" rel="noopener noreferrer" className="link">Report a vulnerability</a>.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Include: description, steps to reproduce, potential impact, and a suggested fix if available. Triage timing is best effort.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Security Model */}
            <Section title="Security Model" icon={Shield} delay={200}>
              <p className="text-muted-foreground mb-6">
                GrokBot Society is a <strong className="text-foreground">local-first, single-process runtime</strong> with no network server by default.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <SecurityCard
                  title="Provider Credentials"
                  icon={Lock}
                  description="API keys read ONLY from environment variables at provider initialization. Never stored in SQLite, memory, cache, telemetry, or event payloads. .env files excluded via .gitignore."
                />
                <SecurityCard
                  title="Memory Isolation"
                  icon={Database}
                  description="Privacy scopes enforced at read time (private / person_user_shared / circle / public). No cross-person memory leaks — retrieveForScene filters by viewer's access."
                />
                <SecurityCard
                  title="Architectural Guardrails"
                  icon={Shield}
                  description="No provider bypass (assertGatewalledCall), fail-closed budget, 9 circuit breakers, no recursion/retries (recursionDepth=0, maxRetries=0, backgroundModelCalls=0)."
                />
                <SecurityCard
                  title="Data at Rest"
                  icon={Database}
                  description="SQLite database contains social graph only. No credentials in database. File permissions should be 600 in production."
                />
              </div>
            </Section>

            {/* Threat Mitigations */}
            <Section title="Threat Mitigations" icon={CheckCircle} delay={100}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Threat</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {THREATS.map((t) => (
                      <tr key={t.threat} className="hover:bg-muted/30">
                        <td className="px-6 py-4 font-mono text-sm text-foreground">{t.threat}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{t.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* What This Project Does NOT Provide */}
            <Section title="What This Project Does NOT Provide" icon={AlertCircle} delay={200}>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>❌ Network server by default</li>
                <li>❌ Authentication/authorization framework (single-user local tool)</li>
                <li>❌ Encryption at rest (SQLite is plaintext; rely on filesystem perms)</li>
                <li>❌ Audit logging beyond telemetry/events (add if needed)</li>
                <li>❌ GDPR/CCPA compliance tooling (build on top if required)</li>
                <li>❌ Multi-tenancy / RBAC</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                <strong className="text-foreground">If you need these, wrap the kernel in a service with appropriate guards.</strong>
              </p>
            </Section>

            {/* Deployment Checklist */}
            <Section title="Secure Deployment Checklist" icon={Shield} delay={300}>
              <ul className="space-y-2">
                {CHECKLIST.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </label>
                ))}
              </ul>
            </Section>

            {/* Incident Response */}
            <Section title="Incident Response" icon={AlertTriangle} delay={200}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Symptom</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Likely Cause</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {INCIDENTS.map((inc) => (
                      <tr key={inc.symptom} className="hover:bg-muted/30">
                        <td className="px-6 py-4 font-mono text-sm text-foreground">{inc.symptom}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{inc.cause}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{inc.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Contact */}
            <Section title="Contact" icon={Mail} delay={400}>
              <div className="rounded-xl border bg-card p-6 text-center">
                <h3 className="font-semibold text-foreground mb-2">Security Issues</h3>
                <p className="text-sm text-muted-foreground mb-4"><a href="https://github.com/M4G3LL4N0/grokbot-society/security/advisories/new" target="_blank" rel="noopener noreferrer" className="link">Report privately through GitHub</a></p>
                <p className="text-sm text-muted-foreground">General Issues: GitHub Issues</p>
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

function SecurityCard({ title, icon: Icon, description }: { title: string; icon: React.ElementType; description: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-elevation-2">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

const THREATS = [
  { threat: "Runaway LLM spend", mitigation: "Budget ceilings (per-event, hourly, daily), kill switch, circuit breakers" },
  { threat: "Provider credential leak", mitigation: "Env-only, never in DB/logs, .gitignore" },
  { threat: "Memory privacy violation", mitigation: "Scope enforcement at read time, no omniscient hive mind" },
  { threat: "Provider bypass", mitigation: "assertGatewalledCall() in every provider, architectural test" },
  { threat: "Unbounded context", mitigation: "ContextCompiler caps + context_explosion hard breaker" },
  { threat: "Recursion/retries", mitigation: "recursionDepth = 0, maxRetries = 0" },
  { threat: "Background inference", mitigation: "backgroundModelCalls = 0 by default" },
];

const CHECKLIST = [
  "Set database file permissions to 600",
  "Store API keys in environment / secret manager (not .env in repo)",
  "Verify modelTier matches intended spend ceiling",
  "Set hourlyBudget / dailyBudget to enforceable limits",
  "Ensure backgroundModelCalls = 0 unless explicitly needed",
  "Monitor usage().blockedCalls and usage().trips in production",
  "Keep .env out of version control (.gitignore includes it)",
  "No *.db files in repo (.gitignore includes them)",
];

const INCIDENTS = [
  { symptom: "blockedCalls spike", cause: "Budget ceiling hit", action: "Check usage() for which ceiling; raise deliberately or reduce volume" },
  { symptom: "trips non-empty", cause: "Circuit breaker tripped", action: "Check breaker.name; context_explosion/premium_model_escalation require manual breakers.reset()" },
  { symptom: "providerEscalations > 0", cause: "Route flipped to expensive", action: "Audit ModelRouter routes; pin to cheaper tier if unintended" },
  { symptom: "estimatedSpend > budget", cause: "Real provider calls accumulating", action: "Check spendPerProvider; disable expensive routes or raise budget" },
];