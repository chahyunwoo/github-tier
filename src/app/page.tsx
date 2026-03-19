export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 24, padding: 32 }}>
      <h1 style={{ fontSize: 48, fontWeight: 800, margin: 0 }}>GitHub Tier</h1>
      <p style={{ fontSize: 18, color: "#8B949E", margin: 0 }}>Gaming-style rank card for your GitHub profile</p>
      <img src="/api/tier?user=chahyunwoo" alt="tier card" style={{ marginTop: 24 }} />
      <code style={{ background: "#161B22", padding: "12px 20px", borderRadius: 8, fontSize: 14 }}>
        {"![GitHub Tier](https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME)"}
      </code>
    </div>
  );
}
