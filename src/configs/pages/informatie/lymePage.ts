import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const lymePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/lyme',
    rows: [
      {
        key: 'row1',
        className: 'py-4',
        columns: [
          {
            key: 'col1_1',
            className: 'col',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'Informatie Ziekte van Lyme',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row2',
        className: 'py-4',
        columns: [
          {
            key: 'col2_1',
            className: 'col',
            items: [
              {
                itemKey: '2',
                config: {
                  type: 'placeholder',
                  label: 'Erythema migrans',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row3',
        className: 'py-4',
        columns: [
          {
            key: 'col3_1',
            className: 'col',
            items: [
              {
                itemKey: '3',
                config: {
                  type: 'placeholder',
                  label: 'Lyme in Nederland',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row4',
        className: 'py-4',
        columns: [
          {
            key: 'col4_1',
            className: 'col',
            items: [
              {
                itemKey: '4',
                config: {
                  type: 'placeholder',
                  label: 'Andere ziekten door teken en co-infecties',
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
