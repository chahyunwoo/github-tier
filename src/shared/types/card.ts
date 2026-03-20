import type { GitHubStats, TierInfo, ScoreBreakdown } from "./tier";
import type { Theme } from "./theme";

export interface RenderOptions {
  stats: GitHubStats;
  tier: TierInfo;
  breakdown: ScoreBreakdown;
  theme: Theme;
  avatarBase64: string;
}

export interface NextTierInfo {
  name: string;
  pointsNeeded: number;
}
