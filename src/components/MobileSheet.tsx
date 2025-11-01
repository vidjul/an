import React, { useEffect, useRef, useState } from "react";
import type { Route } from "../types/navigation";

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  routes: Route[];
}

export default function MobileSheet({
  isOpen,
  onClose,
  currentPath,
  routes,
}: MobileSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentContext, setCurrentContext] = useState<string[]>([]);

  // Parse current path
  const pathSegments = currentPath.split("/").filter(Boolean).slice(1); // Remove 'an'

  // Determine what routes to show based on context
  const contextPath =
    currentContext.length > 0 ? currentContext : pathSegments.slice(0, -1);

  const availableRoutes = React.useMemo(() => {
    if (contextPath.length === 0) {
      // At root - show pages
      return routes.filter((route) => route.type === "page");
    }

    if (contextPath.length === 1 && contextPath[0] === "posts") {
      // In posts - show all posts
      return routes.filter((route) => route.type === "post");
    }

    return [];
  }, [routes, contextPath]);

  // Filter by search query
  const filteredRoutes = React.useMemo(() => {
    if (!searchQuery) return availableRoutes;

    const lowerQuery = searchQuery.toLowerCase();
    return availableRoutes.filter(
      (route) =>
        route.label.toLowerCase().includes(lowerQuery) ||
        route.path.toLowerCase().includes(lowerQuery) ||
        route.searchTerms.some((term) =>
          term.toLowerCase().includes(lowerQuery),
        ),
    );
  }, [availableRoutes, searchQuery]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setCurrentContext([]);
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
        className="animate-slide-up fixed right-0 bottom-0 left-0 max-h-[80vh] overflow-hidden rounded-t-2xl bg-white shadow-2xl"
      >
        {/* Drag indicator */}
        <div className="flex justify-center py-3">
          <div className="h-1 w-12 rounded-full bg-gray-300" />
        </div>

        {/* Header with inline search */}
        <div className="border-b border-gray-200 px-4 py-4">
          <div className="font-display flex items-center gap-1 text-lg">
            <span>vidu.sh</span>
            <span className="font-normal text-gray-300">/</span>
            <a href="/an" className="text-blue-300">
              an
            </a>
            {contextPath.map((segment, i) => (
              <React.Fragment key={i}>
                <span className="font-normal text-gray-300">/</span>
                <span>{segment}</span>
              </React.Fragment>
            ))}
            <span className="font-normal text-gray-300">/</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="..."
              className="min-w-0 flex-1 border-none bg-transparent text-gray-400 outline-none placeholder:text-gray-300"
              autoFocus
            />
          </div>
        </div>

        {/* Breadcrumb path */}
        <div className="border-b border-gray-200 px-4 pb-3">
          <div className="flex items-center gap-1 text-sm">
            <a href="/an" className="text-gray-600 hover:text-gray-900">
              an
            </a>
            {contextPath.map((segment, i) => (
              <React.Fragment key={i}>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-900">{segment}</span>
              </React.Fragment>
            ))}
            {contextPath.length === 0 && (
              <span className="ml-2 text-xs text-gray-400">
                Choose a section
              </span>
            )}
          </div>
        </div>

        {/* Search input */}
        <div className="border-b border-gray-200 p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              contextPath.length === 0 ? "Search pages..." : "Search posts..."
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="max-h-[55vh] overflow-y-auto">
          {filteredRoutes.map((route, index) => {
            const isPage = route.type === "page";
            const canDrillDown =
              isPage && route.label.toLowerCase() === "posts";

            return (
              <div
                key={route.path}
                className="border-b border-gray-100 last:border-0"
              >
                <a
                  href={canDrillDown ? "#" : route.path}
                  onClick={(e) => {
                    if (canDrillDown) {
                      e.preventDefault();
                      setCurrentContext(["posts"]);
                      setSearchQuery("");
                    } else {
                      onClose();
                    }
                  }}
                  className="block px-4 py-3 transition-colors hover:bg-gray-50 active:bg-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {route.label}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        {route.displayPath}
                      </div>
                    </div>
                    {canDrillDown && (
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </div>
                </a>
              </div>
            );
          })}

          {filteredRoutes.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-500">
              {searchQuery ? "No results found" : "No items available"}
            </div>
          )}

          {/* Back button when in context */}
          {currentContext.length > 0 && (
            <button
              onClick={() => setCurrentContext([])}
              className="w-full border-t border-gray-200 px-4 py-3 text-left text-sm font-medium text-blue-600 hover:bg-blue-50 active:bg-blue-100"
            >
              ← Back to main menu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
