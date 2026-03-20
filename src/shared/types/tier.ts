export interface TierInfo {
  name: string;
  division: string | null;
  displayName: string;
  score: number;
  percentileRank: number;
  color: string;
  gradient: readonly [string, string];
  isPremium: boolean;
  isElite: boolean;
}

export interface ScoreBreakdown {
  commits: number;
  stars: number;
  prs: number;
  followers: number;
  issues: number;
  total: number;
}
