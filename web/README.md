# Cuspide Bienes Raices - Web Application

A modern real estate website built with Next.js 15, featuring property listings, interactive maps, and content management through Sanity CMS.

## Tech Stack

- **Framework**: [Next.js 15.0.3](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **CMS**: [Sanity](https://www.sanity.io) for content management
- **Forms**: React Hook Form with Zod validation
- **Maps**: MapLibre GL for interactive property maps
- **Email**: Mailgun for contact form submissions
- **Package Manager**: pnpm

## Key Features

- 🏠 Property listing display with search and filtering
- 🗺️ Interactive maps with Mapbox integration
- 📝 Contact form with email notifications
- 📄 PDF generation for property details
- 🖼️ Image carousels for property photos
- 📱 Responsive design optimized for all devices
- 🌐 Content managed through Sanity CMS
- 🎨 Modern UI with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- pnpm installed globally

### Installation

1. Clone the repository and navigate to the web directory:

```bash
cd web
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

Create a [`.env.local`](web/.env.local:1) file in the web directory with the following variables:

```env
# Sanity CMS
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production

# Mapbox
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Mailgun
MAILGUN_API_KEY=your_mailgun_api_key
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
web/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── busqueda/     # Search/listing pages
│   │   ├── contacto/     # Contact page
│   │   ├── detalle/      # Property detail pages
│   │   ├── nosotros/     # About page
│   │   └── propiedades/  # Properties list page
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── listings-list/
│   │   ├── contact-us-section/
│   │   └── ...
│   ├── domain/          # Domain models
│   ├── infrastructure/  # Infrastructure layer (Sanity)
│   ├── lib/             # Utility functions
│   ├── sanity/          # Sanity CMS configuration
│   └── services/        # Business logic services
├── public/              # Static assets
└── ...
```

## Key Dependencies

### Core

- `next@15.0.3` - React framework
- `react@18.3.1` & `react-dom@18.3.1` - UI library
- `typescript@5` - Type safety

### UI & Styling

- `tailwindcss@3.4.1` - Utility-first CSS
- `@radix-ui/*` - Headless UI components
- `lucide-react@0.451.0` - Icon library
- `class-variance-authority@0.7.0` - Component variants
- `tailwind-merge@2.5.3` - Tailwind class merging

### Content Management

- `@sanity/client@6.22.4` - Sanity client
- `next-sanity@9.8.7` - Sanity integration for Next.js
- `@sanity/image-url@1.0.2` - Image URL builder

### Forms & Validation

- `react-hook-form@7.53.1` - Form management
- `@hookform/resolvers@3.9.0` - Form resolvers
- `zod@3.23.8` - Schema validation

### Maps

- `maplibre-gl@4.7.1` - Map rendering
- `react-map-gl@7.1.7` - React wrapper for maps

### Email

- `mailgun.js@10.2.3` - Email service integration

### Media

- `embla-carousel-react@8.3.0` - Carousel component
- `sharp@0.33.5` - Image optimization

## Environment Variables

| Variable              | Description                             | Required |
| --------------------- | --------------------------------------- | -------- |
| `SANITY_PROJECT_ID`   | Sanity project identifier               | Yes      |
| `SANITY_DATASET`      | Sanity dataset (production/development) | Yes      |
| `MAPBOX_ACCESS_TOKEN` | Mapbox API token for maps               | Yes      |
| `MAILGUN_API_KEY`     | Mailgun API key for email sending       | Yes      |

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Configuration Files

- [`next.config.mjs`](web/next.config.mjs:1) - Next.js configuration with image domains and webpack config
- [`tailwind.config.ts`](web/tailwind.config.ts:1) - Tailwind CSS configuration with custom theme
- [`components.json`](web/components.json:1) - shadcn/ui configuration
- [`sanity-typegen.json`](web/sanity-typegen.json:1) - Sanity TypeScript generation config
- [`tsconfig.json`](web/tsconfig.json:1) - TypeScript configuration

## Features in Detail

### Property Listings

- Display properties with images, descriptions, and features
- Search and filter functionality
- Grid and list view options
- Featured properties section

### Interactive Maps

- Property location visualization using MapLibre GL
- Custom map markers and popups
- Integration with Mapbox styles

### Content Management

- Sanity CMS integration for managing:
  - Property listings
  - Agent information
  - Site content
- Type-safe content queries with TypeScript

### Contact Form

- Form validation with Zod schemas
- Email notifications via Mailgun
- User-friendly error handling

### PDF Generation

- Generate PDF documents for property details
- Server-side rendering for PDFs

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) - Re-usable components built with Radix UI
- [Sanity](https://www.sanity.io/docs) - Content management system
- [MapLibre GL](https://maplibre.org) - Open-source mapping library

## License

Private project - All rights reserved
