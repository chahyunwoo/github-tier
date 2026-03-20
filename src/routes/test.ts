import type { Context } from "hono";
import { html, raw } from "hono/html";
import { TIER_THRESHOLDS } from "@/shared/constants";

export function testPage(c: Context) {
  const tiers = TIER_THRESHOLDS.map((t) => ({
    label: t.division ? `${t.name} ${t.division}` : t.name,
    score: t.minScore + 1,
    color: t.color,
  }));

  const cards = tiers.map((t) => `
    <div style="display:flex;flex-direction:column;gap:6px">
      <span style="font-size:13px;font-weight:700;color:${t.color}">${t.label} (score: ${t.score})</span>
      <img src="/api/preview?score=${t.score}" alt="${t.label}" style="width:100%;max-width:450px;border-radius:4.5px" />
    </div>
  `).join("");

  return c.html(html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tier Preview</title>
  <style>
    body { margin: 0; background: #0D1117; color: #E6EDF3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  </style>
</head>
<body>
  <div style="padding:24px;max-width:1440px;margin:0 auto">
    <h1 style="font-size:28px;font-weight:800;margin-bottom:6px">All Tiers Preview</h1>
    <p style="color:#8B949E;margin-bottom:24px">${String(tiers.length)} tiers with mock data</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(460px,1fr));gap:20px">
      ${raw(cards)}
    </div>
  </div>
</body>
</html>`);
}
