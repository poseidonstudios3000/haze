# DJ Miss Haze Website

React/Vite + Express website for DJ Miss Haze bookings, event-specific landing content, admin-managed images/content, and inquiry capture.

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev:placeholder
```

Open `http://localhost:5000`.

Use `npm run dev` once the original `attached_assets` media files are restored.

If `DATABASE_URL` is not set, the server uses in-memory storage for local UI work.

## Checks

```bash
npm run check
npm run build
```

The current GitHub export excludes the real media files in `attached_assets`, so strict production builds will fail until those assets are restored. For local code and browser QA without real media:

```bash
npm run verify:placeholder
```

## Important Notes

- Backend features require `DATABASE_URL`, `SESSION_SECRET`, and `ADMIN_PASSWORD`.
- Inquiry email delivery requires `RESEND_API_KEY`.
- `vercel.json` references `api/index.js`, but this repo does not currently include that serverless entrypoint.
