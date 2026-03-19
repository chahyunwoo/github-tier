import type { TierInfo } from "@/shared/types";

export function renderTierEmblem(tier: TierInfo): string {
  const tierName = tier.name;
  const division = tier.division ?? "";

  if (tierName === "Challenger") {
    return renderEliteEmblem(tier, "CHALLENGER", 11, 1.5);
  }
  if (tierName === "Grandmaster") {
    return renderEliteEmblem(tier, "GRANDMASTER", 12, 0.5);
  }
  if (tierName === "Master") {
    return renderEliteEmblem(tier, "MASTER", 14, 3);
  }

  return renderHexEmblem(tier, division);
}

function renderEliteEmblem(tier: TierInfo, label: string, fontSize: number, letterSpacing: number): string {
  const [, g2] = tier.gradient;
  const isChallenger = tier.name === "Challenger";
  const cx = 55;

  return `
    <defs>
      <linearGradient id="glare_${tier.name}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="40%" stop-color="#fff" stop-opacity="0.4"/>
        <stop offset="60%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        <animate attributeName="x1" values="-1;2" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0;3" dur="3s" repeatCount="indefinite"/>
      </linearGradient>
      <filter id="eliteGlow_${tier.name}" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="${tier.color}" flood-opacity="0.6"/>
        <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="${tier.color}" flood-opacity="0.2"/>
      </filter>
      <clipPath id="textClip_${tier.name}">
        <rect x="0" y="10" width="110" height="60"/>
      </clipPath>
    </defs>

    <!-- Top decoration: pointed arrows -->
    <path d="M${cx - 30},18 L${cx - 20},18 L${cx},8 L${cx + 20},18 L${cx + 30},18"
      fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.5"/>
    <path d="M${cx - 5},6 L${cx},2 L${cx + 5},6"
      fill="${tier.color}" fill-opacity="0.4"/>

    ${isChallenger ? `
    <!-- Crown above -->
    <path d="M${cx - 10},2 L${cx - 6},-4 L${cx - 2},1 L${cx},-6 L${cx + 2},1 L${cx + 6},-4 L${cx + 10},2"
      fill="none" stroke="${g2}" stroke-width="1.2" stroke-opacity="0.8"/>
    ` : ""}

    <!-- Tier text with glow -->
    <text x="${cx}" y="38" text-anchor="middle" dominant-baseline="central"
      font-size="${fontSize}" font-weight="900" letter-spacing="${letterSpacing}" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}" filter="url(#eliteGlow_${tier.name})">${label}</text>

    <!-- Glare sweep on text -->
    <g clip-path="url(#textClip_${tier.name})">
      <text x="${cx}" y="38" text-anchor="middle" dominant-baseline="central"
        font-size="${fontSize}" font-weight="900" letter-spacing="${letterSpacing}" font-family="Segoe UI, Ubuntu, sans-serif"
        fill="url(#glare_${tier.name})">${label}</text>
    </g>

    <!-- Bottom decoration: pointed arrows (mirrored) -->
    <path d="M${cx - 30},56 L${cx - 20},56 L${cx},66 L${cx + 20},56 L${cx + 30},56"
      fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.5"/>
    <path d="M${cx - 5},68 L${cx},72 L${cx + 5},68"
      fill="${tier.color}" fill-opacity="0.4"/>

    <!-- Side accent diamonds -->
    <path d="M4,38 L8,34 L12,38 L8,42 Z" fill="${tier.color}" fill-opacity="0.25"/>
    <path d="M${cx * 2 - 12},38 L${cx * 2 - 8},34 L${cx * 2 - 4},38 L${cx * 2 - 8},42 Z" fill="${tier.color}" fill-opacity="0.25"/>
  `;
}

function renderHexEmblem(tier: TierInfo, division: string): string {
  const isPremium = tier.name === "Diamond";
  const nameFontSize = tier.name.length > 7 ? 9 : 11;
  const nameUpper = tier.name.toUpperCase();
  const fillOpacity = isPremium ? "0.18" : "0.15";
  const innerOpacity = "0.08";

  const glare = isPremium ? `
    <defs>
      <linearGradient id="glare_Diamond" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="40%" stop-color="#fff" stop-opacity="0.2"/>
        <stop offset="60%" stop-color="#fff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
        <animate attributeName="x1" values="-1;2" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0;3" dur="3s" repeatCount="indefinite"/>
      </linearGradient>
    </defs>
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="none" stroke="${tier.color}" stroke-width="0.6" stroke-opacity="0.12" filter="url(#glow)"/>
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="url(#glare_Diamond)"/>
  ` : "";

  if (division) {
    return `
    ${glare}
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="url(#emblemGrad)" fill-opacity="${fillOpacity}"
      stroke="url(#emblemGrad)" stroke-width="2"/>
    <polygon points="40,7 73,25 73,63 40,81 7,63 7,25"
      fill="url(#emblemGrad)" fill-opacity="${innerOpacity}"/>
    <text x="40" y="36" text-anchor="middle" dominant-baseline="central"
      font-size="${nameFontSize}" font-weight="800" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${nameUpper}</text>
    <text x="40" y="54" text-anchor="middle" dominant-baseline="central"
      font-size="14" font-weight="800" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${division}</text>
    `;
  }

  return `
    <polygon points="40,0 80,22 80,66 40,88 0,66 0,22"
      fill="url(#emblemGrad)" fill-opacity="${fillOpacity}"
      stroke="url(#emblemGrad)" stroke-width="2"/>
    <polygon points="40,7 73,25 73,63 40,81 7,63 7,25"
      fill="url(#emblemGrad)" fill-opacity="${innerOpacity}"/>
    <text x="40" y="46" text-anchor="middle" dominant-baseline="central"
      font-size="${nameFontSize}" font-weight="800" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${nameUpper}</text>
  `;
}
