import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const homePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'home',
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
                  label: 'map',
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
                itemKey: '3',
                config: {
                  type: 'placeholder',
                  label: 'Latest Niuews',
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
            className: 'col-xs-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: '4',
                config: {
                  type: 'placeholder',
                  label: 'Informatie over onze onderzoek',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col3_2',
            className: 'col-xs-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: '5',
                config: {
                  type: 'placeholder',
                  label: 'Informatie over Teken',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col3_3',
            className: 'col-xs-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: '6',
                config: {
                  type: 'placeholder',
                  label: 'Informatie over Ziekte van Lyme',
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
            className: 'col-xs-12 col-lg-4 my-3',
            items: [
              {
                itemKey: '7',
                config: {
                  type: 'placeholder',
                  label: 'Veelgestelde Vragen',
                  height: 600
                }
              }
            ]
          },

        ]
      }
    ]
  }
}
