import type { IncomingMessage, ServerResponse } from "http";
import { fetchGitHubStats } from "@/features/github/api";
import { calculateScore, resolveTier } from "@/features/tier/lib";
import { renderTierCard } from "@/features/card/lib";
import { fetchAvatarBase64, isValidGitHubUsername } from "@/shared/lib";
import { CACHE_TTL, THEMES, DEFAULT_THEME } from "@/shared/constants";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
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
