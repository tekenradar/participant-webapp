import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const lymePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/lyme',
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'Links to Lyme, EM, in NL and andere Ziekten',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col1_2',
            className: 'col-xs-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: '2',
                config: {
                  type: 'placeholder',
                  label: 'Tekenbeet melden',
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
            className: 'col mt-3',
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
        key: 'row3',
        columns: [
          {
            key: 'col3_1',
            className: 'col mt-3',
            items: [
              {
                itemKey: '3',
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
        key: 'row4',
        columns: [
          {
            key: 'col4_1',
            className: 'col mt-3',
            items: [
              {
                itemKey: '4',
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
        key: 'row5',
        columns: [
          {
            key: 'col5_1',
            className: 'col my-3',
            items: [
              {
                itemKey: '5',
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
