"use client";

import { useRef, useEffect, useState } from "react";
import { Users, Zap, Shield, Database, Globe } from "lucide-react";
import {
  calculateVerifiedScenarioCosts,
  VERIFIED_COST_PER_CALL,
} from "@/lib/cost-model";

export function CostArchitecture() {
  const [population, setPopulation] = useState(500);
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

  const costs = calculateVerifiedScenarioCosts();
  const totalCost = costs.reduce((sum, scenario) => sum + scenario.cost, 0);
  const activePopulation = 15;
  const dormantPopulation = Math.max(0, population - activePopulation);

  return (
    <section
      id="cost"
      ref={containerRef}
      className="section relative overflow-hidden"
      aria-labelledby="cost-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="cost-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            Cost Architecture
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Population scales. Inference does not. Only active interactions cost money.
          </p>
        </div>

        {/* Interactive Controls */}
        <div
          className="rounded-2xl border bg-card p-6 mb-12"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="label mb-3">Population Size</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">People</span>
                  <span className="font-mono text-foreground">{population.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="5000"
                  step="5"
                  value={population}
                  onChange={(e) => setPopulation(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none accent-primary"
                  aria-label="Population size"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5</span>
                  <span>50</span>
                  <span>500</span>
                  <span>5,000</span>
                </div>
              </div>
            </div>
            <div>
              <label className="label mb-3">Verified Cost Profile</label>
              <div className="rounded-xl border bg-muted/30 p-4">
                <p className="text-sm font-medium text-foreground">$0.0275 per scene</p>
                <p className="text-xs text-muted-foreground mt-1">
                  3,500 input + 500 output tokens at $0.005/$0.020 per 1k. This is the core simulator profile, not a live provider quote.
                </p>
              </div>
            </div>
          </div>

          {/* Active/Dormant Visualization */}
          <div className="rounded-xl border border-border/50 p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">Population Breakdown</h4>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--society-active))" }} />
                  <span className="text-muted-foreground">Active: {activePopulation}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--society-dormant))" }} />
                  <span className="text-muted-foreground">Dormant: {dormantPopulation.toLocaleString()}</span>
                </span>
              </div>
            </div>
            <div className="h-4 rounded-full bg-muted relative overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (activePopulation / population) * 100)}%`,
                  background: `linear-gradient(90deg, hsl(var(--society-active)), hsl(var(--society-circle)))`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Only active people (those in circles, with relationships, recently interacted) ever enter model context.{" "}
              <strong className="text-foreground">{dormantPopulation.toLocaleString()}</strong> dormant people = $0 inference.
            </p>
          </div>
        </div>

        {/* Cost Scenarios */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          {costs.map((scenario, i) => (
            <ScenarioCard key={scenario.name} scenario={scenario} delay={i * 100} />
          ))}
        </div>

        {/* Total Cost Summary */}
        <div
          className="mt-8 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.6s" }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="font-display font-semibold text-heading-lg text-foreground mb-4">
               Combined Core-Verified Examples
            </h3>
            <div className="font-display font-bold text-5xl text-foreground mb-2">
              ${totalCost.toFixed(2)}
            </div>
            <p className="text-muted-foreground">
              Core simulator profile — {population.toLocaleString()} people ({activePopulation} active, {dormantPopulation.toLocaleString()} dormant)
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Scenario totals use the core-verified token and rate profile. Population changes the dormant count, not these example workloads.
            </p>
          </div>
        </div>

        {/* Cost Ladder */}
        <div
          className="mt-12"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.8s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            The Cost Ladder
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <LadderRung
              title="CACHE"
              description="Identical scene context → instant return, $0"
              icon={<Database className="h-8 w-8" />}
              color="hsl(var(--primary))"
            />
            <LadderRung
              title="STATE / DB"
              description="Person, roles, relationships, circles — all zero inference"
              icon={<Database className="h-8 w-8" />}
              color="hsl(var(--accent))"
            />
            <LadderRung
              title="DETERMINISTIC"
              description="Relevance, selection, compilation, validation — pure code"
              icon={<Zap className="h-8 w-8" />}
              color="hsl(var(--society-circle))"
            />
            <LadderRung
               title="PAID ROUTES"
               description="Remote provider classes are scaffolds. No real inference is connected."
              icon={<Zap className="h-8 w-8" />}
              color="hsl(var(--society-relationship))"
            />
            <LadderRung
               title="CHATGPT"
               description="Disabled bridge contract. No ChatGPT inference or credits are connected."
              icon={<Globe className="h-8 w-8" />}
              color="hsl(var(--society-relationship))"
            />
            <LadderRung
               title="GROKBOT"
               description="Disabled optional route contract. No GrokBot inference or credits are connected."
              icon={<Shield className="h-8 w-8" />}
              color="hsl(var(--society-god))"
            />
          </div>

          {/* Why This Matters */}
          <div className="mt-12 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8">
            <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
               Why Population Does Not Drive Cost
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <ReasonCard
                title="Selection, Not Broadcast"
                 description="ParticipantSelector picks ≤3 relevant speakers from circles. At population 5,000, 4,985 people never enter context."
                icon={<Users className="h-6 w-6" />}
              />
              <ReasonCard
                title="Bounded Context"
                description="≤12k tokens, ≤30 sections per scene. Circuit breaker hard-trips on overflow. Context = constant."
                icon={<Database className="h-6 w-6" />}
              />
              <ReasonCard
                title="One Call Per Scene"
                description="maxCallsPerEvent = 1. A 3-person group chat = 1 structured generation, not 3 separate calls."
                icon={<Zap className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScenarioCard({
  scenario,
  delay,
}: {
  scenario: ReturnType<typeof calculateVerifiedScenarioCosts>[number];
  delay: number;
}) {
  return (
    <div
      className="rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-elevation-2"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="mb-4">
        <h4 className="font-semibold text-foreground">{scenario.name}</h4>
        <p className="text-sm text-muted-foreground">{scenario.messages} messages</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
          <span className="font-mono text-foreground">{scenario.calls} calls</span>
        </div>
        <div className="font-display font-bold text-lg text-foreground">
          ${scenario.cost.toFixed(2)}
        </div>
      </div>
      <div className="pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          {scenario.calls === 0 ? "No inference needed" : `${scenario.calls} calls @ $${VERIFIED_COST_PER_CALL.toFixed(4)}/scene`}
        </p>
      </div>
    </div>
  );
}

function LadderRung({
  title,
  description,
  icon,
  color,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="relative rounded-2xl border bg-card p-6 text-center group">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div
          className="relative w-12 h-12 mx-auto mt-2 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)` }}
        >
          {icon}
        </div>
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
  </div>
  );
}

function ReasonCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
        {icon}
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
