import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { generateRowFromItems } from "../common/utils"

export const homePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'home',
    hideTitleBar: true,
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'meldenCardCol',
            className: 'col-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'reportButtonsCard',
                className: 'h-100',
                config: {
                  type: 'extension',
                  config: {
                    type: 'reportButtonCard',
                    buttons: [
                      { buttonKey: 'tekenBeet', action: { type: 'navigate', value: '/melden' } },
                      { buttonKey: 'rodeRing', action: { type: 'navigate', value: '/melden' } },
                      { buttonKey: 'lyme', action: { type: 'navigate', value: '/melden' } },
                      { buttonKey: 'koorts', action: { type: 'navigate', value: '/melden' } },
                    ]
                  }
                }
              }
            ]
          },
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'extension',
                  config: {
                    type: 'reportMap',
                    label: 'Map about tick reports'
                  }
                }
              }
            ]
          },


        ]
      },
      {
        key: 'row2',
        columns: [
          {
            key: 'col2_1',
            className: 'col-12 mt-4',
            items: [
              {
                itemKey: 'latestNews',
                config: {
                  type: 'extension',
                  config: {
                    type: 'pageSection',
                    // leadColClassName: 'col-12',
                    leadItems: [
                      {
                        itemKey: 'topNews',
                        className: 'h-100',
                        config: {
                          type: 'actionCard',
                          action: {
                            type: 'navigate',
                            value: '/onderzoek',
                          },
                          useFooterText: true,
                          image: {
                            url: '/images/no-license/onderzoekcard.jpg',
                            placement: 'top',
                            height: '250px',
                            maxHeight: '400px',
                          }
                        }
                      },
                    ],
                    panelRows: [
                      generateRowFromItems('row1', [
                        {
                          colClassName: 'col-12',
                          itemKey: 'topNews',
                          //className: 'mt-3',
                          config: {
                            type: 'actionCard',
                            action: {
                              type: 'navigate',
                              value: '/onderzoek',
                            },
                            useFooterText: true,
                            image: {
                              url: '/images/no-license/onderzoekcard.jpg',
                              placement: 'left',
                              width: '200px',
                              maxWidth: '200px',
                            }
                          }
                        },
                        {
                          colClassName: 'col-12',
                          itemKey: 'topNews',
                          //className: 'mt-3',
                          config: {
                            type: 'actionCard',
                            action: {
                              type: 'navigate',
                              value: '/onderzoek',
                            },
                            useFooterText: true,
                            image: {
                              url: '/images/tekenbeeten-km.png',
                              placement: 'left',
                              width: '200px',
                              maxWidth: '200px',
                            }
                          }
                        },
                        {
                          colClassName: 'col-12',
                          itemKey: 'openNews',
                          //className: 'mt-3',
                          config: {
                            type: 'actionCard',
                            action: {
                              type: 'navigate',
                              value: '/nieuws',
                            },
                          }
                        },
                      ]),
                    ]
                  }
                }
              },
            ]
          }
        ]
      },
      {
        key: 'row3',
        columns: [
          {
            key: 'onderzoekCardCol',
            className: 'col-12 mt-4',
            items: [{
              itemKey: 'aboutThisSite',
              config: {
                type: 'extension',
                config: {
                  type: 'pageSection',
                  leadItems: [],
                  panelRows: []
                }
              }
            },]
          },
          {
            key: 'onderzoekCardCol',
            className: 'col-12 col-lg-4',
            items: [
              {
                itemKey: 'onderzoekCard',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/onderzoek/overzicht',
                  },
                  image: {
                    url: '/images/no-license/onderzoekcard.jpg',
                    placement: 'top',
                    height: '200px',
                  }
                }
              }
            ]
          },
          {
            key: 'tekenCardCol',
            className: 'col-12 col-lg-4 mt-3 mt-lg-0',
            items: [
              {
                itemKey: 'tekenCard',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/teken',
                  },
                  image: {
                    url: '/images/no-license/tekencard.jpg',
                    placement: 'top',
                    height: '200px',
                  }
                }
              }
            ]
          },
          {
            key: 'lymeCardCol',
            className: 'col-12 col-lg-4 mt-3 mt-lg-0',
            items: [
              {
                itemKey: 'lymeCard',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/lyme',
                  },
                  image: {
                    url: '/images/no-license/lymecard.jpg',
                    placement: 'top',
                    height: '200px',
                  }
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row4',
        columns: [
          {
            key: 'faqCardCol',
            className: 'col-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'faqCard',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/faq',
                  },
                  image: {
                    url: '/images/no-license/faqcard.jpg',
                    placement: 'top',
                    height: '200px',
                  }
                }
              }
            ]
          },
          {
            key: 'aboutCardCol',
            className: 'col-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'aboutCard',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/tekenradar',
                  },
                  image: {
                    url: '/images/logo_tekenradar.png',
                    backgroundSize: 'contain',
                    placement: 'top',
                    height: '200px',
                  }
                }
              }
            ]
          },
        ]
      },
      {
        key: 'rowPartners',
        containerClassName: 'mb-3',
        columns: [
          {
            key: 'partnersCol',
            className: 'col-12 mt-3',
            items: [
              {
                itemKey: 'partners',
                config: {
                  type: 'extension',
                  config: {
                    type: 'partners',
                  }
                }
              }
            ]
          },
        ]
      },
    ]
  }
}
