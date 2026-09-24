"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, BookOpen, Code, Zap, Shield, Database, Globe, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

const DOCS_SECTIONS = [
  {
    category: "Getting Started",
    items: [
      { title: "Introduction", href: "https://github.com/M4G3LL4N0/grokbot-society#readme", description: "What GrokBot Society is and why it exists" },
      { title: "Quickstart", href: "https://github.com/M4G3LL4N0/grokbot-society#quick-start", description: "60-second setup with MockProvider" },
      { title: "Architecture Overview", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/ARCHITECTURE.md", description: "Core concepts and system design" },
      { title: "CLI Reference", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/cli/society.ts", description: "All pnpm society commands" },
    ],
  },
  {
    category: "Core Concepts",
    items: [
      { title: "Person", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#person", description: "Durable canonical identity" },
      { title: "Role", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#role", description: "Reusable behavior definitions" },
      { title: "Actor", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#syntheticactor", description: "Ephemeral per-scene persona" },
      { title: "Circle", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#circle", description: "Named communities with membership" },
      { title: "Relationship", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#relationship", description: "7-dimension bidirectional edges" },
      { title: "Event", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#event", description: "Atomic unit of activity" },
      { title: "Scene", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#scene", description: "One inference, multiple people" },
      { title: "Memory", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#memory", description: "HOT/WARM/COLD + privacy scopes" },
      { title: "God", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#god", description: "Deterministic society kernel" },
      { title: "Provider", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#provider", description: "Model endpoints and contracts" },
      { title: "IntelligenceGateway", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#intelligencegateway", description: "Single approved inference path" },
      { title: "BudgetGovernor", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#budgetgovernor", description: "Hard limits, fail-closed" },
      { title: "CircuitBreakers", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#circuitbreakers", description: "Runaway pattern detection" },
      { title: "Session", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CONCEPTS.md#session", description: "Rolling-window long sessions" },
    ],
  },
  {
    category: "Guides",
    items: [
      { title: "Creating People", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/examples/create-person.ts", description: "Zero-inference person creation" },
      { title: "Assigning Roles", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/examples/assign-roles.ts", description: "Composable behavior at zero cost" },
      { title: "Building Circles", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/examples/create-circle.ts", description: "Communities and memberships" },
      { title: "Running Scenes", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/examples/group-scene.ts", description: "One inference, multiple speakers" },
      { title: "Relationship Evolution", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/examples/relationship-evolution.ts", description: "Conservative relationship updates" },
      { title: "Long Sessions", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/examples/session.ts", description: "Road trips, evenings, ambient context" },
      { title: "Cost Simulation", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/examples/zero-cost-population.ts", description: "Population vs. inference modeling" },
      { title: "Provider Setup", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/PROVIDERS.md", description: "Understanding provider routes" },
    ],
  },
  {
    category: "API Reference",
    items: [
      { title: "GodKernel", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/god/GodKernel.ts", description: "Main entry point and composition root" },
      { title: "PersonService", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/people/PersonService.ts", description: "Person CRUD and state" },
      { title: "RoleService", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/roles/RoleService.ts", description: "Role registry and assignments" },
      { title: "RelationshipService", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/relationships/RelationshipService.ts", description: "Dimensions, inertia, status ladder" },
      { title: "CircleService", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/circles/CircleService.ts", description: "Communities and memberships" },
      { title: "MemoryService", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/memory/MemoryService.ts", description: "HOT/WARM/COLD + landmarks" },
      { title: "EventEngine", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/events/EventEngine.ts", description: "Event-driven pipeline" },
      { title: "IntelligenceGateway", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/intelligence/IntelligenceGateway.ts", description: "Single inference path" },
      { title: "BudgetGovernor", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/budget/BudgetGovernor.ts", description: "Fail-closed budget enforcement" },
      { title: "ProactiveEngine", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/runtime/ProactiveEngine.ts", description: "Conservative outreach" },
      { title: "SessionRuntime", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/sessions/SessionRuntime.ts", description: "Rolling-window sessions" },
    ],
  },
  {
    category: "Integrations",
    items: [
      { title: "GrokBot Integration", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/GROKBOT_INTEGRATION.md", description: "Optional premium route" },
      { title: "ChatGPT Bridge", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/CHATGPT_INTEGRATION.md", description: "Disabled bridge contract" },
      { title: "Custom Providers", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/PROVIDERS.md", description: "Implementing Provider interface" },
    ],
  },
  {
    category: "Operations",
    items: [
      { title: "Cost Model", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/COST_MODEL.md", description: "Why population stays cheap" },
      { title: "Memory & Privacy", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/MEMORY.md", description: "Scopes and isolation" },
      { title: "Security", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/docs/SECURITY_AND_PRIVACY.md", description: "Credentials, guardrails, incidents" },
      { title: "Operator CLI", href: "https://github.com/M4G3LL4N0/grokbot-society/blob/main/src/cli/society.ts", description: "Monitoring and debugging commands" },
      { title: "Troubleshooting", href: "https://github.com/M4G3LL4N0/grokbot-society/issues", description: "Known issues and fixes" },
    ],
  },
];

const DOC_ICONS: Record<string, React.ReactNode> = {
  "Getting Started": <BookOpen className="h-5 w-5" />,
  "Core Concepts": <Zap className="h-5 w-5" />,
  "Guides": <Code className="h-5 w-5" />,
  "API Reference": <Database className="h-5 w-5" />,
  "Integrations": <Globe className="h-5 w-5" />,
  "Operations": <Shield className="h-5 w-5" />,
};

export function DocsPage() {
  const [openCategories, setOpenCategories] = useState<string[]>(["Getting Started"]);
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

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
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
                Documentation
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Complete reference for GrokBot Society. Start with <strong>Getting Started</strong>, then explore <strong>Core Concepts</strong> and <strong>Guides</strong>.
              </p>
            </div>

            <div
              className="grid lg:grid-cols-[280px_1fr] gap-8"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
            >
              {/* Sidebar */}
              <aside className="lg:sticky lg:top-24 space-y-6">
                <div className="hidden lg:block rounded-xl border bg-card p-4">
                  <h3 className="font-semibold text-foreground mb-4">On This Page</h3>
                  <nav className="space-y-1">
                    {DOCS_SECTIONS.map((section) => (
                      <a
                        key={section.category}
                        href={`#${section.category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        {section.category}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <div className="space-y-12">
                {DOCS_SECTIONS.map((section) => (
                  <DocSection
                    key={section.category}
                    section={section}
                    isOpen={openCategories.includes(section.category)}
                    onToggle={() => toggleCategory(section.category)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DocSection({
  section,
  isOpen,
  onToggle,
}: {
  section: typeof DOCS_SECTIONS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = DOC_ICONS[section.category] || <BookOpen className="h-5 w-5" />;

  return (
    <section
      id={section.category.toLowerCase().replace(/\s+/g, "-")}
      className="rounded-2xl border bg-card overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary" style={{ backgroundColor: "hsl(var(--primary)/10)" }}>
            {Icon}
          </div>
          <h2 className="font-display font-semibold text-heading-md text-foreground">{section.category}</h2>
        </div>
        <ChevronRight
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isOpen && "rotate-90"
          )}
        />
      </button>

      <div
        className={cn(
          "border-t border-border/50 transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-border/50 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:shadow-glow"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span>Read more</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}