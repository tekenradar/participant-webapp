import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { fullWidthTeaserImageRow } from "../../../common/teaserImageRow";
import { generateRowFromItems } from "../../../common/utils";


const tekenInfoSection: PageRow = {
  key: 'tekenInfoRow',
  rowClassNameOverride: "row gy-3",
  containerClassName: 'mt-3',
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
  key: 'tekenbeetInfoRow',
  rowClassNameOverride: "row gy-3",
  containerClassName: 'mt-3',
  columns: [
    {
      key: 'col1_1',
      className: 'col mt-3',
      items: [
        {
          itemKey: 'tekenbeetInfo',
          config: {
            type: 'extension',
            config: {
              type: 'pageSection',
              leadItems: [
                {
                  itemKey: 'basiskennisTekenbeet',
                  className: 'h-100',
                  config: {
                    type: 'actionCard',
                    image: {
                      url: '/images/teekverwijderen.jpeg',
                      minHeight: '200px',
                      maxHeight: '350px',
                      placement: 'top',
                    },
                    action: {
                      type: 'navigate',
                      value: '/informatie/basiskennis-tekenbeet'
                    },
                  }
                },
              ],
              panelRows: [
                generateRowFromItems('row1', [
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'controleerTekenbeten',
                    className: 'h-100',
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/hoe-controleer-ik-op-tekenbeten'
                      },
                    }
                  },
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'watMoetIkDoen',
                    className: 'h-100',
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/wat-moet-ik-doen-bij-een-tekenbeet'
                      },
                    }
                  },
                ]),
                generateRowFromItems('row2', [
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'hoeVerwijder',
                    className: 'h-100',
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/hoe-verwijder-ik-een-teek'
                      },
                    }
                  },
                  {
                    colClassName: 'col-12 col-md-6',
                    itemKey: 'hoeGroot',
                    className: 'h-100',
                    config: {
                      type: 'actionCard',
                      action: {
                        type: 'navigate',
                        value: '/informatie/hoe-groot-is-de-kans-op-besmetting-na-een-tekenbeet'
                      },
                    }
                  },
                ]),

              ]
            }
          }
        }]
    }]
}

const tekenweetjesSection: PageRow = {
  key: 'row1',
  columns: [
    {
      key: 'col3_1',
      className: 'col my-3',
      items: [
        {
          itemKey: 'tekenweetjes',
          config: {
            type: 'extension',
            config: {
              type: 'pageSection',
              leadColClassName: 'col-12',
              leadItems: [{
                itemKey: 'tekenweetjes.card',
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
