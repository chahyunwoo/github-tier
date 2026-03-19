import { TIER_THRESHOLDS } from "@/shared/constants";
import type { TierInfo } from "@/shared/types";

function calculatePercentileRank(score: number): number {
  const mapping: [number, number, number, number][] = [
    // [minScore, maxScore, topStart, topEnd]
    [98, 100, 0.01, 0.05],
    [95, 97, 0.05, 0.3],
    [90, 94, 0.3, 1],
    [87, 89, 1, 1.5],     // Diamond I
    [84, 86, 1.5, 2],     // Diamond II
    [82, 83, 2, 3],       // Diamond III
    [80, 81, 3, 4],       // Diamond IV
    [76, 79, 4, 6],       // Emerald I
    [72, 75, 6, 8],       // Emerald II
    [68, 71, 8, 11],      // Emerald III
    [65, 67, 11, 14],     // Emerald IV
    [61, 64, 14, 18],     // Platinum I
    [57, 60, 18, 22],     // Platinum II
    [54, 56, 22, 27],     // Platinum III
    [50, 53, 27, 32],     // Platinum IV
    [46, 49, 32, 38],     // Gold I
    [42, 45, 38, 44],     // Gold II
    [39, 41, 44, 50],     // Gold III
    [35, 38, 50, 55],     // Gold IV
    [31, 34, 55, 62],     // Silver I
    [27, 30, 62, 68],     // Silver II
    [24, 26, 68, 73],     // Silver III
    [20, 23, 73, 78],     // Silver IV
    [17, 19, 78, 82],     // Bronze I
    [14, 16, 82, 86],     // Bronze II
    [11, 13, 86, 89],     // Bronze III
    [8, 10, 89, 92],      // Bronze IV
    [6, 7, 92, 94],       // Iron I
    [4, 5, 94, 96],       // Iron II
    [2, 3, 96, 98],       // Iron III
    [0, 1, 98, 99],       // Iron IV
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

export function resolveTier(score: number): TierInfo {
  for (const tier of TIER_THRESHOLDS) {
    if (score >= tier.minScore) {
      const displayName = tier.division ? `${tier.name} ${tier.division}` : tier.name;
      const percentileRank = calculatePercentileRank(score);

      return {
        name: tier.name,
        division: tier.division,
        displayName,
        score,
        percentileRank,
        color: tier.color,
        gradient: tier.gradient,
      };
    }
  }

  const fallback = TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
  return {
    name: fallback.name,
    division: fallback.division,
    displayName: fallback.division ? `${fallback.name} ${fallback.division}` : fallback.name,
    score,
    percentileRank: calculatePercentileRank(score),
    color: fallback.color,
    gradient: fallback.gradient,
  };
}
