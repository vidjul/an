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
