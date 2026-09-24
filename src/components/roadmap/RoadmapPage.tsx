"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, FlaskConical, Zap, Users, Globe, Shield, Database, ArrowRight, CheckCircle2, Eye, Terminal as TerminalIcon } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

const ROADMAP_ITEMS = {
  done: [
    {
      title: "Provider-Neutral Intelligence Gateway",
      description: "Cache → route → budget → diary → provider pipeline with MockProvider, DeterministicProvider, RemoteStubProvider",
      category: "Intelligence",
    },
    {
      title: "MockProvider (Default, $0)",
      description: "Deterministic structured output exercising full protocol. Default for all development",
      category: "Intelligence",
    },
    {
      title: "DeterministicProvider",
      description: "Template-only cognition, still routed through gateway, subject to budget rules",
      category: "Intelligence",
    },
    {
      title: "RemoteStubProvider (nano/standard/deep)",
      description: "Fail-closed stubs for real capabilities. Activate with API keys",
      category: "Intelligence",
    },
    {
      title: "ModelRouter & Escalation Tracking",
      description: "Capability classes → providers. Escalation counter on cheap→expensive route changes",
      category: "Intelligence",
    },
    {
      title: "Person/Role/Relationship/Circle Services",
      description: "Zero-inference persistent state: 29 roles, 11 circles, 7-dimension relationships with inertia",
      category: "Social OS",
    },
    {
      title: "SocialGraph & TimelineService",
      description: "Reachability queries, shared circles, per-person/circle event streams",
      category: "Social OS",
    },
    {
      title: "MemoryService (HOT/WARM/COLD + 4 scopes)",
      description: "private / person_user_shared / circle / public. Landmarks stored once per pair",
      category: "Social OS",
    },
    {
      title: "BudgetGovernor (Fail-Closed)",
      description: "Kill switch, per-event cap, hourly/daily spend, token ceilings, tier gate, recursion guard",
      category: "Governance",
    },
    {
      title: "CircuitBreakers (9 breakers)",
      description: "duplicate_inference, rapid_event_explosion, context_explosion (hard), premium_model_escalation (hard), etc.",
      category: "Governance",
    },
    {
      title: "EventEngine + SocialDirector",
      description: "Interaction + bookkeeping types, stages, statuses. Single inference, deterministic validation",
      category: "Runtime",
    },
    {
      title: "ParticipantSelector + ContextCompiler",
      description: "Deterministic scoring, hard max 3 speakers, BASELINE+ROLE+RELATIONSHIP+MEMORY sections",
      category: "Runtime",
    },
    {
      title: "SyntheticActorRuntime",
      description: "Ephemeral per-scene persona materialization. Dies when scene ends",
      category: "Runtime",
    },
    {
      title: "ProactiveEngine (Conservative)",
      description: "Disabled by default. Relevance → cooldown → budget → intensity gates. Per-person cooldown",
      category: "Runtime",
    },
    {
      title: "SceneRenderer + MockSceneRenderer",
      description: "Provider-neutral interface. One call per scene. Deterministic output validation",
      category: "Runtime",
    },
    {
      title: "CircuitBreakers Integration",
      description: "9 breakers wired into pipeline. Advisory + audit. Hard trips for context/premium",
      category: "Governance",
    },
    {
      title: "SessionRuntime (Rolling Window)",
      description: "Long-session abstraction. Rolling message window (6) + participant cards (4)",
      category: "Runtime",
    },
    {
      title: "CostSimulator",
      description: "Deterministic arithmetic. Dormant-population profiles. 5/50/500/5000 scenarios",
      category: "Telemetry",
    },
    {
      title: "ChatGPT & SocialCore Bridge Contracts",
      description: "BoundedScenePackage/BoundedSceneResult. Disabled by default. BridgeDisabledError when off",
      category: "Integrations",
    },
    {
      title: "Operator CLI (21 commands)",
      description: "start, status, people, person, circles, chat (REPL), proactive, session, simulate, budget, usage, kill/pause",
      category: "CLI",
    },
    {
      title: "42 Tests Passing (8 files)",
      description: "14 required proofs + architectural guarantees + domain proofs + 17 Society MVP proofs",
      category: "Verification",
    },
    {
      title: "TypeScript Strict + Zero Errors",
      description: "strict: true, noUncheckedIndexedAccess: true. Clean typecheck",
      category: "Verification",
    },
    {
      title: "Handoff Package (god-grokbot)",
      description: "10 minimal files + GOD_MINIMAL_PROMPT.md. Minimal God operating contract",
      category: "Handoff",
    },
  ],
  next: [
    {
      title: "OpenAIProvider (nano/standard)",
      description: "Real OpenAI integration behind feature flag. Streaming support optional",
      category: "Intelligence",
    },
    {
      title: "AnthropicProvider (nano/standard)",
      description: "Claude integration via Anthropic API",
      category: "Intelligence",
    },
    {
      title: "GrokProvider (deep)",
      description: "xAI Grok integration for social.deep capability class",
      category: "Intelligence",
    },
    {
      title: "Streaming Support",
      description: "Optional streaming for UX (not required for structured SceneOutput)",
      category: "Intelligence",
    },
    {
      title: "Structured Logging (pino)",
      description: "Production-grade logging with levels and structured output",
      category: "Observability",
    },
    {
      title: "OpenTelemetry Metrics",
      description: "Calls, latency, cost, cache hit rate, breaker state, budget utilization",
      category: "Observability",
    },
    {
      title: "Health Endpoint (/healthz)",
      description: "For future server mode and load balancer integration",
      category: "Observability",
    },
    {
      title: "Structured Audit Log (JSONL)",
      description: "Event replay capability for debugging and compliance",
      category: "Observability",
    },
    {
      title: "Connection Pooling for SQLite",
      description: "Better concurrent access patterns and WAL mode tuning",
      category: "Persistence",
    },
    {
      title: "10k+ Person Stress Test",
      description: "Memory, selection latency, cache hit rate benchmarks",
      category: "Persistence",
    },
    {
      title: "Background Tier Promotion Job",
      description: "HOT → WARM → COLD automatic promotion based on age/importance",
      category: "Memory",
    },
    {
      title: "WebSocket Server for Real-Time Observation",
      description: "Live society observation: events, activations, relationship changes",
      category: "Operator Experience",
    },
    {
      title: "Admin REST API",
      description: "Society management endpoints for external tooling",
      category: "Operator Experience",
    },
    {
      title: "Society Import/Export (JSONL)",
      description: "Backup, migration, and cloning of entire societies",
      category: "Operator Experience",
    },
    {
      title: "Persona Editor (CLI/TUI)",
      description: "Interactive person/role/relationship creation and editing",
      category: "Operator Experience",
    },
    {
      title: "Timeline Visualization",
      description: "Visual event stream explorer per person/circle",
      category: "Operator Experience",
    },
    {
      title: "Property-Based Tests (fast-check)",
      description: "Selection, context, budget invariants under random generation",
      category: "Testing",
    },
    {
      title: "Chaos Tests",
      description: "Kill switch mid-scene, budget exhaustion, provider failure, cache thrash",
      category: "Testing",
    },
    {
      title: "CI Matrix: Node 24, 26",
      description: "Test against current and next LTS",
      category: "Testing",
    },
    {
      title: "Dependabot/Renovate Automation",
      description: "Automated dependency updates with test verification",
      category: "Testing",
    },
  ],
  experimental: [
    {
      title: "Multi-Society Federation",
      description: "Multiple GodKernel instances sharing SocialGraph namespace. Cross-society circles",
      category: "Federation",
    },
    {
      title: "Learned Relevance (ONNX/WASM)",
      description: "Lightweight learned scorer trained on Society's own telemetry. Provider-neutral: model is a scorer, not generator",
      category: "ML",
    },
    {
      title: "Visual Society Inspector",
      description: "React/Vue frontend connecting via WebSocket. Live graph view, event replay, cost dashboard",
      category: "Visualization",
    },
    {
      title: "Plugin System",
      description: "Custom event types, memory types, selection strategies, context compilers",
      category: "Extensibility",
    },
    {
      title: "Natural Language Operator Interface",
      description: "LLM-mediated queries: 'Show me Emma's relationships' → kernel query → natural response",
      category: "UX",
    },
  ],
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Intelligence: <Zap className="h-4 w-4" />,
  "Social OS": <Users className="h-4 w-4" />,
  Governance: <Shield className="h-4 w-4" />,
  Runtime: <Zap className="h-4 w-4" />,
  Telemetry: <Database className="h-4 w-4" />,
  Integrations: <Globe className="h-4 w-4" />,
  CLI: <TerminalIcon className="h-4 w-4" />,
  Verification: <CheckCircle2 className="h-4 w-4" />,
  Handoff: <ArrowRight className="h-4 w-4" />,
  Observability: <Zap className="h-4 w-4" />,
  Persistence: <Database className="h-4 w-4" />,
  Memory: <Database className="h-4 w-4" />,
  "Operator Experience": <Users className="h-4 w-4" />,
  Testing: <FlaskConical className="h-4 w-4" />,
  Federation: <Globe className="h-4 w-4" />,
  ML: <Zap className="h-4 w-4" />,
  Visualization: <Eye className="h-4 w-4" />,
  Extensibility: <Shield className="h-4 w-4" />,
  UX: <Users className="h-4 w-4" />,
};

export function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<"done" | "next" | "experimental">("done");
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
          <div className="container-custom max-w-6xl">
            <div
              className="text-center max-w-3xl mx-auto mb-12"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
            >
              <h1 className="text-display-lg font-display font-bold text-foreground mb-4">
                Roadmap
              </h1>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Clear separation: <strong>DONE</strong> = working code with tests. <strong>NEXT</strong> = planned with design. <strong>EXPERIMENTAL</strong> = ideas without implementation.
              </p>
            </div>

            {/* Tab Navigation */}
            <div
              className="flex items-center justify-center gap-3 mb-12"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
              role="tablist"
            >
              <button
                role="tab"
                aria-selected={activeTab === "done"}
                onClick={() => setActiveTab("done")}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  activeTab === "done"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <CheckCircle2 className="h-5 w-5 mr-2" /> DONE ({ROADMAP_ITEMS.done.length})
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "next"}
                onClick={() => setActiveTab("next")}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  activeTab === "next"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <Clock className="h-5 w-5 mr-2" /> NEXT ({ROADMAP_ITEMS.next.length})
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "experimental"}
                onClick={() => setActiveTab("experimental")}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all duration-300",
                  activeTab === "experimental"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                <FlaskConical className="h-5 w-5 mr-2" /> EXPERIMENTAL ({ROADMAP_ITEMS.experimental.length})
              </button>
            </div>

            {/* Items Grid */}
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
            >
              {ROADMAP_ITEMS[activeTab].map((item, i) => (
                <RoadmapCard key={item.title} item={item} delay={i * 50} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface RoadmapItem {
  title: string;
  description: string;
  category: string;
  eta?: string;
}

function RoadmapCard({ item, delay }: { item: RoadmapItem; delay: number }) {
  const Icon = CATEGORY_ICONS[item.category] || <Zap className="h-4 w-4" />;

  return (
    <article
      className="relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-elevation-3 hover:border-primary/30"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-primary"
          style={{ backgroundColor: "hsl(var(--primary)/10)" }}
          aria-hidden="true"
        >
          {Icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-primary text-xs">{item.category}</span>
            {item.eta && <span className="badge-secondary text-xs">{item.eta}</span>}
          </div>
          <h3 className="font-semibold text-foreground">{item.title}</h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className={cn(
          "text-xs font-medium",
          item.category === "Intelligence" && "text-primary",
          item.category === "Governance" && "text-destructive",
          item.category === "Runtime" && "text-accent",
          item.category === "Social OS" && "text-[hsl(var(--society-relationship))]",
          item.category === "Telemetry" && "text-[hsl(var(--society-circle))]",
          item.category === "Integrations" && "text-[hsl(var(--society-god))]",
          item.category === "CLI" && "text-[hsl(var(--society-dormant))]",
          item.category === "Verification" && "text-success",
          item.category === "Handoff" && "text-[hsl(var(--society-god))]",
          item.category === "Observability" && "text-warning",
          item.category === "Persistence" && "text-[hsl(var(--society-circle))]",
          item.category === "Memory" && "text-[hsl(var(--society-relationship))]",
          item.category === "Operator Experience" && "text-[hsl(var(--society-active))]",
          item.category === "Testing" && "text-[hsl(var(--society-inference))]",
          item.category === "Federation" && "text-[hsl(var(--society-god))]",
          item.category === "ML" && "text-[hsl(var(--society-inference))]",
          item.category === "Visualization" && "text-[hsl(var(--society-active))]",
          item.category === "Extensibility" && "text-[hsl(var(--society-god))]",
          item.category === "UX" && "text-[hsl(var(--society-active))]",
        )}>
          {item.category}
        </span>
        {ROADMAP_ITEMS.done.some((doneItem) => doneItem.title === item.title) && (
          <CheckCircle2 className="h-5 w-5 text-success" />
        )}
      </div>
    </article>
  );
}