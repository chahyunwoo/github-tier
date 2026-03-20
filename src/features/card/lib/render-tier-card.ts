import { CARD_WIDTH, CARD_HEIGHT, CARD_PADDING, CARD_BORDER_RADIUS, MAX_NAME_LENGTH, MAX_NAME_LENGTH_ELITE } from "@/shared/constants";
import type { RenderOptions } from "@/shared/types";
import { escapeXml, truncateText } from "@/shared/lib";
import { getNextTierInfo } from "@/features/tier/lib";
import { renderTierEmblem } from "./render-tier-emblem";
import { renderTierStars } from "./render-tier-stars";
import { renderStatBars } from "./render-stat-bars";
import { renderPremiumEffects } from "./render-premium-effects";

export function renderTierCard({ stats, tier, breakdown, theme, avatarBase64 }: RenderOptions): string {
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT;
  const r = CARD_BORDER_RADIUS;
  const p = CARD_PADDING;
  const [g1, g2] = tier.gradient;
  const avatarHref = escapeXml(avatarBase64 || stats.avatarUrl);

  const emblemSize = tier.isElite ? 100 : 64;
  const emblemX = w - p - emblemSize;
  const emblemY = tier.isElite ? p : p - 4;
  const nameX = p + 48 + 14;
  const maxLen = tier.isElite ? MAX_NAME_LENGTH_ELITE : MAX_NAME_LENGTH;
  const barsY = p + 48 + 42;
  const barsWidth = w - p * 2;

  const safeName = escapeXml(truncateText(stats.name, maxLen));
  const safeUsername = escapeXml(stats.username);

  const glowOpacity1 = tier.isPremium ? "0.25" : "0.1";
  const glowOpacity2 = tier.isPremium ? "0.1" : "0.03";

  const nextTier = getNextTierInfo(tier.score);
  const nextTierText = nextTier ? `+${nextTier.pointsNeeded} to ${nextTier.name}` : "MAX RANK";

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
    <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${g1}"/>
      <stop offset="100%" stop-color="${g2}"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="avatarClip"><circle cx="24" cy="24" r="22"/></clipPath>
    <pattern id="bgPattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="0.5" fill="${tier.color}" fill-opacity="0.03"/>
    </pattern>
  </defs>

  <style>
    * { font-family: 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif; }
  </style>

  <!-- Background -->
  <rect width="${w}" height="${h}" rx="${r}" fill="${theme.bg}"/>
  <rect width="${w}" height="${h}" rx="${r}" fill="url(#tierGlow)"/>
  <rect width="${w}" height="${h}" rx="${r}" fill="url(#bgPattern)"/>
  <rect width="${w}" height="${h}" rx="${r}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-opacity="${tier.isPremium ? "0.2" : "0.5"}"/>

  <!-- Top tier accent line -->
  <rect x="0" y="0" width="${w}" height="2" rx="${r}" fill="${tier.color}" fill-opacity="0.6"/>

  ${tier.isPremium ? renderPremiumEffects(w, h, r, tier) : ""}

  <!-- Avatar -->
  <g transform="translate(${p}, ${p})">
    <image href="${avatarHref}" x="2" y="2" width="44" height="44" clip-path="url(#avatarClip)" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="24" cy="24" r="22" fill="none" stroke="${tier.color}" stroke-width="2" stroke-opacity="0.6"/>
  </g>

  <!-- User Info -->
  <g>
    <text x="${nameX}" y="${p + 18}" font-size="15" font-weight="700" fill="${theme.title}">${safeName}</text>
    <text x="${nameX}" y="${p + 34}" font-size="11" fill="${theme.subtitle}">@${safeUsername}</text>
    <text x="${nameX}" y="${p + 50}" font-size="10" font-weight="600" fill="${tier.color}">Top ${tier.percentileRank}%</text>
    <text x="${nameX + 58}" y="${p + 50}" font-size="9" fill="${theme.subtitle}" fill-opacity="0.6">${nextTierText}</text>
  </g>

  <!-- Tier Emblem -->
  <g transform="translate(${emblemX}, ${emblemY})">
    ${renderTierEmblem(tier)}
  </g>

  <!-- Tier Stars -->
  <g transform="translate(${emblemX}, ${emblemY + (tier.isElite ? 72 : 78)})">
    ${renderTierStars(tier, emblemSize)}
  </g>

  <!-- Stat Bars -->
  <g transform="translate(${p}, ${barsY})">
    ${renderStatBars(breakdown, stats, barsWidth, theme, "barGrad")}
  </g>

  <!-- Watermark -->
  <text x="${w - p}" y="${h - 8}" text-anchor="end" font-size="8" fill="${theme.subtitle}" fill-opacity="0.4">github-tier.vercel.app</text>
</svg>`.trim();
}
