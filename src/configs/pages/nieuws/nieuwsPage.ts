import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../../layout/rows/simpleRowColLayout"

const nieuwsSection = (): PageRow => {
  return pageSection({
    sectionKey: 'Nieuws',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'Nieuws',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12',
            itemKey: '20210708',
            className: 'h-100',
            config: {
              type: 'actionCard',
              useFooterText: true,
              image: {
                url: '/images/news/cRIVM/130852-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/2021-07-08'
              },
            }
          },
          {
            colClassName: 'col-12',
            itemKey: '20210527',
            className: 'h-100',
            config: {
              type: 'actionCard',
              useFooterText: true,
              image: {
                url: '/images/news/Nagelteek_170218496.jpg',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'left',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/2021-05-27'
              },
            }
          },
          {
            colClassName: 'col-12',
            itemKey: '20210419',
            className: 'h-100',
            config: {
              type: 'actionCard',
              useFooterText: true,
              image: {
                url: '/images/news/LP_KIDS.jpg',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'left',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/2021-04-19'
              },
            }
          },
          {
            colClassName: 'col-12',
            itemKey: '20200624',
            className: 'h-100',
            config: {
              type: 'actionCard',
              useFooterText: true,
              image: {
                url: '/images/news/cRIVM/77077-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'left',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/2020-06-24'
              },
            }
          },
          {
            colClassName: 'col-12',
            itemKey: '20200623',
            className: 'h-100',
            config: {
              type: 'actionCard',
              useFooterText: true,
              image: {
                url: '/images/news/cOTHER/tekenapp.jpeg',
                copyrightNotice: '© Nature Today',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'left',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/2020-06-23'
              },
            }
          },
          {
            colClassName: 'col-12',
            itemKey: '20200622',
            className: 'h-100',
            config: {
              type: 'actionCard',
              useFooterText: true,
              image: {
                url: '/images/news/foto-teek.png',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'left',
              },
              action: {
                type: 'navigate',
                value: '/nieuws/2020-06-22'
              },
            }
          },
        ],
      })
    ]
  })
}

const archiefSection = (): PageRow => {
  return pageSection({
    sectionKey: 'Archief',
    className: 'mt-3',
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






export const nieuwsPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: '/nieuws',
    rows: [
      nieuwsSection(),
      archiefSection(),
    ]
  }
}
