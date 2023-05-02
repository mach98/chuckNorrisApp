export interface ISearchBar {
  search: string;
  onSearchChange: (search: string) => void;
  onSearchSubmit: () => void;
}
