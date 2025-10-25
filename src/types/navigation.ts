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
