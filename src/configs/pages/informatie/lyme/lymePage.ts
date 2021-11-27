import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { leadColLayout } from "../../../../layout/rows/leadColLayout"
import { pageSection } from "../../../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../../../layout/rows/simpleRowColLayout"


const lymeInfoSection = (): PageRow => {
  const firstBlock = simpleRowColLayout({
    rowKey: 'lymeInfoRow1',
    rowClassNameOverride: 'row gy-2a ',
    items: [
      {
        colClassName: 'col-12 col-md-8',
        itemKey: 'basiskennisLyme',
        className: 'h-100',
        config: {
          type: 'actionCard',
          action: {
            type: 'navigate',
            value: '/informatie/basiskennis-lyme'
          },
        }
      },
      // --------------------
      {
        colClassName: 'col-12 col-md-4',
        itemKey: 'hoeKrijgJeLyme',
        className: 'h-100',
        config: {
          type: 'actionCard',
          image: {
            url: '/images/teekverwijderen.jpeg',
            minHeight: '200px',
            maxHeight: '150px',
            placement: 'top',
          },
          action: {
            type: 'navigate',
            value: '/informatie/hoe-krijg-je-de-ziekte-van-lyme'
          },
        },
      },
      // --------------------
      {
        colClassName: 'col-12 col-md-4',
        itemKey: 'lymeKind',
        className: 'h-100',
        config: {
          type: 'actionCard',
          image: {
            url: '/images/teekverwijderen.jpeg',
            minHeight: '200px',
            maxHeight: '150px',
            placement: 'top',
          },
          action: {
            type: 'navigate',
            value: '/informatie/hoe-herken-ik-een-tekenbeet-of-ziekte-van-lyme-bij-een-kind'
          },
        },
      },
      // --------------------
      {
        colClassName: 'col-12 col-md-4',
        itemKey: 'naEenTekenbeet',
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
            value: '/informatie/waar-moet-ik-op-letten-na-een-tekenbeet'
          },
        }
      },
      // --------------------
      {
        colClassName: 'col-12 col-md-4',
        itemKey: 'roodPlekje',
        className: 'h-100',
        config: {
          type: 'actionCard',
          action: {
            type: 'navigate',
            value: '/informatie/klein-rood-plekje-na-tekenbeet'
          },
        }
      },
    ],
  })

  const secondBlock = leadColLayout({
    rowKey: "lymeInfoRow2",
    containerClassName: "mt-0",
    leadItems: [
      {
        itemKey: 'wanneerHuisarts',
        className: 'h-100',
        config: {
          type: 'actionCard',
          action: {
            type: 'navigate',
            value: '/informatie/wanneer-moet-ik-naar-de-huisarts'
          },
        }
      },
    ],
    panelRows: [
      simpleRowColLayout({
        rowKey: 'lymeInfoRow2PanelRow',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'immuunsysteem',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/de-ziekte-van-lyme-en-het-immuunsysteem'
              },
            }
          },
          // --------------------
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'lymeZonderTekenbeet',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/lyme-zonder-tekenbeet',
              },
            }
          },
          // --------------------
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'antibiotica',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/welke-behandeling-of-antibiotica-worden-gegeven-bij-lyme',
              },
            }
          },
          // --------------------
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'risicoLyme',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/wie-loopt-extra-risico-op-lyme'
              },
            }
          },
        ]
      })
    ]
  });

  const thirdBlock = simpleRowColLayout({
    rowKey: 'lymeInfoRow3',
    rowClassNameOverride: 'row gy-2a ',
    containerClassName: 'mt-0',
    items: [
      {
        colClassName: 'col-12 col-md-4',
        itemKey: 'lymeVoorkomen',
        className: 'h-100',
        config: {
          type: 'actionCard',
          action: {
            type: 'navigate',
            value: '/informatie/basiskennis-lyme'
          },
        }
      },
      // --------------------
      {
        colClassName: 'col-12 col-md-4',
        itemKey: 'bloedonderzoek',
        className: 'h-100',
        config: {
          type: 'actionCard',
          action: {
            type: 'navigate',
            value: '/informatie/wanneer-wordt-bloedonderzoek-gedaan-voor-lyme'
          },
        }
      },
      // --------------------
      {
        colClassName: 'col-12 col-md-4',
        itemKey: 'aanvullendeInfo',
        className: 'h-100',
        config: {
          type: 'actionCard',
          action: {
            type: 'navigate',
            value: '/informatie/aanvullende-informatie'
          },
        }
      },
      // --------------------
    ]
  });

  return pageSection({
    sectionKey: 'lymeInfo',
    className: 'mt-3',
    rows: [
      firstBlock,
      secondBlock,
      thirdBlock,
    ]
  })
}


export const lymePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/lyme',
    rows: [
      lymeInfoSection(),
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: 'LinklistLymeinfo',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisLyme',
                      type: 'internal',
                      value: '/informatie/basiskennis-lyme'
                    },
                    {
                      linkKey: 'hoeKrijgJeLyme',
                      type: 'internal',
                      value: '/informatie/hoe-krijg-je-de-ziekte-van-lyme'
                    },
                    {
                      linkKey: 'lymeKind',
                      type: 'internal',
                      value: '/informatie/hoe-herken-ik-een-tekenbeet-of-ziekte-van-lyme-bij-een-kind'
                    },
                    {
                      linkKey: 'naEenTekenbeet',
                      type: 'internal',
                      value: '/informatie/waar-moet-ik-op-letten-na-een-tekenbeet'
                    },
                    {
                      linkKey: 'roodPlekje',
                      type: 'internal',
                      value: '/informatie/klein-rood-plekje-na-tekenbeet'
                    },
                    {
                      linkKey: 'wanneerHuisarts',
                      type: 'internal',
                      value: '/informatie/wanneer-moet-ik-naar-de-huisarts'
                    },
                    {
                      linkKey: 'immuunsysteem',
                      type: 'internal',
                      value: '/informatie/de-ziekte-van-lyme-en-het-immuunsysteem'
                    },
                    {
                      linkKey: 'lymeZonderTekenbeet',
                      type: 'internal',
                      value: '/informatie/lyme-zonder-tekenbeet'
                    },
                    {
                      linkKey: 'antibiotica',
                      type: 'internal',
                      value: '/informatie/welke-behandeling-of-antibiotica-worden-gegeven-bij-lyme'
                    },
                    {
                      linkKey: 'risicoLyme',
                      type: 'internal',
                      value: '/informatie/wie-loopt-extra-risico-op-lyme'
                    },
                    {
                      linkKey: 'lymeVoorkomen',
                      type: 'internal',
                      value: '/informatie/hoe-lyme-voorkomen'
                    },
                    {
                      linkKey: 'bloedonderzoek',
                      type: 'internal',
                      value: '/informatie/wanneer-wordt-bloedonderzoek-gedaan-voor-lyme'
                    },
                    {
                      linkKey: 'aanvullendeInfo',
                      type: 'internal',
                      value: '/informatie/aanvullende-informatie'
                    },
                  ]
                }
              },
            ]
          },
          {
            key: 'col1_2',
            className: 'col-xs-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'LinklistErythema',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'erythema',
                      type: 'internal',
                      value: '/informatie/erythema-migrans'
                    }
                  ]
                }
              }
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
                itemKey: 'LinklistLymeinNLinfo',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisLymeInNL',
                      type: 'internal',
                      value: '/informatie/lyme-in-nederland'
                    },
                    {
                      linkKey: 'LymeEnWerk',
                      type: 'internal',
                      value: '/informatie/lyme-en-werk'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row3',
        columns: [
          {
            key: 'col3_1',
            className: 'col mt-3',
            items: [
              {
                itemKey: 'LinkListAndereZiekten',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisAndereZiekten',
                      type: 'internal',
                      value: '/informatie/andere-ziekten-door-teken-en-co-infecties'
                    },
                    {
                      linkKey: 'Tekenencefalitis',
                      type: 'internal',
                      value: '/informatie/tekenencefalitis'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  }
}
