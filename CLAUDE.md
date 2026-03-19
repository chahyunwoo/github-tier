# CLAUDE.md

## 프로젝트 개요
GitHub 활동을 분석해서 롤 스타일 티어 카드(SVG)를 생성하는 오픈소스 위젯.
README에 이미지 URL 한 줄로 사용: `![tier](https://github-tier.vercel.app/api/tier?user=USERNAME&theme=tokyonight)`

## 기술 스택
- Next.js 16 + TypeScript
- Vercel Serverless (SVG 동적 생성)
- GitHub REST API
- FSD(Feature-Sliced Design) 구조

## 프로젝트 구조
```
src/
  shared/
    constants/   — github.ts, tier.ts, card.ts, themes.ts (+ index.ts barrel)
    types/       — github.ts, tier.ts (+ index.ts barrel)
    lib/         — github-fetch.ts, fetch-avatar-base64.ts (+ index.ts barrel)
  features/
    github/api/  — fetch-github-stats.ts (GitHub API 호출, 한 파일에 모아둠)
    tier/lib/    — calculate-percentile.ts, calculate-score.ts, resolve-tier.ts
    card/lib/    — render-tier-card.ts, render-tier-emblem.ts, render-stat-bars.ts
  app/
    api/tier/route.ts  — GET /api/tier?user=USERNAME&theme=THEME
    layout.tsx
    page.tsx           — 랜딩 페이지
```

## 실행
```bash
npm run dev     # http://localhost:3333
```

## API
```
GET /api/tier?user={username}&theme={theme}
```
- `user`: GitHub 유저네임 (필수)
- `theme`: dark, tokyonight, dracula, nord, gruvbox, catppuccin, onedark, radical, light (기본: dark)
- 응답: SVG 이미지 (Cache-Control: 1시간)

## 티어 시스템
롤 랭크 구조:
- Iron IV~I → Bronze IV~I → Silver IV~I → Gold IV~I → Platinum IV~I → Emerald IV~I → Diamond IV~I → Master → Grandmaster → Challenger
- 디비전(IV~I)은 Iron~Diamond에만 적용, Master 이상은 디비전 없음

## 점수 계산
- Commits 30% + Stars 25% + PRs 20% + Followers 15% + Issues 10%
- 각 항목: PERCENTILE_BENCHMARKS 기준으로 0~100 백분위 계산
- 가중 합산 → 총점 0~100

## 남은 작업 (우선순위)
1. **SVG 카드 레이아웃 재작성** — 현재 텍스트 겹침 버그. 아바타/이름/티어 엠블럼/스탯바 배치를 깔끔하게 재설계
2. **디비전 세분화** — tier.ts에 IV~I 추가, 점수 구간 세분화
3. **상위 % 표시** — 카드에 "Top 25%" 표시
4. **디자인 고도화** — 롤 티어 엠블럼 느낌의 육각형 뱃지, 글로우 효과
5. **Vercel 배포**
6. **GitHub 레포 생성 + README** (영문, 30초 데모)
7. **향후**: `?vs=상대방` 1:1 배틀 모드

## 코딩 컨벤션
- FSD 구조 준수
- 상수는 shared/constants/, 타입은 shared/types/
- 하위 디렉토리마다 barrel export (index.ts)
- API 함수는 한 파일에 모아도 OK
- SVG 렌더링은 인라인 스타일 + <style> 태그 (SVG 표준 방식)
- 절대 경로 import (@/) 사용

## 참고
- github-readme-stats (Star 200k+): 같은 구조 (Vercel + SVG)
- GitHub Ranked (Star 7): 경쟁 제품이지만 디자인/UX가 부족
