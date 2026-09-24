"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { runSocietyVisualization } from "./SocietyVisualization";

const SOCIETY_STAGES = [
  {
    id: "person",
    label: "Person",
    description: "Durable identity with biography, personality, interests",
    icon: "👤",
    color: "hsl(var(--society-dormant))",
  },
  {
    id: "relationships",
    label: "Relationships",
    description: "7-dimension bidirectional edges with inertia",
    icon: "🤝",
    color: "hsl(var(--society-relationship))",
  },
  {
    id: "circles",
    label: "Circles",
    description: "Named communities with ordered membership",
    icon: "👥",
    color: "hsl(var(--society-circle))",
  },
  {
    id: "community",
    label: "Evolving Society",
    description: "Traditions, introductions, shared history, long sessions",
    icon: "🌍",
    color: "hsl(var(--society-god))",
  },
];

export function SocietyOverview() {
  const [activeStage, setActiveStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const cleanup = runSocietyVisualization(canvasRef, activeStage);
    return cleanup;
  }, [activeStage]);

  return (
    <section
      id="society"
      ref={containerRef}
      className="section relative overflow-hidden"
      aria-labelledby="society-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="society-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            From Person → Society
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Durable state builds up. Intelligence only activates when interaction requires it.
          </p>
        </div>

        {/* Stage Navigation */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
          role="tablist"
          aria-label="Society building stages"
        >
          {SOCIETY_STAGES.map((stage, i) => (
            <button
              key={stage.id}
              role="tab"
              aria-selected={activeStage === i}
              aria-controls={`panel-${stage.id}`}
              id={`tab-${stage.id}`}
              onClick={() => setActiveStage(i)}
              className={cn(
                "flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeStage === i
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))/5] shadow-glow"
                  : "border-transparent hover:border-[hsl(var(--border))] bg-muted/50"
              )}
            >
              <span className="text-2xl" aria-hidden="true">{stage.icon}</span>
              <div className="text-left">
                <span className="font-semibold text-foreground">{stage.label}</span>
                <div className="text-xs text-muted-foreground">{stage.description}</div>
              </div>
              {activeStage === i && (
                <span className="ml-auto badge-primary">ACTIVE</span>
              )}
            </button>
          ))}
        </div>

        {/* Content Panels */}
        <div
          className="relative min-h-[400px]"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          <div className="relative h-80 w-full max-w-4xl mx-auto">
            <canvas
              ref={canvasRef}
              className="w-full h-full rounded-xl border border-border/50"
              aria-label={`Society visualization showing ${SOCIETY_STAGES[activeStage].label.toLowerCase()} stage`}
            />
          </div>

          <div className="mt-8" role="tabpanel" aria-labelledby={`tab-${SOCIETY_STAGES[activeStage].id}`}>
            <StageDetails stage={SOCIETY_STAGES[activeStage]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StageDetails({ stage }: { stage: typeof SOCIETY_STAGES[0] }) {
  const details = {
    person: {
      title: "Person — The Durable Core",
      points: [
        "Stable UUID — persists across restarts, provider changes, years",
        "Biography + personality + interests + current state (mood, availability)",
        "Assigned roles (29 available: friend, mentor, wildcard...)",
        "Social intensity: quiet | low | normal | social | very_social | do_not_disturb",
        "Zero inference to create — pure structured state in SQLite",
      ],
      code: `kernel.createPerson({
  name: "Emma Reyes",
  biography: "Product designer...",
  identity: { core: "warm, honest..." },
  interests: ["photography", "hiking"],
  currentState: { mood: 0.4 }
})`,
    },
    relationships: {
      title: "Relationships — Inertia-Gated Evolution",
      points: [
        "7 dimensions: familiarity, trust, affection, attraction, respect, comfort, shared_history",
        "Status ladder: stranger → acquaintance → friend → close_friend → best_friend → romantic_interest → partner → spouse",
        "Inertia: learningRate = 0.15 (one interaction ≠ spouse)",
        "Privacy scopes: private | person_user_shared | circle | public",
        "Landmarks: shared-history memories stored once per pair",
      ],
      code: `kernel.relate(personA, personB, {
  familiarity: 0.15,
  trust: 0.10,
  affection: 0.08
}) // Inertia applies automatically`,
    },
    circles: {
      title: "Circles — Named Communities",
      points: [
        "11 seeded circles: Inner Circle, Family, Travel Crew, Adventure Crew...",
        "Ordered membership — affects selection priority",
        "Circle-scoped memories and relationship visibility",
        "Kinds: inner | family | interest | neighborhood | work",
        "Dynamic: join/leave at runtime, zero inference cost",
      ],
      code: `const circleId = kernel.circles.create({
  name: "Weekend Hikers",
  kind: "interest",
  metadata: { region: "Pacific Northwest" }
})
kernel.joinCircle(circleId, personId)`,
    },
    community: {
      title: "Evolving Society — Traditions & History",
      points: [
        "Serendipity: deterministic eligibility → probability → introduction (zero inference creation)",
        "Landmarks: shared-history memories stored once per pair (Emma & Leo's 'first trail ritual')",
        "Timeline: per-person & per-circle event streams",
        "Sessions: rolling-window context (road trips, evenings, ambient)",
        "Introductions require deterministic eligibility + cooldown",
      ],
      code: `// Landmark (stored once per pair)
kernel.landmark(personA, personB, "tradition",
  "Emma & Leo have a standing 'first trail of spring' ritual", 0.9)`,
    },
  };

  const content = details[stage.id as keyof typeof details] || details.person;

  return (
    <div className="prose-custom max-w-3xl mx-auto animate-fade-in">
      <h3 className="font-display font-semibold text-heading-lg text-foreground mb-4">
        {stage.icon} {stage.label} — {content.title}
      </h3>
      <ul className="space-y-3 mb-6">
        {content.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: stage.color }} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="rounded-lg bg-muted/50 p-4 overflow-x-auto">
        <pre className="text-sm text-foreground"><code>{content.code}</code></pre>
      </div>
    </div>
  );
}
