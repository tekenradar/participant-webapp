import { PageConfig, PageItem, PageRow, TeaserImageConfig } from "case-web-app-core/build/types/pagesConfig"

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
  sideBarItems: PageItem[];
  bottomItems: PageItem[];
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
        items: [{
          itemKey: '1',
          config: {
            type: 'markdown',
            markdownUrl: `${props.pageKey}.md`,

          }
        }]
      },
      {
        key: 'aux',
        className: 'col-12 col-lg-4 mt-3',
        items: props.sideBarItems
      }
    ]
  })
  rows.push({
    key: 'referenceRow',
    columns: props.bottomItems.map((item, index) => {
      return {
        key: index.toFixed(),
        className: 'col-12 col-md-6 col-lg-2 my-3',
        items: [item]
      }
    }),
  });

  return {
    path: props.path,
    pageKey: props.pageKey,
    rows: rows,
  }
}
