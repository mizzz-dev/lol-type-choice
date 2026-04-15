import type { Champion } from "@/lib/types";

export const champions: Champion[] = [
  // TOP
  { name: "Garen", slug: "garen", primaryRole: "TOP", tags: ["初心者向け", "ファイター"], engage: 6, carryPotential: 6, teamUtility: 4, scaling: 5, mapInfluence: 3, complexity: 2, rangePreference: 2, riskDemand: 4, selfReliance: 8 },
  { name: "Ornn", slug: "ornn", primaryRole: "TOP", tags: ["タンク", "集団戦"], engage: 8, carryPotential: 4, teamUtility: 9, scaling: 8, mapInfluence: 5, complexity: 5, rangePreference: 2, riskDemand: 3, selfReliance: 5 },
  { name: "Aatrox", slug: "aatrox", primaryRole: "TOP", tags: ["ファイター", "継戦"], engage: 7, carryPotential: 8, teamUtility: 4, scaling: 7, mapInfluence: 4, complexity: 6, rangePreference: 2, riskDemand: 7, selfReliance: 8 },
  { name: "Malphite", slug: "malphite", primaryRole: "TOP", secondaryRole: "SUP", tags: ["エンゲージ", "簡単"], engage: 10, carryPotential: 3, teamUtility: 8, scaling: 6, mapInfluence: 5, complexity: 2, rangePreference: 2, riskDemand: 4, selfReliance: 4 },

  // JG
  { name: "Warwick", slug: "warwick", primaryRole: "JG", tags: ["ガンク", "安定"], engage: 7, carryPotential: 6, teamUtility: 6, scaling: 5, mapInfluence: 8, complexity: 3, rangePreference: 2, riskDemand: 5, selfReliance: 6 },
  { name: "Vi", slug: "vi", primaryRole: "JG", tags: ["エンゲージ", "ピック"], engage: 9, carryPotential: 6, teamUtility: 7, scaling: 6, mapInfluence: 8, complexity: 4, rangePreference: 2, riskDemand: 6, selfReliance: 6 },
  { name: "Sejuani", slug: "sejuani", primaryRole: "JG", tags: ["前衛", "CC"], engage: 9, carryPotential: 4, teamUtility: 9, scaling: 6, mapInfluence: 8, complexity: 4, rangePreference: 2, riskDemand: 4, selfReliance: 4 },
  { name: "Viego", slug: "viego", primaryRole: "JG", tags: ["キャリー", "リセット"], engage: 6, carryPotential: 9, teamUtility: 3, scaling: 8, mapInfluence: 7, complexity: 8, rangePreference: 2, riskDemand: 7, selfReliance: 8 },
  { name: "Amumu", slug: "amumu", primaryRole: "JG", secondaryRole: "SUP", tags: ["集団戦", "簡単"], engage: 9, carryPotential: 4, teamUtility: 8, scaling: 6, mapInfluence: 7, complexity: 2, rangePreference: 2, riskDemand: 4, selfReliance: 4 },

  // MID
  { name: "Ahri", slug: "ahri", primaryRole: "MID", tags: ["メイジ", "機動力"], engage: 7, carryPotential: 7, teamUtility: 5, scaling: 6, mapInfluence: 7, complexity: 6, rangePreference: 8, riskDemand: 6, selfReliance: 7 },
  { name: "Annie", slug: "annie", primaryRole: "MID", secondaryRole: "SUP", tags: ["初心者向け", "バースト"], engage: 7, carryPotential: 7, teamUtility: 6, scaling: 6, mapInfluence: 6, complexity: 2, rangePreference: 8, riskDemand: 5, selfReliance: 6 },
  { name: "Orianna", slug: "orianna", primaryRole: "MID", tags: ["コントロール", "集団戦"], engage: 5, carryPotential: 7, teamUtility: 8, scaling: 8, mapInfluence: 6, complexity: 7, rangePreference: 9, riskDemand: 4, selfReliance: 6 },
  { name: "Yasuo", slug: "yasuo", primaryRole: "MID", secondaryRole: "TOP", tags: ["高難度", "スノーボール"], engage: 8, carryPotential: 9, teamUtility: 3, scaling: 7, mapInfluence: 5, complexity: 9, rangePreference: 2, riskDemand: 9, selfReliance: 8 },
  { name: "Twisted Fate", slug: "twisted-fate", primaryRole: "MID", tags: ["ローム", "マップ"], engage: 5, carryPotential: 6, teamUtility: 7, scaling: 6, mapInfluence: 10, complexity: 6, rangePreference: 8, riskDemand: 5, selfReliance: 5 },

  // ADC
  { name: "Ashe", slug: "ashe", primaryRole: "ADC", secondaryRole: "SUP", tags: ["ユーティリティ", "射程"], engage: 4, carryPotential: 6, teamUtility: 8, scaling: 7, mapInfluence: 7, complexity: 3, rangePreference: 10, riskDemand: 4, selfReliance: 5 },
  { name: "Jinx", slug: "jinx", primaryRole: "ADC", tags: ["ハイキャリー", "終盤"], engage: 3, carryPotential: 10, teamUtility: 4, scaling: 10, mapInfluence: 4, complexity: 4, rangePreference: 10, riskDemand: 6, selfReliance: 5 },
  { name: "Caitlyn", slug: "caitlyn", primaryRole: "ADC", tags: ["射程", "主導権"], engage: 4, carryPotential: 7, teamUtility: 4, scaling: 7, mapInfluence: 5, complexity: 5, rangePreference: 10, riskDemand: 5, selfReliance: 6 },
  { name: "Kai'Sa", slug: "kaisa", primaryRole: "ADC", tags: ["機動力", "オールイン"], engage: 7, carryPotential: 9, teamUtility: 4, scaling: 8, mapInfluence: 5, complexity: 7, rangePreference: 7, riskDemand: 8, selfReliance: 7 },
  { name: "Miss Fortune", slug: "miss-fortune", primaryRole: "ADC", tags: ["集団戦", "簡単"], engage: 4, carryPotential: 7, teamUtility: 6, scaling: 7, mapInfluence: 5, complexity: 3, rangePreference: 9, riskDemand: 5, selfReliance: 6 },

  // SUP
  { name: "Leona", slug: "leona", primaryRole: "SUP", tags: ["イニシエート", "前衛"], engage: 10, carryPotential: 3, teamUtility: 9, scaling: 5, mapInfluence: 7, complexity: 4, rangePreference: 2, riskDemand: 6, selfReliance: 3 },
  { name: "Nami", slug: "nami", primaryRole: "SUP", tags: ["エンチャンター", "万能"], engage: 5, carryPotential: 4, teamUtility: 9, scaling: 7, mapInfluence: 6, complexity: 6, rangePreference: 8, riskDemand: 4, selfReliance: 4 },
  { name: "Braum", slug: "braum", primaryRole: "SUP", tags: ["守り", "集団戦"], engage: 6, carryPotential: 2, teamUtility: 10, scaling: 7, mapInfluence: 6, complexity: 4, rangePreference: 3, riskDemand: 3, selfReliance: 3 },
  { name: "Thresh", slug: "thresh", primaryRole: "SUP", tags: ["高汎用", "ピック"], engage: 8, carryPotential: 3, teamUtility: 10, scaling: 6, mapInfluence: 8, complexity: 8, rangePreference: 6, riskDemand: 6, selfReliance: 4 },
  { name: "Lulu", slug: "lulu", primaryRole: "SUP", tags: ["保護", "後衛支援"], engage: 3, carryPotential: 3, teamUtility: 10, scaling: 8, mapInfluence: 5, complexity: 5, rangePreference: 8, riskDemand: 3, selfReliance: 3 }
];
