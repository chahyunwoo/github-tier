import { GITHUB_API_BASE } from "@/shared/constants";

export async function githubFetch<T>(path: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "github-tier",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${GITHUB_API_BASE}${path}`, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;

  return res.json();
}
