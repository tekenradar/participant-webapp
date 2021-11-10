import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const meldenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'melden',
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-4 my-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'Registreren',
                  height: 600
                }
              }
            ]
          },
          {
            key: 'col1_2',
            className: 'col-xs-12 col-lg-8 my-3',
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
      }
    ]
  }
}
