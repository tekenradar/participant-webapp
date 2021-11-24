import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { fullWidthTeaserImageRow } from "../../../common/teaserImageRow";
import { generateRowFromItems } from "../../../common/utils";


const tekenInfoSection: PageRow = {
  key: 'tekenInfoRow',
  className: "gy-3",
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
              leadItems: [
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
                },
              ],
              panelRows: [
                generateRowFromItems('row1', [
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'waarLevenTeken',
                    className: 'h-100',
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/waar-leven-teken'
                      },
                    }
                  },
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'hetGedrag',
                    className: 'h-100',
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/het-gedrag-van-de-teek'
                      },
                    }
                  }
                ]),
                generateRowFromItems('row2', [
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'wanneerActief',
                    className: "h-100",
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/wanneer-zijn-teken-actief'
                      },
                    }
                  },
                  {
                    colClassName: 'col-12 col-md-6',
                    className: "h-100",
                    itemKey: 'hoeveelBesmet',
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/hoeveel-teken-zijn-besmet'
                      },
                    }
                  },
                ]),
                generateRowFromItems('row3', [
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'tekenbeetVoorkomen',
                    className: "h-100",
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/hoe-kan-ik-een-tekenbeet-voorkomen'
                      },
                    }
                  },
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'hyalomma',
                    className: "h-100",
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/hyalomma-teek'
                      },
                    }
                  },
                ]),
              ]
            }
          }
        },
      ]
    }]
};


const tekenbeetInfoSection: PageRow = {
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
}

const tekenweetjesSection: PageRow = {
  key: 'row1',
  columns: [
    {
      key: 'col3_1',
      className: 'col my-3',
      items: [
        {
          itemKey: 'tekenweetjesSection',
          config: {
            type: 'extension',
            config: {
              type: 'pageSection',
              leadColClassName: 'col-12',
              leadItems: [{
                itemKey: 'tekenweetjes',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/tekenweentjes'
                  },
                }
              }],
              panelRows: []
            }
          }
        },
      ]
    }
  ]
}

export const tekenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/teken',
    rows: [
      fullWidthTeaserImageRow('teaserImage', {
        type: 'teaserImage',
        image: {
          url: '/images/no-license/tekenCard.jpg',
          backgroundPosition: '70% 35%',
          height: 367,
        },
      }),
      tekenInfoSection,
      tekenbeetInfoSection,
      tekenweetjesSection,
    ]
  }
}
