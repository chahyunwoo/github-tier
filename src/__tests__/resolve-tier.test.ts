import { describe, it, expect } from "vitest";
import { resolveTier } from "@/features/tier/lib/resolve-tier";

describe("resolveTier", () => {
  it("returns Iron IV for score 0", () => {
    const tier = resolveTier(0);
    expect(tier.name).toBe("Iron");
    expect(tier.division).toBe("IV");
  });

  it("returns Challenger for score 100", () => {
    const tier = resolveTier(100);
    expect(tier.name).toBe("Challenger");
    expect(tier.division).toBeNull();
  });

  it("returns correct displayName with division", () => {
    const tier = resolveTier(50);
    expect(tier.displayName).toMatch(/Platinum/);
    expect(tier.displayName).toContain(" ");
  });

  it("returns correct displayName without division for elite tiers", () => {
    const tier = resolveTier(95);
    expect(tier.displayName).toBe("Grandmaster");
  });

  it("marks Diamond as premium", () => {
    const tier = resolveTier(85);
    expect(tier.isPremium).toBe(true);
  });

  it("marks Master as elite", () => {
    const tier = resolveTier(92);
    expect(tier.isElite).toBe(true);
  });

  it("marks Gold as not premium and not elite", () => {
    const tier = resolveTier(40);
    expect(tier.isPremium).toBe(false);
    expect(tier.isElite).toBe(false);
  });

  it("has percentileRank between 0 and 100", () => {
    for (const score of [0, 25, 50, 75, 100]) {
      const tier = resolveTier(score);
      expect(tier.percentileRank).toBeGreaterThanOrEqual(0);
      expect(tier.percentileRank).toBeLessThanOrEqual(100);
    }
  });

  it("higher score has lower percentileRank", () => {
    const low = resolveTier(30);
    const high = resolveTier(90);
    expect(high.percentileRank).toBeLessThan(low.percentileRank);
  });
});
