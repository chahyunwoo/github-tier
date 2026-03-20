import { GITHUB_API_BASE } from "@/shared/constants";

const FETCH_TIMEOUT_MS = 8000;

export async function githubFetch<T>(path: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "github-tier",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) return null;

    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}
