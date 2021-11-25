import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const onderzoekPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'onderzoek/overzicht',
    rows: [
      {
        key: 'row0',
        // className: 'min-vh-60',
        columns: [
          {
            key: 'col1_1',
            className: 'col-12 mt-3',
            items: [
              {
                itemKey: 'onderzoekLinks',
                config: {
                  type: 'extension',
                  config: {
                    type: 'pageSection',
                    leadItems: [],
                    panelRows: []
                  }
                }
              }
            ]
          }]
      },
      {
        key: 'row1',
        columns: [
          {
            key: 'col1',
            className: 'col-12 col-md-8 col-lg-6',
            items: [
              {
                itemKey: 'overviewCard',

                config: {
                  type: 'actionCard',
                }
              },
            ]
          },
        ]
      },
      {
        key: 'row2',
        className: 'pb-4',
        columns: [
          {
            key: 'col2',
            className: 'col-12 col-md-6 pt-2',
            items: [
              {
                itemKey: 'tekenverwachting',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/onderzoek/tekenverwachting'
                  },
                  image: {
                    url: '/images/no-license/waar-leven-teken.jpg',
                    height: '150px',
                    placement: 'top'
                  }
                }
              },
            ]
          },
          {
            key: 'col2',
            className: 'col-12 col-md-6',
            items: [
              {
                itemKey: 'pandora',
                className: 'mt-2',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/onderzoek/pandora'
                  },
                }
              },
              {
                itemKey: 'resultaten',
                className: 'mt-2',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/onderzoek/resultaten'
                  },
                  image: {
                    url: '/images/tekenbeeten-km.png',
                    width: '150px',
                    maxWidth: '180px',
                    placement: 'left'
                  }
                }
              },
            ]
          }
        ]
      }
    ]
  }
}
