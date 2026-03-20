# Contributing to GitHub Tier

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+
- A [GitHub Personal Access Token](https://github.com/settings/tokens) with `read:user` scope

### Getting Started

1. **Fork and clone the repo**

```bash
git clone https://github.com/YOUR_USERNAME/github-tier.git
cd github-tier
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your GitHub token:

```
GITHUB_TOKEN=ghp_your_token_here
```

4. **Start the dev server**

```bash
pnpm dev
```

The server runs at `http://localhost:3333`. Try `http://localhost:3333/api/tier?user=YOUR_USERNAME`.

5. **Run tests**

```bash
pnpm test
```

### Project Structure

```
src/
  shared/          # Constants, types, utilities
  features/        # Business logic (FSD)
    github/api/    # GitHub API integration
    tier/lib/      # Score calculation, tier resolution
    card/lib/      # SVG card rendering
  routes/          # API route handlers
  app.ts           # Hono app setup
  index.ts         # Local dev server entry
```

## How to Contribute

### Bug Reports

Open an [issue](https://github.com/chahyunwoo/github-tier/issues) with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests

Open an [issue](https://github.com/chahyunwoo/github-tier/issues) describing:
- The problem you're solving
- Your proposed solution
- Any alternatives you've considered

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Add tests if applicable
4. Ensure `pnpm test` passes
5. Submit a PR

### Adding a New Theme

1. Add your theme to `src/shared/constants/themes.ts`
2. Follow the existing `Theme` interface
3. Test it locally with `?theme=your_theme_name`
4. Add a preview to the README

## Code Style

- TypeScript strict mode
- Absolute imports (`@/`)
- FSD architecture
- No `eslint-disable` or `biome-ignore`
- No `console.log` in production code
