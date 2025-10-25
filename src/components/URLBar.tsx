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
