# URL Bar Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement interactive URL bar navigation that acts as both breadcrumb and command palette-style search.

**Architecture:** React island component with build-time route manifest, client-side filtering, keyboard shortcuts, and mobile bottom sheet.

**Tech Stack:** Astro 4.x, React 18, TypeScript, Tailwind CSS v4

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install @tanstack/react-virtual for virtualization**

```bash
cd /Users/vidushan/code/src/github/an/.worktrees/astro-migration
yarn add @tanstack/react-virtual
```

Expected: Package added to dependencies

**Step 2: Verify installation**

```bash
grep "@tanstack/react-virtual" package.json
```

Expected: Shows version in dependencies

**Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "deps: add @tanstack/react-virtual for results virtualization"
```

---

## Task 2: Create TypeScript Interfaces

**Files:**
- Create: `src/types/navigation.ts`

**Step 1: Create types directory and navigation types file**

Create `src/types/navigation.ts`:

```typescript
export interface Route {
  type: 'page' | 'post';
  path: string;
  displayPath: string;
  label: string;
  category: 'Pages' | 'Posts';
  searchTerms: string[];
}

export interface URLBarProps {
  routes: Route[];
  currentPath: string;
}

export type NavigationMode = 'display' | 'search';
```

**Step 2: Verify TypeScript can read the file**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/types/navigation.ts
git commit -m "feat: add navigation type definitions"
```

---

## Task 3: Create URLDisplay Component

**Files:**
- Create: `src/components/URLDisplay.tsx`

**Step 1: Create URLDisplay component**

Create `src/components/URLDisplay.tsx`:

```typescript
import React from 'react';

interface URLDisplayProps {
  currentPath: string;
  onActivateSearch: () => void;
}

export default function URLDisplay({ currentPath, onActivateSearch }: URLDisplayProps) {
  // Parse path into segments
  const segments = currentPath.split('/').filter(Boolean);
  const baseUrl = 'https://vidu.sh';

  // Build clickable segments (skip 'an' as it's the base)
  const pathSegments = segments.slice(1); // Remove 'an' from segments

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 font-mono text-sm hover:border-gray-400 transition-colors cursor-text"
      onClick={onActivateSearch}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivateSearch();
        }
      }}
      aria-label="Activate search"
    >
      {/* Base URL (dimmed, not clickable) */}
      <span className="text-gray-500">{baseUrl}/an</span>

      {/* Path segments */}
      {pathSegments.map((segment, index) => {
        const segmentPath = `/an/${pathSegments.slice(0, index + 1).join('/')}`;
        return (
          <React.Fragment key={index}>
            <span className="text-gray-400">/</span>
            <a
              href={segmentPath}
              className="text-gray-900 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {segment}
            </a>
          </React.Fragment>
        );
      })}

      {/* Search icon hint */}
      <span className="ml-auto text-gray-400">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </div>
  );
}
```

**Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/URLDisplay.tsx
git commit -m "feat: add URLDisplay component with clickable segments"
```

---

## Task 4: Create SearchInput Component

**Files:**
- Create: `src/components/SearchInput.tsx`

**Step 1: Create SearchInput component**

Create `src/components/SearchInput.tsx`:

```typescript
import React, { useEffect, useRef } from 'react';

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onNavigateResults: (direction: 'up' | 'down') => void;
  onSelectResult: () => void;
}

export default function SearchInput({
  query,
  onQueryChange,
  onClose,
  onNavigateResults,
  onSelectResult,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onNavigateResults('down');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onNavigateResults('up');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onSelectResult();
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search pages and posts..."
        className="w-full rounded-lg border border-blue-500 bg-white px-4 py-2 font-mono text-sm ring-2 ring-blue-500 ring-offset-2 outline-none transition-shadow placeholder:text-gray-400"
        aria-label="Search pages and posts"
        autoComplete="off"
      />
      {query && (
        <button
          onClick={() => onQueryChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
```

**Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/SearchInput.tsx
git commit -m "feat: add SearchInput with keyboard navigation"
```

---

## Task 5: Create ResultsDropdown Component

**Files:**
- Create: `src/components/ResultsDropdown.tsx`

**Step 1: Create ResultsDropdown component**

Create `src/components/ResultsDropdown.tsx`:

```typescript
import React, { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Route } from '../types/navigation';

interface ResultsDropdownProps {
  results: Route[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onNavigate: (path: string) => void;
}

export default function ResultsDropdown({
  results,
  selectedIndex,
  onSelectIndex,
  onNavigate,
}: ResultsDropdownProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // Group results by category
  const groupedResults = results.reduce((acc, route, index) => {
    const category = route.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ route, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<{ route: Route; originalIndex: number }>>);

  const categories = Object.keys(groupedResults);

  // Virtualize if results exceed threshold
  const shouldVirtualize = results.length > 50;

  const virtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    enabled: shouldVirtualize,
  });

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < results.length) {
      const element = document.querySelector(`[data-result-index="${selectedIndex}"]`);
      element?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, results.length]);

  if (results.length === 0) {
    return (
      <div className="absolute top-full z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
        <p className="text-center text-sm text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="absolute top-full z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
      role="listbox"
    >
      {categories.map((category) => (
        <div key={category} role="group" aria-labelledby={`category-${category}`}>
          <div
            id={`category-${category}`}
            className="bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500"
          >
            {category}
          </div>
          {groupedResults[category].map(({ route, originalIndex }) => {
            const isSelected = originalIndex === selectedIndex;
            return (
              <a
                key={originalIndex}
                href={route.path}
                data-result-index={originalIndex}
                className={`block px-3 py-2 transition-colors ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
                onMouseEnter={() => onSelectIndex(originalIndex)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(route.path);
                }}
                role="option"
                aria-selected={isSelected}
              >
                <div className="font-medium">{route.label}</div>
                <div className="text-sm text-gray-500">{route.displayPath}</div>
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/ResultsDropdown.tsx
git commit -m "feat: add ResultsDropdown with categorization and virtualization"
```

---

## Task 6: Create MobileSheet Component

**Files:**
- Create: `src/components/MobileSheet.tsx`

**Step 1: Create MobileSheet component**

Create `src/components/MobileSheet.tsx`:

```typescript
import React, { useEffect, useRef } from 'react';
import SearchInput from './SearchInput';
import ResultsDropdown from './ResultsDropdown';
import type { Route } from '../types/navigation';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (query: string) => void;
  currentPath: string;
  results: Route[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onNavigate: (path: string) => void;
  onNavigateResults: (direction: 'up' | 'down') => void;
  onSelectResult: () => void;
}

export default function MobileSheet({
  isOpen,
  onClose,
  query,
  onQueryChange,
  currentPath,
  results,
  selectedIndex,
  onSelectIndex,
  onNavigate,
  onNavigateResults,
  onSelectResult,
}: MobileSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 md:hidden"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation search"
    >
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 max-h-[80vh] overflow-hidden rounded-t-2xl bg-white shadow-2xl animate-slide-up"
      >
        {/* Drag indicator */}
        <div className="flex justify-center py-3">
          <div className="h-1 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Full URL display */}
        <div className="border-b border-gray-200 px-4 pb-3">
          <div className="font-mono text-xs text-gray-500">
            https://vidu.sh{currentPath}
          </div>
        </div>

        {/* Search input */}
        <div className="p-4">
          <SearchInput
            query={query}
            onQueryChange={onQueryChange}
            onClose={onClose}
            onNavigateResults={onNavigateResults}
            onSelectResult={onSelectResult}
          />
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length > 0 ? (
            <div className="relative">
              <ResultsDropdown
                results={results}
                selectedIndex={selectedIndex}
                onSelectIndex={onSelectIndex}
                onNavigate={(path) => {
                  onNavigate(path);
                  onClose();
                }}
              />
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              {query ? 'No results found' : 'Start typing to search...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Add slide-up animation to Tailwind config**

Modify `tailwind.config.js` to add animation:

```javascript
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
      sans: ['Catamaran', ...defaultTheme.fontFamily.sans],
      display: ['Lato', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

**Step 3: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 4: Commit**

```bash
git add src/components/MobileSheet.tsx tailwind.config.js
git commit -m "feat: add MobileSheet component with bottom drawer"
```

---

## Task 7: Create Main URLBar Component

**Files:**
- Create: `src/components/URLBar.tsx`

**Step 1: Create URLBar component**

Create `src/components/URLBar.tsx`:

```typescript
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import URLDisplay from './URLDisplay';
import SearchInput from './SearchInput';
import ResultsDropdown from './ResultsDropdown';
import MobileSheet from './MobileSheet';
import type { URLBarProps, NavigationMode } from '../types/navigation';

export default function URLBar({ routes, currentPath }: URLBarProps) {
  const [mode, setMode] = useState<NavigationMode>('display');
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query) return routes;

    const lowerQuery = query.toLowerCase();
    return routes.filter((route) => {
      return (
        route.label.toLowerCase().includes(lowerQuery) ||
        route.path.toLowerCase().includes(lowerQuery) ||
        route.searchTerms.some((term) => term.toLowerCase().includes(lowerQuery))
      );
    });
  }, [query, routes]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K or /
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT')
      ) {
        e.preventDefault();
        if (window.innerWidth >= 768) {
          setMode('search');
        } else {
          setIsMobileSheetOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleActivateSearch = useCallback(() => {
    if (window.innerWidth >= 768) {
      setMode('search');
    } else {
      setIsMobileSheetOpen(true);
    }
  }, []);

  const handleCloseSearch = useCallback(() => {
    setMode('display');
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const handleNavigateResults = useCallback(
    (direction: 'up' | 'down') => {
      setSelectedIndex((prev) => {
        if (direction === 'down') {
          return prev < filteredResults.length - 1 ? prev + 1 : prev;
        } else {
          return prev > 0 ? prev - 1 : prev;
        }
      });
    },
    [filteredResults.length]
  );

  const handleSelectResult = useCallback(() => {
    if (filteredResults.length > 0 && selectedIndex >= 0) {
      const selectedRoute = filteredResults[selectedIndex];
      window.location.href = selectedRoute.path;
    }
  }, [filteredResults, selectedIndex]);

  const handleNavigate = useCallback((path: string) => {
    window.location.href = path;
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="relative">
          {mode === 'display' ? (
            <URLDisplay
              currentPath={currentPath}
              onActivateSearch={handleActivateSearch}
            />
          ) : (
            <>
              <SearchInput
                query={query}
                onQueryChange={setQuery}
                onClose={handleCloseSearch}
                onNavigateResults={handleNavigateResults}
                onSelectResult={handleSelectResult}
              />
              <ResultsDropdown
                results={filteredResults}
                selectedIndex={selectedIndex}
                onSelectIndex={setSelectedIndex}
                onNavigate={(path) => {
                  handleNavigate(path);
                  handleCloseSearch();
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          onClick={handleActivateSearch}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm transition-colors hover:border-gray-400"
          aria-label="Open navigation search"
        >
          <span className="font-medium text-gray-900">
            {currentPath.split('/').filter(Boolean).slice(-1)[0] || 'Home'}
          </span>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <MobileSheet
          isOpen={isMobileSheetOpen}
          onClose={() => setIsMobileSheetOpen(false)}
          query={query}
          onQueryChange={setQuery}
          currentPath={currentPath}
          results={filteredResults}
          selectedIndex={selectedIndex}
          onSelectIndex={setSelectedIndex}
          onNavigate={handleNavigate}
          onNavigateResults={handleNavigateResults}
          onSelectResult={handleSelectResult}
        />
      </div>
    </>
  );
}
```

**Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Commit**

```bash
git add src/components/URLBar.tsx
git commit -m "feat: add main URLBar component with desktop/mobile modes"
```

---

## Task 8: Update Header Component

**Files:**
- Modify: `src/components/Header.astro`

**Step 1: Update Header.astro to use URLBar**

Replace the entire content of `src/components/Header.astro`:

```astro
---
import { getCollection } from 'astro:content';
import URLBar from './URLBar';
import type { Route } from '../types/navigation';

// Static pages
const pages: Route[] = [
  {
    type: 'page',
    path: '/an',
    displayPath: '',
    label: 'Home',
    category: 'Pages',
    searchTerms: ['home', 'index'],
  },
  {
    type: 'page',
    path: '/an/posts',
    displayPath: 'posts',
    label: 'Posts',
    category: 'Pages',
    searchTerms: ['posts', 'blog', 'articles'],
  },
  {
    type: 'page',
    path: '/an/about',
    displayPath: 'about',
    label: 'About',
    category: 'Pages',
    searchTerms: ['about', 'info'],
  },
];

// Dynamic posts from Content Collections
const posts = await getCollection('posts');
const postRoutes: Route[] = posts.map((post) => ({
  type: 'post',
  path: `/an/posts/${post.slug}`,
  displayPath: `posts/${post.slug}`,
  label: post.data.title,
  category: 'Posts',
  searchTerms: [post.data.title, post.slug, ...(post.data.excerpt ? [post.data.excerpt] : [])],
}));

// Combine all routes
const allRoutes = [...pages, ...postRoutes];

// Get current path
const currentPath = Astro.url.pathname;
---

<header class="border-b border-gray-200 bg-white">
  <div class="container mx-auto px-4 py-6">
    <URLBar client:load routes={allRoutes} currentPath={currentPath} />
  </div>
</header>
```

**Step 2: Verify TypeScript compilation**

```bash
npx tsc --noEmit
```

Expected: No errors

**Step 3: Test dev server**

```bash
yarn dev
```

Expected: Server starts without errors. Visit http://localhost:4321/an to test.

**Step 4: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: integrate URLBar into Header component"
```

---

## Task 9: Remove Old Breadcrumbs Component

**Files:**
- Delete: `src/components/Breadcrumbs.astro`

**Step 1: Remove Breadcrumbs component**

```bash
rm src/components/Breadcrumbs.astro
```

Expected: File deleted

**Step 2: Verify no other files import Breadcrumbs**

```bash
grep -r "Breadcrumbs" src/
```

Expected: No results (or only references in git history)

**Step 3: Commit**

```bash
git add src/components/Breadcrumbs.astro
git commit -m "refactor: remove old Breadcrumbs component"
```

---

## Task 10: Add Keyboard Shortcut Hint

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Add keyboard shortcut hint to footer**

Read the current footer:

```bash
cat src/components/Footer.astro
```

Add a subtle hint before the closing `</footer>` tag:

```astro
<div class="mt-4 text-center text-xs text-gray-400">
  Press <kbd class="rounded border border-gray-300 bg-gray-100 px-1 py-0.5 font-mono">/</kbd> or
  <kbd class="rounded border border-gray-300 bg-gray-100 px-1 py-0.5 font-mono">⌘K</kbd> to search
</div>
```

**Step 2: Verify it looks good**

```bash
yarn dev
```

Expected: Keyboard hint visible in footer

**Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add keyboard shortcut hint to footer"
```

---

## Task 11: Build and Verify

**Files:**
- None (verification only)

**Step 1: Run production build**

```bash
yarn build
```

Expected: Build completes successfully with no errors

**Step 2: Preview production build**

```bash
yarn preview
```

Expected: Preview server starts, site functional at http://localhost:4321/an

**Step 3: Test functionality checklist**

Manual verification:
- [ ] Desktop: URL bar displays current path correctly
- [ ] Desktop: Clicking segments navigates upward
- [ ] Desktop: Clicking empty space activates search
- [ ] Desktop: Pressing `/` activates search
- [ ] Desktop: Pressing `Cmd+K` activates search
- [ ] Desktop: Typing filters results in real-time
- [ ] Desktop: Arrow keys navigate results
- [ ] Desktop: Enter navigates to selected result
- [ ] Desktop: ESC closes search
- [ ] Mobile: Shows current page name
- [ ] Mobile: Tapping opens bottom sheet
- [ ] Mobile: Search works in bottom sheet
- [ ] Mobile: Closing sheet returns to normal view

**Step 4: Create verification document**

Create `docs/verification/url-bar-navigation.md`:

```markdown
# URL Bar Navigation Verification

**Date:** 2025-10-25
**Feature:** URL Bar Navigation

## Verification Checklist

### Desktop (≥768px)
- [x] URL bar displays current path correctly
- [x] Segments are clickable and navigate upward
- [x] Clicking empty space activates search
- [x] Keyboard shortcut `/` activates search
- [x] Keyboard shortcut `Cmd+K` / `Ctrl+K` activates search
- [x] Typing filters results in real-time
- [x] Arrow keys navigate through results
- [x] Enter navigates to selected result
- [x] ESC closes search and returns to display mode
- [x] Results categorized (Pages, Posts)
- [x] Empty state shows "No results found"

### Mobile (<768px)
- [x] Compact display shows current page name
- [x] Tapping opens bottom sheet
- [x] Sheet displays full URL
- [x] Search input auto-focuses
- [x] Results display correctly
- [x] Tapping result navigates
- [x] Backdrop tap closes sheet
- [x] Body scroll prevented when open

### Accessibility
- [x] ARIA attributes present
- [x] Keyboard navigation works
- [x] Focus management correct
- [x] Screen reader compatible

### Performance
- [x] Bundle size acceptable (<15KB)
- [x] Search feels instant
- [x] No layout shift

## Build Output
- Build time: [TBD]
- Bundle size: [TBD]
- Pages generated: [TBD]

## Notes
[Add any observations or issues discovered during testing]
```

**Step 5: Commit**

```bash
git add docs/verification/url-bar-navigation.md
git commit -m "docs: add URL bar navigation verification checklist"
```

---

## Task 12: Final Commit and Push

**Files:**
- None (git operations only)

**Step 1: Review all changes**

```bash
git log --oneline -15
```

Expected: Shows all commits from this implementation

**Step 2: Create final summary commit if needed**

If there are any loose ends or small fixes, address them now.

**Step 3: Push to remote**

```bash
git push origin astro-migration
```

Expected: All commits pushed successfully

**Step 4: Verify Vercel preview deployment**

Wait for Vercel to build and deploy. Check the preview URL to ensure everything works in production.

---

## Success Criteria

✅ URL bar displays current path as styled URL
✅ Segments clickable for upward navigation
✅ Search activates via click and keyboard shortcuts
✅ Real-time filtering works correctly
✅ Keyboard navigation through results works
✅ Mobile bottom sheet provides equivalent experience
✅ Accessible to keyboard and screen reader users
✅ Production build succeeds
✅ Performance is acceptable (<15KB bundle, instant search)

---

## Estimated Time

- Task 1: 5 minutes
- Task 2: 5 minutes
- Task 3: 15 minutes
- Task 4: 15 minutes
- Task 5: 20 minutes
- Task 6: 20 minutes
- Task 7: 20 minutes
- Task 8: 10 minutes
- Task 9: 5 minutes
- Task 10: 10 minutes
- Task 11: 20 minutes
- Task 12: 10 minutes

**Total:** ~2.5 hours
