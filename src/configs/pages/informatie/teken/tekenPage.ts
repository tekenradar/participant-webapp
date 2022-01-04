import { PageConfig, PageRow } from "case-web-app-core/build/types/pagesConfig"
import { fullWidthTeaserImageRow } from "../../../common/teaserImageRow";
import { simpleRowColLayout } from "../../../../layout/rows/simpleRowColLayout";
import { pageSection } from "../../../../layout/rows/pageSection";
import { leadColLayout } from "../../../../layout/rows/leadColLayout";


const tekenInfoSection: PageRow = pageSection({
  sectionKey: 'tekenInfo',
  className: 'mt-3',
  rows: [
    leadColLayout({
      rowKey: 'tekenInfo-row',
      leadItems: [
        {
          itemKey: 'basiskennisTeken',
          className: 'h-100',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/no-license/het-gedrag.jpg',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top',
            },
            action: {
              type: 'navigate',
              value: '/informatie/basiskennis-teken'
            },
          }
        },
      ],
      panelRows: [
        simpleRowColLayout({
          rowKey: 'row1', items: [
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'waarLevenTeken',
              className: 'h-100',
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/waar-leven-teken'
                },
              }
            },
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'hetGedrag',
              className: 'h-100',
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/het-gedrag-van-de-teek'
                },
              }
            }
          ]
        }),
        simpleRowColLayout({
          rowKey: 'row2', items: [
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'wanneerActief',
              className: "h-100",
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/wanneer-zijn-teken-actief'
                },
              }
            },
            {
              colClassName: 'col-12 col-md-6',
              className: "h-100",
              itemKey: 'hoeveelBesmet',
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/hoeveel-teken-zijn-besmet'
                },
              }
            },
          ]
        }),
        simpleRowColLayout({
          rowKey: 'row3', items: [
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'tekenbeetVoorkomen',
              className: "h-100",
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/hoe-kan-ik-een-tekenbeet-voorkomen'
                },
              }
            },
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'hyalomma',
              className: "h-100",
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/hyalomma-teek'
                },
              }
            },
          ]
        }),
      ]
    })
  ]
});


const tekenbeetInfoSection: PageRow = pageSection({
  sectionKey: 'tekenbeetInfo',
  className: 'mt-3',
  rows: [
    leadColLayout({
      rowKey: 'tekenInfo-row',
      leadItems: [
        {
          itemKey: 'basiskennisTekenbeet',
          className: 'h-100',
          config: {
            type: 'actionCard',
            image: {
              url: '/images/teekverwijderen.jpeg',
              minHeight: '200px',
              maxHeight: '350px',
              placement: 'top',
            },
            action: {
              type: 'navigate',
              value: '/informatie/basiskennis-tekenbeet'
            },
          }
        },
      ],
      panelRows: [
        simpleRowColLayout({
          rowKey: 'row1', items: [
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'controleerTekenbeten',
              className: 'h-100',
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/hoe-controleer-ik-op-tekenbeten'
                },
              }
            },
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'watMoetIkDoen',
              className: 'h-100',
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/wat-moet-ik-doen-bij-een-tekenbeet'
                },
              }
            },
          ]
        }),
        simpleRowColLayout({
          rowKey: 'row2', items: [
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'hoeVerwijder',
              className: 'h-100',
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/hoe-verwijder-ik-een-teek'
                },
              }
            },
            {
              colClassName: 'col-12 col-md-6',
              itemKey: 'hoeGroot',
              className: 'h-100',
              config: {
                type: 'actionCard',
                action: {
                  type: 'navigate',
                  value: '/informatie/hoe-groot-is-de-kans-op-besmetting-na-een-tekenbeet'
                },
              }
            },
          ]
        }),
      ]
    })
  ]
});


const tekenweetjesSection: PageRow = pageSection({
  sectionKey: 'tekenweetjes',
  className: 'my-3',
  rows: [
    simpleRowColLayout({
      rowKey: 'tekenweetjes-row',
      items: [
        {
          colClassName: 'col-12',
          itemKey: 'tekenweetjes.card',
          className: "mt-2",
          config: {
            type: 'actionCard',
            action: {
              type: 'navigate',
              value: '/informatie/tekenweentjes'
            },
          }
        }
      ]
    })
  ]
});


export const tekenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/teken',
    rows: [
      fullWidthTeaserImageRow('teaserImage', {
        type: 'teaserImage',
        image: {
          url: '/images/no-license/teken-card.jpg',
          backgroundPosition: '70% 35%',
          height: 367,
        },
      }),
      tekenInfoSection,
      tekenbeetInfoSection,
      tekenweetjesSection,
    ]
  }
}
