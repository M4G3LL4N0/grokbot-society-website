"use client";

import { useRef, useEffect, useState } from "react";
import { CheckCircle, Shield, Zap, Database, Eye } from "lucide-react";

const VERIFICATION_STEPS = [
  {
    label: "pnpm install",
    description: "Install dependencies",
    command: "pnpm install",
  },
  {
    label: "TypeCheck",
    description: "Strict TypeScript, zero errors",
    command: "pnpm typecheck",
  },
  {
    label: "Tests",
    description: "42/42 tests passing",
    command: "pnpm test",
  },
  {
    label: "Dev Demo",
    description: "Live society on MockProvider ($0)",
    command: "pnpm dev",
  },
  {
    label: "CLI Smoke",
    description: "Start, chat, proactive, sessions, usage",
    command: "pnpm society start && pnpm society chat ...",
  },
];

const GUARANTEES = [
  { icon: Shield, title: "No Provider Bypass", desc: "assertGatewalledCall() in every provider" },
  { icon: Zap, title: "One Call Per Event", desc: "maxCallsPerEvent = 1 enforced by BudgetGovernor" },
  { icon: Database, title: "Zero Background Inference", desc: "backgroundModelCalls = 0 by default" },
  { icon: Eye, title: "Bounded Context", desc: "≤3 speakers, ≤12k tokens, circuit breaker" },
  { icon: CheckCircle, title: "Fail Closed", desc: "Kill switch, budget, availability all block" },
  { icon: CheckCircle, title: "Provider-Neutral Identity", desc: "Switch routes without touching Person" },
];

const QUICKSTART_COMMANDS = [
  { label: "Clone", command: "git clone https://github.com/M4G3LL4N0/grokbot-society.git" },
  { label: "Install", command: "cd grokbot-society && pnpm install" },
  { label: "Verify", command: "pnpm typecheck && pnpm test" },
  { label: "Run Demo", command: "pnpm dev" },
  { label: "Use CLI", command: "pnpm society start --db ./society.db" },
];

export function OpenSource() {
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
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="open-source"
      ref={containerRef}
      className="section relative overflow-hidden bg-muted/30"
      aria-labelledby="opensource-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="opensource-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            Open Source & Verifiable
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Every claim backed by code. Every guarantee tested. Run it yourself at $0.
          </p>
        </div>

        {/* Verification Pipeline */}
        <div
          className="mb-16"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            Verification Pipeline
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {VERIFICATION_STEPS.map((step, i) => (
              <VerificationStep key={step.label} step={step} index={i} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Architectural Guarantees */}
        <div
          className="mb-16"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            Architectural Guarantees (Tested)
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {GUARANTEES.map((g, i) => (
              <GuaranteeCard key={g.title} guarantee={g} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* Quickstart */}
        <div
          className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.6s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            60-Second Quickstart
          </h3>
          <div className="max-w-3xl mx-auto space-y-3">
            {QUICKSTART_COMMANDS.map((cmd) => (
              <div key={cmd.label} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50">
                <span className="flex-shrink-0 w-24 font-mono text-sm text-muted-foreground">{cmd.label}</span>
                <div className="flex-1 relative">
                  <code className="font-mono text-sm text-foreground bg-muted/50 px-3 py-2 rounded-lg block">{cmd.command}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* License & Disclaimer */}
        <div
          className="mt-12 rounded-2xl border bg-card p-8 text-center"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.8s" }}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-foreground mb-4">License & Independence</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Licensed under <strong className="text-foreground">Apache 2.0</strong> — permissive, business-friendly, patent grant included.
              </p>
              <p>
                <strong className="text-foreground">Independent project.</strong> GrokBot Society is not affiliated with, endorsed by, or connected to xAI, Grok, Cursor, or any other company.
              </p>
              <p>
                &quot;GrokBot&quot; in this project refers to an optional internal inference route name only.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <span className="badge-primary">Apache 2.0</span>
              <span className="badge-secondary">Independent</span>
              <span className="badge-accent">Provider-Neutral</span>
              <span className="badge-success">Zero-Cost Default</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerificationStep({ step, index, delay }: { step: typeof VERIFICATION_STEPS[0]; index: number; delay: number }) {
  return (
    <div
      className="relative rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-elevation-2"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
          {index + 1}
        </span>
        <div>
          <h4 className="font-semibold text-foreground">{step.label}</h4>
          <p className="text-xs text-muted-foreground">{step.description}</p>
        </div>
      </div>
      <div className="mt-3">
        <code className="font-mono text-sm text-foreground bg-muted px-3 py-2 rounded-lg block">{step.command}</code>
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
        <CheckCircle className="h-4 w-4 text-success" />
      </div>
    </div>
  );
}

function GuaranteeCard({ guarantee, delay }: { guarantee: typeof GUARANTEES[0]; delay: number }) {
  return (
    <div
      className="rounded-xl border bg-card p-5 transition-all duration-300 hover:shadow-elevation-2"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <guarantee.icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{guarantee.title}</h4>
          <p className="text-sm text-muted-foreground">{guarantee.desc}</p>
        </div>
      </div>
    </div>
  );
}