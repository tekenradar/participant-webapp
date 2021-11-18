import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { LinkList } from "case-web-ui"

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
                itemKey: 'LinklistTekeninfo',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisTeken',
                      type: 'internal',
                      value: '/informatie/basiskennis-teken'
                    },
                    {
                      linkKey: 'waarLevenTeken',
                      type: 'internal',
                      value: '/informatie/waar-leven-teken'
                    },
                    {
                      linkKey: 'HetGedrag',
                      type: 'internal',
                      value: '/informatie/het-gedrag-van-de-teek'
                    },
                    {
                      linkKey: 'wanneerActief',
                      type: 'internal',
                      value: '/informatie/wanneer-zijn-teken-actief'
                    },
                    {
                      linkKey: 'hoeveelBesmet',
                      type: 'internal',
                      value: '/informatie/hoeveel-teken-zijn-besmet'
                    },
                    {
                      linkKey: 'tekenbeetVoorkomen',
                      type: 'internal',
                      value: '/informatie/hoe-kan-ik-een-tekenbeet-voorkomen'
                    },
                    {
                      linkKey: 'hyalomma',
                      type: 'internal',
                      value: '/informatie/hyalomma-teek'
                    }
                  ]
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
                itemKey: '3',
                config: {
                  type: 'placeholder',
                  label: 'Tekenweetjes',
                  height: 400
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
