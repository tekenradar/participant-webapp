import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../../layout/rows/simpleRowColLayout"

const doelenSection = (): PageRow => {
  return pageSection({
    sectionKey: 'todo1',
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

const onderzoekenSection = (): PageRow => {
  return pageSection({
    sectionKey: 'todo2',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row2',
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
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: 'todo2',
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
          // ----------------------------
          // TODO: continue
        ],
      })
    ]
  })
}

const resultatenSection = (): PageRow => {
  return pageSection({
    sectionKey: 'todo3',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row2',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12 col-md-6',
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
          // ----------------------------
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'todo2',
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
          // ----------------------------
          // TODO: continue
        ],
      })
    ]
  })
}

const voorArtsenSection = (): PageRow => {
  return pageSection({
    sectionKey: 'todo4',
    className: 'my-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row2',
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


export const nieuwsPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: '/nieuws',
    rows: [
      doelenSection(),
      onderzoekenSection(),
      resultatenSection(),
      voorArtsenSection(),
      /// TODO: OLD CONTENT REMOVE:
      {
        key: 'row1',
        columns: [
          {
            key: 'col1',
            className: 'col-12 col-md-8 col-lg-6',
            items: [
              {
                itemKey: 'overviewCard',

                config: {
                  type: 'actionCard',
                }
              },
            ]
          },
        ]
      },
      {
        key: 'row2',
        containerClassName: 'pb-4',
        columns: [
          {
            key: 'col2',
            className: 'col-12 col-md-6 pt-2',
            items: [
              {
                itemKey: 'tekenverwachting',
                className: 'h-100',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/onderzoek/tekenverwachting'
                  },
                  image: {
                    url: '/images/no-license/waar-leven-teken.jpg',
                    height: '150px',
                    placement: 'top'
                  }
                }
              },
            ]
          },
          {
            key: 'col2',
            className: 'col-12 col-md-6',
            items: [
              {
                itemKey: 'pandora',
                className: 'mt-2',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/onderzoek/pandora'
                  },
                }
              },
              {
                itemKey: 'resultaten',
                className: 'mt-2',
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/onderzoek/resultaten'
                  },
                  image: {
                    url: '/images/tekenbeeten-km.png',
                    width: '150px',
                    maxWidth: '180px',
                    placement: 'left'
                  }
                }
              },
            ]
          }
        ]
      }
    ]
  }
}
