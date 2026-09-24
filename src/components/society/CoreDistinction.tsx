"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getCanvasVariableReader,
  resolveCanvasColor,
  resolveCanvasColors,
} from "@/lib/canvas-colors";

const CONCEPTS = [
  {
    id: "person",
    label: "PERSON",
    description: "Durable canonical identity — biography, personality, interests, social graph",
    color: "hsl(var(--society-dormant))",
    icon: "👤",
    details: [
      "Stable UUID across restarts",
      "Biography + personality + interests",
      "Current state (mood, availability)",
      "Never an agent, never a prompt",
    ],
  },
  {
    id: "role",
    label: "ROLE",
    description: "Reusable behavior/capability set — assigned at zero cost",
    color: "hsl(var(--society-relationship))",
    icon: "🎭",
    details: [
      "29 seeded roles (friend, mentor, wildcard...)",
      "Assigning creates zero inference",
      "Composable: one person, many roles",
      "Context filters relevance per scene",
    ],
  },
  {
    id: "actor",
    label: "ACTOR",
    description: "Ephemeral per-scene persona — materialized from Person + Roles + Relationships + Memory",
    color: "hsl(var(--society-circle))",
    icon: "🎬",
    details: [
      "Created at scene start, discarded after",
      "Bounded: ≤5 memories, ≤4 relationships",
      "Only selected speakers enter context",
      "Dies when scene ends",
    ],
  },
  {
    id: "model",
    label: "MODEL",
    description: "Capability class — social.mock → nano → standard → deep",
    color: "hsl(var(--society-inference))",
    icon: "🧠",
    details: [
      "Provider-neutral capability routing",
      "Switching routes never touches Person",
      "social.mock = $0, social.deep = premium",
      "Escalation tracked, never implicit",
    ],
  },
  {
    id: "grokbot",
    label: "GROKBOT",
    description: "Optional premium inference route — a route, not an actor",
    color: "hsl(var(--society-god))",
    icon: "⚡",
    details: [
      "Registered as social.deep provider",
      "Never owns Person identity or state",
      "Disabled by default — fully optional",
      "Bridge contract: BoundedScenePackage",
    ],
  },
];

export function CoreDistinction() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="core-distinction"
      ref={containerRef}
      className="section relative overflow-hidden"
      aria-labelledby="core-distinction-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            id="core-distinction-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            The Central Equation
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Five concepts, deliberately separate. Understanding this changes how you think about AI societies.
          </p>
        </div>

        {/* Equation Display */}
        <div
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
        >
          {CONCEPTS.map((concept, i) => (
            <div key={concept.id} className="flex items-center gap-3">
              <button
                className={cn(
                  "flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeIndex === i
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))/5] shadow-glow"
                    : "border-transparent hover:border-[hsl(var(--border))] bg-muted/50"
                )}
                onClick={() => setActiveIndex(i)}
                aria-pressed={activeIndex === i}
                aria-label={concept.label}
              >
                <span className="text-3xl" aria-hidden="true">{concept.icon}</span>
                <span className="font-display font-semibold text-heading-sm text-foreground">
                  {concept.label}
                </span>
                {i < CONCEPTS.length - 1 && (
                  <span className="text-muted-foreground text-2xl font-light select-none" aria-hidden="true">
                    ≠
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div
          className="relative"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {CONCEPTS.map((concept, i) => (
                <div
                  key={concept.id}
                  className={cn(
                    "rounded-xl border p-6 transition-all duration-300",
                    activeIndex === i
                      ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))/5] shadow-glow"
                      : "border-transparent bg-muted/30 opacity-60"
                  )}
                  style={{
                    opacity: activeIndex === i ? 1 : 0.4,
                    transform: activeIndex === i ? "translateX(0)" : "translateX(-10px)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: `color-mix(in srgb, ${concept.color} 8%, transparent)` }}
                      aria-hidden="true"
                    >
                      {concept.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-heading-md text-foreground">
                        {concept.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">{concept.description}</p>
                    </div>
                    {activeIndex === i && (
                      <span className="ml-auto badge-primary animate-fade-in">ACTIVE</span>
                    )}
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {concept.details.map((detail, di) => (
                      <li key={di} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: concept.color }} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="hidden lg:block">
              <VisualEquation activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisualEquation({ activeIndex }: { activeIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const readCssVariable = getCanvasVariableReader(canvas);
    const canvasColors = resolveCanvasColors(
      {
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        mutedForeground: "hsl(var(--muted-foreground))",
      },
      readCssVariable
    );
    let animationId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw flowing connections between concepts
      const concepts = CONCEPTS.map((c, i) => ({
        ...c,
        canvasColor: resolveCanvasColor(c.color, readCssVariable),
        x: centerX + Math.cos((i / CONCEPTS.length) * Math.PI * 2 - Math.PI / 2) * Math.min(width, height) * 0.35,
        y: centerY + Math.sin((i / CONCEPTS.length) * Math.PI * 2 - Math.PI / 2) * Math.min(width, height) * 0.35,
      }));

      // Draw connections
      concepts.forEach((c, i) => {
        const next = concepts[(i + 1) % concepts.length];

        // Animated dashed line
        ctx.strokeStyle = i === activeIndex ? c.canvasColor : canvasColors.border;
        ctx.lineWidth = i === activeIndex ? 2 : 1;
        ctx.setLineDash([10, 10]);
        ctx.lineDashOffset = -Date.now() / 50;
        ctx.globalAlpha = i === activeIndex ? 0.8 : 0.3;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // Draw nodes
      concepts.forEach((c, i) => {
        const isActive = i === activeIndex;
        const pulse = Math.sin(Date.now() / 500) * 0.1 + 1;

        // Outer glow
        if (isActive) {
          const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 60 * pulse);
          gradient.addColorStop(0, c.canvasColor);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 60 * pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Node circle
        ctx.strokeStyle = isActive ? c.canvasColor : canvasColors.border;
        ctx.lineWidth = isActive ? 3 : 1;
        ctx.globalAlpha = isActive ? 1 : 0.5;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 30, 0, Math.PI * 2);
        ctx.stroke();

        // Inner fill
        ctx.fillStyle = isActive ? c.canvasColor : canvasColors.background;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 24, 0, Math.PI * 2);
        ctx.fill();

        // Icon
        ctx.font = "24px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isActive ? canvasColors.background : canvasColors.mutedForeground;
        ctx.fillText(c.icon, c.x, c.y + 8);

        // Label
        ctx.font = "12px system-ui";
        ctx.fillStyle = isActive ? c.canvasColor : canvasColors.mutedForeground;
        ctx.textAlign = "center";
        ctx.fillText(c.label, c.x, c.y + 45);
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [activeIndex]);

  return (
    <div className="relative h-96 w-full max-w-md mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label={`Visual representation of ${CONCEPTS[activeIndex].label} in the central equation`}
      />
    </div>
  );
}
