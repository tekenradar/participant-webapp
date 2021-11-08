import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const tekenradarPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/tekenradar',
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col mt-3',
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
        columns: [
          {
            key: 'col2_1',
            className: 'col mt-3',
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
        columns: [
          {
            key: 'col3_1',
            className: 'col mt-3',
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
        columns: [
          {
            key: 'col4_1',
            className: 'col mt-3',
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
        columns: [
          {
            key: 'col5_1',
            className: 'col my-3',
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
        columns: [
          {
            key: 'col6_1',
            className: 'col my-3',
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
