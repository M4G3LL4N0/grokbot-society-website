"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  getCanvasVariableReader,
  resolveCanvasColor,
  resolveCanvasColors,
} from "@/lib/canvas-colors";
import { Sparkles, Users, Zap, Shield } from "lucide-react";

const SCENE_EXAMPLES = [
  {
    prompt: "Anyone up for a spontaneous road trip this weekend?",
    speakers: [
      { name: "Sam", role: "Comic Relief", text: "\"Ha, that's a vibe. I'm in.\"", color: "hsl(var(--society-active))" },
      { name: "Emma", role: "Close Friend", text: "\"Sounds good — tell me more about spontaneous road trip this weekend??\"", color: "hsl(var(--society-relationship))" },
      { name: "Leo", role: "Travel Companion", text: "\"I've been thinking about exactly that. Spontaneous road trip feels like the right next step.\"", color: "hsl(var(--society-circle))" },
    ],
    meta: { calls: 1, tokens: "2,847", cost: "$0.000", time: "147ms" },
  },
  {
    prompt: "Emma just got promoted! How should we celebrate?",
    speakers: [
      { name: "Julian", role: "Romantic Interest", text: "\"Dinner at that place she's been wanting to try. My treat.\"", color: "hsl(var(--society-relationship))" },
      { name: "Priya", role: "Intellectual Friend", text: "\"Or a weekend cabin trip — she's been stressed lately.\"", color: "hsl(var(--society-circle))" },
      { name: "Sam", role: "Social Connector", text: "\"Both. Dinner Friday, cabin Saturday. I'll handle logistics.\"", color: "hsl(var(--society-active))" },
    ],
    meta: { calls: 1, tokens: "3,102", cost: "$0.000", time: "162ms" },
  },
];

export function OneInferenceMultiple() {
  const [selectedScene, setSelectedScene] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);

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

  const runDemo = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 2000);
  };

  return (
    <section
      id="one-inference"
      ref={containerRef}
      className="section relative overflow-hidden bg-muted/30"
      aria-labelledby="one-inference-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            id="one-inference-heading"
            className="text-display-md font-display font-bold text-foreground mb-4"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease-out" }}
          >
            One Inference, Multiple People
          </h2>
          <p className="text-body-lg text-muted-foreground">
            A group chat is ONE structured generation returning multiple messages — never one call per character.
          </p>
        </div>

        {/* Scene Selector */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.2s" }}
          role="tablist"
        >
          {SCENE_EXAMPLES.map((scene, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={selectedScene === i}
              onClick={() => setSelectedScene(i)}
              className={cn(
                "px-5 py-2.5 rounded-xl border-2 font-medium text-sm transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedScene === i
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))/5] text-foreground"
                  : "border-transparent hover:border-[hsl(var(--border))] bg-muted/50 text-muted-foreground"
              )}
            >
              Scene {i + 1}
            </button>
          ))}
        </div>

        {/* Main Demo Area */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Scene Visualization */}
          <div
            className="relative"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.4s" }}
          >
            <SceneVisualization
              scene={SCENE_EXAMPLES[selectedScene]}
              animating={animating}
              onRun={runDemo}
            />
          </div>

          {/* Explanation Panel */}
          <div
            className="space-y-6"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(20px)" : "translateY(40px)", transition: "all 0.8s ease-out 0.6s" }}
          >
            <div className="rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-6">
              <h3 className="font-display font-semibold text-heading-lg text-foreground mb-4">
                How It Works
              </h3>
              <ol className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">1</span>
                  <span><strong>Event intake:</strong> User message enters EventEngine as GROUP_INTERACTION</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">2</span>
                  <span><strong>Participant selection:</strong> ParticipantSelector scores all circle members (intensity, relationships, recency) → picks ≤3</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">3</span>
                  <span><strong>Context compilation:</strong> ContextCompiler builds BASELINE + ROLE + RELATIONSHIP + MEMORY sections — ONLY for selected speakers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">4</span>
                  <span><strong>Budget decision:</strong> BudgetGovernor checks kill switch, caps, token limits → reserves 1 call slot</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">5</span>
                  <span><strong>Single inference:</strong> IntelligenceGateway routes to MockProvider (default) → returns structured SceneOutput with all messages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">6</span>
                  <span><strong>Validation + Persistence:</strong> SocialDirector validates output → applies memory/relationship/timeline candidates → persists event</span>
                </li>
              </ol>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <MetricCard
                icon={Zap}
                value="1"
                label="Model Call"
                description="Per scene, regardless of speakers"
              />
              <MetricCard
                icon={Users}
                value="≤3"
                label="Speakers"
                description="Hard cap (hardMaxSpeakers)"
              />
              <MetricCard
                icon={Shield}
                value="$0"
                label="Default Cost"
                description="MockProvider = zero spend"
              />
            </div>

            <div className="rounded-xl border bg-muted/30 p-6">
              <h4 className="font-semibold text-foreground mb-3">What This Enables</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> 1,000 people, 15 active → dormant population adds $0</li>
                <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> No per-message inference scaling</li>
                <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Context stays bounded, never explodes</li>
                <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Deterministic validation, no LLM-judging-LLM</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneVisualization({ scene, animating, onRun }: { scene: typeof SCENE_EXAMPLES[0]; animating: boolean; onRun: () => void }) {
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
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const readCssVariable = getCanvasVariableReader(canvas);
    const canvasColors = resolveCanvasColors(
      {
        card: "hsl(var(--card))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        border: "hsl(var(--border))",
      },
      readCssVariable
    );

    // Animation state
    let phase = 0; // 0=idle, 1=selecting, 2=compiling, 3=inference, 4=output
    let phaseProgress = 0;
    let lastTime = performance.now();
    let speakerStates = scene.speakers.map((speaker) => ({
      ...speaker,
      canvasColor: resolveCanvasColor(speaker.color, readCssVariable),
      opacity: 0,
      y: 0,
      scale: 0.8,
    }));

    const animate = (time: number) => {
      if (!ctx) return;
      const dt = Math.min((time - lastTime) / 1000, 1 / 30);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // Background
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = canvasColors.muted;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Draw pipeline stages as background
      const stages = [
        { label: "INTAKE", x: centerX - 280, y: centerY },
        { label: "SELECT", x: centerX - 140, y: centerY },
        { label: "COMPILE", x: centerX, y: centerY },
        { label: "BUDGET", x: centerX + 140, y: centerY },
        { label: "INFERENCE", x: centerX + 280, y: centerY },
      ];

      stages.forEach((stage, i) => {
        const active = animating && phase > i;
        const completing = animating && phase === i && phaseProgress > 0.5;

        ctx.strokeStyle = active ? canvasColors.primary : canvasColors.border;
        ctx.lineWidth = active ? 2 : completing ? 1.5 : 1;
        ctx.setLineDash(active ? [5, 5] : []);
        ctx.lineDashOffset = -time / 100;

        // Circle
        ctx.beginPath();
        ctx.arc(stage.x, stage.y, 35, 0, Math.PI * 2);
        ctx.stroke();

        // Label
        ctx.fillStyle = active ? canvasColors.primary : canvasColors.mutedForeground;
        ctx.font = "10px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(stage.label, stage.x, stage.y + 55);

        // Arrow to next
        if (i < stages.length - 1) {
          ctx.beginPath();
          ctx.moveTo(stage.x + 35, stage.y);
          ctx.lineTo(stages[i + 1].x - 35, stages[i + 1].y);
          ctx.stroke();
        }
      });
      ctx.setLineDash([]);

      // Speaker bubbles appearing
      if (animating && phase >= 4) {
        speakerStates.forEach((speaker, i) => {
          const x = centerX - 200 + i * 130;

          // Animate in
          if (speaker.opacity < 1) {
            speaker.opacity = Math.min(1, speaker.opacity + dt * 2);
            speaker.y = Math.max(0, speaker.y - dt * 100);
            speaker.scale = Math.min(1, speaker.scale + dt * 1.5);
          }

          ctx.save();
          ctx.globalAlpha = speaker.opacity;
          ctx.translate(x, centerY + 120 + speaker.y);
          ctx.scale(speaker.scale, speaker.scale);

          // Bubble
          const bubbleWidth = 200;
          const bubbleHeight = 80;
          const radius = 16;

          ctx.fillStyle = canvasColors.card;
          ctx.strokeStyle = speaker.canvasColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(-bubbleWidth / 2, -bubbleHeight / 2, bubbleWidth, bubbleHeight, radius);
          ctx.fill();
          ctx.stroke();

          // Speaker name
          ctx.fillStyle = canvasColors.foreground;
          ctx.font = "bold 12px system-ui";
          ctx.textAlign = "center";
          ctx.fillText(speaker.name, 0, -bubbleHeight / 2 + 20);

          // Role
          ctx.fillStyle = speaker.canvasColor;
          ctx.font = "10px system-ui";
          ctx.fillText(speaker.role, 0, -bubbleHeight / 2 + 38);

          // Message
          ctx.fillStyle = canvasColors.mutedForeground;
          ctx.font = "11px system-ui";
          ctx.textAlign = "center";
          // Wrap text
          const words = speaker.text.split(" ");
          let line = "";
          let lineY = bubbleHeight / 2 - 15;
          words.forEach((word) => {
            const testLine = line + word + " ";
            const metrics = ctx.measureText(testLine);
            if (metrics.width > bubbleWidth - 30 && line !== "") {
              ctx.fillText(line, 0, lineY);
              line = word + " ";
              lineY += 14;
            } else {
              line = testLine;
            }
          });
          ctx.fillText(line, 0, lineY);

          ctx.restore();
        });
      }

      // Phase progression
      if (animating) {
        phaseProgress += dt * 1.5;
        if (phaseProgress >= 1) {
          phaseProgress = 0;
          phase = Math.min(phase + 1, 5);
        }
      } else {
        phase = 0;
        phaseProgress = 0;
        speakerStates = speakerStates.map(s => ({ ...s, opacity: 0, y: 30, scale: 0.8 }));
      }

      ctx.restore();
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [scene, animating]);

  return (
    <div className="relative rounded-2xl border border-border/50 bg-card overflow-hidden">
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Live Scene Demo</h3>
        <button
          onClick={onRun}
          disabled={animating}
          className="btn-primary text-sm"
        >
          {animating ? "Running..." : "Run Demo"}
        </button>
      </div>
      <div className="relative h-80 w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          aria-label="Animated visualization of one inference producing multiple speakers"
        />
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, value, label, description }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string; description: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 text-center">
      <Icon className="h-8 w-8 mx-auto text-primary mb-3" />
      <div className="font-display font-bold text-3xl text-foreground mb-1">{value}</div>
      <div className="font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground mt-1">{description}</div>
    </div>
  );
}