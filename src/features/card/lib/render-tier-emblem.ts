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
  const cx = 50;

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
        <rect x="0" y="10" width="100" height="50"/>
      </clipPath>
    </defs>

    <!-- Top decoration -->
    <path d="M${cx - 26},16 L${cx - 16},16 L${cx},6 L${cx + 16},16 L${cx + 26},16"
      fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.5"/>
    <path d="M${cx - 4},4 L${cx},0 L${cx + 4},4"
      fill="${tier.color}" fill-opacity="0.4"/>

    ${isChallenger ? `
    <path d="M${cx - 8},0 L${cx - 5},-5 L${cx - 2},0 L${cx},-7 L${cx + 2},0 L${cx + 5},-5 L${cx + 8},0"
      fill="none" stroke="${g2}" stroke-width="1.2" stroke-opacity="0.8"/>
    ` : ""}

    <!-- Tier text with glow -->
    <text x="${cx}" y="34" text-anchor="middle" dominant-baseline="central"
      font-size="${fontSize}" font-weight="900" letter-spacing="${letterSpacing}" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}" filter="url(#eliteGlow_${tier.name})">${label}</text>

    <!-- Glare sweep -->
    <g clip-path="url(#textClip_${tier.name})">
      <text x="${cx}" y="34" text-anchor="middle" dominant-baseline="central"
        font-size="${fontSize}" font-weight="900" letter-spacing="${letterSpacing}" font-family="Segoe UI, Ubuntu, sans-serif"
        fill="url(#glare_${tier.name})">${label}</text>
    </g>

    <!-- Bottom decoration -->
    <path d="M${cx - 26},50 L${cx - 16},50 L${cx},60 L${cx + 16},50 L${cx + 26},50"
      fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.5"/>
    <path d="M${cx - 4},62 L${cx},66 L${cx + 4},62"
      fill="${tier.color}" fill-opacity="0.4"/>

    <!-- Side diamonds -->
    <path d="M2,34 L6,30 L10,34 L6,38 Z" fill="${tier.color}" fill-opacity="0.25"/>
    <path d="M${cx * 2 - 10},34 L${cx * 2 - 6},30 L${cx * 2 - 2},34 L${cx * 2 - 6},38 Z" fill="${tier.color}" fill-opacity="0.25"/>
  `;
}

function renderHexEmblem(tier: TierInfo, division: string): string {
  const isPremium = tier.name === "Diamond";
  const nameFontSize = tier.name.length > 7 ? 7.5 : 9;
  const nameUpper = tier.name.toUpperCase();
  const [g1, g2] = tier.gradient;

  const outerStrokeWidth = isPremium ? "2" : "1.5";
  const innerStrokeWidth = isPremium ? "0.8" : "0.5";
  const fillOpacity = isPremium ? "0.2" : "0.12";
  const innerFillOpacity = isPremium ? "0.1" : "0.06";

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
    <polygon points="32,0 64,18 64,54 32,72 0,54 0,18"
      fill="url(#glare_Diamond)"/>
  ` : "";

  const tierRank = getTierRank(tier.name);
  const centerDecor = tierRank >= 3 ? renderCenterDecor(tier.color, tierRank) : "";

  if (division) {
    return `
    <defs>
      <linearGradient id="hexGrad_${tier.name}" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="${g1}"/>
        <stop offset="100%" stop-color="${g2}"/>
      </linearGradient>
    </defs>

    <!-- Outer glow ring -->
    ${tierRank >= 4 ? `<polygon points="32,-2 66,17 66,55 32,74 -2,55 -2,17"
      fill="none" stroke="${tier.color}" stroke-width="0.5" stroke-opacity="0.15"/>` : ""}

    <!-- Outer hex -->
    <polygon points="32,0 64,18 64,54 32,72 0,54 0,18"
      fill="url(#hexGrad_${tier.name})" fill-opacity="${fillOpacity}"
      stroke="url(#hexGrad_${tier.name})" stroke-width="${outerStrokeWidth}"/>

    <!-- Inner hex -->
    <polygon points="32,6 58,20 58,52 32,66 6,52 6,20"
      fill="url(#hexGrad_${tier.name})" fill-opacity="${innerFillOpacity}"
      stroke="url(#hexGrad_${tier.name})" stroke-width="${innerStrokeWidth}" stroke-opacity="0.3"/>

    ${glare}
    ${centerDecor}

    <!-- Tier name -->
    <text x="32" y="29" text-anchor="middle" dominant-baseline="central"
      font-size="${nameFontSize}" font-weight="800" letter-spacing="0.5" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${nameUpper}</text>

    <!-- Division -->
    <text x="32" y="45" text-anchor="middle" dominant-baseline="central"
      font-size="13" font-weight="800" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${division}</text>
    `;
  }

  return `
    <defs>
      <linearGradient id="hexGrad_${tier.name}" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stop-color="${g1}"/>
        <stop offset="100%" stop-color="${g2}"/>
      </linearGradient>
    </defs>

    <polygon points="32,0 64,18 64,54 32,72 0,54 0,18"
      fill="url(#hexGrad_${tier.name})" fill-opacity="${fillOpacity}"
      stroke="url(#hexGrad_${tier.name})" stroke-width="${outerStrokeWidth}"/>
    <polygon points="32,6 58,20 58,52 32,66 6,52 6,20"
      fill="url(#hexGrad_${tier.name})" fill-opacity="${innerFillOpacity}"
      stroke="url(#hexGrad_${tier.name})" stroke-width="${innerStrokeWidth}" stroke-opacity="0.3"/>

    <text x="32" y="38" text-anchor="middle" dominant-baseline="central"
      font-size="${nameFontSize}" font-weight="800" letter-spacing="0.5" font-family="Segoe UI, Ubuntu, sans-serif"
      fill="${tier.color}">${nameUpper}</text>
  `;
}

function getTierRank(name: string): number {
  const ranks: Record<string, number> = {
    Iron: 1, Bronze: 2, Silver: 3, Gold: 4,
    Platinum: 5, Emerald: 6, Diamond: 7,
  };
  return ranks[name] ?? 0;
}

function renderCenterDecor(color: string, rank: number): string {
  if (rank >= 6) {
    return `
      <line x1="32" y1="10" x2="32" y2="62" stroke="${color}" stroke-width="0.3" stroke-opacity="0.12"/>
      <line x1="8" y1="36" x2="56" y2="36" stroke="${color}" stroke-width="0.3" stroke-opacity="0.12"/>
      <path d="M29,36 L32,33 L35,36 L32,39 Z" fill="${color}" fill-opacity="0.15"/>
    `;
  }
  if (rank >= 4) {
    return `
      <path d="M30,36 L32,34 L34,36 L32,38 Z" fill="${color}" fill-opacity="0.12"/>
    `;
  }
  return `
    <circle cx="32" cy="36" r="1.5" fill="${color}" fill-opacity="0.1"/>
  `;
}
