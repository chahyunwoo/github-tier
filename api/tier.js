// src/shared/constants/api.ts
var CACHE_TTL = 3600;

// src/shared/constants/card.ts
var CARD_WIDTH = 450;
var CARD_HEIGHT = 290;
var CARD_PADDING = 24;
var CARD_BORDER_RADIUS = 16;

// src/shared/constants/github.ts
var GITHUB_API_BASE = "https://api.github.com";
var GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
var MAX_REPOS_PAGES = 10;
var REPOS_PER_PAGE = 100;

// src/shared/constants/themes.ts
var THEMES = {
  dark: {
    bg: "#0D1117",
    border: "#30363D",
    title: "#E6EDF3",
    text: "#E6EDF3",
    subtitle: "#8B949E",
    barBg: "#21262D"
  },
  tokyonight: {
    bg: "#1A1B27",
    border: "#414868",
    title: "#70A5FD",
    text: "#A9B1D6",
    subtitle: "#565F89",
    barBg: "#24283B"
  },
  dracula: {
    bg: "#282A36",
    border: "#6272A4",
    title: "#FF79C6",
    text: "#F8F8F2",
    subtitle: "#6272A4",
    barBg: "#44475A"
  },
  nord: {
    bg: "#2E3440",
    border: "#4C566A",
    title: "#88C0D0",
    text: "#ECEFF4",
    subtitle: "#4C566A",
    barBg: "#3B4252"
  },
  gruvbox: {
    bg: "#282828",
    border: "#504945",
    title: "#FABD2F",
    text: "#EBDBB2",
    subtitle: "#928374",
    barBg: "#3C3836"
  },
  catppuccin: {
    bg: "#1E1E2E",
    border: "#45475A",
    title: "#CBA6F7",
    text: "#CDD6F4",
    subtitle: "#6C7086",
    barBg: "#313244"
  },
  onedark: {
    bg: "#282C34",
    border: "#4B5263",
    title: "#61AFEF",
    text: "#ABB2BF",
    subtitle: "#5C6370",
    barBg: "#2C313C"
  },
  radical: {
    bg: "#141321",
    border: "#FE428E",
    title: "#FE428E",
    text: "#A9FEF7",
    subtitle: "#F8D847",
    barBg: "#1A1831"
  },
  light: {
    bg: "#FFFFFF",
    border: "#D0D7DE",
    title: "#24292F",
    text: "#24292F",
    subtitle: "#57606A",
    barBg: "#EFF1F3"
  }
};
var DEFAULT_THEME = "dark";

// src/shared/constants/tier.ts
var TIER_THRESHOLDS = [
  // Challenger (98~100)
  { name: "Challenger", division: null, minScore: 98, color: "#FF4655", gradient: ["#FF4655", "#FFD700"] },
  // Grandmaster (95~97)
  { name: "Grandmaster", division: null, minScore: 95, color: "#E44D4D", gradient: ["#E44D4D", "#FF6B6B"] },
  // Master (90~94)
  { name: "Master", division: null, minScore: 90, color: "#9B59B6", gradient: ["#9B59B6", "#C39BD3"] },
  // Diamond (80~89)
  { name: "Diamond", division: "I", minScore: 87, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  { name: "Diamond", division: "II", minScore: 84, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  { name: "Diamond", division: "III", minScore: 82, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  { name: "Diamond", division: "IV", minScore: 80, color: "#4FC3F7", gradient: ["#4FC3F7", "#81D4FA"] },
  // Emerald (65~79)
  { name: "Emerald", division: "I", minScore: 76, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "II", minScore: 72, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "III", minScore: 68, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  { name: "Emerald", division: "IV", minScore: 65, color: "#2ECC71", gradient: ["#27AE60", "#2ECC71"] },
  // Platinum (50~64)
  { name: "Platinum", division: "I", minScore: 61, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "II", minScore: 57, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "III", minScore: 54, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  { name: "Platinum", division: "IV", minScore: 50, color: "#26A69A", gradient: ["#26A69A", "#4DB6AC"] },
  // Gold (35~49)
  { name: "Gold", division: "I", minScore: 46, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "II", minScore: 42, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "III", minScore: 39, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  { name: "Gold", division: "IV", minScore: 35, color: "#F0B232", gradient: ["#C8961E", "#F0B232"] },
  // Silver (20~34)
  { name: "Silver", division: "I", minScore: 31, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "II", minScore: 27, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "III", minScore: 24, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  { name: "Silver", division: "IV", minScore: 20, color: "#B0BEC5", gradient: ["#90A4AE", "#CFD8DC"] },
  // Bronze (8~19)
  { name: "Bronze", division: "I", minScore: 17, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "II", minScore: 14, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "III", minScore: 11, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  { name: "Bronze", division: "IV", minScore: 8, color: "#CD7F32", gradient: ["#8B5A2B", "#CD7F32"] },
  // Iron (0~7)
  { name: "Iron", division: "I", minScore: 6, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "II", minScore: 4, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "III", minScore: 2, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] },
  { name: "Iron", division: "IV", minScore: 0, color: "#5D6D7E", gradient: ["#3E4A56", "#5D6D7E"] }
];

// src/shared/lib/github-fetch.ts
var FETCH_TIMEOUT_MS = 8e3;
async function githubFetch(path) {
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "github-tier"
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// src/shared/lib/fetch-avatar-base64.ts
async function fetchAvatarBase64(url) {
  try {
    const avatarUrl = new URL(url);
    avatarUrl.searchParams.set("s", "96");
    const res = await fetch(avatarUrl.toString(), {
      signal: AbortSignal.timeout(5e3)
    });
    if (!res.ok) return "";
    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    const contentType = res.headers.get("content-type") ?? "image/png";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return "";
  }
}

// src/shared/lib/utils/escape-xml.ts
function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// src/shared/lib/utils/truncate.ts
function truncateText(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "\u2026";
}

// src/shared/lib/utils/validate-username.ts
var GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
function isValidGitHubUsername(username) {
  return GITHUB_USERNAME_REGEX.test(username);
}

// src/features/github/api/fetch-github-stats.ts
async function fetchUser(username) {
  return githubFetch(`/users/${username}`);
}
async function fetchContributions(username) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
          restrictedContributionsCount
        }
      }
    }
  `;
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    signal: AbortSignal.timeout(8e3)
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.user?.contributionsCollection ?? null;
}
async function fetchTotalStars(username) {
  let stars = 0;
  for (let page = 1; page <= MAX_REPOS_PAGES; page++) {
    const repos = await githubFetch(
      `/users/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${page}&type=owner`
    );
    if (!repos || repos.length === 0) break;
    for (const repo of repos) {
      stars += repo.stargazers_count ?? 0;
    }
    if (repos.length < REPOS_PER_PAGE) break;
  }
  return stars;
}
async function fetchGitHubStats(username) {
  try {
    const user = await fetchUser(username);
    if (!user) return null;
    const [contributions, stars] = await Promise.all([
      fetchContributions(username),
      fetchTotalStars(username)
    ]);
    const publicCommits = contributions?.totalCommitContributions ?? 0;
    const privateCommits = contributions?.restrictedContributionsCount ?? 0;
    return {
      username: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      commits: publicCommits + privateCommits,
      stars,
      prs: contributions?.totalPullRequestContributions ?? 0,
      issues: contributions?.totalIssueContributions ?? 0,
      followers: user.followers,
      repos: user.public_repos
    };
  } catch {
    return null;
  }
}

// src/features/tier/lib/calculate-percentile.ts
var MEDIANS = {
  commits: 250,
  stars: 3,
  prs: 5,
  followers: 3,
  issues: 2
};
var WEIGHTS = {
  commits: 5,
  stars: 3,
  prs: 1,
  followers: 0.5,
  issues: 0.5
};
var TOTAL_WEIGHT = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
function logNormalCdf(x) {
  return x / (1 + x);
}
function metricCdf(metric, value) {
  return logNormalCdf(value / MEDIANS[metric]);
}
function calculateRank(stats) {
  let weightedSum = 0;
  for (const key of Object.keys(WEIGHTS)) {
    weightedSum += WEIGHTS[key] * metricCdf(key, stats[key]);
  }
  const score = Math.round(weightedSum / TOTAL_WEIGHT * 100);
  return Math.max(0, Math.min(100, score));
}

// src/features/tier/lib/calculate-score.ts
function calculateScore(stats) {
  const commits = Math.round(metricCdf("commits", stats.commits) * 100);
  const stars = Math.round(metricCdf("stars", stats.stars) * 100);
  const prs = Math.round(metricCdf("prs", stats.prs) * 100);
  const followers = Math.round(metricCdf("followers", stats.followers) * 100);
  const issues = Math.round(metricCdf("issues", stats.issues) * 100);
  const total = calculateRank({
    commits: stats.commits,
    stars: stats.stars,
    prs: stats.prs,
    followers: stats.followers,
    issues: stats.issues
  });
  return { commits, stars, prs, followers, issues, total };
}

// src/features/tier/lib/resolve-tier.ts
var PREMIUM_TIER_NAMES = /* @__PURE__ */ new Set(["Diamond", "Master", "Grandmaster", "Challenger"]);
var ELITE_TIER_NAMES = /* @__PURE__ */ new Set(["Master", "Grandmaster", "Challenger"]);
function calculatePercentileRank(score) {
  const mapping = [
    [98, 100, 0.01, 0.05],
    [95, 97, 0.05, 0.3],
    [90, 94, 0.3, 1],
    [87, 89, 1, 1.5],
    [84, 86, 1.5, 2],
    [82, 83, 2, 3],
    [80, 81, 3, 4],
    [76, 79, 4, 6],
    [72, 75, 6, 8],
    [68, 71, 8, 11],
    [65, 67, 11, 14],
    [61, 64, 14, 18],
    [57, 60, 18, 22],
    [54, 56, 22, 27],
    [50, 53, 27, 32],
    [46, 49, 32, 38],
    [42, 45, 38, 44],
    [39, 41, 44, 50],
    [35, 38, 50, 55],
    [31, 34, 55, 62],
    [27, 30, 62, 68],
    [24, 26, 68, 73],
    [20, 23, 73, 78],
    [17, 19, 78, 82],
    [14, 16, 82, 86],
    [11, 13, 86, 89],
    [8, 10, 89, 92],
    [6, 7, 92, 94],
    [4, 5, 94, 96],
    [2, 3, 96, 98],
    [0, 1, 98, 99]
  ];
  for (const [min, max, topStart, topEnd] of mapping) {
    if (score >= min && score <= max) {
      const ratio = max === min ? 0 : (score - min) / (max - min);
      const result = topStart + (topEnd - topStart) * (1 - ratio);
      return Math.round(result * 10) / 10;
    }
  }
  return 99;
}
function buildTierInfo(name, division, score, color, gradient) {
  return {
    name,
    division,
    displayName: division ? `${name} ${division}` : name,
    score,
    percentileRank: calculatePercentileRank(score),
    color,
    gradient,
    isPremium: PREMIUM_TIER_NAMES.has(name),
    isElite: ELITE_TIER_NAMES.has(name)
  };
}
function resolveTier(score) {
  for (const tier of TIER_THRESHOLDS) {
    if (score >= tier.minScore) {
      return buildTierInfo(tier.name, tier.division, score, tier.color, tier.gradient);
    }
  }
  const fallback = TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];
  return buildTierInfo(fallback.name, fallback.division, score, fallback.color, fallback.gradient);
}

// src/features/card/lib/render-tier-emblem.ts
function renderTierEmblem(tier) {
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
function renderEliteEmblem(tier, label, fontSize, letterSpacing) {
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
function renderHexEmblem(tier, division) {
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

// src/features/card/lib/render-stat-bars.ts
var STAT_LABELS = [
  { key: "commits", label: "Commits" },
  { key: "stars", label: "Stars" },
  { key: "prs", label: "PRs" },
  { key: "followers", label: "Followers" },
  { key: "issues", label: "Issues" }
];
var BAR_HEIGHT = 8;
var BAR_GAP = 28;
var LABEL_WIDTH = 70;
var VALUE_WIDTH = 36;
function renderStatBars(breakdown, color, totalWidth, theme) {
  const barWidth = totalWidth - LABEL_WIDTH - VALUE_WIDTH;
  return STAT_LABELS.map(({ key, label }, i) => {
    const value = Math.round(breakdown[key]);
    const filled = Math.round(value / 100 * barWidth);
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

// src/features/card/lib/render-premium-effects.ts
function renderPremiumEffects(w, h, r, tier) {
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

// src/features/card/lib/render-tier-card.ts
var MAX_NAME_LENGTH = 18;
var MAX_NAME_LENGTH_ELITE = 15;
function renderTierCard({ stats, tier, breakdown, theme, avatarBase64 }) {
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT;
  const r = CARD_BORDER_RADIUS;
  const p = CARD_PADDING;
  const [g1, g2] = tier.gradient;
  const avatarHref = escapeXml(avatarBase64 || stats.avatarUrl);
  const emblemSize = tier.isElite ? 110 : 80;
  const emblemX = w - p - emblemSize;
  const emblemY = tier.isElite ? p : p - 4;
  const nameX = p + 48 + 14;
  const maxLen = tier.isElite ? MAX_NAME_LENGTH_ELITE : MAX_NAME_LENGTH;
  const barsY = p + 48 + 56;
  const barsWidth = w - p * 2;
  const safeName = escapeXml(truncateText(stats.name, maxLen));
  const safeUsername = escapeXml(stats.username);
  const glowOpacity1 = tier.isPremium ? "0.25" : "0.1";
  const glowOpacity2 = tier.isPremium ? "0.1" : "0.03";
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
  <rect width="${w}" height="${h}" rx="${r}" fill="none" stroke="${theme.border}" stroke-width="1" stroke-opacity="${tier.isPremium ? "0.2" : "0.5"}"/>

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

// src/entry-edge.ts
var config = { runtime: "edge" };
async function handler(req) {
  const url = new URL(req.url);
  const username = url.searchParams.get("user");
  const themeName = url.searchParams.get("theme") ?? DEFAULT_THEME;
  if (!username) {
    return Response.json({ error: "Missing 'user' query parameter" }, { status: 400 });
  }
  if (!isValidGitHubUsername(username)) {
    return Response.json({ error: "Invalid GitHub username" }, { status: 400 });
  }
  try {
    const stats = await fetchGitHubStats(username);
    if (!stats) {
      return Response.json({ error: `User '${username}' not found` }, { status: 404 });
    }
    const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME];
    const breakdown = calculateScore(stats);
    const tier = resolveTier(breakdown.total);
    const avatarBase64 = await fetchAvatarBase64(stats.avatarUrl);
    const svg = renderTierCard({ stats, tier, breakdown, theme, avatarBase64 });
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`
      }
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
export {
  config,
  handler as default
};
