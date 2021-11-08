import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const tekenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/teken',
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
                  label: 'Informatie Teken',
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
                  label: 'Informatie Tekenbeet',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row1',
        columns: [
          {
            key: 'col3_1',
            className: 'col my-3',
            items: [
              {
                itemKey: '3',
                config: {
                  type: 'placeholder',
                  label: 'Tekenweetjes',
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
