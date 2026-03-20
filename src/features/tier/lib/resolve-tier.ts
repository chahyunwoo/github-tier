import { TIER_THRESHOLDS } from "@/shared/constants";
import type { TierInfo } from "@/shared/types";

const PREMIUM_TIER_NAMES = new Set(["Diamond", "Master", "Grandmaster", "Challenger"]);
const ELITE_TIER_NAMES = new Set(["Master", "Grandmaster", "Challenger"]);

function calculatePercentileRank(score: number): number {
  const mapping: [number, number, number, number][] = [
    [98, 100, 0.01, 0.05],
    [95, 97, 0.05, 0.3],
    [90, 94, 0.3, 1],
    [80, 89, 1, 5],
    [65, 79, 5, 15],
    [50, 64, 15, 30],
    [35, 49, 30, 55],
    [20, 34, 55, 80],
    [8, 19, 80, 95],
    [0, 7, 95, 100],
  ];

  for (const [min, max, topStart, topEnd] of mapping) {
    if (score >= min && score <= max) {
      const ratio = max === min ? 0 : (score - min) / (max - min);
      const result = topEnd + (topStart - topEnd) * ratio;
      if (result < 0.1) return Math.round(result * 100) / 100;
      if (result < 1) return Math.round(result * 10) / 10;
      return Math.round(result);
    }
  }

  return 100;
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
