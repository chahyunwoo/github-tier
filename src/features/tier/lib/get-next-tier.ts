import { TIER_THRESHOLDS } from "@/shared/constants";
import type { NextTierInfo } from "@/shared/types";

export function getNextTierInfo(score: number): NextTierInfo | null {
  for (let i = TIER_THRESHOLDS.length - 1; i >= 0; i--) {
    if (TIER_THRESHOLDS[i].minScore > score) {
      const t = TIER_THRESHOLDS[i];
      const name = t.division ? `${t.name} ${t.division}` : t.name;
      return { name, pointsNeeded: t.minScore - score };
    }
  }
  return null;
}
