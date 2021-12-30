import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const meldenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'meldenPage',
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 my-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'extension',
                  config: {
                    type: 'surveyComponent',
                    studyKey: 'default',
                    defaultSurveyKey: 'PDiff',
                    urls: {
                      finishedFlowWithoutLogin: '/home'
                    }
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
