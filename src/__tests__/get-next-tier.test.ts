import { describe, it, expect } from "vitest";
import { getNextTierInfo } from "@/features/tier/lib/get-next-tier";

describe("getNextTierInfo", () => {
  it("returns next tier info for low score", () => {
    const next = getNextTierInfo(10);
    expect(next).not.toBeNull();
    expect(next!.pointsNeeded).toBeGreaterThan(0);
  });

  it("returns null for max score", () => {
    const next = getNextTierInfo(100);
    expect(next).toBeNull();
  });

  it("returns correct points needed", () => {
    const next = getNextTierInfo(97);
    expect(next).not.toBeNull();
    expect(next!.pointsNeeded).toBe(1);
    expect(next!.name).toBe("Challenger");
  });

  it("points needed decreases as score increases within tier", () => {
    const low = getNextTierInfo(35);
    const high = getNextTierInfo(45);
    expect(low!.pointsNeeded).toBeGreaterThan(high!.pointsNeeded);
  });
});
