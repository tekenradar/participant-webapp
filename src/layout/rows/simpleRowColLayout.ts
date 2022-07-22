import { PageItem, PageRow } from "case-web-app-core/build/types/pagesConfig";

export interface PageItemWithCol extends PageItem {
  colClassName: string;
}

/**
 * Method to generate a simple pageRow with columns wrapping each item individually.
 * @param rowKey
 * @param items
 * @returns
 */
export const simpleRowColLayout = (props: {
  rowKey: string,
  items: Array<PageItemWithCol>,
  rowClassNameOverride?: string,
  containerClassName?: string,
}): PageRow => {
  const cols = props.items.map((item, index) => {
    const currentCol = {
      key: 'col' + index.toFixed(),
      className: item.colClassName,
      items: [
        item
      ]
    };
    return currentCol;
  });
  return {
    key: props.rowKey,
    rowClassNameOverride: props.rowClassNameOverride,
    containerClassName: props.containerClassName,
    columns: [
      ...cols,
    ]
  }
}
