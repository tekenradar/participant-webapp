import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../../layout/rows/pageSection"
import { PageItemWithCol, simpleRowColLayout } from "../../../layout/rows/simpleRowColLayout"
import { fullWidthTeaserImageRow } from "../../common/teaserImageRow"
import { newsItems } from "./newsItems"


const archiefSection = (): PageRow => {
  return pageSection({
    sectionKey: 'Archief',
    className: 'my-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row2',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12 col-md-8',
            itemKey: '2019',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/cRIVM/44966457-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2019'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: '2018',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/ZonMwfoto.jpg',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2018'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: '2017',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/cRIVM/79737-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2017'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: '2016',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/cRIVM/74393-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2016'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: '2015',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/cRIVM/iStock-543087666-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2015'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: '2014',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/cRIVM/vws-064.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2014'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: '2013',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/cRIVM/130282-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2013'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: '2012',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/news/cRIVM/_PNH5565-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/archief2012'
              },
            }
          },
        ],
      })
    ]
  })
}


const getSectionForYear = (year: number): PageRow => {
  const currentNewsItems = newsItems.filter(item => item.year === year)

  return pageSection(
    //first card
    {
      sectionKey: `global:nieuws.sections.${year.toString()}`,
      className: 'mt-3',
      rows: [
        simpleRowColLayout({
          rowKey: 'Nieuws',
          rowClassNameOverride: 'row gy-2a ',
          items: [
            ...currentNewsItems.map((newsItem, index) => {
              const isFirstItem: boolean = index === 0 && !newsItem.cardContent.imageAlwaysOnLeft;
              return {
                colClassName: 'col-12',
                itemKey: `global:${newsItem.url.substring(1).replaceAll('/', '.')}`,
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  useFooterText: true,
                  image: {
                    url: newsItem.cardContent.imageURL,
                    copyrightNotice: newsItem.cardContent.imageCopyRightLabel,
                    copyrightNoticeXAlignment: 'start',
                    className: isFirstItem ? undefined : 'd-none d-md-block',
                    minHeight: isFirstItem ? '200px' : undefined,
                    maxHeight: isFirstItem ? '250px' : undefined,
                    minWidth: isFirstItem ? undefined : '300px',
                    maxWidth: isFirstItem ? undefined : '350px',
                    placement: isFirstItem ? 'top' : 'left',
                  },
                  action: {
                    type: 'navigate',
                    value: newsItem.url
                  },
                }
              } as PageItemWithCol
            }),
          ]
        })
      ]
    }
  )
}

const getYearlySections = (): PageRow[] => {
  const years: number[] = [];
  newsItems.forEach(item => {
    if (!years.includes(item.year)) {
      years.push(item.year)
    }
  })

  return years.map(year => getSectionForYear(year))
}


export const newsPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: '/nieuws/news',
    helmet: {
      override: 'global',
    },
    rows: [
      fullWidthTeaserImageRow('teaserImage', {
        type: 'teaserImage',
        image: {
          url: '/images/newspapers-g351ad5b65_1280.jpg',
          backgroundPosition: '70% 35%',
          height: 367,
        },
      }),
      ...getYearlySections(),
      archiefSection(),
    ]
  }
}
