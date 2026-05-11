# Codex Project Instructions

## Project

DJ Miss Haze portfolio and booking website.

## Stack

- React 18 + TypeScript client bundled with Vite.
- Express server with shared Zod/Drizzle route and schema types.
- Tailwind CSS and shadcn/Radix-style components.
- Framer Motion for page and section motion.
- Drizzle ORM with PostgreSQL/Neon.
- Resend for booking inquiry email.

## Commands

- Install: `npm install`
- Local dev: `npm run dev`
- Local dev with generated placeholders for missing exported media: `npm run dev:placeholder`
- Type check: `npm run check`
- Production build: `npm run build`
- Build with placeholders for missing exported media: `npm run build:placeholder`
- Full verification: `npm run verify`
- Placeholder verification: `npm run verify:placeholder`
- Start production server after build: `npm start`
- Push schema: `npm run db:push`

## Environment

Copy `.env.example` to `.env` for local work. Required for full backend behavior:

- `DATABASE_URL`
- `SESSION_SECRET`
- `ADMIN_PASSWORD`
- `RESEND_API_KEY` for inquiry email delivery
- `HOST` and `PORT` for local server binding

When `DATABASE_URL` is not set, the server uses in-memory storage so local UI work can proceed without a provisioned database. Do not rely on in-memory storage for production behavior.

## Media Assets

This GitHub export does not include the real `attached_assets` media. Normal production builds should fail when those files are missing. Use `ALLOW_MISSING_ASSETS=true`, `npm run dev:placeholder`, or `npm run build:placeholder` only to unblock local development and browser QA while the original assets are unavailable.

## Development Workflow

- Work from a feature branch, not `main`.
- Keep changes scoped to the requested feature or fix.
- Reuse existing shared schemas and route definitions instead of duplicating API types.
- Prefer existing UI components and Tailwind tokens before introducing new styling primitives.
- Run `npm run check` after TypeScript or API contract edits.
- Run `npm run build` before deployment-oriented handoff when real media assets are present.
- When assets are still missing, run `npm run verify:placeholder` and state clearly that production media restoration remains a blocker.

## Browser QA

For user-facing UI work:

- Start the local server with `npm run dev` or `npm run dev:placeholder`.
- Inspect desktop and mobile widths.
- Check `/`, `/?event=wedding`, `/?event=corporate`, `/?event=private`, `/admin`, and city/location routes touched by the change.
- Verify text does not overlap, controls remain usable on mobile, and motion does not obscure primary calls to action.

## Deployment Notes

`vercel.json` currently describes a static Vercel deployment with an API rewrite to `api/index.js`, but this repo does not include an `api/` function entrypoint. Treat Vercel deployment as unresolved until that target architecture is confirmed.
