import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { leadColLayout } from "../../layout/rows/leadColLayout"
import { pageSection } from "../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../layout/rows/simpleRowColLayout"
import { meldenCard } from "../cards/meldenCard"

const newsSection = (): PageRow => {
  return pageSection({
    sectionKey: 'latestNews',
    className: 'mt-3',
    rows: [
      leadColLayout({
        rowKey: 'latestNews',
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
                url: '/images/no-license/onderzoek-card.jpg',
                placement: 'top',
                height: '250px',
                maxHeight: '400px',
              }
            }
          },
        ],
        panelRows: [
          simpleRowColLayout({
            rowKey: 'row1', items: [
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
                    url: '/images/no-license/woman-spring.jpg',
                    placement: 'left',
                    width: '300px',
                    maxWidth: '200px',
                  }
                }
              },
              {
                colClassName: 'col-12',
                itemKey: 'topNews2',
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
            ]
          }),
        ]
      })
    ]
  })
}

const moreInfoSection = (): PageRow => {
  const colClassName = 'col-12 col-sm-10 col-md-6 col-lg-4';

  return pageSection({
    sectionKey: 'aboutThisSite',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'cardsRow',
        rowClassNameOverride: 'row gy-2a justify-content-center justify-content-md-start',
        items: [
          {
            colClassName: colClassName,
            itemKey: 'onderzoekCard',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/onderzoek/overzicht',
              },
              image: {
                url: '/images/onderzoeken.png',
                placement: 'top',
                height: '200px',
              }
            }
          },
          //
          {
            colClassName: colClassName,
            itemKey: 'tekenCard',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/teken',
              },
              image: {
                url: '/images/no-license/teken-card.jpg',
                placement: 'top',
                height: '200px',
              }
            }
          },
          //
          {
            colClassName: colClassName,
            itemKey: 'lymeCard',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/lyme',
              },
              image: {
                url: '/images/lymecard.png',
                placement: 'top',
                height: '200px',
              }
            }
          },
          {
            colClassName: colClassName,
            itemKey: 'verwijderCard',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/informatie/hoe-verwijder-ik-een-teek',
              },
              image: {
                url: '/images/teekverwijderen.jpeg',
                placement: 'top',
                height: '200px',
              }
            }
          },
          //
          {
            colClassName: colClassName,
            itemKey: 'faqCard',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/faq',
              },
              image: {
                url: '/images/no-license/faq-card.jpg',
                placement: 'top',
                height: '200px',
              }
            }
          },
          //
          {
            colClassName: colClassName,
            itemKey: 'aboutCard',
            className: 'h-100',
            config: {
              type: 'actionCard',
              action: {
                type: 'navigate',
                value: '/tekenradar',
              },
              image: {
                url: '/images/tekenradar-logo-colored.png',
                backgroundSize: 'contain',
                placement: 'top',
                height: '200px',
              }
            }
          }

        ]
      })
    ]
  })
}

const partnerSection = (): PageRow => {
  return {
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
  }
}

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
              meldenCard({ className: 'h-100' })
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
      newsSection(),
      moreInfoSection(),
      partnerSection(),
    ]
  }
}
