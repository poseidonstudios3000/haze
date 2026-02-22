# DJ Miss Haze - Event DJ Portfolio Website

## Overview

A modern, animated portfolio website for DJ Miss Haze, an event DJ specializing in weddings, corporate events, private parties, and PR shows. The application features a dark-themed, mobile-first design with neon green accents, smooth Framer Motion animations, and a multi-step "Vibe Check" inquiry form that captures leads into a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state, React Context for theme/layout preferences
- **Styling**: Tailwind CSS with custom CSS variables for theming, shadcn/ui component library (New York style)
- **Animations**: Framer Motion for scroll effects, transitions, and micro-interactions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Build System**: Custom esbuild script for server bundling, Vite for client

### Data Storage
- **Database**: PostgreSQL via Neon serverless adapter
- **Schema Location**: `shared/schema.ts` using Drizzle's pgTable definitions
- **Tables**:
  - `inquiries`: Stores vibe check form submissions (location, vibe, party size, optional email)
  - `posts`: Blog/intel content for city guides and venue recommendations

### Key Design Patterns
- **Shared Types**: Schema and route definitions in `shared/` directory are imported by both client and server, ensuring type safety across the full stack
- **Path Aliases**: `@/` for client source, `@shared/` for shared code, `@assets/` for attached assets
- **Theme System**: Multiple event layout themes (wedding, corporate, private, PR show) stored in localStorage and applied via CSS data attributes
  - Wedding: `/?event=wedding` - WeddingEventPlanning carousel
  - Corporate: `/?event=corporate` - CorporateEventPlanning carousel + Why Companies Choose section
  - Private: `/?event=private` - PrivateEventPlanning with feature cards + gallery carousel
  - PR Show: `/?event=pr` - Default layout

### API Structure
- `POST /api/inquiries` - Create new inquiry from vibe check form (also sends email notification via Resend)
- `GET /api/posts` - Retrieve blog posts/intel content

## External Dependencies

### Email Service
- **Resend**: Used for sending booking inquiry notifications
- **Configuration**: Requires `RESEND_API_KEY` secret
- **Recipient**: All inquiries are forwarded to info@djmisshaze.com
- **Sender**: Uses `onboarding@resend.dev` (Resend's default domain for free tier)

### Database
- **Neon PostgreSQL**: Serverless PostgreSQL database connected via `@neondatabase/serverless`
- **Connection**: Requires `DATABASE_URL` environment variable
- **Migrations**: Managed via Drizzle Kit (`drizzle-kit push`)

### Frontend Libraries
- **UI Components**: Full shadcn/ui component set with Radix UI primitives
- **Animations**: Framer Motion for page transitions and scroll effects
- **Forms**: React Hook Form + Zod for validation
- **Data Fetching**: TanStack React Query

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)
- **Build**: esbuild for server, Vite for client with selective dependency bundling for cold start optimization