import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import ResultsDropdown from "./ResultsDropdown";
import MobileSheet from "./MobileSheet";
import type { URLBarProps } from "../types/navigation";
import { navigate } from "astro:transitions/client";

export default function URLBar({ routes, currentPath }: URLBarProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [editingDepth, setEditingDepth] = useState<number | null>(null); // Track which level we're editing
  const [virtualPath, setVirtualPath] = useState<string[]>([]); // Track virtual path when drilling down
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse path into segments
  const segments = currentPath.split("/").filter(Boolean);
  const pathSegments = segments.slice(1); // Remove 'an' from segments

  // Determine the active path level we're navigating from
  const activePathSegments = useMemo(() => {
    if (editingDepth === null) return pathSegments;

    // If we have a virtual path (drilling down beyond current), use it
    if (virtualPath.length > 0) {
      return virtualPath;
    }

    return pathSegments.slice(0, editingDepth);
  }, [pathSegments, editingDepth, virtualPath]);

  // Get context-aware available routes based on active path and editing depth
  const contextRoutes = useMemo(() => {
    // When editing depth is set, we might be drilling down beyond current path
    const effectiveDepth =
      editingDepth !== null ? editingDepth : activePathSegments.length;

    // At root (/an) or editing at depth 0 - show only top-level pages
    if (effectiveDepth === 0) {
      return routes.filter((route) => route.type === "page");
    }

    // At /an/posts or editing at depth 1 with "posts" - show only posts
    if (effectiveDepth === 1) {
      // Check if we're in the posts context
      const firstSegment =
        activePathSegments[0] || (editingDepth === 1 ? "posts" : null);
      if (firstSegment === "posts") {
        return routes.filter((route) => route.type === "post");
      }
    }

    // At /an/about or specific post - no sub-navigation
    return [];
  }, [routes, activePathSegments, editingDepth]);

  // Filter results based on query within current context
  const filteredResults = useMemo(() => {
    // When query is empty, show all context-appropriate routes
    if (!query) return contextRoutes;

    const lowerQuery = query.toLowerCase();
    return contextRoutes.filter((route) => {
      return (
        route.label.toLowerCase().includes(lowerQuery) ||
        route.path.toLowerCase().includes(lowerQuery) ||
        route.searchTerms.some((term) =>
          term.toLowerCase().includes(lowerQuery),
        )
      );
    });
  }, [query, contextRoutes]);

  // Calculate inline suggestion (auto-complete preview)
  const inlineSuggestion = useMemo(() => {
    if (!query || filteredResults.length === 0) return "";

    const firstResult = filteredResults[0];
    const segments = firstResult.displayPath.split("/").filter(Boolean);
    const lastSegment =
      segments[segments.length - 1] ||
      firstResult.label.toLowerCase().replace(/\s+/g, "-");

    // Only show suggestion if it starts with the query
    if (lastSegment.toLowerCase().startsWith(query.toLowerCase())) {
      return lastSegment.slice(query.length);
    }
    return "";
  }, [query, filteredResults]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K or /
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && document.activeElement?.tagName !== "INPUT")
      ) {
        e.preventDefault();
        if (window.innerWidth >= 768) {
          inputRef.current?.focus();
        } else {
          setIsMobileSheetOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to blur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        inputRef.current?.blur();
        setQuery("");
        setEditingDepth(null);
        setVirtualPath([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigateResults = useCallback(
    (direction: "up" | "down") => {
      setSelectedIndex((prev) => {
        if (direction === "down") {
          return prev < filteredResults.length - 1 ? prev + 1 : prev;
        } else {
          return prev > 0 ? prev - 1 : prev;
        }
      });
    },
    [filteredResults.length],
  );

  const handleSelectResult = useCallback(() => {
    if (filteredResults.length > 0 && selectedIndex >= 0) {
      const selectedRoute = filteredResults[selectedIndex];
      // Find the actual anchor element and click it to use Astro's router
      const anchor = document.querySelector(
        `[data-result-index="${selectedIndex}"]`,
      ) as HTMLAnchorElement;
      if (anchor) {
        anchor.click();
      }
    }
  }, [filteredResults, selectedIndex]);

  const handleNavigate = useCallback((path: string) => {
    setQuery("");
    setIsInputFocused(false);
    // For mobile sheet - just navigate normally
    window.location.href = path;
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.blur();
      setQuery("");
      setEditingDepth(null);
      setVirtualPath([]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleNavigateResults("down");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      handleNavigateResults("up");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query && filteredResults.length > 0) {
        handleSelectResult();
      }
    } else if (e.key === "/" && query !== "") {
      e.preventDefault();
      // If query matches a page that has subroutes (like "posts"), drill down
      const matchedRoute = filteredResults.find(
        (route) =>
          route.label.toLowerCase() === query.toLowerCase() ||
          route.displayPath.split("/").pop()?.toLowerCase() ===
            query.toLowerCase(),
      );

      if (matchedRoute && matchedRoute.label.toLowerCase() === "posts") {
        // Add "posts" to virtual path
        setVirtualPath([...activePathSegments, "posts"]);
        setEditingDepth((activePathSegments.length || 0) + 1);
        setQuery("");
        setSelectedIndex(0);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // If there's an inline suggestion, accept it
      if (inlineSuggestion) {
        setQuery(query + inlineSuggestion);
      } else if (filteredResults.length > 0) {
        // If query matches first result exactly, check if it has subroutes
        const firstResult = filteredResults[0];
        const segments = firstResult.displayPath.split("/").filter(Boolean);
        const lastSegment =
          segments[segments.length - 1] ||
          firstResult.label.toLowerCase().replace(/\s+/g, "-");

        if (query.toLowerCase() === lastSegment.toLowerCase()) {
          // If it's "posts", drill down into it
          if (firstResult.label.toLowerCase() === "posts") {
            setVirtualPath([...activePathSegments, "posts"]);
            setEditingDepth((activePathSegments.length || 0) + 1);
            setQuery("");
            setSelectedIndex(0);
          } else {
            // Otherwise navigate to the result
            const anchor = document.querySelector(
              `[data-result-index="0"]`,
            ) as HTMLAnchorElement;
            if (anchor) {
              anchor.click();
            }
          }
        } else {
          // Complete to the first result
          setQuery(lastSegment);
          setSelectedIndex(0);
        }
      }
    } else if (e.key === "Backspace" && query === "") {
      e.preventDefault();
      // Remove last path segment and show results from parent context
      if (virtualPath.length > 0) {
        // Remove from virtual path
        const newVirtualPath = virtualPath.slice(0, -1);
        setVirtualPath(newVirtualPath);
        setEditingDepth(newVirtualPath.length);
        setQuery("");
      } else if (editingDepth === null) {
        // First backspace - start editing from parent level
        if (pathSegments.length > 0) {
          setEditingDepth(pathSegments.length - 1);
          setQuery("");
        }
      } else if (editingDepth > 0) {
        // Continue going up the tree
        setEditingDepth(editingDepth - 1);
        setQuery("");
      }
      // If editingDepth is 0, we're at root - can't go further
    }
  };

  const handleInputClick = () => {
    inputRef.current?.focus();
  };

  // Show dropdown when focused and there are results to show
  const showDropdown = isInputFocused && filteredResults.length > 0;

  // Context-aware placeholder
  const placeholder = useMemo(() => {
    if (activePathSegments.length === 0) return "about, posts...";
    if (activePathSegments[0] === "posts" && activePathSegments.length === 1)
      return "search posts...";
    return "...";
  }, [activePathSegments]);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="relative" ref={containerRef}>
          <div
            className={`group relative flex flex-wrap items-baseline gap-1 transition-all ${
              isInputFocused ? "opacity-100" : "opacity-100"
            }`}
            onClick={handleInputClick}
          >
            {/* Domain */}
            <span>vidu.sh</span>

            {/* Base path /an - clickable home link */}
            <span className="font-normal text-gray-300">/</span>
            <a
              href="/an"
              className="text-blue-300 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              an
            </a>

            {/* Path segments - only show up to editing depth when editing */}
            {(editingDepth !== null ? activePathSegments : pathSegments).map(
              (segment, index) => {
                // Check if this segment is virtual (beyond actual path)
                const isVirtual = index >= pathSegments.length;
                const isLast =
                  index ===
                  (editingDepth !== null ? activePathSegments : pathSegments)
                    .length -
                    1;
                const segmentPath = isVirtual
                  ? "#"
                  : `/an/${pathSegments.slice(0, index + 1).join("/")}`;

                return (
                  <React.Fragment key={index}>
                    <span className="font-normal text-gray-300">/</span>
                    {isVirtual ? (
                      <span className="text-blue-300">{segment}</span>
                    ) : isLast && !isInputFocused ? (
                      <span>{segment}</span>
                    ) : (
                      <a
                        href={segmentPath}
                        className="text-blue-300 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {segment}
                      </a>
                    )}
                  </React.Fragment>
                );
              },
            )}

            {/* Always show trailing slash for visual consistency */}
            {contextRoutes.length > 0 && (
              <span className="font-normal text-gray-300">/</span>
            )}
            <div
              className={`relative inline-flex items-baseline ${
                isInputFocused || query ? "" : "sr-only"
              }`}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  // Delay blur to allow click events on dropdown to fire first
                  setTimeout(() => {
                    setIsInputFocused(false);
                    setEditingDepth(null);
                    setQuery("");
                    setVirtualPath([]);
                  }, 200);
                }}
                placeholder={placeholder}
                className="w-64 border-none bg-transparent outline-none placeholder:text-gray-400"
                style={{
                  minWidth: query
                    ? `${Math.max(query.length * 0.6, 8)}rem`
                    : undefined,
                }}
                aria-label="Search pages and posts"
                autoComplete="off"
              />
              {/* Inline suggestion (greyed out preview) */}
              {inlineSuggestion && (
                <span className="pointer-events-none text-gray-300">
                  {inlineSuggestion}
                </span>
              )}
              {query && (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                  tabIndex={-1}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <ResultsDropdown
              results={filteredResults}
              selectedIndex={selectedIndex}
              onSelectIndex={setSelectedIndex}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileSheetOpen(true)}
          className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm transition-colors hover:border-gray-400"
          aria-label="Open navigation search"
        >
          <span className="font-medium text-gray-900">
            {currentPath.split("/").filter(Boolean).slice(-1)[0] || "Home"}
          </span>
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        <MobileSheet
          isOpen={isMobileSheetOpen}
          onClose={() => setIsMobileSheetOpen(false)}
          currentPath={currentPath}
          routes={routes}
        />
      </div>
    </>
  );
}
