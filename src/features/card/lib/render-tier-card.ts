import { CARD_WIDTH, CARD_HEIGHT, CARD_PADDING, CARD_BORDER_RADIUS } from "@/shared/constants";
import type { Theme } from "@/shared/constants/themes";
import type { GitHubStats, TierInfo, ScoreBreakdown } from "@/shared/types";
import { renderTierEmblem } from "./render-tier-emblem";
import { renderStatBars } from "./render-stat-bars";

interface RenderOptions {
  stats: GitHubStats;
  tier: TierInfo;
  breakdown: ScoreBreakdown;
  theme: Theme;
  avatarBase64: string;
}

const PREMIUM_TIERS = new Set(["Diamond", "Master", "Grandmaster", "Challenger"]);

function renderPremiumEffects(w: number, h: number, r: number, tier: TierInfo): string {
  const [g1, g2] = tier.gradient;
  const isChallenger = tier.name === "Challenger";
  const isGrandmaster = tier.name === "Grandmaster";
  const isMaster = tier.name === "Master";

  const blurAmount = isChallenger ? "6" : isGrandmaster ? "5" : isMaster ? "4" : "3";
  const strokeWidth = isChallenger ? "2.5" : isGrandmaster ? "2" : isMaster ? "1.8" : "1.5";

  let extra = "";

  if (isChallenger) {
    extra = `
    <!-- Challenger double border -->
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

export function renderTierCard({ stats, tier, breakdown, theme, avatarBase64 }: RenderOptions): string {
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT;
  const r = CARD_BORDER_RADIUS;
  const p = CARD_PADDING;
  const [g1, g2] = tier.gradient;
  const avatarHref = avatarBase64 || stats.avatarUrl;
  const isPremium = PREMIUM_TIERS.has(tier.name);

  const isElite = tier.name === "Challenger" || tier.name === "Grandmaster" || tier.name === "Master";
  const emblemSize = isElite ? 110 : 80;
  const emblemX = w - p - emblemSize;
  const emblemY = isElite ? p : p - 4;
  const nameX = p + 48 + 14;
  const barsY = p + 48 + 56;
  const barsWidth = w - p * 2;

  const glowOpacity1 = isPremium ? "0.25" : "0.1";
  const glowOpacity2 = isPremium ? "0.1" : "0.03";

  return `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">
  <defs>
    <linearGradient id="tierGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${g1}" stop-opacity="${glowOpacity1}"/>
      <stop offset="100%" stop-color="${g2}" stop-opacity="${glowOpacity2}"/>
    </linearGradient>
    <linearGradient id="emblemGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${g1}"/>
      <stop offset="100%" stop-color="${g2}"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="avatarClip"><circle cx="24" cy="24" r="22"/></clipPath>
  </defs>

  <style>
    * { font-family: 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif; }
  </style>

  <!-- Background -->
  <rect width="${w}" height="${h}" rx="${r}" fill="${theme.bg}"/>
  <rect width="${w}" height="${h}" rx="${r}" fill="url(#tierGlow)"/>
  <rect width="${w}" height="${h}" rx="${r}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-opacity="${isPremium ? "0.2" : "0.5"}"/>

  ${isPremium ? renderPremiumEffects(w, h, r, tier) : ""}

  <!-- Avatar -->
  <g transform="translate(${p}, ${p})">
    <image href="${avatarHref}" x="2" y="2" width="44" height="44" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="24" cy="24" r="22" fill="none" stroke="${tier.color}" stroke-width="2" stroke-opacity="0.6"/>
  </g>

  <!-- User Info -->
  <g>
    <text x="${nameX}" y="${p + 18}" font-size="15" font-weight="700" fill="${theme.title}">${stats.name}</text>
    <text x="${nameX}" y="${p + 34}" font-size="11" fill="${theme.subtitle}">@${stats.username}</text>
    <text x="${nameX}" y="${p + 50}" font-size="10" font-weight="600" fill="${tier.color}">Top ${tier.percentileRank}%</text>
  </g>

  <!-- Tier Emblem -->
  <g transform="translate(${emblemX}, ${emblemY})">
    ${renderTierEmblem(tier)}
  </g>

  <!-- Stat Bars -->
  <g transform="translate(${p}, ${barsY})">
    ${renderStatBars(breakdown, tier.color, barsWidth, theme)}
  </g>
</svg>`.trim();
}
