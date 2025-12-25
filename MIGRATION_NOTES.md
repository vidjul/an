# Migration from Next.js to Astro

This project has been successfully migrated from Next.js to Astro while preserving all content, design, and functionality.

## What Changed

### Architecture

- **Framework**: Next.js 14 → Astro 5
- **Content Management**: Velite → Astro Content Collections
- **Routing**: Next.js App Router → Astro file-based routing
- **Styling**: Tailwind CSS v4 (preserved)
- **Fonts**: next/font → @fontsource packages

### Key Migrations

1. **Layout Files**

   - `app/layout.tsx` → `src/layouts/Layout.astro`
   - Converted to native Astro layout with proper head/body structure

2. **Pages**

   - `app/page.tsx` → `src/pages/index.astro`
   - `app/about/page.tsx` → `src/pages/about.astro`
   - `app/posts/page.tsx` → `src/pages/posts/index.astro`
   - `app/posts/[slug]/page.tsx` → `src/pages/posts/[slug].astro`

3. **Components**

   - `components/Intro.tsx` → `src/components/Intro.astro` (converted to Astro)
   - `components/PostsList.tsx` → `src/components/PostsList.astro` (converted to Astro)
   - `components/Footer.tsx` → `src/components/Footer.astro` (converted to Astro)
   - `components/Header/` → `src/components/Header/` (kept as React with `client:load` for interactivity)

4. **Content**

   - Blog posts moved from `content/posts/` to `src/content/posts/`
   - Content Collections configured in `src/content/config.ts`
   - Native Markdown rendering (no more velite/rehype processing needed)

5. **Static Assets**
   - All files from `public/` preserved in the same location
   - Base path `/an` configured in `astro.config.mjs`

## What Stayed the Same

- ✅ All content (blog posts, about page, etc.)
- ✅ Tailwind CSS styling and design
- ✅ Fonts (Catamaran and Lato)
- ✅ Interactive header with cursor animation
- ✅ Vercel Analytics and Speed Insights
- ✅ Base path `/an`
- ✅ Vercel deployment

## Running the Project

```bash
# Install dependencies
yarn install

# Development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

## Deployment

The project is configured for Vercel deployment with:

- `@astrojs/vercel` adapter
- `vercel.json` configuration
- Base path support

Simply push to your Vercel-connected repository and it will deploy automatically.

## Performance Benefits

Astro provides several performance advantages:

- Zero JavaScript by default (only Header component has JS for interactivity)
- Faster build times
- Smaller bundle sizes
- Better Core Web Vitals

## Migration Checklist

- ✅ Create new Astro project
- ✅ Install integrations (React, Tailwind, Vercel)
- ✅ Set up Content Collections
- ✅ Migrate layouts
- ✅ Convert pages to Astro
- ✅ Convert components (keeping Header as React)
- ✅ Configure fonts
- ✅ Copy static assets
- ✅ Set up dynamic routes
- ✅ Configure Vercel deployment
- ✅ Test build

## Notes

- The Header component remains as a React component with `client:load` directive because it needs client-side interactivity for the cursor animation
- All other components have been converted to native Astro components for better performance
- Content Collections provide better type safety and DX compared to Velite
