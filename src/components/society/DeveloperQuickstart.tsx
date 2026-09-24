"use client";

import { useRef, useEffect, useState } from "react";
import { Zap, CheckCircle } from "lucide-react";

const QUICKSTART_STEPS = [
  {
    title: "Clone & Install",
    description: "Get the code and install dependencies",
    commands: [
      "git clone https://github.com/M4G3LL4N0/grokbot-society.git",
      "cd grokbot-society",
      "pnpm install",
    ],
    verification: "pnpm typecheck && pnpm test",
  },
  {
    title: "Run the Demo",
    description: "Boot a live society on MockProvider ($0)",
    commands: ["pnpm dev"],
    verification: "Output shows 5 persons, 29 roles, 11 circles, 1 model call, $0 cost",
  },
  {
    title: "Use the CLI",
    description: "Persistent database with full operator control",
    commands: [
      "pnpm society start --db ./my-society.db",
      "pnpm society status --db ./my-society.db",
      "pnpm society people --db ./my-society.db",
      'pnpm society chat "Hello everyone!" --circle <INNER_CIRCLE_ID> --db ./my-society.db',
    ],
    verification: "Interactive REPL with 3-speaker bounded scenes at $0",
  },
  {
    title: "Explore the Society",
    description: "Inspect persons, relationships, circles, landmarks, sessions",
    commands: [
      "pnpm society person Emma --db ./my-society.db",
      "pnpm society circles --db ./my-society.db",
      "pnpm society landmarks Emma --db ./my-society.db",
      "pnpm society session start evening_social --db ./my-society.db",
      "pnpm society simulate --db ./my-society.db",
    ],
    verification: "Identity cards, relationship dims, landmarks, cost simulator output",
  },
];

const CODE_EXAMPLES = [
  {
    title: "Create a Person",
    description: "Zero inference — pure structured state",
    code: `const kernel = createKernel(
  { maxPersons: 1000 },
  { clock: new SimulatedClock() }
);

const person = kernel.createPerson({
  name: "Aria Chen",
  biography: "Urban explorer and street photographer.",
  identity: { core: "curious, observant, quietly intense" },
  personality: { summary: "notices what others miss" },
  interests: ["photography", "urban exploration", "coffee"],
  currentState: { mood: 0.3, availability: "available", socialIntensity: "normal" },
});

console.log(person.id); // p_...`,
  },
  {
    title: "Assign Roles",
    description: "Composable behavior at zero cost",
    code: `kernel.assignRole(person.id, "friend");
kernel.assignRole(person.id, "creative_friend");
kernel.assignRole(person.id, "storyteller");
kernel.assignRole(person.id, "listener");

// At scene time, only context-relevant roles compose into the Actor
const actor = kernel.composeActorContext(
  person.id,
  "event:123",
  [person.id, otherPerson.id],
  circleId
);
// actor.roles = [friend, creative_friend, storyteller, listener]`,
  },
  {
    title: "Run a Group Scene",
    description: "One inference, multiple speakers, bounded context",
    code: `const innerCircle = kernel.circles.list()
  .find(c => c.name === "Inner Circle");

const event = await kernel.tell(
  "Anyone up for a spontaneous road trip this weekend?",
  { circleId: innerCircle.id }
);

// event.payload.sceneResult.output.messages = [
//   { personId: "p_...", text: "Sounds good — tell me more...", person: "Sam" },
//   { personId: "p_...", text: "Ha, that's a vibe. I'm in.", person: "Emma" },
//   { personId: "p_...", text: "I've been thinking about exactly that...", person: "Leo" }
// ];

console.log(\`Model calls: \${kernel.stats().modelCalls}\`); // 1
console.log(\`Est. spend: $\${kernel.stats().totalCost.toFixed(6)}\`); // 0.000000`,
  },
  {
    title: "Inspect the Society",
    description: "Full introspection at zero cost",
    code: `// Person identity card
const card = kernel.identityCard(person.id);
console.log(card.name, card.archetype, card.essence, card.voice);

// Relationships
const rels = kernel.relationship.relationshipsFor(person.id);
rels.forEach(r => console.log(
  r.otherName, r.status, r.interactions,
  \`\${r.dims.familiarity.toFixed(2)}/\${r.dims.trust.toFixed(2)}/\${r.dims.affection.toFixed(2)}\`
));

// Landmarks (shared history)
const landmarks = kernel.memory.landmarksFor(person.id);
landmarks.forEach(l => console.log("•", l.content));

// Cost simulator
const sim = kernel.cost.simulate({ population: 5000 });
sim.forEach(s => console.log(
  s.name, s.modelCalls, \`$\${s.estimatedSpend.toFixed(4)}\`, s.note
));`,
  },
];

const MOCK_PROVIDER_INFO = {
  title: "MockProvider — The Default",
  description: "The entire system boots and runs through MockProvider with no paid model configured. It is a deterministic, zero-cost stand-in that still exercises the full structured single-inference scene protocol: one call in, one SceneOutput (multi-message) out.",
  features: [
    "Deterministic structured output (SceneProviderPayload)",
    "Exercises full gateway → cache → budget → provider → validation pipeline",
    "Returns multi-message scenes with memory/relationship/timeline/followup candidates",
    "Subject to all budget rules (kill switch, caps, token limits, tier gate)",
    "Cost: $0.000 per call, forever",
  ],
};

export function DeveloperQuickstart() {
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
      id="developers"
      ref={containerRef}
      className="section relative overflow-hidden"
      aria-labelledby="developers-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="developers-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            Developer Quickstart
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Working code in 60 seconds. MockProvider by default. Zero paid inference required.
          </p>
        </div>

        {/* Quickstart Steps */}
        <div
          className="mb-16"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            4 Steps to a Living Society
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {QUICKSTART_STEPS.map((step, i) => (
              <QuickstartStepCard key={step.title} step={step} index={i} delay={i * 150} />
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div
          className="mb-16"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            Code Examples
          </h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {CODE_EXAMPLES.map((example, i) => (
              <CodeExampleCard key={example.title} example={example} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* MockProvider Info */}
        <div
          className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-8"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.6s" }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Zap className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-heading-lg text-foreground">
                  {MOCK_PROVIDER_INFO.title}
                </h3>
                <p className="text-sm text-muted-foreground">{MOCK_PROVIDER_INFO.description}</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {MOCK_PROVIDER_INFO.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key APIs */}
        <div
          className="mt-12"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.8s" }}
        >
          <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6 text-center">
            Key APIs at a Glance
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <APICard
              title="kernel.tell(prompt, { circleId })"
              description="Main interaction entry. Returns SocietyEvent with sceneResult."
              category="Interaction"
            />
            <APICard
              title="kernel.ensureSeeded()"
              description="Idempotent seed (5 persons, 29 roles, 11 circles, 10 rels, 5 landmarks)."
              category="Seeding"
            />
            <APICard
              title="kernel.proactiveTick(circleId?)"
              description="Explicit proactive pass. Default off → 0 calls. Configurable relevance/cooldown/budget."
              category="Proactive"
            />
            <APICard
              title="kernel.identityCard(personId)"
              description="Compact frozen Person snapshot (name, archetype, essence, voice, interests, goals)."
              category="Identity"
            />
            <APICard
              title="kernel.composeActorContext(...)"
              description="Bounded Actor for one scene. Person + Roles + Relationships + Memory + SceneRef."
              category="Runtime"
            />
            <APICard
              title="kernel.usage()"
              description="Telemetry: calls, tokens, spend per person/circle/provider, blockedCalls, escalations, trips."
              category="Telemetry"
            />
            <APICard
              title="kernel.setKillSwitch(true)"
              description="Fail-closed kill switch. All inference blocked → deterministic fallback. blockedCalls increments."
              category="Safety"
            />
            <APICard
              title="kernel.sessionStart/Context/End"
              description="Long-session abstraction. Rolling window (6 msgs) + participant cards (4)."
              category="Sessions"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickstartStepCard({ step, index, delay }: { step: typeof QUICKSTART_STEPS[0]; index: number; delay: number }) {
  return (
    <div
      className="relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-elevation-3"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
          {index + 1}
        </span>
        <div>
          <h4 className="font-semibold text-foreground">{step.title}</h4>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {step.commands.map((cmd, i) => (
          <code key={i} className="font-mono text-sm text-foreground bg-muted px-3 py-2 rounded-lg block">{cmd}</code>
        ))}
      </div>
      <div className="pt-3 border-t border-border/50">
        <p className="text-xs text-muted-foreground mb-1">Verification:</p>
        <code className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">{step.verification}</code>
      </div>
    </div>
  );
}

function CodeExampleCard({ example, delay }: { example: typeof CODE_EXAMPLES[0]; delay: number }) {
  return (
    <div
      className="rounded-2xl border bg-card overflow-hidden"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.5s ease-out",
      }}
    >
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-foreground">{example.title}</h4>
          <p className="text-sm text-muted-foreground">{example.description}</p>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto"><code className="font-mono text-sm text-foreground">{example.code}</code></pre>
    </div>
  );
}

function APICard({ title, description, category }: { title: string; description: string; category: string }) {
  return (
    <div className="rounded-xl border bg-card p-4 transition-all duration-300 hover:shadow-elevation-2 hover:border-primary/30">
      <span className="badge-primary text-xs mb-2">{category}</span>
      <h4 className="font-mono text-sm font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}