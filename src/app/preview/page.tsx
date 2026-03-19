import { TIER_THRESHOLDS } from "@/shared/constants";

const UNIQUE_TIERS = TIER_THRESHOLDS.map((t) => ({
  label: t.division ? `${t.name} ${t.division}` : t.name,
  score: t.minScore + 1,
  color: t.color,
}));

export default function PreviewPage() {
  return (
    <div style={{ padding: 32, maxWidth: 1440, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Tier Preview</h1>
      <p style={{ color: "#8B949E", marginBottom: 32 }}>
        All {UNIQUE_TIERS.length} tiers rendered with mock data
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(470px, 1fr))",
          gap: 24,
        }}
      >
        {UNIQUE_TIERS.map((tier) => (
          <div key={tier.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: tier.color }}>
              {tier.label} (score: {tier.score})
            </span>
            <img
              src={`/api/preview?score=${tier.score}`}
              alt={tier.label}
              style={{ width: "100%", maxWidth: 460, borderRadius: 12 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
