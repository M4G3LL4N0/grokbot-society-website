"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BAD_PATTERNS = [
  {
    title: "20 People = 20 Permanent Agents",
    description: "Each person gets a continuously running agent process. Memory, CPU, and inference costs scale linearly with population.",
    metric: "Cost ∝ Population × Time",
  },
  {
    title: "Continuous Background Simulation",
    description: "Agents 'think' even when nobody's talking. Idle time burns inference budget on manufactured activity.",
    metric: "Idle = Expensive",
  },
  {
    title: "Unbounded Context Growth",
    description: "Every agent remembers everything forever. Context windows explode, token costs compound exponentially.",
    metric: "Context ∝ History²",
  },
  {
    title: "One Call Per Character Per Message",
    description: "A 3-person group chat = 3 separate model calls. No shared context, no efficiency, 3x the latency and cost.",
    metric: "Calls = Speakers × Messages",
  },
  {
    title: "Silent Retries on Failure",
    description: "Failed calls retry automatically. A flaky provider silently multiplies your bill while you sleep.",
    metric: "Retries = Hidden Cost",
  },
  {
    title: "Provider Lock-in",
    description: "Identity tied to model. Switching from GPT-4 to Claude means rebuilding every persona from scratch.",
    metric: "Identity = Model",
  },
];

const GOOD_PATTERNS = [
  {
    title: "20 People = Persistent State",
    description: "Persons are database rows — biography, relationships, roles. Zero inference to exist. Only selected speakers activate.",
    metric: "Cost ∝ Active Interactions",
  },
  {
    title: "Zero Inference at Rest",
    description: "No background loops. No manufactured serendipity. In the 5,000-person core profile, 4,985 people stay dormant at $0.",
    metric: "Idle = $0",
  },
  {
    title: "Bounded Context (≤12k tokens)",
    description: "Only selected speakers (≤3) enter context. ≤5 memories + ≤4 relationships per speaker. Circuit breaker hard-trips on overflow.",
    metric: "Context = Constant",
  },
  {
    title: "One Call Per Scene (Max 3 Speakers)",
    description: "A group chat is ONE structured generation returning multiple messages. 3 speakers, 1 call, $0 on mock.",
    metric: "Calls = 1 per Scene",
  },
  {
    title: "Fail Closed, No Retries",
    description: "maxRetries = 0, recursionDepth = 0. Budget refusal → deterministic fallback. Every blocked call is counted and auditable.",
    metric: "Blocked = Audited",
  },
  {
    title: "Provider-Neutral Identity",
    description: "Switch mock → nano → standard → deep by changing routes. Person identity, relationships, memories survive unchanged.",
    metric: "Identity ≠ Model",
  },
];

export function WhyArchitecture() {
  const [view, setView] = useState<"bad" | "good">("bad");
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
      id="why-architecture"
      ref={containerRef}
      className="section relative overflow-hidden bg-muted/30"
      aria-labelledby="why-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="why-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            Why This Architecture?
          </h2>
          <p className="text-body-lg text-muted-foreground">
            The industry builds agent swarms. We built a society kernel. The difference is everything.
          </p>
        </div>

        {/* Toggle */}
        <div
          className="flex items-center justify-center gap-6 mb-12"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
        >
          <button
            onClick={() => setView("bad")}
            className={cn(
              "px-6 py-3 rounded-xl font-medium transition-all duration-300",
              view === "bad"
                ? "bg-destructive text-destructive-foreground shadow-glow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            ❌ The Old Way
          </button>
          <span className="text-muted-foreground text-sm">vs</span>
          <button
            onClick={() => setView("good")}
            className={cn(
              "px-6 py-3 rounded-xl font-medium transition-all duration-300",
              view === "good"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            ✅ The Society Way
          </button>
        </div>

        {/* Cards Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          {(view === "bad" ? BAD_PATTERNS : GOOD_PATTERNS).map((pattern, i) => (
            <article
              key={pattern.title}
              className={cn(
                "rounded-2xl border p-6 transition-all duration-500 hover:shadow-elevation-3",
                view === "bad"
                  ? "border-destructive/20 bg-destructive/5 hover:border-destructive/40"
                  : "border-primary/20 bg-primary/5 hover:border-primary/40 hover:shadow-glow"
              )}
              style={{
                animationDelay: `${i * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.6s ease-out",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: view === "bad" ? "hsl(var(--destructive)/10)" : "hsl(var(--primary)/10)",
                  }}
                  aria-hidden="true"
                >
                  {view === "bad" ? "⚠" : "✓"}
                </div>
                <h3 className="font-semibold text-heading-sm text-foreground">{pattern.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {pattern.description}
              </p>
              <div className="pt-4 border-t border-border/50">
                <span className="text-xs font-mono font-medium text-muted-foreground">
                  {pattern.metric}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Summary */}
        <div
          className="mt-16 rounded-2xl border p-8 bg-gradient-to-r from-primary/5 to-accent/5"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.6s" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-display font-semibold text-heading-lg text-foreground mb-4">
              The Difference in One Equation
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
                <div className="font-mono text-lg font-semibold text-destructive mb-2">
                  cost ≈ population × relationships × time
                </div>
                <p className="text-sm text-muted-foreground">
                  Naive agent swarms. Every person, every relationship, every second costs money.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <div className="font-mono text-lg font-semibold text-primary mb-2">
                  cost ≈ meaningful generated interaction
                </div>
                <p className="text-sm text-muted-foreground">
                  GrokBot Society. Only selected speakers in a scene cost inference. Dormant = free.
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
               This is not optimization — it is a different architecture. The runtime enforces it at every layer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}