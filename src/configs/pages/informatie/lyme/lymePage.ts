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
          image: {
            url: '/images/no-license/woman-spring.jpg',
            minHeight: '200px',
            maxHeight: '150px',
            placement: 'top',
          },
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
            url: '/images/no-license/tick-white-flower.jpg',
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
            url: '/images/cRIVM/shutterstock_80658289-1920.jpg',
            copyrightNotice: '© RIVM',
            copyrightNoticeXAlignment: 'start',
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
            url: '/images/cRIVM/880-1920.jpg',
            copyrightNotice: '© RIVM',
            copyrightNoticeXAlignment: 'start',
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
          image: {
            url: '/images/cRIVM/82073-1920.jpg',
            copyrightNotice: '© RIVM',
            copyrightNoticeXAlignment: 'start',
            minHeight: '200px',
            maxHeight: '350px', 
            placement: 'top',
          },
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
          image: {
            url: '/images/cRIVM/iStock-683600772-1920.jpg',
            copyrightNotice: '© RIVM',
            copyrightNoticeXAlignment: 'start',
            minHeight: '200px',
            maxHeight: '350px',
            placement: 'top',
          },
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
            value: '/informatie/hoe-lyme-voorkomen'
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
const emSection = (): PageRow => {
  return pageSection({
    sectionKey: 'erythema',
    className: 'my-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'emRow',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          // --------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: 'emDescription',
            className: 'h-100',
            config: {
              type: 'markdown',
              markdownUrl: '/informatie/erythema/erythema.md'
            }
          },
          // --------------------
          {
            colClassName: 'col-12 col-md-8',
            itemKey: 'erythemaGallery',
            config: {
              type: 'extension',
              config: {
                type: 'gallery'
              }
            }
          },
        ]
      })
    ]
  })
}


const lymeInNLSection = (): PageRow => {
  return pageSection({
    sectionKey: 'lymeInNL',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'lymeInNLRow',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'basiskennisLymeInNL',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/pexels-johannes-plenio-4371629.jpg',
                minHeight: '200px',
                maxHeight: '350px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/informatie/lyme-in-nederland'
              },
            }
          },
          // --------------------
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'lymeEnWerk',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/PV-20161013-01-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '350px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/informatie/lyme-en-werk'
              },
            }
          },
        ]
      })
    ]
  })
}



const andereZiektenSection = (): PageRow => {
  return pageSection({
    sectionKey: 'andreZiekten',
    className: 'my-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'andreZiektenRow',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'basiskennisAndereZiekten',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/andere-ziekten-door-teken-en-co-infecties'
              },
            }
          },
          // --------------------
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'tekenencefalitis',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/tekenencefalitis'
              },
            }
          },
        ]
      })
    ]
  })
}

export const lymePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/lyme',
    rows: [
      lymeInfoSection(),
      emSection(),
      lymeInNLSection(),
      andereZiektenSection(),
    ]
  }
}
