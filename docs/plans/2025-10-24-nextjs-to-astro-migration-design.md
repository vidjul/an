# Next.js to Astro Migration Design

**Date:** 2025-10-24
**Status:** Approved
**Migration Strategy:** Foundation-First, Clean Slate

## Executive Summary

This document outlines the migration of the `/an` subdirectory application from Next.js 14 (App Router) to Astro 4.x. The migration prioritizes developer experience improvements, performance optimization, and a static-first architecture while maintaining pixel-perfect design parity and the existing `/an` deployment path on Vercel.

## Motivation

### Primary Goals
- **Developer Experience:** Simplify mental model by eliminating Next.js hybrid rendering confusion
- **Performance:** Achieve faster builds, smaller JavaScript bundles, better Core Web Vitals through zero-JS-by-default
- **Static-First:** Full static site generation for content-focused application
- **Build Speed:** Faster iteration during development and deployment

### Success Criteria
- Site deploys successfully at `https://vidu.sh/an` with identical URLs
- Pixel-perfect design match with current implementation
- All Tailwind v4 styling preserved
- Vercel Analytics and Speed Insights continue working
- Foundation ready for future interactive URL navigation feature

## Current Architecture

### Technology Stack
- **Framework:** Next.js 14.2.3 with App Router
- **Styling:** Tailwind CSS v4.1.13
- **Content:** Velite 0.2.2 for markdown processing
- **Analytics:** Vercel Analytics + Speed Insights
- **Deployment:** Vercel with `/an` basePath
- **Package Manager:** Yarn 4.2.1

### File Structure
```
/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── about/
│   │   ├── page.tsx
│   │   └── components/Intro.tsx
│   └── posts/
│       ├── page.tsx            # Posts index
│       └── [slug]/
│           ├── layout.tsx
│           └── page.tsx        # Post detail
├── components/
│   ├── Header/
│   ├── Footer.tsx
│   ├── Intro.tsx
│   └── PostsList.tsx
├── content/posts/*.md          # Markdown content
├── next.config.js              # basePath: '/an'
└── vercel.json                 # Redirect: / → /an
```

### Content Pipeline
Velite processes markdown files with schema validation:
- Pattern: `content/posts/**/*.md`
- Schema: title (max 99 chars), slug, date (ISO), excerpt (max 200 chars)
- Output: `.velite` directory with processed content
- Integration: Custom webpack plugin

## Target Architecture

### New Technology Stack
- **Framework:** Astro 4.x with TypeScript
- **Adapter:** @astrojs/vercel/static
- **Styling:** Tailwind CSS v4.1.13 (preserved)
- **Content:** Astro Content Collections (replaces Velite)
- **Islands:** @astrojs/react for future interactive components
- **Analytics:** Vercel Analytics + Speed Insights (preserved)

### Project Structure
```
/
├── src/
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── about.astro         # About page
│   │   └── posts/
│   │       ├── index.astro     # Posts index
│   │       └── [slug].astro    # Post detail (SSG)
│   ├── layouts/
│   │   └── BaseLayout.astro    # Root HTML layout
│   ├── components/
│   │   ├── Header.astro        # Converted from TSX
│   │   ├── Footer.astro
│   │   ├── Breadcrumbs.astro
│   │   ├── Intro.astro
│   │   └── PostsList.astro
│   ├── content/
│   │   ├── config.ts           # Content Collections schema
│   │   └── posts/*.md          # Moved from /content
│   └── styles/
│       └── global.css          # Tailwind imports
├── public/                      # Static assets
├── astro.config.mjs            # base: '/an', integrations
└── vercel.json                 # Preserved redirect
```

### Content Collections Configuration

**Schema Definition (`src/content/config.ts`):**
```typescript
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(99),
    slug: z.string(),
    date: z.date(),
    excerpt: z.string().max(200),
  }),
});

export const collections = { posts };
```

**Benefits over Velite:**
- Native Astro integration (no webpack plugin needed)
- Automatic TypeScript type generation
- Build-time validation
- Simpler mental model

## Component Migration Strategy

### Conversion Pattern: React TSX → Astro

**Static Components (Header, Footer, Breadcrumbs, PostsList, Intro):**

1. **File Rename:** `.tsx` → `.astro`
2. **Frontmatter Fence:** Move TypeScript logic into `---` delimiters
3. **Attribute Changes:** `className` → `class`
4. **Template Syntax:** JSX expressions remain similar, but use Astro template syntax
5. **No Hydration:** These render once at build time (zero JS)

**Layout Component:**

Transform `app/layout.tsx` → `src/layouts/BaseLayout.astro`:
- Move HTML shell (`<html>`, `<head>`, `<body>`) into layout
- Replace `{children}` with `<slot />`
- Keep all meta tags, font imports, Tailwind classes identical
- Integrate Analytics with client directives for hydration

**Interactive Components (Future):**

For the planned URL navigation feature:
- Keep as `.tsx` React component in `/components`
- Use `client:load` directive when imported into page
- Hydrates only this component (island architecture)

### Example Transformation

**Before (Next.js TSX):**
```tsx
export default function Header({ title }: { title: string }) {
  return (
    <header className="bg-white shadow">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
}
```

**After (Astro):**
```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<header class="bg-white shadow">
  <h1 class="text-2xl font-bold">{title}</h1>
</header>
```

## Routing & Data Fetching

### Route Mapping

| Next.js (App Router) | Astro (Pages) |
|---------------------|---------------|
| `app/page.tsx` | `src/pages/index.astro` |
| `app/about/page.tsx` | `src/pages/about.astro` |
| `app/posts/page.tsx` | `src/pages/posts/index.astro` |
| `app/posts/[slug]/page.tsx` | `src/pages/posts/[slug].astro` |

### Static Path Generation

**Dynamic Routes (`posts/[slug].astro`):**
```typescript
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout title={post.data.title}>
  <Content />
</BaseLayout>
```

**Key Differences from Next.js:**
- No `getStaticProps()` – data fetching happens in frontmatter
- Explicit `getStaticPaths()` export for dynamic routes
- All routes pre-rendered at build time (no ISR, no SSR)

### Data Fetching Pattern

**Replace Next.js:**
```tsx
export async function getStaticProps() {
  const posts = await getPosts();
  return { props: { posts } };
}
```

**With Astro:**
```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('posts');
const sortedPosts = posts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---
```

## Deployment Configuration

### Astro Config (`astro.config.mjs`)

```javascript
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  base: '/an',
  integrations: [
    tailwind({
      applyBaseStyles: false, // Preserve existing Tailwind setup
    }),
    react(), // For future interactive components
  ],
});
```

### Vercel Configuration

**vercel.json (Preserved):**
```json
{
  "version": 2,
  "redirects": [
    {
      "source": "/",
      "destination": "/an"
    }
  ]
}
```

**Build Settings:**
- Build Command: `astro build` (auto-detected)
- Output Directory: `dist` (auto-detected)
- Install Command: `yarn install`

### URL Structure

All URLs remain identical:
- Home: `https://vidu.sh/an`
- About: `https://vidu.sh/an/about`
- Posts Index: `https://vidu.sh/an/posts`
- Post Detail: `https://vidu.sh/an/posts/[slug]`

## Migration Execution Plan

### Approach: Foundation-First

This strategy establishes a working skeleton first, then builds incrementally on a stable base.

### Phase 1: Foundation Setup (Day 1)

**Objectives:**
- Working Astro project that deploys to Vercel
- Base path configured
- Tailwind and TypeScript ready

**Tasks:**
1. Create `astro-migration` branch
2. Initialize Astro project: `npm create astro@latest`
3. Install dependencies:
   ```bash
   yarn add @astrojs/vercel @astrojs/tailwind @astrojs/react
   ```
4. Configure `astro.config.mjs` with `base: '/an'`
5. Set up Tailwind config (copy existing `tailwind.config.js`)
6. Create minimal base layout with HTML shell
7. Add placeholder home page
8. Test: Commit and verify Vercel preview deployment at `/an`

**Checkpoint:** ✅ Empty site deploys successfully to preview URL at `/an` subdirectory

### Phase 2: Shared Components (Day 2)

**Objectives:**
- Layout shell with Header, Footer, Breadcrumbs
- All styling preserved

**Tasks:**
1. Create `src/layouts/BaseLayout.astro` with HTML structure from `app/layout.tsx`
2. Convert `components/Header/index.tsx` → `src/components/Header.astro`
3. Convert `components/Header/Breadcrumbs.tsx` → `src/components/Breadcrumbs.astro`
4. Convert `components/Footer.tsx` → `src/components/Footer.astro`
5. Copy all Tailwind classes exactly as-is
6. Import components into BaseLayout
7. Test: Visual comparison against current site

**Checkpoint:** ✅ Layout shell renders with identical styling

### Phase 3: Content Collections (Day 2-3)

**Objectives:**
- Content Collections configured and queryable
- Markdown files migrated

**Tasks:**
1. Create `src/content/config.ts` with posts schema
2. Copy all markdown files: `content/posts/*.md` → `src/content/posts/*.md`
3. Verify frontmatter format matches schema
4. Create utility functions for fetching/sorting posts
5. Test: Query posts in dev tools, inspect generated types

**Checkpoint:** ✅ Can successfully query and access all posts with type safety

### Phase 4: Pages Implementation (Day 3-4)

**Objectives:**
- All routes functional with correct content
- Dynamic routing working

**Tasks:**
1. Build `src/pages/index.astro`:
   - Convert `app/page.tsx`
   - Import and use Intro component
   - Fetch and display latest posts
2. Build `src/pages/about.astro`:
   - Convert `app/about/page.tsx`
   - Port about-specific Intro component
3. Build `src/pages/posts/index.astro`:
   - Convert `app/posts/page.tsx`
   - Use PostsList component with fetched posts
4. Build `src/pages/posts/[slug].astro`:
   - Convert `app/posts/[slug]/page.tsx`
   - Implement `getStaticPaths()`
   - Render markdown content with `<Content />`
5. Test: Navigate all routes, verify content displays correctly

**Checkpoint:** ✅ All routes render with correct content and styling

### Phase 5: Polish & Verification (Day 4)

**Objectives:**
- Analytics integrated
- Production-ready

**Tasks:**
1. Add Vercel Analytics and Speed Insights with client directives
2. Verify all internal links work with `/an` base path
3. Test responsive design (mobile, tablet, desktop)
4. Pixel-perfect comparison:
   - Screenshot current site
   - Screenshot new Astro site
   - Compare side-by-side
5. Performance testing:
   - Lighthouse scores
   - Build time comparison
   - Bundle size inspection
6. Manual QA:
   - All routes load correctly
   - Markdown renders properly
   - Navigation works
   - No console errors

**Checkpoint:** ✅ Site matches current design exactly and passes all QA checks

### Phase 6: Go Live

**Workflow:**
1. Final review on Vercel preview deployment
2. Merge `astro-migration` branch to `master`
3. Vercel automatically deploys to production
4. Monitor `https://vidu.sh/an` for issues
5. Check Analytics data coming through

**Post-Migration Cleanup (Follow-up PR):**
- Remove Next.js dependencies from `package.json`
- Delete `app/` directory
- Remove `next.config.js`
- Remove Velite config and dependencies
- Delete `.velite` output directory

## Risk Mitigation

### Key Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Base path routing breaks | High | Test `/an` path in Phase 1 before building |
| Tailwind styling differs | Medium | Copy configs exactly, visual comparison each phase |
| Content Collections schema mismatch | Medium | Validate all markdown files in Phase 3 |
| Analytics stop tracking | Low | Test in Phase 5, use same Vercel scripts |
| Markdown rendering differs | Medium | Side-by-side content comparison in Phase 4 |

### Rollback Strategy

Since this is a clean-slate migration on a separate branch:
- Preview deployment remains separate from production
- Can continue iterating on `astro-migration` branch without affecting live site
- If critical issues found post-merge, can revert the merge commit
- Old Next.js code preserved in git history

## Future Enhancements

These are explicitly out of scope for the migration but enabled by the new architecture:

1. **Interactive URL Navigation Component**
   - React component with browser URL bar-style input
   - Auto-completion for routes under `/an/`
   - Hydrated as island with `client:load`

2. **Performance Optimizations**
   - Image optimization with Astro's built-in image component
   - View Transitions API for page navigation animations

3. **Content Improvements**
   - RSS feed generation (Astro has built-in support)
   - Syntax highlighting for code blocks
   - Related posts suggestions

## Success Metrics

### Performance Targets

| Metric | Current (Next.js) | Target (Astro) |
|--------|------------------|----------------|
| Build Time | Baseline | < 50% of baseline |
| JavaScript Bundle | Baseline | < 20% of baseline |
| Lighthouse Performance | Baseline | > 95 |
| Time to Interactive | Baseline | < 50% of baseline |

### Functional Requirements

- ✅ All URLs work at `/an` subdirectory
- ✅ All markdown posts render correctly
- ✅ Tailwind styling matches pixel-perfect
- ✅ Analytics continue tracking
- ✅ Mobile responsive design preserved
- ✅ Can deploy via git push to Vercel
- ✅ No console errors in production

## Conclusion

This migration moves the `/an` application from Next.js to Astro using a Foundation-First approach, prioritizing a stable base before building features. The clean-slate strategy on a separate branch enables safe iteration and preview deployments before merging to production.

The static-first architecture eliminates hybrid rendering complexity, improves performance through zero-JS-by-default, and provides a simpler mental model for future development while maintaining 100% design parity with the current implementation.

**Estimated Timeline:** 4 days
**Migration Branch:** `astro-migration`
**Preview Testing:** Vercel automatic preview deployments
**Production Cutover:** Merge to `master` when verified
