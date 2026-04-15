import { champions } from "@/data/champions";
import { fallbackResultType, resultTypes } from "@/data/resultTypes";
import { AXIS_KEYS, type AnswerMap, type AxisKey, type AxisScore, type Champion, type DiagnosisResult, type Question, type ResultType, type Role } from "@/lib/types";

const MIN_ANSWER = -2;
const MAX_ANSWER = 2;

const roleProfiles: Record<Role, AxisScore> = {
  TOP: { initiative: 60, riskTolerance: 55, decisionStyle: 45, winCondition: 65, combatRange: 35, processing: 48, tempo: 42, responsibility: 38 },
  JG: { initiative: 75, riskTolerance: 62, decisionStyle: 58, winCondition: 48, combatRange: 38, processing: 60, tempo: 50, responsibility: 80 },
  MID: { initiative: 68, riskTolerance: 57, decisionStyle: 62, winCondition: 65, combatRange: 62, processing: 60, tempo: 56, responsibility: 60 },
  ADC: { initiative: 45, riskTolerance: 50, decisionStyle: 46, winCondition: 72, combatRange: 82, processing: 54, tempo: 66, responsibility: 44 },
  SUP: { initiative: 52, riskTolerance: 42, decisionStyle: 50, winCondition: 32, combatRange: 45, processing: 50, tempo: 52, responsibility: 84 }
};

const neutralAxisScore = (): AxisScore =>
  AXIS_KEYS.reduce((acc, axis) => {
    acc[axis] = 50;
    return acc;
  }, {} as AxisScore);

export const normalizeAnswerValue = (value: number, reverse = false): number => {
  if (!Number.isFinite(value)) return 0;
  const clamped = Math.max(MIN_ANSWER, Math.min(MAX_ANSWER, Math.round(value)));
  return reverse ? clamped * -1 : clamped;
};

export const calculateAxisScores = (questionList: Question[], answerMap: AnswerMap): AxisScore => {
  if (questionList.length === 0) {
    return neutralAxisScore();
  }

  const raw = Object.fromEntries(AXIS_KEYS.map((axis) => [axis, 0])) as Record<AxisKey, number>;
  const maxAbs = Object.fromEntries(AXIS_KEYS.map((axis) => [axis, 0])) as Record<AxisKey, number>;

  for (const question of questionList) {
    const answer = normalizeAnswerValue(answerMap[question.id] ?? 0, question.reverse);
    for (const weight of question.weights) {
      raw[weight.axis] += answer * weight.weight;
      maxAbs[weight.axis] += MAX_ANSWER * weight.weight;
    }
  }

  return AXIS_KEYS.reduce((acc, axis) => {
    if (maxAbs[axis] <= 0) {
      acc[axis] = 50;
      return acc;
    }
    const ratio = raw[axis] / maxAbs[axis];
    acc[axis] = Math.max(0, Math.min(100, Math.round(((ratio + 1) / 2) * 100)));
    return acc;
  }, {} as AxisScore);
};

export const determineResultType = (axisScore: AxisScore): ResultType => {
  const matched = resultTypes.find((resultType) => {
    const conditions = resultType.conditions;
    return Object.entries(conditions).every(([axis, rule]) => {
      const value = axisScore[axis as AxisKey];
      if (typeof rule.min === "number" && value < rule.min) return false;
      if (typeof rule.max === "number" && value > rule.max) return false;
      return true;
    });
  });

  return matched ?? fallbackResultType;
};

const roleDistance = (axisScore: AxisScore, role: Role): number =>
  AXIS_KEYS.reduce((total, axis) => total + Math.abs(axisScore[axis] - roleProfiles[role][axis]), 0);

export const recommendRoles = (axisScore: AxisScore, limit = 2): Role[] => {
  const safeLimit = Math.max(1, Math.min(limit, 5));
  return (Object.keys(roleProfiles) as Role[])
    .map((role) => ({ role, distance: roleDistance(axisScore, role) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, safeLimit)
    .map((entry) => entry.role);
};

const axisToChampionPreference = (axisScore: AxisScore) => ({
  engage: axisScore.initiative / 10,
  carryPotential: axisScore.winCondition / 10,
  teamUtility: (100 - axisScore.winCondition) / 10,
  scaling: axisScore.tempo / 10,
  mapInfluence: axisScore.responsibility / 10,
  complexity: axisScore.processing / 10,
  rangePreference: axisScore.combatRange / 10,
  riskDemand: axisScore.riskTolerance / 10,
  selfReliance: (100 - axisScore.responsibility + axisScore.winCondition) / 20
});

const championDistance = (axisScore: AxisScore, champion: Champion): number => {
  const desired = axisToChampionPreference(axisScore);
  const dimensions = Object.keys(desired) as Array<keyof typeof desired>;
  return dimensions.reduce((sum, key) => sum + Math.abs(desired[key] - champion[key]), 0);
};

const buildChampionReason = (axisScore: AxisScore, champion: Champion) => {
  const reasons: string[] = [];
  if (axisScore.winCondition >= 60 && champion.carryPotential >= 7) reasons.push("終盤に自分でダメージを出して勝ち切る型と噛み合います");
  if (axisScore.responsibility >= 60 && champion.mapInfluence >= 7) reasons.push("マップ関与の高さを活かして試合全体へ影響を出せます");
  if (axisScore.initiative >= 60 && champion.engage >= 7) reasons.push("先手を取るプレイ傾向と、仕掛け性能が一致しています");
  if (axisScore.processing <= 45 && champion.complexity <= 4) reasons.push("操作負荷を抑え、判断に集中しやすい構成です");
  if (reasons.length === 0) reasons.push("回答傾向とチャンピオン特性の距離が短く、安定して力を出しやすいです");

  return {
    title: "推薦理由",
    body: reasons.slice(0, 2).join("。") + "。"
  };
};

export const recommendChampions = (axisScore: AxisScore, roleHints: Role[], limit = 5): DiagnosisResult["recommendedChampions"] => {
  if (champions.length === 0) {
    return [];
  }

  const safeLimit = Math.max(1, Math.min(limit, 10));
  const scoped = champions.filter((champion) => roleHints.includes(champion.primaryRole) || (champion.secondaryRole && roleHints.includes(champion.secondaryRole)));
  const target = scoped.length > 0 ? scoped : champions;

  return target
    .map((champion) => {
      const distance = championDistance(axisScore, champion);
      const score = Math.max(0, Math.round((100 - distance * 4) * 100) / 100);
      return {
        champion,
        score,
        reason: buildChampionReason(axisScore, champion)
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, safeLimit);
};

export const buildDiagnosisResult = (questionList: Question[], answerMap: AnswerMap): DiagnosisResult => {
  const axisScore = calculateAxisScores(questionList, answerMap);
  const type = determineResultType(axisScore);
  const recommendedRoles = recommendRoles(axisScore, 2);
  const recommendedChampions = recommendChampions(axisScore, recommendedRoles, 5);

  return {
    type,
    axisScore,
    recommendedRoles,
    recommendedChampions
  };
};
