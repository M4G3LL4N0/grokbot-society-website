export const VERIFIED_COST_PER_CALL = 0.0275;

export const VERIFIED_COST_SCENARIOS = [
  { name: "1:1 Conversation", messages: 20, baseCalls: 16, color: "hsl(var(--primary))" },
  { name: "3-Person Group", messages: 15, baseCalls: 12, color: "hsl(var(--accent))" },
  { name: "30-Message Evening", messages: 30, baseCalls: 24, color: "hsl(var(--society-circle))" },
  { name: "Road Trip (24h)", messages: 40, baseCalls: 32, color: "hsl(var(--society-relationship))" },
  { name: "Proactive (10 candidates)", messages: 0, baseCalls: 0, color: "hsl(var(--society-god))" },
] as const;

export function calculateVerifiedScenarioCosts() {
  return VERIFIED_COST_SCENARIOS.map((scenario) => ({
    ...scenario,
    calls: scenario.baseCalls,
    cost: Number((scenario.baseCalls * VERIFIED_COST_PER_CALL).toFixed(2)),
  }));
}
