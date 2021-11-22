import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const onderzoekPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'onderzoek',
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: 'LinklistTekenradar',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'tekenverwachting',
                      type: 'internal',
                      value: '/onderzoek/tekenverwachting'
                    },
                    {
                      linkKey: 'pandora',
                      type: 'internal',
                      value: '/onderzoek/pandora'
                    },
                    {
                      linkKey: 'resultaten',
                      type: 'internal',
                      value: '/onderzoek/resultaten'
                    },
                  ]
                }
              },
            ]
          },
        ]
      },

    ]
  }
}
