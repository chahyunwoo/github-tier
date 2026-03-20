import { TIER_THRESHOLDS } from "@/shared/constants";
import type { TierInfo } from "@/shared/types";

const PREMIUM_TIER_NAMES = new Set(["Diamond", "Master", "Grandmaster", "Challenger"]);
const ELITE_TIER_NAMES = new Set(["Master", "Grandmaster", "Challenger"]);

function calculatePercentileRank(score: number): number {
  const mapping: [number, number, number, number][] = [
    [98, 100, 0.01, 0.05],
    [95, 97, 0.05, 0.3],
    [90, 94, 0.3, 1],
    [87, 89, 1, 1.5],
    [84, 86, 1.5, 2],
    [82, 83, 2, 3],
    [80, 81, 3, 4],
    [76, 79, 4, 6],
    [72, 75, 6, 8],
    [68, 71, 8, 11],
    [65, 67, 11, 14],
    [61, 64, 14, 18],
    [57, 60, 18, 22],
    [54, 56, 22, 27],
    [50, 53, 27, 32],
    [46, 49, 32, 38],
    [42, 45, 38, 44],
    [39, 41, 44, 50],
    [35, 38, 50, 55],
    [31, 34, 55, 62],
    [27, 30, 62, 68],
    [24, 26, 68, 73],
    [20, 23, 73, 78],
    [17, 19, 78, 82],
    [14, 16, 82, 86],
    [11, 13, 86, 89],
    [8, 10, 89, 92],
    [6, 7, 92, 94],
    [4, 5, 94, 96],
    [2, 3, 96, 98],
    [0, 1, 98, 99],
  ];

  for (const [min, max, topStart, topEnd] of mapping) {
    if (score >= min && score <= max) {
      const ratio = max === min ? 0 : (score - min) / (max - min);
      const result = topStart + (topEnd - topStart) * (1 - ratio);
      return Math.round(result * 10) / 10;
    }
  }

  return 99;
}

function buildTierInfo(name: string, division: string | null, score: number, color: string, gradient: readonly [string, string]): TierInfo {
  return {
    name,
    division,
    displayName: division ? `${name} ${division}` : name,
    score,
    percentileRank: calculatePercentileRank(score),
    color,
    gradient,
    isPremium: PREMIUM_TIER_NAMES.has(name),
    isElite: ELITE_TIER_NAMES.has(name),
  };
}

export function resolveTier(score: number): TierInfo {
  for (const tier of TIER_THRESHOLDS) {
    if (score >= tier.minScore) {
      return buildTierInfo(tier.name, tier.division, score, tier.color, tier.gradient);
    }
  }

  const fallback = TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
  return buildTierInfo(fallback.name, fallback.division, score, fallback.color, fallback.gradient);
}
