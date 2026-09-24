"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, XCircle, HelpCircle } from "lucide-react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";

const FAQ_ITEMS = [
  {
    question: "Is every synthetic person a GrokBot?",
    answer: "No. A Person is a durable database row (biography, personality, interests, social graph). A GrokBot is an optional inference route mapped to the `social.deep` capability class. The runtime works at $0 with `MockProvider` — no GrokBot required.",
    category: "Architecture",
  },
  {
    question: "Why not run one agent for every Person?",
    answer: "Agents burn inference continuously. In GrokBot Society, only selected speakers (≤3) enter a model context. The core 5,000-person simulator profile keeps 4,985 people dormant at $0.",
    category: "Cost",
  },
  {
    question: "Does a 1,000-person society require 1,000 models?",
    answer: "No. One model call renders a scene with up to 3 speakers. The other 997 people exist in SQLite but never touch a model. Cost ≈ meaningful interaction, not population × time.",
    category: "Cost",
  },
  {
    question: "Can one model render multiple people?",
    answer: "Yes. A single structured generation (SceneOutput) returns messages from multiple speakers. The SocialDirector selects ≤3 speakers, compiles their contexts, and sends ONE request. The provider returns all messages in one response.",
    category: "Architecture",
  },
  {
    question: "Can identities survive provider changes?",
    answer: "Yes — this is a core invariant. `ModelRouter` maps capability classes (`social.mock` → `social.nano` → `social.standard` → `social.deep`) to providers. Switching routes never touches Person identity, relationships, memories, or timeline.",
    category: "Architecture",
  },
  {
    question: "Can this run without Grok?",
    answer: "Yes. Default config uses `MockProvider` (deterministic, $0) and `DeterministicProvider` (template-only, $0). Real providers (nano/standard/deep) are opt-in stubs that require API keys. GrokBot is an optional `social.deep` route.",
    category: "Providers",
  },
  {
    question: "Can it run without paid inference?",
    answer: "Yes. `social.mock` and `social.deterministic` are always $0. The entire test suite (42 tests), the demo (`pnpm dev`), and the CLI all run at $0 on MockProvider. Paid inference is strictly opt-in.",
    category: "Cost",
  },
  {
    question: "What does God do?",
    answer: "God (`GodKernel`) is the deterministic society kernel — application software that wires services, enforces budgets, routes events, materializes Actors, and persists outcomes. God does NOT think continuously, is NOT a person, and does NOT generate text directly.",
    category: "Architecture",
  },
  {
    question: "How are memories isolated?",
    answer: "Four privacy scopes enforced at read time: `private` (person only), `person_user_shared` (person + operator), `circle` (circle members), `public` (anyone). `MemoryService.retrieveForScene` filters every memory by the viewer's scope access. No omniscient hive mind.",
    category: "Privacy",
  },
  {
    question: "Is this an AI girlfriend product?",
    answer: "No. This is a provider-neutral runtime for persistent synthetic societies — people with biographies, relationships, roles, circles, and evolving histories. The demo includes diverse archetypes (friend, mentor, travel companion, intellectual, wildcard). Use cases: social simulation, worldbuilding, companion research, agent architecture research.",
    category: "Product",
  },
  {
    question: "Can humans and synthetic relationships coexist?",
    answer: "Yes. The `person_user_shared` memory scope and relationship dimensions (familiarity, trust, affection) model human↔synthetic bonds. The user is an actor in scenes (`USER_MESSAGE` events). Relationships evolve with inertia — one interaction ≠ spouse.",
    category: "Architecture",
  },
  {
    question: "What happens when budget is exceeded?",
    answer: "BudgetGovernor refuses the reservation → scene resolves to deterministic fallback (template lines from selected speakers). `blockedCalls` increments in telemetry. No silent retries, no silent degradation. Fail closed, always auditable.",
    category: "Governance",
  },
  {
    question: "What is the kill switch?",
    answer: "`setKillSwitch(true)` makes every `IntelligenceGateway.generate` throw `KillSwitchError` → deterministic fallback. `usage().blockedCalls` increments. Health checks still work. The runtime stays alive; inference is what fails closed.",
    category: "Governance",
  },
  {
    question: "How does the cache work?",
    answer: "Content-hash keyed on [modelClass, shape, provider:model, ...contextSections]. Dependencies = selected person IDs. When a person's state changes, their ID invalidates relevant entries. `repeated_cache_thrash` breaker trips on >8 consecutive misses.",
    category: "Performance",
  },
  {
    question: "What are circuit breakers?",
    answer: "9 advisory+audit breakers: duplicate_inference, same_event_recursion, rapid_event_explosion, excessive_retries, repeated_provider_failure, participant_fan_out, context_explosion (hard), premium_model_escalation (hard), repeated_cache_thrash. They don't kill the process but surface runaway patterns.",
    category: "Governance",
  },
  {
    question: "Can I add custom providers?",
    answer: "Yes. Implement the `Provider` interface, register via `gateway.register()`, add route in `ModelRouter`. The `RemoteStubProvider` pattern shows the scaffold. Identity survives provider changes — routes are pure config.",
    category: "Providers",
  },
  {
    question: "What is the difference between a Role and an Agent?",
    answer: "A Role is a reusable behavior definition (e.g., 'friend', 'mentor'). Assigning a role creates zero agents and costs zero inference. An Agent would be a continuously running process — this architecture explicitly prevents that. Actors are ephemeral per-scene compositions of Person + Roles.",
    category: "Architecture",
  },
  {
    question: "How does proactive reach work?",
    answer: "`proactiveTick(circleId?)` evaluates candidates: relevance → cooldown → budget → intensity → minRelevance. Default off → all candidates audited as `NO_ACTION` (0 calls). When enabled: pacing score ≥ threshold, outside cooldown, within daily budget → ONE `PROACTIVE_REACH` scene per reach, capped at `maxReachesPerTick`.",
    category: "Runtime",
  },
  {
    question: "What are landmarks?",
    answer: "Shared-history memories stored once per pair (`person_user_shared` scope, `scopeRef` = other person ID). 'Emma & Leo's first trail ritual' exists once, visible to both. Idempotent: re-adding same landmark does nothing.",
    category: "Memory",
  },
  {
    question: "How do sessions work?",
    answer: "`sessionStart` creates a session with kind, circle, participants. `sessionAppend` adds messages (user or person). `sessionContext` returns bounded rolling window (6 messages) + participant cards (4). Durable log is full; prompt context is never.",
    category: "Runtime",
  },
  {
    question: "What is the relationship inertia?",
    answer: "`relationshipLearningRate = 0.15`. A proposed delta (e.g., +0.2 familiarity) only lands 15% per scene. Status ladder: stranger → acquaintance → friend → close_friend → best_friend → romantic_interest → partner → spouse. One interaction ≠ spouse.",
    category: "Social",
  },
  {
    question: "How do I enable a real model?",
    answer: "Set API key (`OPENAI_API_KEY`, `GROK_API_KEY`, `SOCIETY_NANO_API_KEY`), update routes in config to point capability classes at real providers, ensure budget allows. The `RemoteStubProvider` automatically becomes available when its env key is set.",
    category: "Providers",
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
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

  const filteredItems = FAQ_ITEMS.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase()) ||
    item.answer.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content" className="min-h-[calc(100vh-80px)]">
        <div className="section">
          <div className="container-custom max-w-4xl">
            <div
              className="text-center max-w-3xl mx-auto mb-12"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
            >
              <h1 className="text-display-lg font-display font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-body-lg text-muted-foreground">
                Straight answers about architecture, costs, providers, and common misconceptions.
              </p>
            </div>

            {/* Search */}
            <div
              className="mb-12 max-w-xl mx-auto"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
            >
              <div className="relative">
                <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-12 pr-4"
                  aria-label="Search FAQ"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div
              className="mb-8 flex flex-wrap gap-2 justify-center"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.3s" }}
            >
              <button
                className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
                onClick={() => setSearch("")}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80"
                  onClick={() => setSearch(cat.toLowerCase())}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div
              className="space-y-4"
              style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
            >
              {filteredItems.map((item, i) => (
                <FAQItem
                  key={item.question}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  delay={i * 30}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No questions match &quot;{search}&quot;. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FAQItem({
  item,
  isOpen,
  onToggle,
  delay,
}: {
  item: typeof FAQ_ITEMS[0];
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}) {
  return (
    <article
      className="rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-elevation-2"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-left font-medium text-foreground pr-4">
          {item.question}
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <span className="badge-secondary text-xs">{item.category}</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </span>
      </button>
      <div
        className={cn(
          "border-t border-border/50 px-6 transition-all duration-300 ease-in-out",
          isOpen ? "pb-6 opacity-100 max-h-[500px]" : "pb-0 opacity-0 max-h-0"
        )}
      >
        <div className="prose-custom pt-4 text-sm text-muted-foreground">
          {item.answer}
        </div>
      </div>
    </article>
  );
}