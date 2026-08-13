export type AuraMeaningState = "aura" | "analysis" | "ai";

export const AURA_MEANINGS: Array<{
  id: AuraMeaningState;
  label: string;
  durationMs: number;
  description: string;
}> = [
  {
    id: "aura",
    label: "Aura",
    durationMs: 2500,
    description:
      "Represents identity, individuality, skin, beauty, and confidence.",
  },
  {
    id: "analysis",
    label: "Analysis",
    durationMs: 2500,
    description:
      "Represents transforming a simple selfie into meaningful skin insights.",
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    durationMs: 3000,
    description: "Represents the AI technology powering AuraAI.",
  },
];

export const AURA_PRINCIPLES = [
  {
    letter: "A",
    title: "Accurate",
    body: "Insights grounded in data, not assumptions.",
  },
  {
    letter: "U",
    title: "Understandable",
    body: "Complex analysis, made simple.",
  },
  {
    letter: "R",
    title: "Reliable",
    body: "Consistent experiences you can trust.",
  },
  {
    letter: "A",
    title: "Adaptive",
    body: "Intelligence that evolves with every insight.",
  },
] as const;
