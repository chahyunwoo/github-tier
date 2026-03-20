import { TIER_STAR_COUNTS } from "@/shared/constants";
import type { TierInfo } from "@/shared/types";

function renderStar(x: number, color: string, opacity: number): string {
  return `<path d="M${x + 3},0 L${x + 3.8},2 L${x + 6},2.2 L${x + 4.2},3.6 L${x + 4.8},6 L${x + 3},4.6 L${x + 1.2},6 L${x + 1.8},3.6 L${x},2.2 L${x + 2.2},2 Z"
    fill="${color}" fill-opacity="${opacity}"/>`;
}

export function renderTierStars(tier: TierInfo, containerWidth: number): string {
  const cx = containerWidth / 2;

  if (tier.name === "Challenger") {
    return `
      <!-- Crown -->
      <path d="M${cx - 12},6 L${cx - 8},-2 L${cx - 4},4 L${cx},-4 L${cx + 4},4 L${cx + 8},-2 L${cx + 12},6 Z"
        fill="${tier.color}" fill-opacity="0.35"/>
      <path d="M${cx - 12},6 L${cx - 8},-2 L${cx - 4},4 L${cx},-4 L${cx + 4},4 L${cx + 8},-2 L${cx + 12},6"
        fill="none" stroke="${tier.color}" stroke-width="1" stroke-opacity="0.6"/>
      <circle cx="${cx}" cy="-4" r="1.5" fill="${tier.color}" fill-opacity="0.6"/>
      <circle cx="${cx - 8}" cy="-2" r="1" fill="${tier.color}" fill-opacity="0.4"/>
      <circle cx="${cx + 8}" cy="-2" r="1" fill="${tier.color}" fill-opacity="0.4"/>
    `;
  }

  if (tier.name === "Grandmaster") {
    return `
      <!-- Diamond gem -->
      <path d="M${cx - 8},4 L${cx - 4},0 L${cx + 4},0 L${cx + 8},4 L${cx},10 Z"
        fill="${tier.color}" fill-opacity="0.3"/>
      <path d="M${cx - 8},4 L${cx - 4},0 L${cx + 4},0 L${cx + 8},4 L${cx},10 Z"
        fill="none" stroke="${tier.color}" stroke-width="0.8" stroke-opacity="0.5"/>
      <path d="M${cx - 4},0 L${cx},4 L${cx + 4},0" fill="none" stroke="${tier.color}" stroke-width="0.5" stroke-opacity="0.3"/>
      <path d="M${cx - 8},4 L${cx},4 L${cx + 8},4" fill="none" stroke="${tier.color}" stroke-width="0.5" stroke-opacity="0.3"/>
    `;
  }

  if (tier.name === "Master") {
    return `
      <!-- Shield -->
      <path d="M${cx},0 L${cx + 7},3 L${cx + 6},9 L${cx},11 L${cx - 6},9 L${cx - 7},3 Z"
        fill="${tier.color}" fill-opacity="0.25"/>
      <path d="M${cx},0 L${cx + 7},3 L${cx + 6},9 L${cx},11 L${cx - 6},9 L${cx - 7},3 Z"
        fill="none" stroke="${tier.color}" stroke-width="0.8" stroke-opacity="0.5"/>
      <path d="M${cx},2 L${cx},9" fill="none" stroke="${tier.color}" stroke-width="0.5" stroke-opacity="0.3"/>
    `;
  }

  if (tier.name === "Diamond") {
    const starSize = 6;
    const gap = 3;
    const count = 5;
    const totalWidth = count * starSize + (count - 1) * gap;
    const startX = (containerWidth - totalWidth) / 2;
    return Array.from({ length: count }, (_, i) =>
      renderStar(startX + i * (starSize + gap), tier.color, 0.5)
    ).join("");
  }

  const count = TIER_STAR_COUNTS[tier.name] ?? 0;
  if (count === 0) return "";

  const starSize = 6;
  const gap = 3;
  const totalWidth = count * starSize + (count - 1) * gap;
  const startX = (containerWidth - totalWidth) / 2;

  return Array.from({ length: count }, (_, i) =>
    renderStar(startX + i * (starSize + gap), tier.color, 0.5)
  ).join("");
}
