import { PageConfig, PageItem, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { leadColLayout } from "../../layout/rows/leadColLayout"
import { pageSection } from "../../layout/rows/pageSection"
import { PageItemWithCol, simpleRowColLayout } from "../../layout/rows/simpleRowColLayout"
import { meldenCard } from "../cards/meldenCard"
import { newsItems } from "./nieuws/newsItems"

const getTopNewsItemCard = (): PageItem => {
  const newsItem = newsItems[0]
  return {
    itemKey: `global:${newsItem.url.substring(1).replaceAll('/', '.')}`,
    className: 'h-100',
    config: {
      type: 'actionCard',
      action: {
        type: 'navigate',
        value: newsItem.url,
      },
      useFooterText: true,
      hideBodyContent: true,
      image: {
        url: newsItem.cardContent.imageURL,
        placement: 'top',
        height: '250px',
        maxHeight: '400px',
      }
    }
  };
};
const getOtherNewsItemCard = (index: number): PageItemWithCol => {
  const newsItem = newsItems[index]
  return {
    colClassName: 'col-12',
    itemKey: `global:${newsItem.url.substring(1).replaceAll('/', '.')}`,
    className: 'h-100',
    config: {
      type: 'actionCard',
      action: {
        type: 'navigate',
        value: newsItem.url,
      },
      useFooterText: true,
      hideBodyContent: true,
      image: {
        url: newsItem.cardContent.imageURL,
        copyrightNotice: newsItem.cardContent.imageCopyRightLabel,
        copyrightNoticeXAlignment: 'start',
        placement: 'left',
        width: '300px',
        maxWidth: '200px',
      }
    }
  };
};

const newsSection = (): PageRow => {
  return pageSection({
    sectionKey: 'latestNews',
    className: 'mt-3',
    rows: [
      leadColLayout({
        rowKey: 'latestNews',
        leadColClassName: 'col-12 col-sm-10 col-md-5 col-lg-6',
        panelColClassName: 'col-12 col-sm-10 col-md-7 col-lg-6',
        leadItems: [
          getTopNewsItemCard(),
        ],
        panelRows: [
          simpleRowColLayout({
            rowKey: 'row1', items: [
              getOtherNewsItemCard(1),
              getOtherNewsItemCard(2),
              {
                colClassName: 'col-12',
                itemKey: 'openNews',
                //className: 'mt-3',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/nieuws/overzicht',
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
                url: '/images/small-pexels-rodnae-productions-8068694.jpg',
                //copyrightNotice: '© RIVM',
                //copyrightNoticeXAlignment: 'start',
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
                url: '/images/small-teken-card.jpg',
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
                url: '/images/small-82073-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
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
                url: '/images/small-faq.jpg',
                placement: 'top',
                height: '200px',
              }
            }
          },
          //
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
                url: '/images/small-82106-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
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
                value: '/informatie/tekenradar',
              },
              image: {
                url: '/images/small-tekenradarWithBackground.jpg',
                //backgroundSize: 'contain',
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
    helmet: {
      override: 'global'
    },
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'meldenCardCol',
            hideWhen: 'unauth',
            className: 'col-12 col-lg-4 mt-3 order-2 order-lg-1',
            items: [
              meldenCard({ className: 'h-100', showMyTekenradarBtn: true })
            ]
          },
          {
            key: 'meldenCardCol',
            hideWhen: 'auth',
            className: 'col-12 col-lg-4 mt-3 order-2 order-lg-1',
            items: [
              meldenCard({ className: 'h-100' })
            ]
          },
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-8 mt-3 order-1 order-lg-2',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'extension',
                  config: {
                    type: 'resultsTabs',
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
