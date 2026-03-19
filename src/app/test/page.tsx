const TEST_USERS = [
  { login: "kentcdodds", desc: "Testing Library creator" },
  { login: "sindresorhus", desc: "1000+ npm packages" },
  { login: "antfu", desc: "Vue/Vite core team" },
  { login: "gaearon", desc: "React core team" },
  { login: "torvalds", desc: "Linux creator" },
  { login: "yyx990803", desc: "Vue.js creator" },
  { login: "shadcn", desc: "shadcn/ui creator" },
  { login: "ZeroCho", desc: "Korean educator" },
  { login: "junghyeonsu", desc: "Korean dev" },
  { login: "chahyunwoo", desc: "This project" },
  { login: "roeniss", desc: "Korean dev" },
  { login: "velopert", desc: "Korean educator" },
  { login: "jojoldu", desc: "Korean backend dev" },
  { login: "leerob", desc: "Vercel VP" },
  { login: "bradtraversy", desc: "YouTube educator" },
  { login: "florinpop17", desc: "100DaysOfCode" },
];

export default function TestPage() {
  return (
    <div style={{ padding: 32, maxWidth: 1440, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Real User Test</h1>
      <p style={{ color: "#8B949E", marginBottom: 32 }}>
        Actual GitHub data for {TEST_USERS.length} users
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(470px, 1fr))",
          gap: 24,
        }}
      >
        {TEST_USERS.map((user) => (
          <div key={user.login} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 14, color: "#8B949E" }}>
              <strong style={{ color: "#E6EDF3" }}>{user.login}</strong> - {user.desc}
            </span>
            <img
              src={`/api/tier?user=${user.login}`}
              alt={user.login}
              style={{ width: "100%", maxWidth: 450, borderRadius: 12 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
