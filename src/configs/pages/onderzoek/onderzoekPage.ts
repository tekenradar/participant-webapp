import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../../layout/rows/simpleRowColLayout"

const doelenSection = (): PageRow => {
  return pageSection({
    sectionKey: 'doelen',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row1',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12',
            itemKey: 'doelenOnderzoek',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/pexels-fauxels-3183179.jpg',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/doelen'
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
    sectionKey: 'onderzoeken',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row2',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12 col-md-8',
            itemKey: 'vragenlijst',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/ipads&iphonesnieuwewerken-47-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/vragenlijst'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: 'lymeProspect',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/iStock-482765541-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/lymeProspect'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: 'preventieveAntibiotica',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/iStock-159286807-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/preventieveAntibiotica'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: 'victory',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/180624_2914_HZF6819-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/victory'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-4',
            itemKey: 'pandora',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/JPJDouaneLaboratorium17-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/pandora'
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
    sectionKey: 'resultaten',
    className: 'mt-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row2',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'cijfers',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/PV-20161013-02-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/cijfers'
              },
            }
          },
          // ----------------------------
          {
            colClassName: 'col-12 col-md-6',
            itemKey: 'publicaties',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/ipads&phonesnieuwewerken-8-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/publicaties'
              },
            }
          },
        ],
      })
    ]
  })
}

const voorArtsenSection = (): PageRow => {
  return pageSection({
    sectionKey: 'voorArtsen',
    className: 'my-3',
    rows: [
      simpleRowColLayout({
        rowKey: 'row2',
        rowClassNameOverride: 'row gy-2a ',
        items: [
          {
            colClassName: 'col-12',
            itemKey: 'voorArtsen',
            className: 'h-100',
            config: {
              type: 'actionCard',
              image: {
                url: '/images/cRIVM/iStock-683600772-1920.jpg',
                copyrightNotice: '© RIVM',
                copyrightNoticeXAlignment: 'start',
                minHeight: '200px',
                maxHeight: '150px',
                placement: 'top',
              },
              action: {
                type: 'navigate',
                value: '/onderzoek/voorArtsen'
              },
            }
          },
        ],
      })
    ]
  })
}


export const onderzoekPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'onderzoek/overzicht',
    rows: [
      doelenSection(),
      onderzoekenSection(),
      resultatenSection(),
      voorArtsenSection(),
    ]
  }
}
