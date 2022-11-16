import { PageConfig, PageItem } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../layout/rows/simpleRowColLayout"
import { simpleSideBarLayout } from "../../layout/rows/simpleSideBarLayout"
import { pageRowToPageItem } from "../../layout/utils"
import { meldenCard } from "../cards/meldenCard"

const faqSections = ['tekenradar', 'tekenradaronderzoek', 'teken', 'tekenbeten', 'lyme', 'andereZiekte'];

const generateFaqSections = (): PageItem[] => {
  const items: PageItem[] = [];

  faqSections.forEach((sectionName, index) => {

    items.push(pageRowToPageItem(pageSection({
      sectionKey: sectionName,
      className: index > 0 ? 'mt-3' : undefined,
      rows: [
        simpleRowColLayout({
          rowKey: sectionName + '-row',
          items: [
            {
              colClassName: 'col-12',
              itemKey: `${sectionName}.items`,
              config: {
                type: 'accordionList',
                accordionCtrlsKey: "accordionControls"
              }
            }
          ],
        })
      ]
    })))
  });
  return items;
}

const tableOfContentSection: PageItem = pageRowToPageItem(pageSection({
  sectionKey: 'tableOfContentSection',
  className: 'mb-3',
  rows: [
    simpleRowColLayout({
      rowKey: 'tableOfContent-row',
      items: [
        {
          colClassName: 'col-12',
          itemKey: 'tableOfContent',
          className: 'bg-secondary h-100 p-2',
          config: {
            type: 'markdown',
            markdownUrl: '/faq-table-of-content.md',
          }
        },
      ]
    })
  ]
}));



export const faqPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'faq',
    helmet: {
      override: 'global',
    },
    rows: [
      simpleSideBarLayout({
        rowKey: 'mainRow',
        containerClassName: 'my-3 min-vh-60',
        mainColItems: [
          tableOfContentSection,
          ...generateFaqSections(),
        ],
        sideBarItems: [
          meldenCard()
        ]
      })
    ]
  }
}
