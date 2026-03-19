import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Tier - Gaming-style rank card for your GitHub profile",
  description: "Show your GitHub rank as a gaming-style tier card in your README",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0D1117", color: "#E6EDF3" }}>
        {children}
      </body>
    </html>
  );
}
