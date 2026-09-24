"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  getCanvasVariableReader,
  resolveCanvasColor,
  resolveCanvasColors,
} from "@/lib/canvas-colors";
import { Zap, Database, Cpu, Shield, Eye, Network, Users } from "lucide-react";

const PIPELINE_STAGES = [
  {
    id: "event",
    label: "EVENT",
    description: "USER_MESSAGE, GROUP_INTERACTION, PROACTIVE_REACH, SESSION_MESSAGE",
    icon: Zap,
    color: "hsl(var(--primary))",
    detail: "Every interaction enters as a typed event with actor, participants, circle, payload",
  },
  {
    id: "cache",
    label: "CACHE LOOKUP",
    description: "Content-hash keyed on shape + modelClass + context sections",
    icon: Database,
    color: "hsl(var(--accent))",
    detail: "Hit → return $0 instantly. Miss → proceed. Dependencies = selected person IDs for invalidation",
  },
  {
    id: "state",
    label: "STATE / DB LOOKUP",
    description: "Person, roles, relationships, circles, timeline, memory — all zero-inference",
    icon: Cpu,
    color: "hsl(var(--society-relationship))",
    detail: "Only selected participants' relevant data retrieved. Privacy scopes enforced at read time",
  },
  {
    id: "relevance",
    label: "RELEVANCE SCORING",
    description: "Deterministic scoring: intensity + circle + relationship + recency + topic",
    icon: Eye,
    color: "hsl(var(--society-circle))",
    detail: "Hard cap: ≤3 speakers. Silent is valid (no eligible → no inference, no fake chatter)",
  },
  {
    id: "selection",
    label: "PARTICIPANT SELECTION",
    description: "Top-K scoring with recency penalty and intensity boost",
    icon: Users,
    color: "hsl(var(--society-inference))",
    detail: "Only selected speakers ever enter model context. Others remain completely dormant",
  },
  {
    id: "context",
    label: "CONTEXT COMPILATION",
    description: "BASELINE + ROLE + RELATIONSHIP + MEMORY sections, bounded by token budget",
    icon: Network,
    color: "hsl(var(--society-god))",
    detail: "≤12k tokens, ≤30 sections. circuit_explosion breaker hard-trips on overflow",
  },
  {
    id: "budget",
    label: "BUDGET DECISION",
    description: "Kill switch → per-event cap → background cap → token ceilings → tier gate → hourly/daily spend",
    icon: Shield,
    color: "hsl(var(--destructive))",
    detail: "Fail closed: any refusal → deterministic fallback. blockedCalls incremented for audit",
  },
  {
    id: "inference",
    label: "INFERENCE (≤1 CALL)",
    description: "IntelligenceGateway → ModelRouter → Provider → structured SceneOutput",
    icon: Zap,
    color: "hsl(var(--primary))",
    detail: "MockProvider default ($0). Real providers only when budget allows. Validation before persistence",
  },
  {
    id: "persistence",
    label: "PERSISTENCE",
    description: "Timeline, memory, relationships, followups, serendipity, telemetry — all applied",
    icon: Database,
    color: "hsl(var(--society-god))",
    detail: "Event status: persisted | deterministic_fallback | silent | no_action. Full audit trail",
  },
];

export function GodKernelVisual() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
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

  // Pipeline flow animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const readCssVariable = getCanvasVariableReader(canvas);
    const canvasColors = resolveCanvasColors(
      {
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        mutedForeground: "hsl(var(--muted-foreground))",
      },
      readCssVariable
    );
    const canvasStages = PIPELINE_STAGES.map((stage) => ({
      ...stage,
      canvasColor: resolveCanvasColor(stage.color, readCssVariable),
    }));

    const stagePositions = PIPELINE_STAGES.map((_, i) => ({
      x: 80 + (i / (PIPELINE_STAGES.length - 1)) * (width - 160),
      y: height / 2,
    }));

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      stage: number;
      progress: number;
      color: string;
      size: number;
      opacity: number;
    }> = [];

    let lastTime = performance.now();
    let animationId = 0;

    const animate = (time: number) => {
      if (!ctx) return;
      const dt = Math.min((time - lastTime) / 1000, 1 / 30);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw pipeline path
      ctx.strokeStyle = canvasColors.border;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.lineDashOffset = -time / 200;
      ctx.beginPath();
      ctx.moveTo(stagePositions[0].x, stagePositions[0].y);
      for (let i = 1; i < stagePositions.length; i++) {
        ctx.lineTo(stagePositions[i].x, stagePositions[i].y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw stage nodes
      stagePositions.forEach((pos, i) => {
        const stage = canvasStages[i];
        const isActive = activeStage === i;

        // Connection glow to next
        if (i < stagePositions.length - 1) {
          const nextPos = stagePositions[i + 1];
          const activeNext = activeStage === i + 1;
          ctx.strokeStyle = activeNext ? stage.canvasColor : canvasColors.border;
          ctx.lineWidth = activeNext ? 3 : 1;
          ctx.globalAlpha = activeNext ? 0.8 : 0.3;
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y);
          ctx.lineTo(nextPos.x, nextPos.y);
          ctx.stroke();
        }

        // Node glow
        if (isActive) {
          const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 50);
          gradient.addColorStop(0, stage.canvasColor);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.save();
          ctx.globalAlpha = 0.25;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 50, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Node circle
        ctx.strokeStyle = isActive ? stage.canvasColor : canvasColors.border;
        ctx.lineWidth = isActive ? 3 : 2;
        ctx.globalAlpha = isActive ? 1 : 0.6;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 28, 0, Math.PI * 2);
        ctx.stroke();

        // Inner fill
        ctx.fillStyle = isActive ? stage.canvasColor : canvasColors.background;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fill();

        // Icon
        // Draw a simple representation since we can't render React components on canvas
        ctx.fillStyle = isActive ? canvasColors.background : canvasColors.mutedForeground;
        ctx.font = "20px system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const icons = ["⚡", "💾", "🔍", "🎯", "👥", "📦", "🛡️", "⚡", "💾"];
        ctx.fillText(icons[i], pos.x, pos.y + 7);

        // Label
        ctx.fillStyle = isActive ? stage.canvasColor : canvasColors.mutedForeground;
        ctx.font = "10px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(stage.label, pos.x, pos.y + 45);
      });

      // Spawn particles
      if (Math.random() < 0.03) {
        const startStage = Math.floor(Math.random() * (PIPELINE_STAGES.length - 1));
        const start = stagePositions[startStage];
        const end = stagePositions[startStage + 1];
        particles.push({
          x: start.x,
          y: start.y,
          vx: (end.x - start.x) / 1000,
          vy: (end.y - start.y) / 1000,
          stage: startStage,
          progress: 0,
          color: canvasStages[startStage].canvasColor,
          size: 3 + Math.random() * 2,
          opacity: 1,
        });
      }

      // Update and draw particles
      particles = particles.filter((p) => {
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.progress += dt;
        p.opacity = 1 - p.progress;

        if (p.progress >= 1) return false;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [activeStage]);

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="section relative overflow-hidden"
      aria-labelledby="architecture-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="architecture-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            God Kernel Pipeline
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Every event flows through this deterministic pipeline. Intelligence is the last rung — most scenes stop before it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Visual Pipeline */}
          <div
            className="relative"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out" }}
          >
            <div className="relative h-64 w-full rounded-2xl border border-border/50 bg-card overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                aria-label="Animated pipeline showing event flow through God Kernel stages"
              />
            </div>
          </div>

          {/* Stage Details */}
          <div
            className="space-y-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
          >
            <h3 className="font-display font-semibold text-heading-lg text-foreground mb-6">
              Pipeline Stages
            </h3>
            <div className="max-h-[500px] overflow-y-auto pr-4">
              {PIPELINE_STAGES.map((stage, i) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  index={i}
                  isActive={activeStage === i}
                  onHover={() => setActiveStage(i)}
                  onLeave={() => setActiveStage(null)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Key Invariants */}
        <div
          className="mt-16 grid md:grid-cols-3 gap-6"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
        >
          <InvariantCard
            icon={Zap}
            title="One Call Per Event"
            description="maxCallsPerEvent = 1 enforced by BudgetGovernor. A 3-person scene = 1 call."
          />
          <InvariantCard
            icon={Shield}
            title="Fail Closed"
            description="Kill switch, budget ceilings, provider unavailability all block before inference → deterministic fallback"
          />
          <InvariantCard
            icon={Eye}
            title="Zero Background Inference"
            description="backgroundModelCalls = 0 by default. Scheduled followups resolve deterministically at $0"
          />
        </div>
      </div>
    </section>
  );
}

function StageCard({
  stage,
  index,
  isActive,
  onHover,
  onLeave,
}: {
  stage: typeof PIPELINE_STAGES[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = stage.icon;
  return (
    <article
      className={cn(
        "relative rounded-xl border p-4 transition-all duration-300 cursor-pointer",
        "hover:shadow-elevation-2 hover:border-primary/30",
        isActive
          ? "bg-[hsl(var(--primary))/5] border-primary/30 shadow-glow"
          : "bg-muted/30 border-transparent"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `color-mix(in srgb, ${stage.color} 8%, transparent)` }}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" style={{ color: stage.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <h4 className="font-semibold text-foreground">{stage.label}</h4>
            {isActive && <span className="ml-auto badge-primary text-xs">ACTIVE</span>}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{stage.description}</p>
          <p className="text-xs text-muted-foreground/70">{stage.detail}</p>
        </div>
        {isActive && (
          <div className="absolute -right-2 -top-2 w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
        )}
      </div>
    </article>
  );
}

function InvariantCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center">
      <Icon className="h-10 w-10 mx-auto text-primary mb-4" />
      <h4 className="font-semibold text-foreground mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}