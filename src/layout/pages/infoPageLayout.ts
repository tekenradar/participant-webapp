import { HelmetPageConfig, PageConfig, PageItem, PageRow, TeaserImageConfig } from "case-web-app-core/build/types/pagesConfig"
import { pageRowToPageItem } from "../utils";

/**
 * To generate a layout used for the info pages
 * @param path url where this page will be available
 * @param pageKey unique key for the page, also used to find translastion file (pageKey.json and pageKey.md)
 * @returns
 */
export const infoPageLayout = (props: {
  path: string;
  pageKey: string;
  topImage?: TeaserImageConfig;
  mainColOptionalContent?: PageItem[];
  sideBarItems: PageItem[];
  bottomRows: PageRow[];
  helmet?: HelmetPageConfig;
}): PageConfig => {

  const rows: PageRow[] = [];

  if (props.topImage) {
    rows.push({
      key: 'topImage',
      fullWidth: true,
      columns: [{
        key: 'col',
        className: 'w-100 p-0',
        items: [{
          itemKey: 'topImage',
          config: props.topImage
        }]
      }]
    })
  }
  rows.push({
    key: 'mainRow',
    columns: [
      {
        key: 'content',
        className: 'col-12 col-lg-8 mt-3',
        items: [
          {
            itemKey: '1',
            config: {
              type: 'markdown',
              markdownUrl: `${props.pageKey}.md`,
            }
          },
          ...(props.mainColOptionalContent ? props.mainColOptionalContent : [])
        ]
      },
      {
        key: 'aux',
        className: 'col-12 col-lg-4 mt-3',
        items: props.sideBarItems
      }
    ]
  })

  const referencesRow: PageRow = {
    key: 'bottomRow',
    columns: [
      {
        key: 'bottomRow',
        className: 'col-12 col-lg-8',
        items: [{
          itemKey: '1',
          config: {
            type: 'container',
            items: props.bottomRows.map(row => pageRowToPageItem(row))
          }
        }]
      },
    ]
  };
  rows.push(referencesRow)


  return {
    path: props.path,
    pageKey: props.pageKey,
    helmet: props.helmet,
    rows: rows,
  }
}
