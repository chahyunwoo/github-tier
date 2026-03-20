import { describe, it, expect } from "vitest";
import { metricCdf, calculateRank } from "@/features/tier/lib/calculate-percentile";

describe("metricCdf", () => {
  it("returns 0 for value 0", () => {
    expect(metricCdf("commits", 0)).toBe(0);
  });

  it("returns 0.5 for value equal to median", () => {
    expect(metricCdf("commits", 250)).toBe(0.5);
  });

  it("returns higher score for higher value", () => {
    const low = metricCdf("commits", 100);
    const high = metricCdf("commits", 1000);
    expect(high).toBeGreaterThan(low);
  });

  it("never exceeds 1", () => {
    expect(metricCdf("commits", 1000000)).toBeLessThan(1);
  });

  it("produces diminishing returns", () => {
    const diff1 = metricCdf("commits", 200) - metricCdf("commits", 100);
    const diff2 = metricCdf("commits", 1200) - metricCdf("commits", 1100);
    expect(diff1).toBeGreaterThan(diff2);
  });
});

describe("calculateRank", () => {
  it("returns 0 for all zeros", () => {
    expect(calculateRank({ commits: 0, stars: 0, prs: 0, followers: 0, issues: 0 })).toBe(0);
  });

  it("returns score between 0 and 100", () => {
    const score = calculateRank({ commits: 500, stars: 10, prs: 20, followers: 5, issues: 5 });
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("higher activity produces higher score", () => {
    const low = calculateRank({ commits: 50, stars: 1, prs: 2, followers: 1, issues: 1 });
    const high = calculateRank({ commits: 2000, stars: 500, prs: 200, followers: 100, issues: 50 });
    expect(high).toBeGreaterThan(low);
  });

  it("commits have the highest weight", () => {
    const commitsOnly = calculateRank({ commits: 1000, stars: 0, prs: 0, followers: 0, issues: 0 });
    const starsOnly = calculateRank({ commits: 0, stars: 1000, prs: 0, followers: 0, issues: 0 });
    expect(commitsOnly).toBeGreaterThan(starsOnly);
  });
});
