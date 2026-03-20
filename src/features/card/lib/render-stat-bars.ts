import type { GitHubStats, ScoreBreakdown, Theme } from "@/shared/types";
import { STAT_ICONS } from "@/shared/constants";

const STAT_LABELS: { key: keyof Omit<ScoreBreakdown, "total">; label: string; rawKey: keyof GitHubStats }[] = [
  { key: "commits", label: "Commits", rawKey: "commits" },
  { key: "stars", label: "Stars", rawKey: "stars" },
  { key: "prs", label: "PRs", rawKey: "prs" },
  { key: "followers", label: "Followers", rawKey: "followers" },
  { key: "issues", label: "Issues", rawKey: "issues" },
];

const ROW_HEIGHT = 16;
const ROW_GAP = 26;
const BAR_HEIGHT = 8;
const ICON_SIZE = 14;
const ICON_GAP = 6;
const LABEL_WIDTH = 88;
const RAW_VALUE_WIDTH = 50;
const SCORE_WIDTH = 30;

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function renderStatBars(
  breakdown: ScoreBreakdown,
  stats: GitHubStats,
  totalWidth: number,
  theme: Theme,
  gradientId: string
): string {
  const barWidth = totalWidth - LABEL_WIDTH - RAW_VALUE_WIDTH - SCORE_WIDTH;
  const cy = ROW_HEIGHT / 2;
  const barY = cy - BAR_HEIGHT / 2;
  const iconY = cy - ICON_SIZE / 2;

  return STAT_LABELS.map(({ key, label, rawKey }, i) => {
    const score = Math.round(breakdown[key]);
    const rawValue = stats[rawKey] as number;
    const filled = Math.round((score / 100) * barWidth);
    const y = i * ROW_GAP;
    const icon = STAT_ICONS[key] ?? "";

    return `
      <g transform="translate(0, ${y})">
        <svg x="0" y="${iconY}" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 16 16" fill="${theme.subtitle}">
          ${icon}
        </svg>
        <text x="${ICON_SIZE + ICON_GAP}" y="${cy}" dominant-baseline="central" font-size="11" fill="${theme.subtitle}">${label}</text>
        <rect x="${LABEL_WIDTH}" y="${barY}" width="${barWidth}" height="${BAR_HEIGHT}" rx="4" fill="${theme.barBg}"/>
        <rect x="${LABEL_WIDTH}" y="${barY}" width="${filled}" height="${BAR_HEIGHT}" rx="4" fill="url(#${gradientId})" opacity="0.85"/>
        <text x="${LABEL_WIDTH + barWidth + 6}" y="${cy}" dominant-baseline="central" font-size="10" fill="${theme.subtitle}">${formatNumber(rawValue)}</text>
        <text x="${totalWidth}" y="${cy}" dominant-baseline="central" text-anchor="end" font-size="10" font-weight="700" fill="${theme.text}">${score}</text>
      </g>
    `;
  }).join("");
}
