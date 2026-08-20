# BRIEFING — 2026-08-20T02:07:11Z

## Mission
Implement Milestone 2 (M2): TypeScript Syntax, Site Data & Dynamic Routing Engine.

## 🔒 My Identity
- Archetype: Implementer / QA / Specialist
- Roles: implementer, qa, specialist
- Working directory: /Users/viniciuscunha/Downloads/Redesign VERSAVISUAL Website/.agents/worker_m2/
- Original parent: f3bed6c9-c13e-4a92-abec-0b50cf2bde39
- Milestone: M2 - TypeScript Syntax, Site Data & Dynamic Routing Engine

## 🔒 Key Constraints
- Only edit exclusive files: `src/data/site.ts`, `src/lib/seo.tsx`, `src/App.tsx`, `public/sitemap.xml`.
- Zero TypeScript errors (`npx tsc --noEmit`).
- Clean build (`npm run build`) and format (`npm run format`).
- Do not cheat or fabricate test results.

## Current Parent
- Conversation ID: f3bed6c9-c13e-4a92-abec-0b50cf2bde39
- Updated: not yet

## Task Summary
- **What to build**:
  1. Fix inline type declarations with missing delimiters in `src/data/site.ts` (lines 23, 25, 36, 101, 102, etc.).
  2. Synchronize and ensure consistency of `caseSlug` across all projects in `PORTFOLIO` and `sitemap.xml`.
  3. Fix inline type declaration in `src/lib/seo.tsx` (breadcrumb).
  4. Ensure dynamic routing in `src/App.tsx` for segments (`/segmentos/:slug`, `/:slug`) with `SEGMENT_ALIASES` validation and fallback to `NotFound`.
  5. Ensure `/portfolio/:caseSlug` resolution and `NotFound` fallback for invalid case slugs in `src/App.tsx`.
  6. Ensure wildcard `*` and `/404` render `NotFound`.
  7. Validate and synchronize `public/sitemap.xml` with routes in `site.ts`.
- **Success criteria**: `npx tsc --noEmit` exits with 0 errors, `npm run build` succeeds, `npm run format` succeeds.
- **Interface contracts**: PROJECT.md, DESIGN.md, ORIGINAL_REQUEST.md.

## Change Tracker
- **Files modified**: None yet
- **Build status**: Pending
- **Pending issues**: None

## Quality Status
- **Build/test result**: Pending
- **Lint status**: Pending
- **Tests added/modified**: Pending

## Loaded Skills
- None required to load currently.

## Key Decisions Made
- [TBD]

## Artifact Index
- `.agents/worker_m2/DISPATCH.md` — Assignment instructions
- `.agents/worker_m2/progress.md` — Heartbeat and progress log
- `.agents/worker_m2/handoff.md` — Final handoff report
