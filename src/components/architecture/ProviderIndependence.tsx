"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, X, Database } from "lucide-react";

const PROVIDERS = [
  {
    id: "mock",
    name: "MockProvider",
    type: "Built-in",
    cost: "$0.000",
    tier: "Floor",
    description: "Deterministic structured output. Exercises full protocol. Default for all development.",
    capabilities: ["scene", "json", "text"],
    available: true,
    color: "hsl(var(--primary))",
  },
  {
    id: "deterministic",
    name: "DeterministicProvider",
    type: "Built-in",
    cost: "$0.000",
    tier: "Floor",
    description: "Pure template/code cognition. No model at all. Still routed through gateway, subject to budget.",
    capabilities: ["scene", "json"],
    available: true,
    color: "hsl(var(--accent))",
  },
  {
    id: "nano",
    name: "Nano (e.g., Haiku)",
    type: "Remote Stub",
    cost: "Not connected",
    tier: "Cheap",
    description: "Fast, inexpensive real model. RemoteStubProvider becomes available when SOCIETY_NANO_API_KEY is set.",
    capabilities: ["scene", "json", "text"],
    available: false,
    envKey: "SOCIETY_NANO_API_KEY",
    color: "hsl(var(--society-circle))",
  },
  {
    id: "standard",
    name: "Standard (e.g., Sonnet, GPT-4o-mini)",
    type: "Remote Stub",
    cost: "Not connected",
    tier: "Mid",
    description: "Balanced capability. RemoteStubProvider available when OPENAI_API_KEY is set.",
    capabilities: ["scene", "json", "text"],
    available: false,
    envKey: "OPENAI_API_KEY",
    color: "hsl(var(--society-relationship))",
  },
  {
    id: "deep",
    name: "Deep (e.g., Opus, GPT-4o, Grok)",
    type: "Remote Stub",
    cost: "Not connected",
    tier: "Premium",
    description: "Highest capability. RemoteStubProvider available when GROK_API_KEY is set.",
    capabilities: ["scene", "json", "text"],
    available: false,
    envKey: "GROK_API_KEY",
    color: "hsl(var(--society-god))",
  },
];

const ROUTES = [
  { class: "social.deterministic", provider: "deterministic", model: "template-v1", cost: "$0" },
  { class: "social.mock", provider: "mock", model: "mock-v1", cost: "$0" },
  { class: "social.nano", provider: "mock", model: "mock-v1", cost: "$0 (stub)" },
  { class: "social.standard", provider: "mock", model: "mock-v1", cost: "$0 (stub)" },
  { class: "social.deep", provider: "mock", model: "mock-v1", cost: "$0 (stub)" },
];

export function ProviderIndependence() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
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
      id="provider-independence"
      ref={containerRef}
      className="section relative overflow-hidden bg-muted/30"
      aria-labelledby="provider-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="provider-independence"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            Provider Independence
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Switch models without touching a Person. Identity survives provider changes — routes are pure configuration.
          </p>
        </div>

        {/* Provider Cards */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
        >
          {PROVIDERS.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              isSelected={selectedProvider === provider.id}
              onSelect={() => setSelectedProvider(selectedProvider === provider.id ? null : provider.id)}
            />
          ))}
        </div>

        {/* Route Table */}
        <div
          className="rounded-2xl border bg-card overflow-hidden"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          <div className="p-6 border-b border-border">
            <h3 className="font-display font-semibold text-heading-lg text-foreground mb-2">
              Default Capability Routes
            </h3>
            <p className="text-sm text-muted-foreground">
              All routes point to MockProvider by default ($0). Change routes in config to enable paid tiers.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Capability Class</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Provider</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Model</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((route) => (
                  <tr key={route.class} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="px-6 py-4 font-mono text-sm text-foreground">{route.class}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
                        route.provider === "mock" ? "bg-primary/10 text-primary border-primary/20 border" :
                        route.provider === "deterministic" ? "bg-accent/10 text-accent border-accent/20 border" :
                        "bg-muted/50 text-muted-foreground"
                      )}>
                        {route.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-muted-foreground">{route.model}</td>
                    <td className="px-6 py-4 font-mono text-sm">
                      <span className={route.cost === "$0" ? "text-success" : route.cost.includes("stub") ? "text-warning" : "text-destructive"}>
                        {route.cost}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Identity Survival Demo */}
        <div
          className="mt-16 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.6s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            Identity Survives Provider Changes
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <IdentityStep
              title="Person Created"
              description="Emma exists in SQLite with biography, roles, relationships, memories"
              icon={<Database className="h-8 w-8" />}
            />
            <div className="flex items-center justify-center text-primary">
              <ArrowRight className="h-6 w-6" />
            </div>
            <IdentityStep
              title="Route Changed"
              description="social.mock → social.standard via config. Zero Person migration."
              icon={<ArrowRight className="h-8 w-8" />}
            />
            <div className="flex items-center justify-center text-primary">
              <ArrowRight className="h-6 w-6" />
            </div>
            <IdentityStep
              title="Same Emma"
              description="Same UUID, same relationships, same memories. Only inference backend changed."
              icon={<Check className="h-8 w-8" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProviderCard({
  provider,
  isSelected,
  onSelect,
}: {
  provider: typeof PROVIDERS[0];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={cn(
        "relative rounded-2xl border p-6 transition-all duration-300 cursor-pointer",
        "hover:shadow-elevation-3 hover:border-primary/30",
        isSelected
          ? "bg-[hsl(var(--primary))/5] border-primary/30 shadow-glow"
          : provider.available
          ? "bg-card border-border hover:border-primary/20"
          : "bg-muted/30 border-transparent opacity-60"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `color-mix(in srgb, ${provider.color} 8%, transparent)` }}
            aria-hidden="true"
          >
            {provider.available ? (
              <Check className="h-6 w-6" style={{ color: provider.color }} />
            ) : (
              <X className="h-6 w-6" style={{ color: provider.color }} />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{provider.name}</h4>
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              provider.available ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
            )}>
              {provider.available ? "Available" : "Needs API Key"}
            </span>
          </div>
        </div>
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className="badge-secondary text-xs mb-2">{provider.type}</span>
        <span className="badge-primary text-xs">{provider.tier}</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {provider.capabilities.map((cap) => (
          <span key={cap} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
            {cap}
          </span>
        ))}
      </div>

      {!provider.available && provider.envKey && (
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-1">Requires environment variable:</p>
          <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
            {provider.envKey}
          </code>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <span className="font-mono text-lg font-semibold text-foreground">{provider.cost}</span>
        <span className="text-xs text-muted-foreground">{provider.cost === "$0" ? "default runtime cost" : "no live provider connected"}</span>
      </div>
    </article>
  );
}

function IdentityStep({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="relative w-12 h-12 mx-auto mt-2 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div className="absolute top-1/2 left-full w-8 h-0.5 bg-primary/20" />
      </div>
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}