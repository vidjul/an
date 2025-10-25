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
