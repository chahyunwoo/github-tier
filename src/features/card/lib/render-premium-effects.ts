import type { TierInfo } from "@/shared/types";

export function renderPremiumEffects(w: number, h: number, r: number, tier: TierInfo): string {
  const [g1, g2] = tier.gradient;
  const isChallenger = tier.name === "Challenger";
  const isGrandmaster = tier.name === "Grandmaster";
  const isMaster = tier.name === "Master";

  const blurAmount = isChallenger ? "6" : isGrandmaster ? "5" : isMaster ? "4" : "3";
  const strokeWidth = isChallenger ? "2.5" : isGrandmaster ? "2" : isMaster ? "1.8" : "1.5";

  let extra = "";

  if (isChallenger) {
    extra = `
    <defs>
      <linearGradient id="premiumBorder2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${g2}"/>
        <stop offset="50%" stop-color="${g1}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${g2}"/>
      </linearGradient>
      <radialGradient id="challengerShine" cx="0.3" cy="0.2" r="0.8">
        <stop offset="0%" stop-color="${g2}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="${g2}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="${r}" fill="url(#challengerShine)"/>
    <rect width="${w}" height="${h}" rx="${r}" fill="none"
      stroke="url(#premiumBorder2)" stroke-width="1" stroke-opacity="0.4" filter="url(#borderGlow)"/>
    `;
  }

  if (isGrandmaster) {
    extra = `
    <defs>
      <radialGradient id="gmShine" cx="0.7" cy="0.15" r="0.7">
        <stop offset="0%" stop-color="${g1}" stop-opacity="0.06"/>
        <stop offset="100%" stop-color="${g1}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" rx="${r}" fill="url(#gmShine)"/>
    `;
  }

  return `
    <defs>
      <linearGradient id="premiumBorder" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${g1}"/>
        <stop offset="50%" stop-color="${g2}"/>
        <stop offset="100%" stop-color="${g1}"/>
      </linearGradient>
      <filter id="borderGlow">
        <feGaussianBlur stdDeviation="${blurAmount}" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" rx="${r}" fill="none"
      stroke="url(#premiumBorder)" stroke-width="${strokeWidth}" filter="url(#borderGlow)"/>
    ${extra}
  `;
}
