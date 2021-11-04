import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const homePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'home',
    rows: [
      {
        key: 'row1',
        className: 'py-4',
        columns: [
          {
            key: 'col1_1',
            className: 'col-xs-12 col-md-8 mb-3',
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
            className: 'col-xs-12 col-md-4',
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
        className: 'py-4',
        columns: [
          {
            key: 'col2_1',
            className: 'col-xs-12 col-md-4 mb-3',
            items: [
              {
                itemKey: '3',
                config: {
                  type: 'placeholder',
                  label: 'Informatie over Teken',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col2_2',
            className: 'col-xs-12 col-md-4 mb-3',
            items: [
              {
                itemKey: '4',
                config: {
                  type: 'placeholder',
                  label: 'Informatie over Ziekte van Lyme',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col2_3',
            className: 'col-xs-12 col-md-4 mb-3',
            items: [
              {
                itemKey: '5',
                config: {
                  type: 'placeholder',
                  label: 'Informatie over Tekenradar.nl',
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
                itemKey: '6',
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
        key: 'row4',
        className: 'py-4',
        columns: [
          {
            key: 'col4_1',
            className: 'col-xs-12 col-md-4 mb-3',
            items: [
              {
                itemKey: '7',
                config: {
                  type: 'placeholder',
                  label: 'nou registreren',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col4_2',
            className: 'col-xs-12 col-md-4 mb-3',
            items: [
              {
                itemKey: '8',
                config: {
                  type: 'placeholder',
                  label: 'Veelgestelde vragen',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col4_3',
            className: 'col',
            items: [
              {
                itemKey: '9',
                config: {
                  type: 'placeholder',
                  label: 'Nieuwsbrief',
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
