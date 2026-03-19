import type { GitHubStats, ScoreBreakdown } from "@/shared/types";
import { calculateRank, metricCdf } from "./calculate-percentile";

export function calculateScore(stats: GitHubStats): ScoreBreakdown {
  const commits = Math.round(metricCdf("commits", stats.commits) * 100);
  const stars = Math.round(metricCdf("stars", stats.stars) * 100);
  const prs = Math.round(metricCdf("prs", stats.prs) * 100);
  const followers = Math.round(metricCdf("followers", stats.followers) * 100);
  const issues = Math.round(metricCdf("issues", stats.issues) * 100);

  const total = calculateRank({
    commits: stats.commits,
    stars: stats.stars,
    prs: stats.prs,
    followers: stats.followers,
    issues: stats.issues,
  });

  return { commits, stars, prs, followers, issues, total };
}
