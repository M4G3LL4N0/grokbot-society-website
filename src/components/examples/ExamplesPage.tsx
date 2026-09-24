"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Terminal, FileCode, Zap, Users, BookOpen, TrendingUp, Database } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

const EXAMPLES = [
  {
    id: "create-person",
    title: "Create a Person",
    description: "Zero inference — pure structured state in SQLite",
    icon: Users,
    command: "pnpm tsx examples/create-person.ts",
    file: "create-person.ts",
    tags: ["zero-cost", "person", "identity"],
    description_long: "Create a durable Person with biography, personality, interests, and current state. Assign roles at zero cost.",
  },
  {
    id: "assign-roles",
    title: "Assign Roles",
    description: "Composable behavior at zero cost",
    icon: Zap,
    command: "pnpm tsx examples/assign-roles.ts",
    file: "assign-roles.ts",
    tags: ["zero-cost", "roles", "composition"],
    description_long: "Assign multiple roles to a person. At scene time, only context-relevant roles compose into the Actor.",
  },
  {
    id: "create-circle",
    title: "Create a Circle",
    description: "Named communities with ordered membership",
    icon: Users,
    command: "pnpm tsx examples/create-circle.ts",
    file: "create-circle.ts",
    tags: ["zero-cost", "circles", "relationships"],
    description_long: "Create a named community, add members, assign relevant roles, and establish relationships between members.",
  },
  {
    id: "group-scene",
    title: "Run a Group Scene",
    description: "One inference, multiple speakers, bounded context",
    icon: Zap,
    command: "pnpm tsx examples/group-scene.ts",
    file: "group-scene.ts",
    tags: ["inference", "scene", "mock-provider"],
    description_long: "Run a group scene with the Inner Circle. One inference returns multiple speakers. Zero cost on MockProvider.",
  },
  {
    id: "relationship-evolution",
    title: "Relationship Evolution",
    description: "Watch relationships evolve with inertia over multiple interactions",
    icon: TrendingUp,
    command: "pnpm tsx examples/relationship-evolution.ts",
    file: "relationship-evolution.ts",
    tags: ["relationships", "inertia", "evolution"],
    description_long: "Simulate multiple interactions and watch relationship dimensions (familiarity, trust, affection) evolve with 15% inertia per scene.",
  },
  {
    id: "zero-cost-population",
    title: "Zero-Cost Population",
    description: "Dormant population = $0 inference cost",
    icon: Database,
    command: "pnpm tsx examples/zero-cost-population.ts",
    file: "zero-cost-population.ts",
    tags: ["cost", "population", "simulation"],
    description_long: "Create 1,000 people with only 5 active. Run cost simulator showing dormant population = $0 across all scenarios.",
  },
  {
    id: "session",
    title: "Long Session",
    description: "Rolling-window context for road trips, evenings, ambient",
    icon: BookOpen,
    command: "pnpm tsx examples/session.ts",
    file: "session.ts",
    tags: ["sessions", "rolling-window", "context"],
    description_long: "Start a road-trip session, append messages, compile bounded context (rolling window + participant cards), end session.",
  },
];

export function ExamplesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
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

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(command);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
                Runnable Examples
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Every example runs on MockProvider at $0. Copy the command, run it, see the output.
              </p>
            </div>

            {/* Prerequisites */}
            <div
              className="mb-12 rounded-2xl border bg-card p-6"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="h-6 w-6 text-primary" />
                <h3 className="font-semibold text-foreground">Prerequisites</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-foreground">From the runtime repo:</p>
                  <code className="font-mono text-muted-foreground bg-muted px-2 py-1 rounded block">git clone https://github.com/M4G3LL4N0/grokbot-society.git</code>
                  <code className="font-mono text-muted-foreground bg-muted px-2 py-1 rounded block">cd grokbot-society && pnpm install</code>
                  <code className="font-mono text-muted-foreground bg-muted px-2 py-1 rounded block">pnpm typecheck && pnpm test</code>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Then run any example:</p>
                  <code className="font-mono text-muted-foreground bg-muted px-2 py-1 rounded block">pnpm tsx examples/create-person.ts</code>
                  <code className="font-mono text-muted-foreground bg-muted px-2 py-1 rounded block">pnpm tsx examples/group-scene.ts</code>
                </div>
              </div>
            </div>

            {/* Examples Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EXAMPLES.map((example, i) => (
                <ExampleCard
                  key={example.id}
                  example={example}
                  copied={copiedId === example.command}
                  onCopy={() => copyCommand(example.command)}
                  delay={i * 100}
                />
              ))}
            </div>

            {/* Run All */}
            <div
              className="mt-12 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.8s" }}
            >
              <h3 className="font-display font-semibold text-heading-lg text-foreground mb-4">
                Run All Examples
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Run the full example suite sequentially. Each demonstrates a different facet of the runtime at $0 cost.
              </p>
              <div className="rounded-xl bg-card p-4 font-mono text-sm text-foreground overflow-x-auto">
                <code>
                  {`for f in examples/*.ts; do
  echo "=== Running $f ==="
  pnpm tsx "$f"
  echo ""
done`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ExampleCard({
  example,
  copied,
  onCopy,
  delay,
}: {
  example: typeof EXAMPLES[0];
  copied: boolean;
  onCopy: () => void;
  delay: number;
}) {
  const Icon = example.icon;
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
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-primary"
          style={{ backgroundColor: "hsl(var(--primary)/10)" }}
          aria-hidden="true"
        >
          <Icon className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            {example.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-semibold text-foreground">{example.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{example.description}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{example.description_long}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-muted-foreground" />
          <code className="font-mono text-xs text-muted-foreground">{example.file}</code>
        </div>
        <button
          onClick={onCopy}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
            copied
              ? "bg-success text-success-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy Command
            </>
          )}
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <code className="font-mono text-sm text-foreground bg-muted px-3 py-2 rounded-lg block">{example.command}</code>
      </div>
    </article>
  );
}