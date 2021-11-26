import { PageItem, PageRow } from "case-web-app-core/build/types/pagesConfig";

export const pageRowToPageItem = (rowDef: PageRow): PageItem => {
  return {
    itemKey: rowDef.key,
    className: rowDef.rowClassNameOverride ? rowDef.rowClassNameOverride : 'row',
    config: {
      type: 'container',
      items: rowDef.columns.map((column, index) => {
        return {
          itemKey: column.key ? column.key : index.toFixed(),
          className: column.className,
          config: {
            type: 'container',
            items: column.items
          }
        }
      })
    }
  }
}
