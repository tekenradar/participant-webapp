import { PageItem } from "case-web-app-core/build/types/pagesConfig";

export interface GenericPageItemProps {
  pageKey: string;
  itemKey: string;
  className?: string;
  renderGenericItemFunc: (item: PageItem) => React.ReactElement | null;
  onNavigate: (url: string) => void;
}
