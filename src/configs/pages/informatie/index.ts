import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { tekenPage } from "./tekenPage"

export const informatiePage = (path: string): PageConfig => {
  const infoPages = [
    tekenPage(`${path}/teken`),
    // TODO: add other info pages
  ];

  return {
    path: path,
    pageKey: 'informatie',
    hideTitleBar: true,
    rows: [
      {
        key: 'pageRow',
        fullWidth: true,
        className: 'p-0',
        columns: [
          {
            key: 'pageCol',
            className: '',
            items: [
              {
                itemKey: 'router',
                config: {
                  type: 'router',
                  pagesConfig: {
                    pages: infoPages
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
