import type { Champion } from "@/lib/types";

export const champions: Champion[] = [
  { name: "Garen", slug: "garen", primaryRole: "TOP", difficulty: 1, engage: 6, carryPotential: 6, teamUtility: 4, scaling: 5, mapInfluence: 3, complexity: 2, rangePreference: 2, riskDemand: 4, selfReliance: 8 },
  { name: "Darius", slug: "darius", primaryRole: "TOP", difficulty: 2, engage: 7, carryPotential: 8, teamUtility: 3, scaling: 6, mapInfluence: 3, complexity: 4, rangePreference: 2, riskDemand: 7, selfReliance: 7 },
  { name: "Ornn", slug: "ornn", primaryRole: "TOP", difficulty: 3, engage: 8, carryPotential: 4, teamUtility: 9, scaling: 8, mapInfluence: 5, complexity: 5, rangePreference: 2, riskDemand: 3, selfReliance: 5 },
  { name: "Camille", slug: "camille", primaryRole: "TOP", secondaryRole: "JG", difficulty: 7, engage: 8, carryPotential: 8, teamUtility: 5, scaling: 7, mapInfluence: 6, complexity: 7, rangePreference: 2, riskDemand: 8, selfReliance: 7 },
  { name: "Aatrox", slug: "aatrox", primaryRole: "TOP", difficulty: 6, engage: 7, carryPotential: 7, teamUtility: 4, scaling: 6, mapInfluence: 4, complexity: 6, rangePreference: 2, riskDemand: 6, selfReliance: 7 },

  { name: "Warwick", slug: "warwick", primaryRole: "JG", difficulty: 2, engage: 7, carryPotential: 6, teamUtility: 6, scaling: 5, mapInfluence: 8, complexity: 3, rangePreference: 2, riskDemand: 5, selfReliance: 6 },
  { name: "Lee Sin", slug: "lee-sin", primaryRole: "JG", difficulty: 9, engage: 9, carryPotential: 8, teamUtility: 6, scaling: 4, mapInfluence: 9, complexity: 9, rangePreference: 2, riskDemand: 9, selfReliance: 7 },
  { name: "Vi", slug: "vi", primaryRole: "JG", difficulty: 4, engage: 9, carryPotential: 6, teamUtility: 7, scaling: 6, mapInfluence: 8, complexity: 4, rangePreference: 2, riskDemand: 6, selfReliance: 6 },
  { name: "Viego", slug: "viego", primaryRole: "JG", difficulty: 7, engage: 6, carryPotential: 9, teamUtility: 4, scaling: 7, mapInfluence: 7, complexity: 8, rangePreference: 2, riskDemand: 8, selfReliance: 8 },
  { name: "Sejuani", slug: "sejuani", primaryRole: "JG", difficulty: 3, engage: 9, carryPotential: 4, teamUtility: 9, scaling: 6, mapInfluence: 8, complexity: 4, rangePreference: 2, riskDemand: 4, selfReliance: 4 },

  { name: "Annie", slug: "annie", primaryRole: "MID", secondaryRole: "SUP", difficulty: 2, engage: 7, carryPotential: 7, teamUtility: 6, scaling: 6, mapInfluence: 6, complexity: 2, rangePreference: 8, riskDemand: 5, selfReliance: 6 },
  { name: "Ahri", slug: "ahri", primaryRole: "MID", difficulty: 5, engage: 7, carryPotential: 7, teamUtility: 5, scaling: 6, mapInfluence: 7, complexity: 6, rangePreference: 8, riskDemand: 6, selfReliance: 7 },
  { name: "Syndra", slug: "syndra", primaryRole: "MID", difficulty: 7, engage: 4, carryPotential: 9, teamUtility: 4, scaling: 8, mapInfluence: 5, complexity: 7, rangePreference: 9, riskDemand: 6, selfReliance: 7 },
  { name: "Twisted Fate", slug: "twisted-fate", primaryRole: "MID", difficulty: 6, engage: 4, carryPotential: 6, teamUtility: 8, scaling: 6, mapInfluence: 10, complexity: 7, rangePreference: 8, riskDemand: 5, selfReliance: 5 },
  { name: "Yasuo", slug: "yasuo", primaryRole: "MID", secondaryRole: "TOP", difficulty: 9, engage: 8, carryPotential: 9, teamUtility: 4, scaling: 7, mapInfluence: 4, complexity: 9, rangePreference: 2, riskDemand: 9, selfReliance: 8 },

  { name: "Ashe", slug: "ashe", primaryRole: "ADC", secondaryRole: "SUP", difficulty: 3, engage: 4, carryPotential: 6, teamUtility: 8, scaling: 7, mapInfluence: 7, complexity: 3, rangePreference: 10, riskDemand: 4, selfReliance: 5 },
  { name: "Jinx", slug: "jinx", primaryRole: "ADC", difficulty: 4, engage: 3, carryPotential: 10, teamUtility: 4, scaling: 10, mapInfluence: 4, complexity: 4, rangePreference: 10, riskDemand: 6, selfReliance: 5 },
  { name: "Ezreal", slug: "ezreal", primaryRole: "ADC", difficulty: 7, engage: 3, carryPotential: 7, teamUtility: 5, scaling: 8, mapInfluence: 6, complexity: 8, rangePreference: 10, riskDemand: 5, selfReliance: 7 },
  { name: "Kai'Sa", slug: "kaisa", primaryRole: "ADC", difficulty: 7, engage: 6, carryPotential: 9, teamUtility: 4, scaling: 8, mapInfluence: 5, complexity: 7, rangePreference: 7, riskDemand: 7, selfReliance: 7 },
  { name: "Miss Fortune", slug: "miss-fortune", primaryRole: "ADC", difficulty: 2, engage: 5, carryPotential: 7, teamUtility: 6, scaling: 7, mapInfluence: 4, complexity: 2, rangePreference: 9, riskDemand: 5, selfReliance: 6 },

  { name: "Leona", slug: "leona", primaryRole: "SUP", difficulty: 3, engage: 10, carryPotential: 3, teamUtility: 9, scaling: 5, mapInfluence: 7, complexity: 4, rangePreference: 2, riskDemand: 6, selfReliance: 3 },
  { name: "Lulu", slug: "lulu", primaryRole: "SUP", difficulty: 4, engage: 2, carryPotential: 3, teamUtility: 10, scaling: 8, mapInfluence: 6, complexity: 5, rangePreference: 8, riskDemand: 3, selfReliance: 3 },
  { name: "Thresh", slug: "thresh", primaryRole: "SUP", difficulty: 8, engage: 8, carryPotential: 5, teamUtility: 9, scaling: 6, mapInfluence: 7, complexity: 9, rangePreference: 5, riskDemand: 7, selfReliance: 4 },
  { name: "Nami", slug: "nami", primaryRole: "SUP", difficulty: 5, engage: 5, carryPotential: 4, teamUtility: 9, scaling: 7, mapInfluence: 6, complexity: 6, rangePreference: 8, riskDemand: 4, selfReliance: 4 },
  { name: "Braum", slug: "braum", primaryRole: "SUP", difficulty: 4, engage: 6, carryPotential: 2, teamUtility: 10, scaling: 7, mapInfluence: 6, complexity: 4, rangePreference: 3, riskDemand: 3, selfReliance: 3 }
];
