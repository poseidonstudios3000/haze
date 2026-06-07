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
- Vercel production uses `api/index.ts` as the serverless Express entrypoint for `/api/*` routes.

## Site Health Monitoring

Vercel Cron runs `GET /api/health/booking-form` daily at 14:00 UTC. The check is silent when healthy and sends an alert email only when it fails.

The backend monitor verifies:

- The Express API function boots and routes requests.
- `DATABASE_URL` and `RESEND_API_KEY` are configured.
- A synthetic inquiry can be validated, written to storage, and deleted again.

Alert recipients default to `poseidonstudios3000@gmail.com` and `info@djmisshaze.com`. Optional production environment variables:

- `CRON_SECRET`, used by Vercel as a Bearer token for cron requests.
- `MONITOR_ALERT_TO`, comma-separated override for failure alert recipients.
- `MONITOR_RESEND_API_KEY`, separate Resend key for failure alerts. Falls back to `RESEND_API_KEY`.
- `MONITOR_ALERT_FROM`, sender for failure alerts. Falls back to `RESEND_FROM`.
- `BOOKING_ALERT_TO`, comma-separated override for real booking inquiry recipients.
