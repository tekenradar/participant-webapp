import { PageItem, PageRow } from "case-web-app-core/build/types/pagesConfig";


export const generatePageSectionItem = (props: {
  itemKey: string;
  className?: string;
  leadItems: PageItem[];
  panelRows: PageRow[];
  leadColClassName?: string;
}): PageItem => {
  return {
    itemKey: props.itemKey,
    className: props.className,
    config: {
      type: "extension",
      config: {
        type: "pageSection",
        ...props,
      }
    }
  }
}
