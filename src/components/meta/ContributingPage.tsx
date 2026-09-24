"use client";

import { useRef, useEffect, useState } from "react";
import { CheckCircle, Clock, Zap, Shield, Database, Code, Github, FileText, HelpCircle, Users, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

export function ContributingPage() {
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
          <div className="container-custom max-w-4xl" ref={containerRef}>
            <div
              className="text-center max-w-3xl mx-auto mb-12"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
            >
              <h1 className="text-display-lg font-display font-bold text-foreground mb-4">
                Contributing
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Thank you for contributing to GrokBot Society!
              </p>
            </div>

            {/* Quick Start */}
            <Section title="Quick Start" icon={Clock} delay={0}>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Fork the repository, create a branch, make changes following the invariants below, run verification, submit a PR.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <CodeBlock
                    title="Setup"
                    lines={[
                      "git clone https://github.com/M4G3LL4N0/grokbot-society.git",
                      "cd grokbot-society",
                      "pnpm install",
                    ]
                  }
                  />
                  <CodeBlock
                    title="Verify"
                    lines={[
                      "pnpm typecheck",
                      "pnpm test",
                    ]
                  }
                  />
                </div>
              </div>
            </Section>

            {/* Architectural Invariants */}
            <Section title="Architectural Invariants (Must Preserve)" icon={Shield} delay={100}>
              <p className="text-muted-foreground mb-6">
                These are non-negotiable. Any PR violating them will be rejected.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {INVARIANTS.map((inv, i) => (
                  <InvariantCard key={inv.title} invariant={inv} delay={i * 50} />
                ))}
              </div>
            </Section>

            {/* Code Style */}
            <Section title="Code Style" icon={Code} delay={200}>
              <div className="space-y-4">
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                  <li><strong>TypeScript strict mode</strong> — <code>strict: true</code>, <code>noUncheckedIndexedAccess: true</code></li>
                  <li><strong>No <code>any</code></strong> — use proper types</li>
                  <li><strong>Immutable by default</strong> — prefer <code>readonly</code>, <code>const</code>, pure functions</li>
                  <li><strong>Explicit over implicit</strong> — no magic, no hidden side effects</li>
                  <li><strong>Error types over strings</strong> — domain errors extend <code>SocietyError</code> with codes</li>
                  <li><strong>2 spaces, trailing commas, semicolons</strong> — consistent with existing code</li>
                </ul>
              </div>
            </Section>

            {/* Test Requirements */}
            <Section title="Test Requirements" icon={CheckCircle} delay={300}>
              <div className="space-y-4">
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                  <li><strong>All tests must pass:</strong> <code>pnpm test</code></li>
                  <li><strong>Typecheck must pass:</strong> <code>pnpm typecheck</code></li>
                  <li><strong>New features need tests:</strong> Add to <code>tests/</code> following existing patterns</li>
                  <li><strong>Deterministic tests:</strong> Use <code>{"SimulatedClock"}</code> and <code>{"rng: () => 1"}</code> (serendipity off)</li>
                </ul>
                {(() => {
                  const testStructureLines = [
                    "tests/",
                    "  helpers.ts           # makeKernel, sceneMessages, selectedIds",
                    "  01.mass-zero-cost.test.ts",
                    "  02.idle-dormant.test.ts",
                    "  03.scenes.test.ts",
                    "  04.identity-switching.test.ts",
                    "  05.guards.test.ts",
                    "  06.architectural-block.test.ts",
                    "  07.end-to-end.test.ts",
                    "  08.society-mvp.test.ts",
                  ];
                  return <CodeBlock title="Test Structure" lines={testStructureLines} />;
                })()}
              </div>
            </Section>

            {/* Adding Features */}
            <Section title="Adding a New Feature" icon={Zap} delay={100}>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li><strong>Identify the domain</strong> (people, roles, relationships, circles, events, memory, runtime, intelligence, providers, budget, cache, telemetry, sessions, seed)</li>
                <li><strong>Add types</strong> in <code>{"src/god/types.ts"}</code> or domain-specific types file</li>
                <li><strong>Implement service</strong> in <code>{"src/<domain>/"}</code></li>
                <li><strong>Wire in GodKernel</strong> if needed</li>
                <li><strong>Add tests</strong> in <code>tests/</code></li>
                <li><strong>Update docs</strong> in <code>docs/</code></li>
                <li><strong>Run verification:</strong> <code>pnpm typecheck && pnpm test && pnpm dev</code></li>
              </ol>
            </Section>

            {/* Dependency Policy */}
            <Section title="Dependency Policy" icon={Database} delay={200}>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li><strong>Minimize dependencies</strong> — prefer stdlib or tiny deps</li>
                <li><strong>No runtime deps</strong> — all deps are <code>devDependencies</code></li>
                <li><strong>Pin major versions</strong> in <code>package.json</code></li>
                <li><strong>Audit before adding</strong> — <code>pnpm audit</code> on new deps</li>
              </ul>
            </Section>

            {/* Documentation */}
            <Section title="Documentation" icon={FileText} delay={300}>
              <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                <li>Update <code>README.md</code> for user-facing changes</li>
                <li>Update <code>docs/</code> for architectural changes</li>
                <li>Update <code>docs/ROADMAP.md</code> for new features</li>
                <li>Keep <code>ARCHITECTURE.md</code> current</li>
              </ul>
            </Section>

            {/* Release Process */}
            <Section title="Release Process (Maintainers Only)" icon={Github} delay={400}>
              <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                <li>Update version in <code>package.json</code></li>
                <li>Update <code>CHANGELOG.md</code> (if exists)</li>
                <li>Tag release: <code>git tag v0.x.y</code></li>
                <li>Publish to npm (if applicable)</li>
              </ol>
            </Section>

            {/* Questions */}
            <Section title="Questions?" icon={HelpCircle} delay={500}>
              <p className="text-muted-foreground">
                Open an issue or start a discussion. We are happy to help.
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
    <section
      className="mb-16"
      style={{ opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease-out", transitionDelay: `${delay}ms` }}
    >
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

function CodeBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="px-4 py-2 border-b border-border/50 flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <pre className="p-4 overflow-x-auto"><code className="font-mono text-sm text-foreground">{lines.join("\n")}</code></pre>
    </div>
  );
}

function InvariantCard({ invariant, delay }: { invariant: typeof INVARIANTS[0]; delay: number }) {
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
          <invariant.icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{invariant.title}</h4>
          <p className="text-sm text-muted-foreground">{invariant.desc}</p>
        </div>
      </div>
    </div>
  );
}

const INVARIANTS = [
  { title: "No Provider Bypass", desc: "All model calls go through IntelligenceGateway. Direct provider calls throw ProviderCallOutsideGatewayError.", icon: Shield },
  { title: "One Call Per Event", desc: "maxCallsPerEvent = 1 enforced by BudgetGovernor.", icon: Zap },
  { title: "Zero Background Inference", desc: "backgroundModelCalls = 0 by default. Scheduled work = $0.", icon: Database },
  { title: "No Person = Agent", desc: "Persons are durable state. Actors are ephemeral per-scene. Roles create zero agents.", icon: Users },
  { title: "No Group-Call Fan-Out", desc: "Hard max 3 speakers per scene (hardMaxSpeakers = 3).", icon: Users },
  { title: "No Unbounded Context", desc: "ContextCompiler enforces section/token caps. context_explosion breaker is hard.", icon: Database },
  { title: "No Uncontrolled Retries", desc: "maxRetries = 0, recursionDepth = 0. Fail closed, deterministic fallback.", icon: Shield },
  { title: "Provider-Neutral Identity", desc: "Switching routes never touches Person state.", icon: ArrowRight },
];