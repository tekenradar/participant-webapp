import { PageItem, PageRow } from "case-web-app-core/build/types/pagesConfig";

interface PageItemWithCol extends PageItem {
  colClassName: string;
}

/**
 * Method to generate a simple pageRow with columns wrapping each item individually.
 * @param rowKey
 * @param items
 * @returns
 */
export const generateRowFromItems = (
  rowKey: string,
  items: Array<PageItemWithCol>): PageRow => {
  const cols = items.map((item, index) => {
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
    key: rowKey,
    columns: [
      ...cols,
    ]
  }
}
