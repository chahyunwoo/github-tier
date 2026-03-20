const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

export function isValidGitHubUsername(username: string): boolean {
  return GITHUB_USERNAME_REGEX.test(username);
}
