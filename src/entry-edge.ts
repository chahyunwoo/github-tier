import { fetchGitHubStats } from "@/features/github/api";
import { calculateScore, resolveTier } from "@/features/tier/lib";
import { renderTierCard } from "@/features/card/lib";
import { fetchAvatarBase64, isValidGitHubUsername } from "@/shared/lib";
import { CACHE_TTL, THEMES, DEFAULT_THEME } from "@/shared/constants";

export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("user");
    const themeName = url.searchParams.get("theme") ?? DEFAULT_THEME;

    if (!username) {
      return new Response(JSON.stringify({ error: "Missing 'user' query parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!isValidGitHubUsername(username)) {
      return new Response(JSON.stringify({ error: "Invalid GitHub username" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stats = await fetchGitHubStats(username);

    if (!stats) {
      return new Response(JSON.stringify({ error: `User '${username}' not found` }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME];
    const breakdown = calculateScore(stats);
    const tier = resolveTier(breakdown.total);
    const avatarBase64 = await fetchAvatarBase64(stats.avatarUrl);
    const svg = renderTierCard({ stats, tier, breakdown, theme, avatarBase64 });

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
