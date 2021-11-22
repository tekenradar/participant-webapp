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
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: 'LinklistTekenradar',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'doelenTekenradar',
                      type: 'internal',
                      value: '/informatie/doelen-tekenradar'
                    },
                  ]
                }
              },
            ]
          },
        ]
      },
      {
        key: 'row2',
        columns: [
          {
            key: 'col2_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: 'LinklistPartners',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'wageningen',
                      type: 'internal',
                      value: '/informatie/wageningen-university'
                    },
                    {
                      linkKey: 'rivm',
                      type: 'internal',
                      value: '/informatie/rivm'
                    },
                    {
                      linkKey: 'natuurkalender',
                      type: 'internal',
                      value: '/informatie/natuurkalender'
                    },
                    {
                      linkKey: 'natuurbericht',
                      type: 'internal',
                      value: '/informatie/natuurbericht'
                    },
                  ]
                }
              },
            ]
          },
        ]
      },
      {
        key: 'row3',
        columns: [
          {
            key: 'col3_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: 'LinklistFinanciers',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'zonMw',
                      type: 'internal',
                      value: '/informatie/zonMw'
                    },
                    {
                      linkKey: 'vws',
                      type: 'internal',
                      value: '/informatie/ministerie-van-vws'
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
