const MEDIANS = {
  commits: 250,
  stars: 3,
  prs: 5,
  followers: 3,
  issues: 2,
} as const;

const WEIGHTS = {
  commits: 5,
  stars: 3,
  prs: 1,
  followers: 0.5,
  issues: 0.5,
} as const;

const TOTAL_WEIGHT = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);

type MetricKey = keyof typeof MEDIANS;

function logNormalCdf(x: number): number {
  return x / (1 + x);
}

export function metricCdf(metric: MetricKey, value: number): number {
  return logNormalCdf(value / MEDIANS[metric]);
}

export function calculateRank(stats: Record<MetricKey, number>): number {
  let weightedSum = 0;

  for (const key of Object.keys(WEIGHTS) as MetricKey[]) {
    weightedSum += WEIGHTS[key] * metricCdf(key, stats[key]);
  }

  const score = Math.round((weightedSum / TOTAL_WEIGHT) * 100);

  return Math.max(0, Math.min(100, score));
}
