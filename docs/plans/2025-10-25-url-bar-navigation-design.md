# URL Bar Navigation Header Design

**Date:** 2025-10-25
**Status:** Design Phase
**Context:** Redesign header for Astro blog to use URL bar-inspired navigation with integrated search

## Overview

Replace the current static header with an interactive URL bar that mimics browser behavior, acting as both breadcrumb navigation and a command palette-style search interface. The design takes inspiration from modern developer tools and the Tailwind Spotlight template aesthetic.

## Goals

- Create intuitive navigation that scales with frequent blog publishing
- Provide fast, keyboard-driven navigation for power users
- Maintain clean, minimal aesthetic aligned with redesign vision
- Support both desktop and mobile experiences appropriately

## Design Decisions

### Core Interaction Pattern

**Desktop (≥768px):**
- URL bar displays current path in browser-style format: `https://vidu.sh/an/posts/slug`
- **Display mode (default):** Read-only styled URL with clickable segments
- **Search mode (active):** Input field with real-time filtered results dropdown
- Click empty space, press `/`, or `Cmd+K` / `Ctrl+K` to activate search
- ESC to return to display mode

**Mobile (<768px):**
- Compact display showing only current segment (e.g., "Posts")
- Tap opens full-screen bottom sheet with search
- Bottom sheet contains full URL display + search input + results
- Swipe down or tap backdrop to dismiss

### Architectural Approach

**Island Component with Static Data**

- Header built as hybrid Astro/React component
- Astro queries Content Collections at build time
- Route manifest (pages + posts) passed as props to React island
- Client-side filtering (no runtime API calls)
- ~5-10KB JS bundle for search functionality

**Trade-offs accepted:**
- Site rebuild required to update navigation data (acceptable for static blog)
- Small JS bundle added (worthwhile for UX improvement)
- Client-side only (offline-capable once loaded)

## Architecture

### Component Hierarchy

```
Header.astro (SSR)
└── URLBar.tsx (React Island, client:load)
    ├── URLDisplay.tsx (read-only segments)
    ├── SearchInput.tsx (input + keyboard handlers)
    ├── ResultsDropdown.tsx (categorized results)
    └── MobileSheet.tsx (mobile bottom sheet)
```

### Data Structure

**Route manifest interface:**

```typescript
interface Route {
  type: 'page' | 'post';
  path: string;        // Full path: '/an/posts/my-first-post'
  displayPath: string; // Display: 'posts/my-first-post'
  label: string;       // Human-readable: 'My First Post'
  category: 'Pages' | 'Posts';
  searchTerms: string[]; // For matching: [title, slug]
}
```

**Build-time data generation:**

```typescript
// In Header.astro
import { getCollection } from 'astro:content';

// Static pages
const pages = [
  { type: 'page', path: '/an', label: 'Home', category: 'Pages' },
  { type: 'page', path: '/an/posts', label: 'Posts', category: 'Pages' },
  { type: 'page', path: '/an/about', label: 'About', category: 'Pages' },
];

// Dynamic posts from Content Collections
const posts = await getCollection('posts');
const postRoutes = posts.map(post => ({
  type: 'post',
  path: `/an/posts/${post.slug}`,
  label: post.data.title,
  category: 'Posts',
  searchTerms: [post.data.title, post.slug],
}));

const allRoutes = [...pages, ...postRoutes];
```

### State Management

Simple React `useState` for self-contained component:

- `mode: 'display' | 'search'` - Current interaction mode
- `query: string` - Search input value
- `selectedIndex: number` - Keyboard navigation position
- `filteredResults: Route[]` - Computed from query

No complex state management needed.

### Search Implementation

**Algorithm:** Case-insensitive substring matching

```typescript
const filteredResults = allRoutes.filter(route => {
  const searchQuery = query.toLowerCase();
  return (
    route.label.toLowerCase().includes(searchQuery) ||
    route.path.toLowerCase().includes(searchQuery) ||
    route.searchTerms.some(term => term.toLowerCase().includes(searchQuery))
  );
});
```

**Categorization:** Group results by `category` field (Pages first, then Posts)

**Future enhancement:** Can add fuzzy matching library (Fuse.js) if simple matching insufficient

## Visual Design

### URL Bar Styling

**Display Mode:**

```css
Font: font-mono (Tailwind default monospace)
Background: bg-gray-50
Border: border border-gray-300, hover:border-gray-400
Padding: px-4 py-2
Corners: rounded-lg

Protocol/domain: text-gray-500 (dimmed)
Path segments: text-gray-900, hover:text-blue-600 (clickable)
Separators: text-gray-400 (/)
```

**Search Mode:**

```css
Input: Same dimensions as display mode
Focus: border-blue-500 ring-2 ring-blue-500 ring-offset-2
Placeholder: "Search pages and posts..." text-gray-400
```

### Results Dropdown

```css
Container: absolute top-full mt-2
Background: bg-white border border-gray-200 shadow-lg rounded-lg
Max height: max-h-96 overflow-y-auto

Category headers:
  - text-xs uppercase text-gray-500
  - px-3 py-2 bg-gray-50

Result items:
  - px-3 py-2
  - hover:bg-gray-100
  - Selected (keyboard): bg-blue-50 text-blue-700
  - Label: text-gray-900 font-medium
  - Path: text-sm text-gray-500 (shown below label)
```

### Mobile Bottom Sheet

```css
Backdrop: fixed inset-0 bg-black/50
Sheet: fixed bottom-0 bg-white rounded-t-2xl
Height: max-h-[80vh]
Animation: Slide-up with spring physics
Header: Drag indicator (rounded bar)
Content: Scrollable results area
```

### Color Palette

- **Monochrome base:** Grays and blacks (gray-50 to gray-900)
- **Accent color:** Tailwind default blue (blue-500, blue-600, blue-700)
- **Rationale:** Structure first, easy to theme later

## User Interactions

### Segment Navigation

**Display mode behavior:**

- `https://vidu.sh/an` - Not clickable (base URL)
- `/posts` - Click navigates to `/an/posts`
- `/my-post-slug` - Click navigates to `/an/posts/my-post-slug`

Each segment acts as upward navigation (traditional breadcrumb behavior).

### Search Activation

**Desktop triggers:**
1. Click empty space in URL bar (not on segment)
2. Press `/` key anywhere on page
3. Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
4. Optional: Click search icon at end of bar

**Mobile trigger:**
- Tap compact URL display

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `/` or `Cmd+K` / `Ctrl+K` | Activate search from anywhere |
| `ESC` | Close search, return to display mode |
| `Arrow Up` / `Arrow Down` | Navigate through results |
| `Enter` | Navigate to selected result |
| `Tab` | Cycle through clickable segments (display mode) |

### Search Filtering

- Type to filter results in real-time
- Results update as you type (debounced 150ms)
- Categories shown: **Pages** (top-level), **Posts** (blog posts)
- Empty state: "No results found" when query matches nothing
- Clear button (×) to reset search

## Accessibility

### ARIA Attributes

```html
<div role="combobox" aria-expanded="true/false">
  <input aria-label="Search pages and posts" />
  <ul role="listbox">
    <li role="group" aria-labelledby="pages-header">
      <div id="pages-header">Pages</div>
      <ul>
        <li role="option" aria-selected="true/false">Home</li>
      </ul>
    </li>
  </ul>
</div>
```

### Focus Management

- Opening search auto-focuses input field
- Closing search returns focus to trigger element
- Keyboard navigation updates `aria-activedescendant`
- Focus trap within mobile sheet

### Screen Reader Support

- Result count announced: "5 results found"
- Category changes announced during navigation
- Selected item announced with full path
- Loading states (if added): "Loading posts..."

## Performance Optimizations

### Client-Side

- **Debounce search input:** 150ms to reduce re-renders
- **Memoize filtered results:** `useMemo` based on query
- **Virtualize long lists:** Use `@tanstack/react-virtual` if >50 results
- **Lazy load mobile sheet:** Code splitting for mobile component

### Build-Time

- Route manifest generated once at build
- No runtime content queries
- Static data serialized to component props

### Bundle Size

- Estimated: 5-10KB (React island + search logic)
- Acceptable trade-off for improved navigation UX

## Browser Compatibility

- **Target:** Modern browsers (last 2 versions)
- **Graceful degradation:** Clickable segments work without JS
- **Progressive enhancement:** Search requires JS but isn't critical

## Implementation Components

### Header.astro

```astro
---
import { getCollection } from 'astro:content';
import URLBar from '../components/URLBar';

// Generate route manifest
const pages = [...]; // Static pages
const posts = await getCollection('posts');
const postRoutes = posts.map(...);
const allRoutes = [...pages, ...postRoutes];

// Get current path from Astro.url
const currentPath = Astro.url.pathname;
---

<header class="border-b border-gray-200 bg-white">
  <div class="container mx-auto px-4 py-6">
    <URLBar client:load routes={allRoutes} currentPath={currentPath} />
  </div>
</header>
```

### URLBar.tsx (React Island)

```tsx
interface Props {
  routes: Route[];
  currentPath: string;
}

export default function URLBar({ routes, currentPath }: Props) {
  const [mode, setMode] = useState<'display' | 'search'>('display');
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setMode('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter logic, render logic...
}
```

## Future Enhancements

### Post-MVP Features

- Fuzzy search with ranking (Fuse.js)
- Recent/frequent pages prioritized
- Keyboard shortcut customization
- Search history / suggestions
- Deep link support (open with query pre-filled)

### Analytics

- Track search queries to understand user intent
- Monitor failed searches to identify missing content
- Measure keyboard shortcut usage

## Success Criteria

- ✅ URL bar displays current path accurately
- ✅ Segment navigation works correctly
- ✅ Search activates via click and keyboard shortcuts
- ✅ Results filter in real-time as user types
- ✅ Keyboard navigation through results works
- ✅ Mobile bottom sheet provides equivalent functionality
- ✅ Accessible to screen readers
- ✅ Performance: Search feels instant (<100ms)
- ✅ Bundle size: <15KB total

## Timeline Estimate

- Component setup: 2-3 hours
- Search logic + filtering: 2 hours
- Mobile bottom sheet: 2 hours
- Styling + polish: 2-3 hours
- Accessibility + testing: 2 hours

**Total:** ~10-12 hours for complete implementation

---

**Next Steps:** Create implementation plan with detailed tasks and code examples.
