import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../../../layout/rows/pageSection";
import { simpleRowColLayout } from "../../../../layout/rows/simpleRowColLayout";
import { pageRowToPageItem } from "../../../../layout/utils";
import { fullWidthTeaserImageRow } from "../../../common/teaserImageRow";

const doelenSection: PageRow = pageSection({
  sectionKey: 'doelenTekenradar',
  className: 'mt-3',
  rows: [
    simpleRowColLayout({
      rowKey: 'doelen-tekenradar-row',
      items: [
        {
          colClassName: 'col-12',
          itemKey: 'overTekenradar',
          className: 'bg-secondary h-100 p-2',
          config: {
            type: 'markdown',
            markdownUrl: '/informatie/tekenradar/overTekenradarCard.md',

          }
        },
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
          itemKey: 'doelenTekenradar',
          className: 'bg-secondary h-100 p-2',
          config: {
            type: 'markdown',
            markdownUrl: '/informatie/tekenradar/partnerCard.md',

          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'rivm',
          className: 'h-100',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-RIVM.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/rivm'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'wageningen',
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
              value: '/informatie/wageningen-university'
            },

          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'amc',
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
              value: '/informatie/amc'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'fsd',
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
              value: '/informatie/fsd'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-4',
          itemKey: 'radboudumc',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-radboudumc.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/radboud'
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
  // className: 'my-3 col-12 col-md-8',
  rows: [
    simpleRowColLayout({
      rowKey: 'financiers-row',
      rowClassNameOverride: 'row gy-2a',
      items: [
        {
          colClassName: 'col-12 col-md-6',
          itemKey: 'ZonMw',
          className: 'h-100',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-ZonMw.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/ZonMw'
            },
          }
        },
        // --------------
        {
          colClassName: 'col-12 col-md-6',
          itemKey: 'VWS',
          className: 'h-100',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-vws.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/ministerie-van-vws'
            },
          }
        },
        // --------------
      ]
    })
  ]
});


const inSamenwerkingSection: PageRow = pageSection({
  sectionKey: 'inSamenwerking',
  // className: 'my-3 col-12 col-md-4',
  rows: [
    simpleRowColLayout({
      rowKey: 'financiers-row',
      rowClassNameOverride: 'row gy-2a',
      items: [
        {
          colClassName: 'col-12',
          itemKey: 'NLe',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/logo-NLEteek.png',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top'
            },
            action: {
              type: 'navigate',
              value: '/informatie/NLe'
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
      fullWidthTeaserImageRow('teaserImage', {
        type: 'teaserImage',
        image: {
          url: '/images/small-IenW31072020TD002-1920.jpg',
          backgroundPosition: '70% 35%',
          height: 367,
        },
      }),
      doelenSection,
      partnerSection,
      simpleRowColLayout({
        rowKey: 'financiers-row',
        rowClassNameOverride: 'row gy-2a mb-3',
        items: [
          {
            colClassName: 'pt-3 col-12 col-lg-8',
            ...pageRowToPageItem(financiersSection)
          },
          {
            colClassName: 'pt-3 col-12 col-lg-4',
            ...pageRowToPageItem(inSamenwerkingSection)
          }

        ]
      }),
    ]
  }
}

