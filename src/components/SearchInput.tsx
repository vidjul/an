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
