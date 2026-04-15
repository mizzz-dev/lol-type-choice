export const AXIS_KEYS = [
  "initiative",
  "riskTolerance",
  "decisionStyle",
  "winCondition",
  "combatRange",
  "processing",
  "tempo",
  "responsibility"
] as const;

export type AxisKey = (typeof AXIS_KEYS)[number];

export type AxisScores = Record<AxisKey, number>;

export type Role = "TOP" | "JG" | "MID" | "ADC" | "SUP";

export type OptionValue = -2 | -1 | 0 | 1 | 2;

export interface QuestionAxisWeight {
  axis: AxisKey;
  weight: number;
}

export interface Question {
  id: string;
  order: number;
  text: string;
  reverseScored: boolean;
  weights: QuestionAxisWeight[];
}

export interface TypeRule {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  conditions: Partial<Record<AxisKey, { min?: number; max?: number }>>;
}

export interface Champion {
  name: string;
  slug: string;
  primaryRole: Role;
  secondaryRole?: Role;
  difficulty: number;
  engage: number;
  carryPotential: number;
  teamUtility: number;
  scaling: number;
  mapInfluence: number;
  complexity: number;
  rangePreference: number;
  riskDemand: number;
  selfReliance: number;
}

export interface DiagnosisResult {
  typeId: string;
  typeName: string;
  oneLiner: string;
  description: string;
  axisScores: AxisScores;
  recommendedRoles: Role[];
  recommendedChampions: Array<{ champion: Champion; score: number; reason: string }>;
}
