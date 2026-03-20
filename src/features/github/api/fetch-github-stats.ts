import { githubFetch } from "@/shared/lib";
import { GITHUB_GRAPHQL_URL, MAX_REPOS_PAGES, REPOS_PER_PAGE } from "@/shared/constants";
import type {
  GitHubUserResponse,
  GitHubRepoResponse,
  GitHubStats,
} from "@/shared/types";

interface GraphQLContributionResponse {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalIssueContributions: number;
        totalPullRequestReviewContributions: number;
        restrictedContributionsCount: number;
      };
    };
  };
}

async function fetchUser(username: string) {
  return githubFetch<GitHubUserResponse>(`/users/${username}`);
}

async function fetchContributions(username: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalPullRequestReviewContributions
          restrictedContributionsCount
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as GraphQLContributionResponse;
  return json.data?.user?.contributionsCollection ?? null;
}

async function fetchTotalStars(username: string) {
  const pagePromises = Array.from({ length: MAX_REPOS_PAGES }, (_, i) =>
    githubFetch<GitHubRepoResponse[]>(
      `/users/${username}/repos?per_page=${REPOS_PER_PAGE}&page=${i + 1}&type=owner`
    )
  );

  const pages = await Promise.all(pagePromises);
  let stars = 0;

  for (const repos of pages) {
    if (!repos || repos.length === 0) break;

    for (const repo of repos) {
      stars += repo.stargazers_count ?? 0;
    }

    if (repos.length < REPOS_PER_PAGE) break;
  }

  return stars;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const user = await fetchUser(username);
    if (!user) return null;

    const [contributions, stars] = await Promise.all([
      fetchContributions(username),
      fetchTotalStars(username),
    ]);

    const publicCommits = contributions?.totalCommitContributions ?? 0;
    const privateCommits = contributions?.restrictedContributionsCount ?? 0;

    return {
      username: user.login,
      name: user.name ?? user.login,
      avatarUrl: user.avatar_url,
      commits: publicCommits + privateCommits,
      stars,
      prs: contributions?.totalPullRequestContributions ?? 0,
      issues: contributions?.totalIssueContributions ?? 0,
      followers: user.followers,
      repos: user.public_repos,
    };
  } catch {
    return null;
  }
}
