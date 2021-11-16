import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const nieuwsPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'nieuws',
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col my-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'Nieuws',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row2',
        columns: [
          {
            key: 'col2_1',
            className: 'col-xs-12 col-lg-8 my-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'Nieuws',
                  height: 600
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
