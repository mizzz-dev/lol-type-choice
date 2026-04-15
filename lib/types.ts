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

export type AxisScore = Record<AxisKey, number>;

export type Role = "TOP" | "JG" | "MID" | "ADC" | "SUP";

export type OptionValue = -2 | -1 | 0 | 1 | 2;

export interface QuestionOption {
  label: string;
  value: OptionValue;
}

export interface AxisWeight {
  axis: AxisKey;
  weight: number;
}

export interface Question {
  id: string;
  order: number;
  text: string;
  options: QuestionOption[];
  reverse: boolean;
  weights: AxisWeight[];
}

export type AnswerMap = Record<string, OptionValue>;

export interface RecommendationReason {
  title: string;
  body: string;
}

export interface ResultType {
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
  tags: string[];
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
  type: ResultType;
  axisScore: AxisScore;
  recommendedRoles: Role[];
  recommendedChampions: Array<{
    champion: Champion;
    score: number;
    reason: RecommendationReason;
  }>;
}
