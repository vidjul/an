# Next.js to Astro Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the `/an` subdirectory application from Next.js 14 to Astro 4.x while maintaining pixel-perfect design parity and deployment at `https://vidu.sh/an`.

**Architecture:** Foundation-First clean-slate migration on separate branch. Establish working Astro skeleton with proper configuration (base path, Tailwind, TypeScript), then layer in components, content collections, and pages systematically.

**Tech Stack:** Astro 4.x, @astrojs/vercel (static adapter), @astrojs/tailwind, @astrojs/react (for future islands), Tailwind CSS v4, TypeScript, Astro Content Collections

---

## Task 1: Initialize Astro Project

**Goal:** Create minimal working Astro project with Vercel deployment capability.

**Files:**
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Modify: `package.json`

**Step 1: Remove Next.js dependencies and add Astro**

Modify `package.json`:
```json
{
  "name": "an",
  "version": "2.2.0",
  "license": "MIT",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^3.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "@astrojs/vercel": "^7.0.0",
    "@vercel/analytics": "1.1.1",
    "@vercel/speed-insights": "1.0.3",
    "astro": "^4.0.0",
    "date-fns": "2.30.0",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.13",
    "@tailwindcss/typography": "0.5.9",
    "@types/node": "18.14.0",
    "@types/react": "18.3.1",
    "@types/react-dom": "18.3.0",
    "prettier": "3.0.3",
    "prettier-plugin-tailwindcss": "^0.6.14",
    "tailwindcss": "^4.1.13",
    "typescript": "4.9.5"
  },
  "packageManager": "yarn@4.2.1"
}
```

**Step 2: Install dependencies**

Run: `yarn install`
Expected: Dependencies install successfully

**Step 3: Create Astro config with base path**

Create `astro.config.mjs`:
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
      applyBaseStyles: false,
    }),
    react(),
  ],
});
```

**Step 4: Create TypeScript config**

Create `tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

**Step 5: Create Astro environment types**

Create `src/env.d.ts`:
```typescript
/// <reference types="astro/client" />
```

**Step 6: Commit foundation**

```bash
git add package.json astro.config.mjs tsconfig.json src/env.d.ts
git commit -m "feat: initialize Astro project with Vercel adapter

- Add Astro 4.x with static adapter
- Configure base path /an for subdirectory deployment
- Add Tailwind and React integrations
- Remove Next.js dependencies"
```

---

## Task 2: Set Up Tailwind Configuration

**Goal:** Preserve existing Tailwind v4 configuration for pixel-perfect styling.

**Files:**
- Modify: `tailwind.config.js`
- Create: `src/styles/global.css`

**Step 1: Update Tailwind config for Astro**

Modify `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
```

**Step 2: Create global CSS with Tailwind imports**

Create `src/styles/global.css`:
```css
@import "tailwindcss";
```

**Step 3: Commit Tailwind setup**

```bash
git add tailwind.config.js src/styles/global.css
git commit -m "feat: configure Tailwind CSS v4 for Astro

- Update content paths for Astro file structure
- Add typography plugin configuration
- Create global CSS with Tailwind imports"
```

---

## Task 3: Create Base Layout

**Goal:** Build HTML shell layout with proper meta tags and analytics.

**Files:**
- Create: `src/layouts/BaseLayout.astro`

**Step 1: Create base layout with HTML structure**

Create `src/layouts/BaseLayout.astro`:
```astro
---
import { ViewTransitions } from 'astro:transitions';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'an',
  description = 'Personal blog and notes'
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/x-icon" href="/an/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
    <ViewTransitions />
  </head>
  <body class="min-h-screen bg-white text-gray-900 antialiased">
    <slot />
  </body>
</html>
```

**Step 2: Commit base layout**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: create base HTML layout

- Add HTML shell with proper meta tags
- Include font preconnects for Inter font
- Import global Tailwind CSS
- Add View Transitions support"
```

---

## Task 4: Create Placeholder Home Page

**Goal:** Verify Astro builds and deploys with base path.

**Files:**
- Create: `src/pages/index.astro`
- Create: `public/favicon.ico` (copy from existing)

**Step 1: Create minimal home page**

Create `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="an - Home">
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold">Migration in Progress</h1>
    <p class="mt-4 text-gray-600">Astro foundation setup complete.</p>
  </main>
</BaseLayout>
```

**Step 2: Copy favicon**

Run: `cp public/favicon.ico public/favicon.ico` (verify it exists from Next.js)
Expected: Favicon present in public directory

**Step 3: Test local build**

Run: `yarn build`
Expected: Build succeeds, output in `dist/` directory

**Step 4: Test local preview**

Run: `yarn preview`
Expected: Site accessible at `http://localhost:4321/an`

**Step 5: Commit placeholder page**

```bash
git add src/pages/index.astro
git commit -m "feat: add placeholder home page

- Create minimal index page for build verification
- Confirm base path /an works in preview"
```

---

## Task 5: Set Up Content Collections

**Goal:** Configure Astro Content Collections for blog posts with Zod schema.

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/posts/` (directory)

**Step 1: Create content collections configuration**

Create `src/content/config.ts`:
```typescript
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(99),
    slug: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().max(200),
  }),
});

export const collections = { posts };
```

**Step 2: Create posts directory**

Run: `mkdir -p src/content/posts`
Expected: Directory created

**Step 3: Commit content collections setup**

```bash
git add src/content/config.ts
git commit -m "feat: configure Content Collections for posts

- Define posts schema with Zod validation
- Match existing Velite schema (title, slug, date, excerpt)
- Enable automatic TypeScript type generation"
```

---

## Task 6: Migrate Markdown Posts

**Goal:** Move all markdown files from old content directory to Content Collections.

**Files:**
- Move: `content/posts/*.md` → `src/content/posts/*.md`

**Step 1: Copy all markdown posts**

Run: `cp -r content/posts/*.md src/content/posts/`
Expected: All markdown files copied to new location

**Step 2: Verify frontmatter format**

Run: `ls src/content/posts/ | head -5`
Expected: See markdown files listed

**Step 3: Test content collection query**

Run: `yarn build`
Expected: Build succeeds with content collections processed

**Step 4: Commit migrated posts**

```bash
git add src/content/posts/
git commit -m "feat: migrate markdown posts to Content Collections

- Copy all posts from content/posts to src/content/posts
- Verify frontmatter compatible with schema
- Enable build-time validation"
```

---

## Task 7: Create Header Component

**Goal:** Convert Next.js Header component to Astro format.

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Breadcrumbs.astro`

**Step 1: Create Breadcrumbs component**

Create `src/components/Breadcrumbs.astro`:
```astro
---
const { pathname } = Astro.url;
const parts = pathname.replace('/an', '').split('/').filter(Boolean);

const breadcrumbs = parts.map((part, index) => {
  const href = '/an/' + parts.slice(0, index + 1).join('/');
  const label = part.charAt(0).toUpperCase() + part.slice(1);
  return { href, label };
});
---

{breadcrumbs.length > 0 && (
  <nav class="flex items-center space-x-2 text-sm text-gray-600">
    <a href="/an" class="hover:text-gray-900">Home</a>
    {breadcrumbs.map((crumb) => (
      <>
        <span class="text-gray-400">/</span>
        <a href={crumb.href} class="hover:text-gray-900">{crumb.label}</a>
      </>
    ))}
  </nav>
)}
```

**Step 2: Create Header component**

Create `src/components/Header.astro`:
```astro
---
import Breadcrumbs from './Breadcrumbs.astro';
---

<header class="border-b border-gray-200 bg-white">
  <div class="container mx-auto px-4 py-6">
    <div class="flex items-center justify-between">
      <a href="/an" class="text-2xl font-bold text-gray-900 hover:text-gray-700">
        an
      </a>
      <nav class="flex space-x-6">
        <a href="/an" class="text-gray-600 hover:text-gray-900">Home</a>
        <a href="/an/posts" class="text-gray-600 hover:text-gray-900">Posts</a>
        <a href="/an/about" class="text-gray-600 hover:text-gray-900">About</a>
      </nav>
    </div>
    <div class="mt-4">
      <Breadcrumbs />
    </div>
  </div>
</header>
```

**Step 3: Commit Header components**

```bash
git add src/components/Header.astro src/components/Breadcrumbs.astro
git commit -m "feat: create Header and Breadcrumbs components

- Convert TSX components to Astro format
- Preserve Tailwind styling exactly
- Generate breadcrumbs from URL pathname
- Static rendering (no client JS needed)"
```

---

## Task 8: Create Footer Component

**Goal:** Convert Next.js Footer to Astro format.

**Files:**
- Create: `src/components/Footer.astro`

**Step 1: Read existing Footer to preserve styling**

Run: `cat components/Footer.tsx`
Expected: See current footer implementation

**Step 2: Create Footer component**

Create `src/components/Footer.astro`:
```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="border-t border-gray-200 bg-white">
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
      <p class="text-sm text-gray-600">
        © {currentYear} an. All rights reserved.
      </p>
      <div class="flex space-x-6">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900">
          GitHub
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-gray-900">
          Twitter
        </a>
      </div>
    </div>
  </div>
</footer>
```

**Step 3: Update BaseLayout to include Header and Footer**

Modify `src/layouts/BaseLayout.astro` (add imports and components):
```astro
---
import { ViewTransitions } from 'astro:transitions';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'an',
  description = 'Personal blog and notes'
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/x-icon" href="/an/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
    <ViewTransitions />
  </head>
  <body class="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Step 4: Test layout with Header and Footer**

Run: `yarn dev`
Expected: Dev server starts, visit `http://localhost:4321/an` to see header and footer

**Step 5: Commit Footer and layout update**

```bash
git add src/components/Footer.astro src/layouts/BaseLayout.astro
git commit -m "feat: add Footer and integrate into BaseLayout

- Create Footer component with Tailwind styling
- Update BaseLayout to include Header and Footer
- Use flex layout for sticky footer"
```

---

## Task 9: Create Intro Component

**Goal:** Convert shared Intro component to Astro.

**Files:**
- Create: `src/components/Intro.astro`

**Step 1: Read existing Intro component**

Run: `cat components/Intro.tsx`
Expected: See current intro implementation

**Step 2: Create Intro component**

Create `src/components/Intro.astro`:
```astro
---
interface Props {
  title: string;
  subtitle?: string;
}

const { title, subtitle } = Astro.props;
---

<section class="border-b border-gray-200 bg-gray-50 py-12">
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold text-gray-900 md:text-5xl">
      {title}
    </h1>
    {subtitle && (
      <p class="mt-4 text-lg text-gray-600">
        {subtitle}
      </p>
    )}
  </div>
</section>
```

**Step 3: Commit Intro component**

```bash
git add src/components/Intro.astro
git commit -m "feat: create Intro component

- Convert TSX to Astro format
- Accept title and optional subtitle props
- Preserve Tailwind styling"
```

---

## Task 10: Create PostsList Component

**Goal:** Convert PostsList component for rendering blog post previews.

**Files:**
- Create: `src/components/PostsList.astro`

**Step 1: Read existing PostsList component**

Run: `cat components/PostsList.tsx`
Expected: See current post list implementation

**Step 2: Create PostsList component with Content Collections**

Create `src/components/PostsList.astro`:
```astro
---
import { getCollection } from 'astro:content';
import { format } from 'date-fns';

const posts = await getCollection('posts');
const sortedPosts = posts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<div class="space-y-8">
  {sortedPosts.map((post) => (
    <article class="border-b border-gray-200 pb-8 last:border-0">
      <a href={`/an/posts/${post.data.slug}`} class="group">
        <h2 class="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
          {post.data.title}
        </h2>
        <time class="mt-2 block text-sm text-gray-500">
          {format(new Date(post.data.date), 'MMMM d, yyyy')}
        </time>
        <p class="mt-3 text-gray-600">
          {post.data.excerpt}
        </p>
      </a>
    </article>
  ))}
</div>
```

**Step 3: Commit PostsList component**

```bash
git add src/components/PostsList.astro
git commit -m "feat: create PostsList component

- Query posts from Content Collections
- Sort by date descending
- Format dates with date-fns
- Preserve styling from Next.js version"
```

---

## Task 11: Build Home Page

**Goal:** Replace placeholder home page with actual content and posts list.

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Update home page with Intro and PostsList**

Modify `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Intro from '../components/Intro.astro';
import PostsList from '../components/PostsList.astro';
---

<BaseLayout
  title="an - Home"
  description="Personal blog and technical notes"
>
  <Intro
    title="Welcome to an"
    subtitle="Thoughts on software, design, and building things."
  />
  <div class="container mx-auto px-4 py-12">
    <h2 class="mb-8 text-3xl font-bold text-gray-900">Recent Posts</h2>
    <PostsList />
  </div>
</BaseLayout>
```

**Step 2: Test home page**

Run: `yarn dev`
Expected: Visit `http://localhost:4321/an` to see intro and posts list

**Step 3: Commit home page**

```bash
git add src/pages/index.astro
git commit -m "feat: build home page with intro and posts

- Add Intro component with welcome message
- Display recent posts using PostsList
- Complete home page implementation"
```

---

## Task 12: Build About Page

**Goal:** Create about page with content.

**Files:**
- Create: `src/pages/about.astro`

**Step 1: Read existing about page content**

Run: `cat app/about/page.tsx`
Expected: See current about page structure

**Step 2: Create about page**

Create `src/pages/about.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Intro from '../components/Intro.astro';
---

<BaseLayout
  title="About - an"
  description="About this blog and its author"
>
  <Intro title="About" />
  <div class="container mx-auto px-4 py-12">
    <div class="prose prose-lg max-w-3xl">
      <p class="text-lg text-gray-700">
        This is a personal blog where I share thoughts on software development,
        design, and building products.
      </p>
      <p class="mt-6 text-lg text-gray-700">
        Topics include web development, architecture, developer experience,
        and lessons learned from building software.
      </p>
    </div>
  </div>
</BaseLayout>
```

**Step 3: Test about page**

Run: `yarn dev`
Expected: Visit `http://localhost:4321/an/about` to see about page

**Step 4: Commit about page**

```bash
git add src/pages/about.astro
git commit -m "feat: create about page

- Add about page with intro section
- Include prose styling for content
- Match layout from Next.js version"
```

---

## Task 13: Build Posts Index Page

**Goal:** Create posts listing page.

**Files:**
- Create: `src/pages/posts/index.astro`

**Step 1: Create posts index page**

Create `src/pages/posts/index.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Intro from '../../components/Intro.astro';
import PostsList from '../../components/PostsList.astro';
---

<BaseLayout
  title="Posts - an"
  description="All blog posts"
>
  <Intro
    title="All Posts"
    subtitle="Writings on software, design, and technology."
  />
  <div class="container mx-auto px-4 py-12">
    <PostsList />
  </div>
</BaseLayout>
```

**Step 2: Test posts index**

Run: `yarn dev`
Expected: Visit `http://localhost:4321/an/posts` to see all posts

**Step 3: Commit posts index**

```bash
git add src/pages/posts/index.astro
git commit -m "feat: create posts index page

- Display all posts with PostsList component
- Add intro section with title
- Complete posts listing route"
```

---

## Task 14: Build Dynamic Post Page

**Goal:** Create dynamic route for individual blog posts with markdown rendering.

**Files:**
- Create: `src/pages/posts/[slug].astro`

**Step 1: Create dynamic post page with getStaticPaths**

Create `src/pages/posts/[slug].astro`:
```astro
---
import { getCollection } from 'astro:content';
import { format } from 'date-fns';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BaseLayout
  title={`${post.data.title} - an`}
  description={post.data.excerpt}
>
  <article class="container mx-auto px-4 py-12">
    <header class="mb-8 border-b border-gray-200 pb-8">
      <h1 class="text-4xl font-bold text-gray-900 md:text-5xl">
        {post.data.title}
      </h1>
      <time class="mt-4 block text-sm text-gray-500">
        {format(new Date(post.data.date), 'MMMM d, yyyy')}
      </time>
    </header>
    <div class="prose prose-lg max-w-3xl">
      <Content />
    </div>
  </article>
</BaseLayout>
```

**Step 2: Test dynamic post route**

Run: `yarn dev`
Expected: Visit any post URL like `http://localhost:4321/an/posts/[some-slug]`

**Step 3: Verify markdown renders correctly**

Expected: See formatted markdown content with typography styles

**Step 4: Commit dynamic post page**

```bash
git add src/pages/posts/[slug].astro
git commit -m "feat: create dynamic post page with SSG

- Implement getStaticPaths for all posts
- Render markdown content with Content component
- Apply typography styles to post body
- Display title and formatted date"
```

---

## Task 15: Add Vercel Analytics and Speed Insights

**Goal:** Integrate Vercel analytics for tracking.

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Add analytics scripts to BaseLayout**

Modify `src/layouts/BaseLayout.astro` (update head section):
```astro
---
import { ViewTransitions } from 'astro:transitions';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'an',
  description = 'Personal blog and notes'
} = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/x-icon" href="/an/favicon.ico" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
    <ViewTransitions />
    <script>
      import { inject } from '@vercel/analytics';
      import { injectSpeedInsights } from '@vercel/speed-insights';
      inject();
      injectSpeedInsights();
    </script>
  </head>
  <body class="flex min-h-screen flex-col bg-white text-gray-900 antialiased">
    <Header />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Step 2: Test analytics are injected**

Run: `yarn build && yarn preview`
Expected: Check browser dev tools for Vercel analytics scripts

**Step 3: Commit analytics integration**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add Vercel Analytics and Speed Insights

- Inject analytics scripts in layout head
- Preserve tracking from Next.js deployment
- Enable performance monitoring"
```

---

## Task 16: Clean Up Old Next.js Files

**Goal:** Remove Next.js configuration and files no longer needed.

**Files:**
- Delete: `next.config.js`
- Delete: `next-env.d.ts`
- Delete: `velite.config.ts`
- Delete: `app/` (entire directory)
- Delete: `components/` (old TSX components)
- Delete: `content/` (old content location)
- Delete: `.velite/` (build output)
- Delete: `postcss.config.js` (if Astro doesn't need it)

**Step 1: Remove Next.js config files**

Run: `git rm next.config.js next-env.d.ts velite.config.ts`
Expected: Files staged for deletion

**Step 2: Remove Next.js directories**

Run: `git rm -r app/ components/ content/`
Expected: Directories removed

**Step 3: Clean up build outputs and configs**

Run: `git rm -r .velite/ && git rm postcss.config.js`
Expected: Velite artifacts removed

**Step 4: Update .gitignore to remove Next.js entries**

Modify `.gitignore` (remove Next.js and Velite sections):
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
.tool-versions

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# yarn
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# astro
.astro

# obsidian
.obsidian

# worktrees
.worktrees/
```

**Step 5: Commit cleanup**

```bash
git add .gitignore
git commit -m "chore: remove Next.js files and configuration

- Delete Next.js config and type files
- Remove app router and component directories
- Remove Velite configuration
- Update .gitignore for Astro
- Clean migration complete"
```

---

## Task 17: Final Verification and Testing

**Goal:** Comprehensive testing before merging to master.

**Files:**
- None (testing only)

**Step 1: Full production build**

Run: `yarn build`
Expected: Build succeeds with no errors

**Step 2: Check build output**

Run: `ls -la dist/`
Expected: See static files in dist directory with /an subdirectory structure

**Step 3: Preview production build**

Run: `yarn preview`
Expected: Site works at `http://localhost:4321/an`

**Step 4: Manual QA checklist**

Test each route:
- [ ] `http://localhost:4321/an` - Home page loads, posts display
- [ ] `http://localhost:4321/an/about` - About page loads
- [ ] `http://localhost:4321/an/posts` - Posts index loads
- [ ] `http://localhost:4321/an/posts/[any-slug]` - Post detail loads with markdown

Test styling:
- [ ] Header appears with navigation
- [ ] Footer appears at bottom
- [ ] Breadcrumbs show correctly
- [ ] Responsive design works (resize browser)
- [ ] Typography styles apply to post content

Test base path:
- [ ] All internal links work with /an prefix
- [ ] Static assets load (favicon, fonts)
- [ ] No broken links or 404s

**Step 5: Push branch and verify Vercel preview**

Run: `git push -u origin astro-migration`
Expected: Vercel creates preview deployment

**Step 6: Test preview deployment**

Visit: Vercel preview URL (e.g., `https://[preview-hash].vercel.app/an`)
Expected: Site works identically to local preview

**Step 7: Visual comparison with production**

Open both:
- Current production: `https://vidu.sh/an`
- New preview: `https://[preview-hash].vercel.app/an`

Compare side-by-side:
- [ ] Layout matches pixel-perfect
- [ ] Colors and spacing identical
- [ ] Typography matches
- [ ] All functionality works

**Step 8: Performance check**

Run Lighthouse on preview URL:
Expected: Performance score > 90, all metrics green

**Step 9: Document verification results**

Create `MIGRATION_CHECKLIST.md` in worktree:
```markdown
# Migration Verification Checklist

## Build & Deploy
- [x] Production build succeeds
- [x] Preview deployment works
- [x] Base path /an configured correctly

## Routes
- [x] Home page (/an)
- [x] About page (/an/about)
- [x] Posts index (/an/posts)
- [x] Dynamic post pages (/an/posts/[slug])

## Visual Parity
- [x] Header layout matches
- [x] Footer layout matches
- [x] Typography styles preserved
- [x] Responsive design works
- [x] Color scheme identical

## Functionality
- [x] Navigation links work
- [x] Breadcrumbs generate correctly
- [x] Posts sort by date descending
- [x] Markdown renders correctly
- [x] Analytics scripts load

## Performance
- [x] Lighthouse score > 90
- [x] No console errors
- [x] Fast page loads

**Ready for production:** YES

**Merge command:** `git checkout master && git merge astro-migration`
```

**Step 10: Commit verification results**

```bash
git add MIGRATION_CHECKLIST.md
git commit -m "docs: add migration verification checklist

- Document all verification steps completed
- Confirm visual and functional parity
- Ready for production deployment"
```

---

## Deployment to Production

**When ready to deploy:**

1. Switch to master branch:
   ```bash
   cd /Users/vidushan/code/src/github/an
   git checkout master
   ```

2. Merge astro-migration branch:
   ```bash
   git merge astro-migration
   ```

3. Push to master:
   ```bash
   git push origin master
   ```

4. Verify production deployment:
   - Vercel automatically deploys master
   - Visit `https://vidu.sh/an`
   - Confirm everything works

5. Monitor analytics:
   - Check Vercel Analytics for traffic
   - Watch for any errors or issues

**Post-deployment:**
- Keep astro-migration branch for reference (or delete if confident)
- Monitor site performance in production
- Gather user feedback if applicable

---

## Notes

- Each task should be completed sequentially
- Commit frequently with descriptive messages
- Test after each major task to catch issues early
- Preserve all Tailwind classes exactly as-is for pixel-perfect migration
- Content Collections provide better DX than Velite (automatic types, simpler)
- Base path configuration critical for subdirectory deployment
- All routes are pre-rendered at build time (fully static)
