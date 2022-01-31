import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../../../layout/rows/pageSection";
import { simpleRowColLayout } from "../../../../layout/rows/simpleRowColLayout";

const doelenSection: PageRow = pageSection({
  sectionKey: 'doelenTekenradar',
  className: 'mt-3',
  rows: [
    simpleRowColLayout({
      rowKey: 'doelen-tekenradar-row',
      items: [
        {
          colClassName: 'col-12',
          itemKey: 'doelenTekenradar.card',
          className: "mt-2",
          config: {
            type: 'actionCard',
            image: {
              url: '/images/cRIVM/IenW31072020TD002-1920.jpg',
              copyrightNotice: '© RIVM',
              copyrightNoticeXAlignment: 'start',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        }
      ]
    })
  ]
});

const partnerSection: PageRow = pageSection({
  sectionKey: 'partners',
  className: 'mt-3',
  rows: [
    simpleRowColLayout({
      rowKey: 'partners-row',
      rowClassNameOverride: 'row gy-2a',
      items: [
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'doelenTekenradar.card',
          config: {
            type: 'teaserImage',
            image: {
              url: '/images/no-license/teken-card.jpg',
              backgroundPosition: '70% 35%',
              height: 320,
              //className: 'h-100'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'rivm.card',
          className: 'h-100',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-rivm.jpeg',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'wageningen.card',
          className: 'h-100',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-WUR.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },

          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'amc.card',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-AMC.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'fsd.card',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-FSD.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'radboudumc.card',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-Radboudumc.jpg',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        },
        // --------------
      ]
    })
  ]
});

const financiersSection: PageRow = pageSection({
  sectionKey: 'financiers',
  className: 'my-3',
  rows: [
    simpleRowColLayout({
      rowKey: 'financiers-row',
      rowClassNameOverride: 'row gy-2a',
      items: [
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'doelenTekenradar.card',
          className: 'h-100',
          config: {
            type: 'actionCard',
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'doelenTekenradar.card',
          className: 'h-100',
          config: {
            type: 'actionCard',
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'doelenTekenradar.card',
          config: {
            type: 'actionCard',
            action: {
              type: 'navigate',
              value: '/informatie/doelen-tekenradar'
            },
          }
        },
        // --------------
      ]
    })
  ]
});


export const tekenradarPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/tekenradar',
    rows: [
      doelenSection,
      partnerSection,
      financiersSection,
    ]
  }
}

