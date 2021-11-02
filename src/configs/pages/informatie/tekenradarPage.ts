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
                  label: 'Informatie Tekenradar',
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
