# Cuspide Bienes Raices - Agent Instructions

Real estate platform with Next.js 15 frontend and Sanity CMS. Backend is now an external Strapi instance.

## Project Structure

```
/
├── web/              # Next.js 15 frontend (MAIN)
└── studio-cuspide/   # Sanity Studio CMS
```

**Removed:** `server/` (Strapi backend) and `client/` (Astro legacy) - backend is now hosted externally.

## Quick Start

**Web (Next.js):**

```bash
cd web
pnpm install
# Copy .env.local with: SANITY_PROJECT_ID, MAPBOX_ACCESS_TOKEN, MAILGUN_API_KEY
pnpm dev          # localhost:3000
```

**Studio (Sanity):**

```bash
cd studio-cuspide
pnpm install
sanity dev        # localhost:3333
```

## Key Commands

| Package        | Dev          | Build          | Lint        | Package Manager |
| -------------- | ------------ | -------------- | ----------- | --------------- |
| web            | `pnpm dev`   | `pnpm build`   | `pnpm lint` | pnpm            |
| studio-cuspide | `sanity dev` | `sanity build` | —           | pnpm            |

## Environment Variables Required

**web/.env.local:**

- `SANITY_PROJECT_ID` - Sanity CMS project
- `SANITY_DATASET` - Usually "production"
- `MAPBOX_ACCESS_TOKEN` - For property maps
- `MAILGUN_API_KEY` - Contact form emails
- `STRAPI_URL` - External backend API URL (e.g., `https://honest-cheese-...strapiapp.com`)
- `STRAPI_TOKEN` - API auth token for external Strapi

## Architecture Notes

**Frontend (web/):**

- Next.js 15 with App Router (`src/app/`)
- TypeScript with `strict: false` (tsconfig.json)
- Tailwind CSS + shadcn/ui (New York style)
- Sanity client for content, external Strapi for property data
- MapLibre GL for maps (not Mapbox GL directly)
- PDF generation uses pdfkit (server-side)
- SVG support via @svgr/webpack

**CMS (studio-cuspide/):**

- Sanity Studio v3 for content editing
- Connected to same Sanity project as web frontend

**Backend:**

- External Strapi 5 instance (no local server to run)
- Content types: `property`, `listing`, `agente`
- Cloudinary for image uploads

## shadcn/ui Conventions

Components installed via `npx shadcn add <component>`

- Aliases: `@/components`, `@/lib/utils`, `@/components/ui`
- Base color: slate
- CSS variables enabled
- Components live in `web/src/components/ui/`

## Important Gotchas

1. **External backend:** No local Strapi to run - the frontend connects to a hosted Strapi instance via `STRAPI_URL`
3. **Image domains:** Configured in `next.config.mjs` for Cloudinary, Strapi, and Sanity CDN
4. **TypeScript strict mode is OFF** - don't add strict type errors
5. **Sanity typegen:** Configured in `sanity-typegen.json` - generates types from schema

## External Services

- **Sanity CMS:** Content management (project ID: vzu1rlb3)
- **Cloudinary:** Image uploads (dsm3kqzwd)
- **Mapbox:** Maps and geocoding
- **Mailgun:** Email delivery
- **Strapi:** Hosted backend API (not local)

## File Locations

- Page routes: `web/src/app/*/` (e.g., `propiedades/`, `detalle/`, `contacto/`)
- API routes: `web/src/app/api/*/` (if any)
- Components: `web/src/components/`
- Domain models: `web/src/domain/`
- Sanity config: `web/src/sanity/`
