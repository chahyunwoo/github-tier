import type { Context } from "hono";
import { resolveTier } from "@/features/tier/lib";
import { renderTierCard } from "@/features/card/lib";
import { THEMES, DEFAULT_THEME } from "@/shared/constants";
import type { GitHubStats, ScoreBreakdown } from "@/shared/types";

function createMockData(score: number): { stats: GitHubStats; breakdown: ScoreBreakdown } {
  const ratio = score / 100;

  const stats: GitHubStats = {
    username: "preview-user",
    name: "Preview User",
    avatarUrl: "",
    commits: Math.round(5000 * ratio),
    stars: Math.round(3000 * ratio),
    prs: Math.round(800 * ratio),
    issues: Math.round(400 * ratio),
    followers: Math.round(1500 * ratio),
    repos: Math.round(200 * ratio),
  };

  const breakdown: ScoreBreakdown = {
    commits: Math.round(score * 1.0),
    stars: Math.round(score * 0.9),
    prs: Math.round(score * 0.85),
    followers: Math.round(score * 0.8),
    issues: Math.round(score * 0.7),
    total: score,
  };

  return { stats, breakdown };
}

export async function previewHandler(c: Context) {
  const scoreParam = c.req.query("score");
  const themeName = c.req.query("theme") ?? DEFAULT_THEME;
  const score = Math.max(0, Math.min(100, Number(scoreParam) || 50));

  const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME];
  const tier = resolveTier(score);
  const { stats, breakdown } = createMockData(score);

  const svg = renderTierCard({ stats, tier, breakdown, theme, avatarBase64: "" });

  return c.body(svg, 200, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "no-cache",
  });
}
