import type { Context } from "hono";
import { fetchGitHubStats } from "@/features/github/api";
import { calculateScore, resolveTier } from "@/features/tier/lib";
import { renderTierCard } from "@/features/card/lib";
import { fetchAvatarBase64, isValidGitHubUsername } from "@/shared/lib";
import { CACHE_TTL, THEMES, DEFAULT_THEME } from "@/shared/constants";

export async function tierHandler(c: Context) {
  const username = c.req.query("user");
  const themeName = c.req.query("theme") ?? DEFAULT_THEME;

  if (!username) {
    return c.json({ error: "Missing 'user' query parameter" }, 400);
  }

  if (!isValidGitHubUsername(username)) {
    return c.json({ error: "Invalid GitHub username" }, 400);
  }

  try {
    const stats = await fetchGitHubStats(username);

    if (!stats) {
      return c.json({ error: `User '${username}' not found` }, 404);
    }

    const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME];
    const breakdown = calculateScore(stats);
    const tier = resolveTier(breakdown.total);
    const avatarBase64 = await fetchAvatarBase64(stats.avatarUrl);
    const svg = renderTierCard({ stats, tier, breakdown, theme, avatarBase64 });

    return c.body(svg, 200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`,
    });
  } catch {
    return c.json({ error: "Internal server error" }, 500);
  }
}
