import { champions } from "@/data/champions";
import { fallbackResultType, resultTypeRules } from "@/data/resultTypes";
import { questions } from "@/data/questions";
import { AXIS_KEYS, type AxisKey, type AxisScores, type DiagnosisResult, type Role } from "@/lib/types";
import { validateAnswers } from "@/lib/validation";

const scoreToPercent = (value: number, maxAbs: number): number => {
  if (maxAbs <= 0) return 50;
  const normalized = value / maxAbs;
  const percent = Math.round(((normalized + 1) / 2) * 100);
  return Math.max(0, Math.min(100, percent));
};

const computeAxisScores = (answers: number[]): AxisScores => {
  const raw: Record<AxisKey, number> = Object.fromEntries(AXIS_KEYS.map((axis) => [axis, 0])) as Record<AxisKey, number>;
  const maxAbsByAxis: Record<AxisKey, number> = Object.fromEntries(AXIS_KEYS.map((axis) => [axis, 0])) as Record<AxisKey, number>;

  questions.forEach((question, index) => {
    const answer = question.reverseScored ? answers[index] * -1 : answers[index];

    question.weights.forEach((weight) => {
      raw[weight.axis] += answer * weight.weight;
      maxAbsByAxis[weight.axis] += 2 * weight.weight;
    });
  });

  return AXIS_KEYS.reduce((acc, axis) => {
    acc[axis] = scoreToPercent(raw[axis], maxAbsByAxis[axis]);
    return acc;
  }, {} as AxisScores);
};

const satisfiesRule = (axisScores: AxisScores, conditions: Record<string, { min?: number; max?: number }>): boolean =>
  Object.entries(conditions).every(([axis, limit]) => {
    const value = axisScores[axis as AxisKey];
    if (typeof limit.min === "number" && value < limit.min) return false;
    if (typeof limit.max === "number" && value > limit.max) return false;
    return true;
  });

const pickType = (axisScores: AxisScores) => {
  const matched = resultTypeRules.find((rule) => satisfiesRule(axisScores, rule.conditions));
  return matched ?? fallbackResultType;
};

const roleProfiles: Record<Role, Record<AxisKey, number>> = {
  TOP: { initiative: 60, riskTolerance: 55, decisionStyle: 45, winCondition: 62, combatRange: 35, processing: 50, tempo: 45, responsibility: 40 },
  JG: { initiative: 75, riskTolerance: 62, decisionStyle: 58, winCondition: 50, combatRange: 40, processing: 60, tempo: 48, responsibility: 78 },
  MID: { initiative: 68, riskTolerance: 58, decisionStyle: 60, winCondition: 65, combatRange: 62, processing: 58, tempo: 55, responsibility: 62 },
  ADC: { initiative: 45, riskTolerance: 50, decisionStyle: 45, winCondition: 72, combatRange: 80, processing: 52, tempo: 64, responsibility: 42 },
  SUP: { initiative: 52, riskTolerance: 42, decisionStyle: 50, winCondition: 30, combatRange: 45, processing: 50, tempo: 52, responsibility: 82 }
};

const roleDistance = (axisScores: AxisScores, role: Role): number => {
  const profile = roleProfiles[role];
  return AXIS_KEYS.reduce((acc, axis) => acc + Math.abs(axisScores[axis] - profile[axis]), 0);
};

const pickRoles = (axisScores: AxisScores): Role[] =>
  (Object.keys(roleProfiles) as Role[])
    .map((role) => ({ role, distance: roleDistance(axisScores, role) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2)
    .map((item) => item.role);

const championVectorFromAxis = (axis: AxisScores) => ({
  engage: axis.initiative / 10,
  carryPotential: axis.winCondition / 10,
  teamUtility: (100 - axis.winCondition) / 10,
  scaling: axis.tempo / 10,
  mapInfluence: axis.responsibility / 10,
  complexity: axis.processing / 10,
  rangePreference: axis.combatRange / 10,
  riskDemand: axis.riskTolerance / 10,
  selfReliance: (100 - axis.responsibility + axis.winCondition) / 20
});

const championCompatibility = (axisScores: AxisScores, champion: (typeof champions)[number]): number => {
  const desired = championVectorFromAxis(axisScores);
  const dimensions = [
    "engage",
    "carryPotential",
    "teamUtility",
    "scaling",
    "mapInfluence",
    "complexity",
    "rangePreference",
    "riskDemand",
    "selfReliance"
  ] as const;

  const distance = dimensions.reduce(
    (acc, key) => acc + Math.abs(desired[key] - champion[key]),
    0
  );

  return Number((100 - distance * 4).toFixed(2));
};

const reasonFromChampion = (axisScores: AxisScores, champion: (typeof champions)[number]): string => {
  if (axisScores.responsibility >= 60 && champion.mapInfluence >= 7) {
    return "マップ全体への関与志向と、チャンプの高い影響力が噛み合います。";
  }

  if (axisScores.winCondition >= 60 && champion.carryPotential >= 7) {
    return "キャリー志向に対して、ダメージ期待値の高い性能が合っています。";
  }

  if (axisScores.winCondition <= 40 && champion.teamUtility >= 8) {
    return "チーム貢献重視の傾向に、味方支援性能がフィットします。";
  }

  if (axisScores.processing <= 45 && champion.complexity <= 4) {
    return "操作難度を抑えつつ、役割価値を出しやすい選択です。";
  }

  return "回答傾向の軸バランスと、チャンプ特性の総合相性が高いです。";
};

export const buildDiagnosis = (answers: number[]): DiagnosisResult => {
  const validation = validateAnswers(answers);
  if (!validation.valid) {
    throw new Error(validation.message);
  }

  const axisScores = computeAxisScores(answers);
  const type = pickType(axisScores);
  const recommendedRoles = pickRoles(axisScores);

  const recommendedChampions = champions
    .map((champion) => ({
      champion,
      score: championCompatibility(axisScores, champion)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => ({ ...item, reason: reasonFromChampion(axisScores, item.champion) }));

  return {
    typeId: type.id,
    typeName: type.name,
    oneLiner: type.oneLiner,
    description: type.description,
    axisScores,
    recommendedRoles,
    recommendedChampions
  };
};
