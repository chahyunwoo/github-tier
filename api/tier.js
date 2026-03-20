"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entry-edge.ts
var entry_edge_exports = {};
__export(entry_edge_exports, {
  default: () => handler
});
module.exports = __toCommonJS(entry_edge_exports);

// src/shared/constants/api.ts
var DEFAULT_CACHE_TTL = 3600;
var CACHE_TTL = Number(process.env.CACHE_SECONDS) || DEFAULT_CACHE_TTL;

// src/shared/constants/card.ts
var CARD_WIDTH = 450;
var CARD_HEIGHT = 260;
var CARD_PADDING = 18;
var CARD_BORDER_RADIUS = 4.5;
var MAX_NAME_LENGTH = 18;
var MAX_NAME_LENGTH_ELITE = 15;
var TIER_STAR_COUNTS = {
  Iron: 0,
  Bronze: 1,
  Silver: 2,
  Gold: 3,
  Platinum: 4,
  Emerald: 4,
  Diamond: 5,
  Master: 5,
  Grandmaster: 5,
  Challenger: 5
};

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
    text: "#C9D1D9",
    subtitle: "#8B949E",
    icon: "#58A6FF",
    barBg: "#21262D"
  },
  tokyonight: {
    bg: "#1A1B27",
    border: "#414868",
    title: "#70A5FD",
    text: "#C0CAF5",
    subtitle: "#7982A9",
    icon: "#BB9AF7",
    barBg: "#292E42"
  },
  dracula: {
    bg: "#282A36",
    border: "#6272A4",
    title: "#FF79C6",
    text: "#F8F8F2",
    subtitle: "#8390BF",
    icon: "#BD93F9",
    barBg: "#44475A"
  },
  nord: {
    bg: "#2E3440",
    border: "#4C566A",
    title: "#88C0D0",
    text: "#ECEFF4",
    subtitle: "#7B88A1",
    icon: "#81A1C1",
    barBg: "#3B4252"
  },
  gruvbox: {
    bg: "#282828",
    border: "#504945",
    title: "#FABD2F",
    text: "#EBDBB2",
    subtitle: "#A89984",
    icon: "#FE8019",
    barBg: "#3C3836"
  },
  catppuccin: {
    bg: "#1E1E2E",
    border: "#585B70",
    title: "#CBA6F7",
    text: "#CDD6F4",
    subtitle: "#9399B2",
    icon: "#F5C2E7",
    barBg: "#363A4F"
  },
  onedark: {
    bg: "#282C34",
    border: "#4B5263",
    title: "#61AFEF",
    text: "#ABB2BF",
    subtitle: "#7F848E",
    icon: "#C678DD",
    barBg: "#333842"
  },
  radical: {
    bg: "#141321",
    border: "#FE428E",
    title: "#FE428E",
    text: "#A9FEF7",
    subtitle: "#C3BFED",
    icon: "#F8D847",
    barBg: "#212040"
  },
  light: {
    bg: "#FFFFFF",
    border: "#D0D7DE",
    title: "#24292F",
    text: "#24292F",
    subtitle: "#656D76",
    icon: "#0969DA",
    barBg: "#E8ECF0"
  }
};
var DEFAULT_THEME = "dark";

// src/shared/constants/icons.ts
var STAT_ICONS = {
  commits: `<path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>`,
  stars: `<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>`,
  prs: `<path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z"/>`,
  followers: `<path d="M10.561 8.073a6 6 0 0 1 3.32 5.17.75.75 0 1 1-1.497.076 4.5 4.5 0 0 0-7.37-3.11.75.75 0 0 1-.994-1.124A6 6 0 0 1 8 7.5a6 6 0 0 1 2.561.573ZM8 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 1.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>`,
  issues: `<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/>`
};

// src/shared/constants/tier.ts
var TIER_THRESHOLDS = [
  // Challenger (98~100)
  { name: "Challenger", division: null, minScore: 98, color: "#FF4655", gradient: ["#FF4655", "#FFD700"] },
  // Grandmaster (95~97)
  { name: "Grandmaster", division: null, minScore: 95, color: "#E44D4D", gradient: ["#E44D4D", "#FF6B6B"] },
  // Master (90~94)
  { name: "Master", division: null, minScore: 90, color: "#9B59B6", gradient: ["#9B59B6", "#C39BD3"] },
  // Diamond (80~89)
  { name: "Diamond", division: "I", minScore: 87, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },
  { name: "Diamond", division: "II", minScore: 84, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },
  { name: "Diamond", division: "III", minScore: 82, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },
  { name: "Diamond", division: "IV", minScore: 80, color: "#68B8F8", gradient: ["#5B9BF0", "#A78BFA"] },
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
    [80, 89, 1, 5],
    [65, 79, 5, 15],
    [50, 64, 15, 30],
    [35, 49, 30, 55],
    [20, 34, 55, 80],
    [8, 19, 80, 95],
    [0, 7, 95, 100]
  ];
  for (const [min, max, topStart, topEnd] of mapping) {
    if (score >= min && score <= max) {
      const ratio = max === min ? 0 : (score - min) / (max - min);
      const result = topEnd + (topStart - topEnd) * ratio;
      if (result < 0.1) return Math.round(result * 100) / 100;
      if (result < 1) return Math.round(result * 10) / 10;
      return Math.round(result);
    }
  }
  return 100;
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

// src/features/tier/lib/get-next-tier.ts
function getNextTierInfo(score) {
  for (let i = TIER_THRESHOLDS.length - 1; i >= 0; i--) {
    if (TIER_THRESHOLDS[i].minScore > score) {
      const t = TIER_THRESHOLDS[i];
      const name = t.division ? `${t.name} ${t.division}` : t.name;
      return { name, pointsNeeded: t.minScore - score };
    }
  }
  return null;
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
function renderHexEmblem(tier, division) {
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
function getTierRank(name) {
  const ranks = {
    Iron: 1,
    Bronze: 2,
    Silver: 3,
    Gold: 4,
    Platinum: 5,
    Emerald: 6,
    Diamond: 7
  };
  return ranks[name] ?? 0;
}
function renderCenterDecor(color, rank) {
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

// src/features/card/lib/render-tier-stars.ts
function renderStar(x, color, opacity) {
  return `<path d="M${x + 3},0 L${x + 3.8},2 L${x + 6},2.2 L${x + 4.2},3.6 L${x + 4.8},6 L${x + 3},4.6 L${x + 1.2},6 L${x + 1.8},3.6 L${x},2.2 L${x + 2.2},2 Z"
    fill="${color}" fill-opacity="${opacity}"/>`;
}
function renderTierStars(tier, containerWidth) {
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
    const starSize2 = 6;
    const gap2 = 3;
    const count2 = 5;
    const totalWidth2 = count2 * starSize2 + (count2 - 1) * gap2;
    const startX2 = (containerWidth - totalWidth2) / 2;
    return Array.from(
      { length: count2 },
      (_, i) => renderStar(startX2 + i * (starSize2 + gap2), tier.color, 0.5)
    ).join("");
  }
  const count = TIER_STAR_COUNTS[tier.name] ?? 0;
  if (count === 0) return "";
  const starSize = 6;
  const gap = 3;
  const totalWidth = count * starSize + (count - 1) * gap;
  const startX = (containerWidth - totalWidth) / 2;
  return Array.from(
    { length: count },
    (_, i) => renderStar(startX + i * (starSize + gap), tier.color, 0.5)
  ).join("");
}

// src/features/card/lib/render-stat-bars.ts
var STAT_LABELS = [
  { key: "commits", label: "Commits", rawKey: "commits" },
  { key: "stars", label: "Stars", rawKey: "stars" },
  { key: "prs", label: "PRs", rawKey: "prs" },
  { key: "followers", label: "Followers", rawKey: "followers" },
  { key: "issues", label: "Issues", rawKey: "issues" }
];
var ROW_HEIGHT = 16;
var ROW_GAP = 26;
var BAR_HEIGHT = 8;
var ICON_SIZE = 14;
var ICON_GAP = 6;
var LABEL_WIDTH = 88;
var RAW_VALUE_WIDTH = 50;
var SCORE_WIDTH = 30;
function formatNumber(n) {
  if (n >= 1e4) return `${Math.round(n / 1e3)}k`;
  if (n >= 950) return `${(n / 1e3).toFixed(1)}k`;
  return String(n);
}
function renderStatBars(breakdown, stats, totalWidth, theme, gradientId) {
  const barWidth = totalWidth - LABEL_WIDTH - RAW_VALUE_WIDTH - SCORE_WIDTH;
  const cy = ROW_HEIGHT / 2;
  const barY = cy - BAR_HEIGHT / 2;
  const iconY = cy - ICON_SIZE / 2;
  return STAT_LABELS.map(({ key, label, rawKey }, i) => {
    const score = Math.round(breakdown[key]);
    const rawValue = stats[rawKey];
    const filled = Math.round(score / 100 * barWidth);
    const y = i * ROW_GAP;
    const icon = STAT_ICONS[key] ?? "";
    return `
      <g transform="translate(0, ${y})">
        <svg x="0" y="${iconY}" width="${ICON_SIZE}" height="${ICON_SIZE}" viewBox="0 0 16 16" fill="${theme.icon}">
          ${icon}
        </svg>
        <text x="${ICON_SIZE + ICON_GAP}" y="${cy}" dominant-baseline="central" font-size="11" fill="${theme.text}">${label}</text>
        <rect x="${LABEL_WIDTH}" y="${barY}" width="${barWidth}" height="${BAR_HEIGHT}" rx="4" fill="${theme.barBg}"/>
        <rect x="${LABEL_WIDTH}" y="${barY}" width="${filled}" height="${BAR_HEIGHT}" rx="4" fill="url(#${gradientId})" opacity="0.85"/>
        <text x="${LABEL_WIDTH + barWidth + 6}" y="${cy}" dominant-baseline="central" font-size="10" fill="${theme.subtitle}">${formatNumber(rawValue)}</text>
        <text x="${totalWidth}" y="${cy}" dominant-baseline="central" text-anchor="end" font-size="9" font-weight="700" fill="${theme.icon}">${score} <tspan fill="${theme.subtitle}" font-weight="400" font-size="7">/ 100</tspan></text>
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
function renderTierCard({ stats, tier, breakdown, theme, avatarBase64 }) {
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

// src/entry-edge.ts
async function handler(req, res) {
  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const username = url.searchParams.get("user");
    const themeName = url.searchParams.get("theme") ?? DEFAULT_THEME;
    if (!username) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Missing 'user' query parameter" }));
      return;
    }
    if (!isValidGitHubUsername(username)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid GitHub username" }));
      return;
    }
    const stats = await fetchGitHubStats(username);
    if (!stats) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: `User '${username}' not found` }));
      return;
    }
    const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME];
    const breakdown = calculateScore(stats);
    const tier = resolveTier(breakdown.total);
    const avatarBase64 = await fetchAvatarBase64(stats.avatarUrl);
    const svg = renderTierCard({ stats, tier, breakdown, theme, avatarBase64 });
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`);
    res.end(svg);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: String(e) }));
  }
}
