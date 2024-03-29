import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const meldenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'meldenPage',
    helmet: {
      override: 'global',
    },
    rows: [
      {
        key: 'row1',
        containerClassName: 'min-vh-75',
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
                    studyKey: 'tekenradar',
                    defaultSurveyKey: 'PDiff',
                    urls: {
                      finishedFlowWithoutLogin: '/home',
                      finishedFlowWithLogin: '/my-tekenradar'
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
