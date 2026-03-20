<div align="center">
  <img src="assets/logo.svg" width="100" alt="GitHub Tier"/>
  <h1>GitHub Tier</h1>
  <p><strong>🎮 Gaming-style rank card for your GitHub profile</strong></p>
  <p>Show off your GitHub activity as a competitive rank — from Iron to Challenger</p>
</div>

<p align="center">
  <a href="https://github.com/chahyunwoo/github-tier/stargazers"><img src="https://img.shields.io/github/stars/chahyunwoo/github-tier?style=for-the-badge&color=F0B232&logo=github" alt="Stars"/></a>
  <a href="https://github.com/chahyunwoo/github-tier/actions"><img src="https://img.shields.io/github/actions/workflow/status/chahyunwoo/github-tier/ci.yml?style=for-the-badge&label=CI&logo=githubactions&logoColor=white" alt="CI"/></a>
  <a href="https://github.com/chahyunwoo/github-tier/blob/main/LICENSE"><img src="https://img.shields.io/github/license/chahyunwoo/github-tier?style=for-the-badge&color=blue" alt="License"/></a>
  <a href="https://github-tier.vercel.app"><img src="https://img.shields.io/badge/Vercel-Live-black?style=for-the-badge&logo=vercel" alt="Deploy"/></a>
</p>

<p align="center">
  <a href="https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME">🔗 View Demo</a>
  &nbsp;&middot;&nbsp;
  <a href="https://github.com/chahyunwoo/github-tier/issues">🐛 Report Bug</a>
  &nbsp;&middot;&nbsp;
  <a href="https://github.com/chahyunwoo/github-tier/issues">✨ Request Feature</a>
</p>

---

<div align="center">
  <img src="https://github-tier.vercel.app/api/tier?user=chahyunwoo&v=2v=3" alt="demo" width="450"/>
  <br/>
  <sub>👆 This card updates automatically every hour</sub>
</div>

<br/>

## ⚡ Features

- 🏆 **10 Tier Ranks** — Iron → Bronze → Silver → Gold → Platinum → Emerald → Diamond → Master → Grandmaster → Challenger
- 🎯 **Division System** — Each tier has IV to I subdivisions (like League of Legends)
- 📊 **5 Metrics** — Commits, Stars, PRs, Followers, Issues
- 🔬 **CDF-based Scoring** — Log-Normal CDF model validated against 225+ real GitHub users
- 🎨 **9 Themes** — dark, tokyonight, dracula, nord, gruvbox, catppuccin, onedark, radical, light
- 💎 **Premium Effects** — Diamond+ tiers get glow borders, Master+ get elite emblems
- 🔄 **Auto Updates** — Card refreshes every hour via CDN cache
- 🔒 **Private Contributions** — Includes private repo commits via GitHub GraphQL API
- ⚡ **Fast** — Vercel Serverless Functions with minimal cold start
- 🛡️ **Secure** — XSS protection, input validation, GraphQL variable binding

## 🚀 Quick Start

**1.** Copy-paste this into your GitHub profile README:

```md
[![GitHub Tier](https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME)](https://github.com/chahyunwoo/github-tier)
```

**2.** Replace `YOUR_USERNAME` with your GitHub username.

**3.** That's it! ⭐ Star this repo if you like it!

## 🏅 Tier System

| Tier | Score | Top % | Badge |
|------|-------|-------|-------|
| 🔴 Challenger | 98+ | 0.01~0.05% | 👑 Crown |
| 🟠 Grandmaster | 95-97 | 0.05~0.3% | 💎 Gem |
| 🟣 Master | 90-94 | 0.3~1% | 🛡️ Shield |
| 💠 Diamond IV-I | 80-89 | 1~5% | ⭐⭐⭐⭐⭐ |
| 🟢 Emerald IV-I | 65-79 | 5~15% | ⭐⭐⭐⭐ |
| 🔷 Platinum IV-I | 50-64 | 15~30% | ⭐⭐⭐⭐ |
| 🟡 Gold IV-I | 35-49 | 30~55% | ⭐⭐⭐ |
| ⚪ Silver IV-I | 20-34 | 55~80% | ⭐⭐ |
| 🟤 Bronze IV-I | 8-19 | 80~95% | ⭐ |
| ⬛ Iron IV-I | 0-7 | 95%+ | — |

### 📸 Tier Examples

<table>
  <tr>
    <td align="center"><img src="assets/examples/challenger.svg" width="400"/><br/><b>🔴 Challenger</b></td>
    <td align="center"><img src="assets/examples/grandmaster.svg" width="400"/><br/><b>🟠 Grandmaster</b></td>
  </tr>
  <tr>
    <td align="center"><img src="assets/examples/master.svg" width="400"/><br/><b>🟣 Master</b></td>
    <td align="center"><img src="assets/examples/diamond.svg" width="400"/><br/><b>🔵 Diamond</b></td>
  </tr>
  <tr>
    <td align="center"><img src="assets/examples/emerald.svg" width="400"/><br/><b>🟢 Emerald</b></td>
    <td align="center"><img src="assets/examples/platinum.svg" width="400"/><br/><b>🩵 Platinum</b></td>
  </tr>
  <tr>
    <td align="center"><img src="assets/examples/gold.svg" width="400"/><br/><b>🟡 Gold</b></td>
    <td align="center"><img src="assets/examples/silver.svg" width="400"/><br/><b>⚪ Silver</b></td>
  </tr>
  <tr>
    <td align="center"><img src="assets/examples/bronze.svg" width="400"/><br/><b>🟤 Bronze</b></td>
    <td align="center"><img src="assets/examples/iron.svg" width="400"/><br/><b>⬛ Iron</b></td>
  </tr>
</table>

## 🎨 Themes

Add `&theme=THEME_NAME` to your URL:

```md
![GitHub Tier](https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME&theme=tokyonight)
```

| Theme | Preview |
|-------|---------|
| `dark` (default) | ![dark](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=dark) |
| `tokyonight` | ![tokyonight](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=tokyonight) |
| `dracula` | ![dracula](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=dracula) |
| `nord` | ![nord](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=nord) |
| `gruvbox` | ![gruvbox](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=gruvbox) |
| `catppuccin` | ![catppuccin](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=catppuccin) |
| `onedark` | ![onedark](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=onedark) |
| `radical` | ![radical](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=radical) |
| `light` | ![light](https://github-tier.vercel.app/api/tier?user=chahyunwoo&theme=light) |

> 💡 Want a custom theme? [Open an issue](https://github.com/chahyunwoo/github-tier/issues) or submit a PR!

## 📐 Options

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `user` | GitHub username **(required)** | `string` | — |
| `theme` | Card color theme | `string` | `dark` |

## 🧪 How It Works

Your score is calculated using a **Log-Normal CDF** model, validated against **225+ randomly sampled GitHub users**:

```
score = weighted_sum(
  commits   x 5     // CDF median: 250
  stars     x 3     // CDF median: 3
  prs       x 1     // CDF median: 5
  followers x 0.5   // CDF median: 3
  issues    x 0.5   // CDF median: 2
) / total_weight
```

| Detail | Description |
|--------|-------------|
| **CDF Function** | `f(x) = x / (1 + x)` — produces smooth 0-100 scores with diminishing returns |
| **Data Source** | GitHub GraphQL API — includes private contributions |
| **Refresh** | Every 1 hour (CDN cached via `Cache-Control`) |
| **Validation** | Monte Carlo simulation (100k synthetic users) + real user sampling |

> 📖 The scoring model is inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats), adapted with different weights and CDF normalization for the tier system.

## 🚀 Deploy Your Own (Recommended)

The public instance (`github-tier.vercel.app`) works for everyone, but GitHub's API allows only **5,000 requests/hour** per token. As more people use the public endpoint, you may occasionally see slower responses or rate limit errors.

By deploying your own instance, you get:
- 🔒 **Your own API rate limit** — no sharing with other users
- ⚡ **Faster responses** — dedicated instance with no queue
- 🔐 **Full control** — your own token, your own caching
- 📊 **Private contributions** — guaranteed private repo data

### 🔑 Step 1: Get Your Personal Access Token (PAT)

You'll need a GitHub PAT to fetch contribution data (including private repos). Choose one of the two token types:

<details>
<summary><b>Classic Token</b></summary>

1. Go to **Settings** → **Developer Settings** → **Personal access tokens** → **[Tokens (classic)](https://github.com/settings/tokens)**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Select scope: `read:user`
4. Click **Generate token** and copy it

</details>

<details>
<summary><b>Fine-grained Token</b></summary>

> ⚠️ Fine-grained tokens have limited GraphQL API support. **Private contributions may not be included.** For full functionality, use a Classic token.

1. Go to **Settings** → **Developer Settings** → **Personal access tokens** → **[Fine-grained tokens](https://github.com/settings/personal-access-tokens/new)**
2. Set an expiration date
3. Select **All repositories**
4. Under **Account permissions**, select **read-only** access
5. Click **Generate token** and copy it

</details>

### ☁️ Option A: Deploy on Vercel

The easiest way. One click and you're done.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chahyunwoo/github-tier&env=GITHUB_TOKEN&envDescription=GitHub%20Personal%20Access%20Token%20with%20read:user%20scope)

1. Click the button above
2. Paste your `GITHUB_TOKEN` when prompted
3. Done! Your instance is live at `https://your-project.vercel.app/api/tier?user=USERNAME`

> ⚠️ Remember to **redeploy** after changing environment variables.

### 💻 Option B: Run Locally

```bash
# 1. Clone
git clone https://github.com/chahyunwoo/github-tier.git
cd github-tier

# 2. Install dependencies
pnpm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local and add: GITHUB_TOKEN=ghp_your_token

# 4. Start dev server
pnpm dev

# 5. Open in browser
open http://localhost:3333/api/tier?user=YOUR_USERNAME
```

### ⚙️ Environment Variables

| Name | Description | Default | Required |
|------|-------------|---------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token with `read:user` scope. Required for private contributions and higher rate limits. | — | Yes |
| `CACHE_SECONDS` | Cache duration in seconds for generated cards. Set to `0` to disable caching. | `3600` (1 hour) | No |

> 💡 Without a token, the API falls back to public data only and is subject to GitHub's unauthenticated rate limit (60 requests/hour).
>
> ⚠️ Remember to **redeploy** after changing environment variables for changes to take effect.

### 📌 Quick Tips

**Resize the card** using `width` or `height` attributes:

```html
<!-- Fixed width -->
<img src="https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME" width="450" />

<!-- Fixed height (matches github-readme-stats) -->
<img src="https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME" height="195" />
```

**Combine with other profile cards** side by side:

```html
<a href="https://github.com/chahyunwoo/github-tier">
  <img height="195" align="center" src="https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME" />
</a>
<a href="https://github.com/anuraghazra/github-readme-stats">
  <img height="195" align="center" src="https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true" />
</a>
```

**Place on a separate line** for full visibility:

```html
<div align="center">
  <img src="https://github-tier.vercel.app/api/tier?user=YOUR_USERNAME" width="450" />
</div>
```

### 🤖 Option C: GitHub Actions (Static SVG)

Instead of a live API, you can generate a static SVG via GitHub Actions. This avoids API rate limits entirely.

Create `.github/workflows/tier-card.yml` in your profile repo (`USERNAME/USERNAME`):

```yaml
name: Update Tier Card

on:
  schedule:
    - cron: "0 0 * * *"  # Daily at midnight
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Generate tier card
        run: |
          curl -s "https://github-tier.vercel.app/api/tier?user=${{ github.repository_owner }}" > profile/tier.svg

      - name: Commit
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@users.noreply.github.com"
          mkdir -p profile
          git add profile/tier.svg
          git commit -m "Update tier card" || exit 0
          git push
```

Then embed in your profile README:

```md
![GitHub Tier](./profile/tier.svg)
```

> 💡 This updates daily. Use `workflow_dispatch` to trigger manually anytime.

## ❓ FAQ

<details>
<summary><b>Why is my tier lower than expected?</b></summary>

The score is based on your **last year's** GitHub activity across 5 metrics. If you mainly commit to private repos, make sure the `GITHUB_TOKEN` has `read:user` scope to include private contributions.

</details>

<details>
<summary><b>How often does the card update?</b></summary>

The card is cached for **1 hour** via CDN. After that, the next request fetches fresh data from the GitHub API.

</details>

<details>
<summary><b>Can my tier go down?</b></summary>

Yes! Since the score is based on the last 12 months of activity, old contributions expire and your score may decrease over time. Stay active to maintain your rank! 💪

</details>

<details>
<summary><b>Does it include private contributions?</b></summary>

Yes, if you deploy your own instance with a `GITHUB_TOKEN`. The public instance at `github-tier.vercel.app` also includes private contributions.

</details>

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | [Hono](https://hono.dev) + Vercel Serverless |
| **API** | GitHub GraphQL API + REST API |
| **Rendering** | Server-side SVG generation |
| **Testing** | Vitest (45 tests) |
| **CI/CD** | GitHub Actions |
| **Architecture** | Feature-Sliced Design (FSD) |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

- 🐛 **Bug Reports** — Found a bug? [Open an issue](https://github.com/chahyunwoo/github-tier/issues)
- ✨ **Feature Requests** — Have an idea? [Open an issue](https://github.com/chahyunwoo/github-tier/issues)
- 🎨 **New Themes** — Submit a PR adding a new theme to `src/shared/constants/themes.ts`
- 📖 **Documentation** — Help improve the docs

Please open an issue first to discuss what you would like to change.

## 📝 License

[MIT](LICENSE) - Made with ❤️ by [Cha Hyun Woo](https://github.com/chahyunwoo)
