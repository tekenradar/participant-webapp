import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { LinkList } from "case-web-ui"

export const tekenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/teken',
    rows: [
      {
        key: "row0",
        fullWidth: true,
        className: 'p-0',
        columns: [
          {
            key: '1',
            items: [
              {
                itemKey: 'teaserImage',
                config: {
                  type: 'teaserImage',
                  image: {
                    url: '/images/no-license/tekenCard.jpg',
                    backgroundPosition: '70% 35%',
                    height: 367,
                  },
                },
              },
            ]
          }
        ]
      },
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col mt-3',
            items: [
              {
                itemKey: 'tekenInfo',
                config: {
                  type: 'extension',
                  config: {
                    type: 'pageSection',
                  }
                }
              },
            ]
          }]
      },
      {
        key: 'row1',
        columns: [
          {
            key: 'col1',
            className: 'col-12 col-lg-4',
            items: [
              {
                itemKey: 'basiskennisTeken',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/basiskennis-teken'
                  },
                }
              },]
          },
          {
            key: "col-2",
            className: 'col-12 col-lg-4',
            items: [
              {
                itemKey: 'waarLevenTeken',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/waar-leven-teken'
                  },
                }
              },
              {
                itemKey: 'hetGedrag',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/het-gedrag-van-de-teek'
                  },
                }
              },
              {
                itemKey: 'wanneerActief',
                className: "mt-2 flex-grow-1",
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/wanneer-zijn-teken-actief'
                  },
                }
              },
            ]
          },
          {
            key: "col-3",
            className: 'col-12 col-lg-4',
            items: [


              {
                itemKey: 'hoeveelBesmet',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/hoeveel-teken-zijn-besmet'
                  },
                }
              },
              {
                itemKey: 'tekenbeetVoorkomen',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/hoe-kan-ik-een-tekenbeet-voorkomen'
                  },
                }
              },
              {
                itemKey: 'hyalomma',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/hyalomma-teek'
                  },
                }
              },
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
                itemKey: 'LinklistTekenbeet',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisTekenbeet',
                      type: 'internal',
                      value: '/informatie/basiskennis-tekenbeet'
                    },
                    {
                      linkKey: 'controleerTekenbeten',
                      type: 'internal',
                      value: '/informatie/hoe-controleer-ik-op-tekenbeten'
                    },
                    {
                      linkKey: 'watMoetIkDoen',
                      type: 'internal',
                      value: '/informatie/wat-moet-ik-doen-bij-een-tekenbeet'
                    },
                    {
                      linkKey: 'hoeVerwijder',
                      type: 'internal',
                      value: '/informatie/hoe-verwijder-ik-een-teek'
                    },
                    {
                      linkKey: 'hoeGroot',
                      type: 'internal',
                      value: '/informatie/hoe-groot-is-de-kans-op-besmetting-na-een-tekenbeet'
                    }
                  ]
                }
              },
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
                itemKey: 'Extra',
                config: {
                  type: 'extension',
                  config: {
                    type: 'pageSection',
                  }
                }
              },
              {
                itemKey: 'tekenweetjes',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/tekenweentjes'
                  },
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
