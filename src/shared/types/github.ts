export interface GitHubUserResponse {
  login: string;
  name: string | null;
  avatar_url: string;
  followers: number;
  public_repos: number;
}

export interface GitHubRepoResponse {
  stargazers_count: number;
}

export interface GitHubStats {
  username: string;
  name: string;
  avatarUrl: string;
  commits: number;
  stars: number;
  prs: number;
  issues: number;
  followers: number;
  repos: number;
}
