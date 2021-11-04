import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const tekenradarPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/tekenradar',
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
                  label: 'Informatie Tekenradar.nl',
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
                  label: 'Uitleg tekenverwachting',
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
                  label: 'LymeProspect en Pandora onderzoek',
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
                  label: 'Clijfers en onderzoeksresultaten',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row5',
        className: 'py-4',
        columns: [
          {
            key: 'col5_1',
            className: 'col',
            items: [
              {
                itemKey: '5',
                config: {
                  type: 'placeholder',
                  label: 'Partners',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row6',
        className: 'py-4',
        columns: [
          {
            key: 'col6_1',
            className: 'col',
            items: [
              {
                itemKey: '6',
                config: {
                  type: 'placeholder',
                  label: 'Financiers',
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
