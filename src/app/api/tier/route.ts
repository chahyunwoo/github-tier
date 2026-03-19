import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubStats } from "@/features/github/api";
import { calculateScore, resolveTier } from "@/features/tier/lib";
import { renderTierCard } from "@/features/card/lib";
import { fetchAvatarBase64 } from "@/shared/lib";
import { CACHE_TTL, THEMES, DEFAULT_THEME } from "@/shared/constants";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("user");
  const themeName = request.nextUrl.searchParams.get("theme") ?? DEFAULT_THEME;

  if (!username) {
    return NextResponse.json(
      { error: "Missing 'user' query parameter" },
      { status: 400 }
    );
  }

  const stats = await fetchGitHubStats(username);

  if (!stats) {
    return NextResponse.json(
      { error: `User '${username}' not found` },
      { status: 404 }
    );
  }

  const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME];
  const breakdown = calculateScore(stats);
  const tier = resolveTier(breakdown.total);
  const avatarBase64 = await fetchAvatarBase64(stats.avatarUrl);
  const svg = renderTierCard({ stats, tier, breakdown, theme, avatarBase64 });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": `public, max-age=${CACHE_TTL}, s-maxage=${CACHE_TTL}`,
    },
  });
}
