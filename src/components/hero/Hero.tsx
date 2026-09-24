"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  getCanvasVariableReader,
  resolveCanvasColor,
  resolveCanvasColors,
} from "@/lib/canvas-colors";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

interface PersonNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isActive: boolean;
  activationTime: number;
  connections: string[];
  role: string;
  name: string;
}

const ROLES = [
  "friend",
  "mentor",
  "travel_companion",
  "intellectual_friend",
  "creative_friend",
  "wildcard",
];

const NAMES = [
  "Emma",
  "Julian",
  "Priya",
  "Leo",
  "Sam",
  "Alex",
  "Maya",
  "River",
  "Sage",
  "Nova",
  "Quinn",
  "Aria",
];

const COLORS = {
  dormant: "hsl(var(--society-dormant))",
  active: "hsl(var(--society-active))",
  relationship: "hsl(var(--society-relationship))",
  circle: "hsl(var(--society-circle))",
  inference: "hsl(var(--society-inference))",
};

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [nodes, setNodes] = useState<PersonNode[]>([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastActivationRef = useRef(0);
  const reducesMotion = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initializeNodes = useCallback((w: number, h: number) => {
    const newNodes: PersonNode[] = [];
    const count = Math.min(150, Math.floor((w * h) / 3000));

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.min(w, h) * (0.3 + Math.random() * 0.4);
      const cx = w / 2;
      const cy = h / 2;

      newNodes.push({
        id: `node-${i}`,
        x: cx + Math.cos(angle) * radius * 0.3 + (Math.random() - 0.5) * 100,
        y: cy + Math.sin(angle) * radius * 0.3 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 2,
        color: COLORS.dormant,
        isActive: false,
        activationTime: 0,
        connections: [],
        role: randomChoice(ROLES),
        name: randomChoice(NAMES),
      });
    }

    // Add a few special "seed" nodes near center
    const centerX = w / 2;
    const centerY = h / 2;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      newNodes.push({
        id: `seed-${i}`,
        x: centerX + Math.cos(angle) * 80,
        y: centerY + Math.sin(angle) * 80,
        vx: 0,
        vy: 0,
        radius: 4,
        color: COLORS.dormant,
        isActive: false,
        activationTime: 0,
        connections: [],
        role: ROLES[i],
        name: NAMES[i],
      });
    }

    setNodes(newNodes);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const w = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
        const h = canvasRef.current.parentElement?.clientHeight || window.innerHeight;
        setWidth(w);
        setHeight(h);
        canvasRef.current.width = w * window.devicePixelRatio;
        canvasRef.current.height = h * window.devicePixelRatio;
        canvasRef.current.style.width = `${w}px`;
        canvasRef.current.style.height = `${h}px`;
        initializeNodes(w, h);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initializeNodes]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !width || !height) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const readCssVariable = getCanvasVariableReader(canvasRef.current);
    const canvasColors = resolveCanvasColors(COLORS, readCssVariable);
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 1 / 30);
      lastTime = time;

      if (!ctx || !canvasRef.current) return;

      // Clear
      ctx.clearRect(0, 0, width * dpr, height * dpr);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Update and draw connections first
      const activeNodes = nodes.filter((n) => n.isActive);
      const allNodes = [...nodes];

      // Draw connections between active nodes
      ctx.strokeStyle = canvasColors.relationship;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.15;

      activeNodes.forEach((nodeA) => {
        activeNodes.forEach((nodeB) => {
          if (nodeA.id >= nodeB.id) return;
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        });
      });

      // Draw circle connections (nodes near each other form circles)
      const circles = new Map<string, PersonNode[]>();
      allNodes.forEach((node) => {
        const gridX = Math.floor(node.x / 150);
        const gridY = Math.floor(node.y / 150);
        const key = `${gridX},${gridY}`;
        if (!circles.has(key)) circles.set(key, []);
        circles.get(key)!.push(node);
      });

      circles.forEach((circleNodes) => {
        if (circleNodes.length >= 3) {
          ctx.strokeStyle = canvasColors.circle;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 0.1;
          ctx.beginPath();
          // Draw convex hull or simple connections
          const centerX = circleNodes.reduce((sum, n) => sum + n.x, 0) / circleNodes.length;
          const centerY = circleNodes.reduce((sum, n) => sum + n.y, 0) / circleNodes.length;
          circleNodes.forEach((node) => {
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(node.x, node.y);
          });
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;

      // Update and draw nodes
      allNodes.forEach((node) => {
        // Physics
        if (!node.isActive || (time - node.activationTime) > 8000) {
          // Drift toward center gently
          const cx = width / 2;
          const cy = height / 2;
          const dx = cx - node.x;
          const dy = cy - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 50) {
            node.vx += (dx / dist) * 0.005;
            node.vy += (dy / dist) * 0.005;
          }
        }

        // Mouse attraction for active nodes
        if (node.isActive) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300 && dist > 0) {
            const force = (300 - dist) / 300 * 0.05;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        // Damping
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Boundaries
        const margin = 50;
        if (node.x < margin) node.vx += 0.1;
        if (node.x > width - margin) node.vx -= 0.1;
        if (node.y < margin) node.vy += 0.1;
        if (node.y > height - margin) node.vy -= 0.1;

        node.x += node.vx * 60 * dt;
        node.y += node.vy * 60 * dt;

        // Deactivation
        if (node.isActive && (time - node.activationTime) > 8000) {
          node.isActive = false;
          node.color = COLORS.dormant;
        }

        // Draw node
        const isSeed = node.id.startsWith("seed-");
        const r = node.isActive ? node.radius * 2 : node.radius;

        // Glow for active nodes
        if (node.isActive) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
          gradient.addColorStop(0, canvasColors.active);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Ring for seed nodes
        if (isSeed) {
          ctx.strokeStyle = node.isActive ? canvasColors.active : canvasColors.dormant;
          ctx.lineWidth = node.isActive ? 2 : 1;
          ctx.globalAlpha = node.isActive ? 1 : 0.4;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Main node
        ctx.fillStyle = resolveCanvasColor(node.color, readCssVariable);
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Role indicator for active seed nodes
        if (node.isActive && isSeed) {
          ctx.font = "10px system-ui";
          ctx.fillStyle = canvasColors.active;
          ctx.textAlign = "center";
          ctx.fillText(node.role.replace("_", " "), node.x, node.y + r + 14);
        }
      });

      // Random activation
      const now = performance.now();
      if (now - lastActivationRef.current > 3000 + Math.random() * 4000) {
        const dormantSeeds = nodes.filter((n) => n.id.startsWith("seed-") && !n.isActive);
        if (dormantSeeds.length > 0) {
          const seed = randomChoice(dormantSeeds);
          seed.isActive = true;
          seed.activationTime = now;
          seed.color = COLORS.active;
          // Activate nearby dormant nodes
          allNodes.forEach((n) => {
            if (!n.isActive && !n.id.startsWith("seed-")) {
              const dx = n.x - seed.x;
              const dy = n.y - seed.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 180 && Math.random() < 0.3) {
                n.isActive = true;
                n.activationTime = now;
                n.color = COLORS.active;
              }
            }
          });
          lastActivationRef.current = now;
        }
      }

      // Click activation
      // (handled via mouse position attraction above)

      setNodes([...nodes]);
      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [nodes, width, height]);

  // Show CTA after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (reducesMotion || !width) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container-custom relative z-10">
          <HeroContent showCTA={showCTA} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ touchAction: "none" }}
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ touchAction: "none" }}
          aria-label="Living society constellation showing dormant and active synthetic people"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      </div>

      <div className="container-custom relative z-10">
        <HeroContent showCTA={showCTA} />
      </div>
    </section>
  );
}

function HeroContent({ showCTA }: { showCTA: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div
        className="max-w-4xl mx-auto"
        style={{
          animation: showCTA ? "fadeIn 1s ease-out forwards, slideUp 0.8s ease-out forwards" : "none",
          opacity: showCTA ? 1 : 0,
        }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-8 text-sm font-medium text-primary animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-soft absolute inset-0 rounded-full bg-primary opacity-50" />
            <span className="relative rounded-full bg-primary" />
          </span>
          Live on MockProvider • Zero Cost • 42 Tests Passing
        </div>

        <h1 className="text-display-xl font-display font-bold text-foreground mb-6 text-balance leading-tight">
          A society of synthetic people.
          <br />
          <span className="text-gradient">Without a swarm of expensive agents.</span>
        </h1>

        <p className="text-body-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
          Persistent people. Evolving relationships. Social circles. One bounded inference per scene.
          Population scales to thousands at near-zero cost.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/architecture"
            className="btn-primary group"
          >
            Explore the Architecture
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="https://github.com/M4G3LL4N0/grokbot-society"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline group"
          >
            <Github className="h-4 w-4" />
            View on GitHub
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 rounded-full bg-[hsl(var(--society-dormant))]" />
            <span>Dormant: 0 inference</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 rounded-full bg-[hsl(var(--society-active))] animate-pulse-soft" />
            <span>Active: 1 call/scene</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 rounded-full bg-[hsl(var(--society-circle))]" />
            <span>Circles: State</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 rounded-full bg-[hsl(var(--society-relationship))]" />
            <span>Relationships: State</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}