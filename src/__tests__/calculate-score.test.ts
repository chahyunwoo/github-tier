import { describe, it, expect } from "vitest";
import { calculateScore } from "@/features/tier/lib/calculate-score";
import type { GitHubStats } from "@/shared/types";

const mockStats = (overrides: Partial<GitHubStats> = {}): GitHubStats => ({
  username: "test",
  name: "Test",
  avatarUrl: "https://example.com/avatar.png",
  commits: 0,
  stars: 0,
  prs: 0,
  issues: 0,
  followers: 0,
  repos: 0,
  ...overrides,
});

describe("calculateScore", () => {
  it("returns all zeros for empty stats", () => {
    const result = calculateScore(mockStats());
    expect(result.total).toBe(0);
    expect(result.commits).toBe(0);
    expect(result.stars).toBe(0);
  });

  it("returns breakdown with all fields", () => {
    const result = calculateScore(mockStats({ commits: 100 }));
    expect(result).toHaveProperty("commits");
    expect(result).toHaveProperty("stars");
    expect(result).toHaveProperty("prs");
    expect(result).toHaveProperty("followers");
    expect(result).toHaveProperty("issues");
    expect(result).toHaveProperty("total");
  });

  it("individual scores are 0-100", () => {
    const result = calculateScore(mockStats({ commits: 500, stars: 50, prs: 30, followers: 20, issues: 10 }));
    for (const key of ["commits", "stars", "prs", "followers", "issues"] as const) {
      expect(result[key]).toBeGreaterThanOrEqual(0);
      expect(result[key]).toBeLessThanOrEqual(100);
    }
  });

  it("total increases with more activity", () => {
    const low = calculateScore(mockStats({ commits: 10 }));
    const high = calculateScore(mockStats({ commits: 1000, stars: 100, prs: 50 }));
    expect(high.total).toBeGreaterThan(low.total);
  });
});
