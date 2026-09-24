import assert from "node:assert/strict";
import test from "node:test";
import { resolveCanvasColors } from "../src/lib/canvas-colors.ts";
import { calculateVerifiedScenarioCosts } from "../src/lib/cost-model.ts";

const variables: Record<string, string> = {
  "--society-dormant": "215 16% 47%",
  "--border": "220 13% 91%",
};

const readVariable = (name: string) => variables[name] ?? "";

test("resolves HSL CSS variables into canvas-compatible colors", () => {
  assert.deepEqual(
    resolveCanvasColors(
      {
        dormant: "hsl(var(--society-dormant))",
        border: "hsl(var(--border))",
      },
      readVariable
    ),
    {
      dormant: "hsl(215 16% 47%)",
      border: "hsl(220 13% 91%)",
    }
  );
});

test("preserves colors that do not reference CSS variables", () => {
  assert.deepEqual(
    resolveCanvasColors(
      { gradientEnd: "transparent", literal: "#123456" },
      readVariable
    ),
    {
      gradientEnd: "transparent",
      literal: "#123456",
    }
  );
});

test("calculates the core-verified scenario costs", () => {
  assert.deepEqual(
    calculateVerifiedScenarioCosts().map(({ name, calls, cost }) => ({
      name,
      calls,
      cost,
    })),
    [
      { name: "1:1 Conversation", calls: 16, cost: 0.44 },
      { name: "3-Person Group", calls: 12, cost: 0.33 },
      { name: "30-Message Evening", calls: 24, cost: 0.66 },
      { name: "Road Trip (24h)", calls: 32, cost: 0.88 },
      { name: "Proactive (10 candidates)", calls: 0, cost: 0 },
    ]
  );
});
