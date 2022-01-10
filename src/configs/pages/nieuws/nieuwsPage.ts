import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../../layout/rows/simpleRowColLayout"

const nieuwsSection = (): PageRow => {
  return pageSection({
    sectionKey: 'Nieuws',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'todo1',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12',
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
                url: '/images/no-license/woman-spring.jpg',
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
                url: '/images/no-license/woman-spring.jpg',
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
                url: '/images/no-license/woman-spring.jpg',
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
                url: '/images/no-license/woman-spring.jpg',
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
                url: '/images/no-license/woman-spring.jpg',
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
                url: '/images/no-license/woman-spring.jpg',
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
                url: '/images/no-license/woman-spring.jpg',
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
                url: '/images/no-license/woman-spring.jpg',
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
