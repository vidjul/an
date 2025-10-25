import React from 'react';

interface URLDisplayProps {
  currentPath: string;
  onActivateSearch: () => void;
}

export default function URLDisplay({ currentPath, onActivateSearch }: URLDisplayProps) {
  // Parse path into segments
  const segments = currentPath.split('/').filter(Boolean);

  // Build clickable segments (skip 'an' as it's the base)
  const pathSegments = segments.slice(1); // Remove 'an' from segments

  return (
    <h1
      className="group flex flex-wrap items-baseline gap-1 cursor-pointer transition-opacity hover:opacity-75"
      onClick={onActivateSearch}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivateSearch();
        }
      }}
      aria-label="Navigate or search pages"
    >
      {/* Domain (dimmed, not clickable) */}
      <span className="text-lg text-gray-500">vidu.sh</span>

      {/* Base path /an - clickable home link */}
      <span className="text-lg text-gray-400">/</span>
      <a
        href="/an"
        className="text-lg text-gray-900 hover:text-blue-600 transition-colors font-medium"
        onClick={(e) => e.stopPropagation()}
      >
        an
      </a>

      {/* Path segments - uniform text-lg sizing */}
      {pathSegments.map((segment, index) => {
        const segmentPath = `/an/${pathSegments.slice(0, index + 1).join('/')}`;

        return (
          <React.Fragment key={index}>
            <span className="text-lg text-gray-400">/</span>
            <a
              href={segmentPath}
              className="text-lg text-gray-900 hover:text-blue-600 transition-colors font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {segment}
            </a>
          </React.Fragment>
        );
      })}

      {/* Subtle search hint on hover */}
      <span className="ml-2 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        Press / to search
      </span>
    </h1>
  );
}
