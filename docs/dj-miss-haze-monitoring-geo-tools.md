# DJ Miss Haze Monitoring + GEO Tool Setup

Lean 4-week test stack for analytics, Google visibility, booking reliability, reviews, and AI discoverability.

## Recommended Setup Order

1. [Google Analytics 4](https://analytics.google.com/)
2. [Google Search Console](https://search.google.com/search-console)
3. [Google Business Profile](https://business.google.com/)
4. [Microsoft Clarity](https://clarity.microsoft.com/)
5. [OpenAI API key](https://platform.openai.com/api-keys) for weekly GEO reporting
6. [Better Stack Uptime](https://betterstack.com/uptime) for optional external uptime checks
7. [Plausible](https://plausible.io/) only if we want a separate simple client dashboard

## Core Tools

| Tool | Purpose | Link |
|---|---|---|
| Google Analytics 4 | Traffic, sources, conversion events, booking funnel tracking | [analytics.google.com](https://analytics.google.com/) |
| Google Tag Manager | Optional tag container for GA4, Clarity, and event tracking | [tagmanager.google.com](https://tagmanager.google.com/) |
| Google Search Console | SEO queries, impressions, clicks, indexing, Core Web Vitals | [search.google.com/search-console](https://search.google.com/search-console) |
| Google Business Profile | Profile views, calls/clicks, reviews, local visibility | [business.google.com](https://business.google.com/) |
| Google Cloud Console | API enablement, service accounts, OAuth credentials | [console.cloud.google.com](https://console.cloud.google.com/) |
| Microsoft Clarity | Heatmaps, session recordings, rage clicks, mobile UX issues | [clarity.microsoft.com](https://clarity.microsoft.com/) |
| Better Stack Uptime | Optional external uptime checks and alerts | [betterstack.com/uptime](https://betterstack.com/uptime) |
| Plausible | Optional simple privacy-friendly analytics dashboard | [plausible.io](https://plausible.io/) |
| OpenAI Platform | API access for weekly GEO / AI visibility reporting | [platform.openai.com](https://platform.openai.com/) |
| OpenAI API Keys | Create API key for backend report job | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |

## Google API Links

| API / Resource | Purpose | Link |
|---|---|---|
| Google Search Console API | Pull search performance, query, page, and country data | [developers.google.com/webmaster-tools](https://developers.google.com/webmaster-tools) |
| Enable Search Console API | Enable the API inside Google Cloud | [Search Console API Library](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com) |
| Google Business Profile APIs | Business profile, location, and review-related API docs | [developers.google.com/my-business](https://developers.google.com/my-business) |
| Business Profile Performance API | Pull profile metrics and search keyword impressions | [GBP Performance API](https://developers.google.com/my-business/reference/performance/rest) |
| Google OAuth Credentials | Create OAuth credentials for Google Business Profile API if needed | [Google Cloud Credentials](https://console.cloud.google.com/apis/credentials) |

## What To Send Back After Setup

- GA4 Measurement ID, formatted like `G-XXXXXXXXXX`.
- GTM Container ID if using Google Tag Manager, formatted like `GTM-XXXXXXX`.
- Microsoft Clarity Project ID.
- Confirmation that `djmisshaze.com` is verified in Google Search Console.
- Confirmation that you have owner or manager access to the Google Business Profile.
- OpenAI API key should stay private and be added directly to Vercel, not sent in chat.

## Current Services Already Working

| Service | Status | Notes |
|---|---|---|
| Vercel hosting | Active | `djmisshaze.com` is deployed on Vercel. |
| Vercel Monitoring | Active | High-level Vercel monitoring is already enabled. |
| Vercel Cron | Active | Daily backend form health check is configured. |
| Booking form backend | Active | `/api/inquiries` repair is deployed and tested. |
| Resend | Active | Used for booking inquiry emails. |
| Booking recipients | Active | `poseidonstudios3000@gmail.com` and `info@djmisshaze.com`. |
| Database / Neon PostgreSQL | Active | Production health check confirms DB path is working. |
| Form failure alerting | Active | Backend health check sends an alert only if the form check fails. |
| `CRON_SECRET` | Active | Protects the backend health-check endpoint from public access. |

## 4-Week Test Plan

| Week | Focus | Outcome |
|---|---|---|
| 1 | GA4, Search Console, Clarity | Track traffic, sources, user behavior, and booking funnel events. |
| 2 | GEO report | Weekly AI visibility report for US wedding, corporate, private-event, and DJ prompts. |
| 3 | Google Business Profile | Track reviews, profile actions, and business search keywords if API access is ready. |
| 4 | Review and optimize | Identify SEO/GEO gaps, competitors, conversion blockers, and priority content fixes. |

## GEO Prompt Themes

- Best female DJ for weddings in the US.
- Corporate event DJ for brand activation in New York, Miami, Los Angeles, Chicago, Dallas, and Denver.
- Open-format DJ for luxury private events.
- Destination wedding DJ with polished event experience.
- DJ Miss Haze availability for weddings and corporate events.
- Female DJ for fashion shows, galas, fundraisers, and brand events.

## Optional Paid GEO Tools Later

These are not needed for the first 4-week lean test, but we can revisit them after we have baseline data.

- [Scrunch](https://scrunch.com/)
- [Peec AI](https://peec.ai/)
- [Ahrefs Brand Radar](https://ahrefs.com/brand-radar)
