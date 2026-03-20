import type { ScoreBreakdown, Theme } from "@/shared/types";

const STAT_LABELS: { key: keyof Omit<ScoreBreakdown, "total">; label: string }[] = [
  { key: "commits", label: "Commits" },
  { key: "stars", label: "Stars" },
  { key: "prs", label: "PRs" },
  { key: "followers", label: "Followers" },
  { key: "issues", label: "Issues" },
];

const BAR_HEIGHT = 8;
const BAR_GAP = 28;
const LABEL_WIDTH = 70;
const VALUE_WIDTH = 36;

export function renderStatBars(
  breakdown: ScoreBreakdown,
  color: string,
  totalWidth: number,
  theme: Theme
): string {
  const barWidth = totalWidth - LABEL_WIDTH - VALUE_WIDTH;

  return STAT_LABELS.map(({ key, label }, i) => {
    const value = Math.round(breakdown[key]);
    const filled = Math.round((value / 100) * barWidth);
    const y = i * BAR_GAP;

    return `
      <g transform="translate(0, ${y})">
        <text x="0" y="${BAR_HEIGHT + 4}" font-size="12" fill="${theme.subtitle}">${label}</text>
        <rect x="${LABEL_WIDTH}" y="0" width="${barWidth}" height="${BAR_HEIGHT}" rx="4" fill="${theme.barBg}"/>
        <rect x="${LABEL_WIDTH}" y="0" width="${filled}" height="${BAR_HEIGHT}" rx="4" fill="${color}" opacity="0.8"/>
        <text x="${LABEL_WIDTH + barWidth + 8}" y="${BAR_HEIGHT + 4}" font-size="11" font-weight="600" fill="${theme.text}">${value}</text>
      </g>
    `;
  }).join("");
}
