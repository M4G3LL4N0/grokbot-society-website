import {
  getCanvasVariableReader,
  resolveCanvasColor,
  resolveCanvasColors,
} from "@/lib/canvas-colors";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isActive: boolean;
  connections: number[];
  stage: number;
  label: string;
}

const COLORS = {
  person: "hsl(var(--society-dormant))",
  relationship: "hsl(var(--society-relationship))",
  circle: "hsl(var(--society-circle))",
  community: "hsl(var(--society-god))",
  dormant: "hsl(var(--society-dormant))",
};

export function initializeNodesForStage(
  stage: number,
  width: number,
  height: number,
  cx: number,
  cy: number
): Node[] {
  const nodes: Node[] = [];
  const colors = {
    person: COLORS.person,
    relationship: COLORS.relationship,
    circle: COLORS.circle,
    community: COLORS.community,
  };

  // Stage 0: Single person
  if (stage >= 0) {
    nodes.push({
      id: "person-0",
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      radius: 16,
      color: colors.person,
      isActive: true,
      connections: [],
      stage: 0,
      label: "Person",
    });
  }

  // Stage 1: Relationships
  if (stage >= 1) {
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      nodes.push({
        id: `rel-${i}`,
        x: cx + Math.cos(angle) * 140,
        y: cy + Math.sin(angle) * 140,
        vx: 0,
        vy: 0,
        radius: 10,
        color: colors.relationship,
        isActive: false,
        connections: [0],
        stage: 1,
        label: "",
      });
    }
    nodes[0].connections = [1, 2, 3, 4];
  }

  // Stage 2: Circles
  if (stage >= 2) {
    const circleCenters = [
      { x: -200, y: -100, label: "Inner Circle" },
      { x: 200, y: -100, label: "Travel Crew" },
      { x: -150, y: 150, label: "Intellectual" },
      { x: 150, y: 150, label: "Family" },
    ];

    circleCenters.forEach((circle, i) => {
      nodes.push({
        id: `circle-${i}`,
        x: cx + circle.x,
        y: cy + circle.y,
        vx: 0,
        vy: 0,
        radius: 20,
        color: colors.circle,
        isActive: false,
        connections: [],
        stage: 2,
        label: circle.label,
      });
    });

    for (let i = 1; i <= 4; i++) {
      nodes[i].connections = [...nodes[i].connections, 5 + Math.floor(i / 2)];
    }
  }

  // Stage 3: Community
  if (stage >= 3) {
    nodes.push({
      id: "community",
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      radius: 24,
      color: colors.community,
      isActive: false,
      connections: [5, 6, 7, 8],
      stage: 3,
      label: "Society",
    });
  }

  // Add background dormant nodes
  const count = Math.min(50, Math.floor((1000 * 600) / 5000)); // approximate
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: `dormant-${i}`,
      x: Math.random() * 1000,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 2 + Math.random() * 2,
      color: COLORS.dormant,
      isActive: false,
      connections: [],
      stage: 4,
      label: "",
    });
  }

  return nodes;
}

export function runSocietyVisualization(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  activeStage: number
): () => void {
  const canvas = canvasRef.current;
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

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
      ...COLORS,
      mutedForeground: "hsl(var(--muted-foreground))",
    },
    readCssVariable
  );

  let nodes = initializeNodesForStage(activeStage, width, height, width / 2, height / 2).map(
    (node) => ({
      ...node,
      color: resolveCanvasColor(node.color, readCssVariable),
    })
  );
  let lastTime = performance.now();

  const animate = (time: number) => {
    const dt = Math.min((time - lastTime) / 1000, 1 / 30);
    lastTime = time;

    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    // Update nodes
    nodes = nodes.map((node) => {
      const updated = { ...node };

      if (!updated.isActive) {
        const centerX = width / 2;
        const centerY = height / 2;
        const dx = centerX - updated.x;
        const dy = centerY - updated.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 50) {
          updated.vx += (dx / dist) * 0.003;
          updated.vy += (dy / dist) * 0.003;
        }
      }

      updated.vx *= 0.99;
      updated.vy *= 0.99;

      const margin = 30;
      if (updated.x < margin) updated.vx += 0.05;
      if (updated.x > width - margin) updated.vx -= 0.05;
      if (updated.y < margin) updated.vy += 0.05;
      if (updated.y > height - margin) updated.vy -= 0.05;

      updated.x += updated.vx * 60 * dt;
      updated.y += updated.vy * 60 * dt;

      return updated;
    });

    // Draw connections
    ctx.strokeStyle = canvasColors.relationship;
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.15;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      for (let j = 0; j < node.connections.length; j++) {
        const connIdx = node.connections[j];
        const target = nodes[connIdx];
        if (target) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.isActive) {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = node.color;
      ctx.globalAlpha = node.stage <= 3 ? 1 : 0.3;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      if (node.stage === 3) {
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (node.label && node.radius > 6) {
        ctx.font = "10px system-ui";
        ctx.fillStyle = canvasColors.mutedForeground;
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.radius + 12);
      }
    }

    ctx.restore();
    requestAnimationFrame(animate);
  };

  const animId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animId);
}