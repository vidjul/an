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
