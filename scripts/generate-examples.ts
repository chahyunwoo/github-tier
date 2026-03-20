import { writeFileSync, mkdirSync } from "fs";
import { resolveTier } from "../src/features/tier/lib/resolve-tier";
import { renderTierCard } from "../src/features/card/lib/render-tier-card";
import { THEMES } from "../src/shared/constants/themes";
import type { GitHubStats, ScoreBreakdown } from "../src/shared/types";

const TIERS = [
  { name: "challenger", score: 99 },
  { name: "grandmaster", score: 96 },
  { name: "master", score: 92 },
  { name: "diamond", score: 85 },
  { name: "emerald", score: 70 },
  { name: "platinum", score: 55 },
  { name: "gold", score: 40 },
  { name: "silver", score: 25 },
  { name: "bronze", score: 12 },
  { name: "iron", score: 3 },
];

function createMockData(score: number): { stats: GitHubStats; breakdown: ScoreBreakdown } {
  const ratio = score / 100;
  return {
    stats: {
      username: "username",
      name: "GitHub User",
      avatarUrl: "",
      commits: Math.round(5000 * ratio),
      stars: Math.round(3000 * ratio),
      prs: Math.round(800 * ratio),
      issues: Math.round(400 * ratio),
      followers: Math.round(1500 * ratio),
      repos: Math.round(200 * ratio),
    },
    breakdown: {
      commits: Math.round(score * 1.0),
      stars: Math.round(score * 0.9),
      prs: Math.round(score * 0.85),
      followers: Math.round(score * 0.8),
      issues: Math.round(score * 0.7),
      total: score,
    },
  };
}

mkdirSync("assets/examples", { recursive: true });

for (const { name, score } of TIERS) {
  const tier = resolveTier(score);
  const { stats, breakdown } = createMockData(score);
  const svg = renderTierCard({ stats, tier, breakdown, theme: THEMES.dark, avatarBase64: "" });
  writeFileSync(`assets/examples/${name}.svg`, svg);
}

process.stdout.write(`Generated ${TIERS.length} tier examples\n`);
