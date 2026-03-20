import { describe, it, expect } from "vitest";
import { renderTierCard } from "@/features/card/lib/render-tier-card";
import { resolveTier } from "@/features/tier/lib/resolve-tier";
import { THEMES } from "@/shared/constants";
import type { GitHubStats, ScoreBreakdown } from "@/shared/types";

const mockOptions = (score: number) => {
  const stats: GitHubStats = {
    username: "testuser",
    name: "Test User",
    avatarUrl: "https://example.com/avatar.png",
    commits: 500, stars: 10, prs: 20, followers: 5, issues: 5, repos: 10,
  };
  const breakdown: ScoreBreakdown = { commits: 80, stars: 50, prs: 60, followers: 40, issues: 30, total: score };
  const tier = resolveTier(score);
  return { stats, tier, breakdown, theme: THEMES.dark, avatarBase64: "" };
};

describe("renderTierCard", () => {
  it("returns valid SVG", () => {
    const svg = renderTierCard(mockOptions(50));
    expect(svg).toMatch(/^<svg/);
    expect(svg).toMatch(/<\/svg>$/);
  });

  it("contains username", () => {
    const svg = renderTierCard(mockOptions(50));
    expect(svg).toContain("@testuser");
  });

  it("contains tier name", () => {
    const svg = renderTierCard(mockOptions(95));
    expect(svg).toContain("GRANDMASTER");
  });

  it("contains stat labels", () => {
    const svg = renderTierCard(mockOptions(50));
    expect(svg).toContain("Commits");
    expect(svg).toContain("Stars");
    expect(svg).toContain("PRs");
    expect(svg).toContain("Followers");
    expect(svg).toContain("Issues");
  });

  it("contains watermark", () => {
    const svg = renderTierCard(mockOptions(50));
    expect(svg).toContain("github-tier.vercel.app");
  });

  it("escapes special characters in name", () => {
    const opts = mockOptions(50);
    opts.stats.name = '<script>alert("xss")</script>';
    const svg = renderTierCard(opts);
    expect(svg).not.toContain("<script>");
    expect(svg).toContain("&lt;script&gt;");
  });

  it("renders premium effects for Diamond+", () => {
    const svg = renderTierCard(mockOptions(85));
    expect(svg).toContain("premiumBorder");
  });

  it("does not render premium effects for Gold", () => {
    const svg = renderTierCard(mockOptions(40));
    expect(svg).not.toContain("premiumBorder");
  });

  it("works with all themes", () => {
    for (const themeName of Object.keys(THEMES)) {
      const opts = mockOptions(50);
      opts.theme = THEMES[themeName];
      const svg = renderTierCard(opts);
      expect(svg).toMatch(/^<svg/);
    }
  });
});
