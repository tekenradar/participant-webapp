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
            className: 'col my-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'extension',
                  config: {
                    type: 'surveyComponent',
                    studyKey: 'basic'
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
