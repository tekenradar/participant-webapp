import { PageConfig, PageItem } from "case-web-app-core/build/types/pagesConfig"
import { pageSection } from "../../layout/rows/pageSection"
import { simpleRowColLayout } from "../../layout/rows/simpleRowColLayout"
import { simpleSideBarLayout } from "../../layout/rows/simpleSideBarLayout"
import { pageRowToPageItem } from "../../layout/utils"
import { meldenCard } from "../cards/meldenCard"

const faqSections = ['pandora', 'tekenradar', 'ticks', 'research', 'tickbite', 'disease'];

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

export const faqPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'faq',
    rows: [
      simpleSideBarLayout({
        rowKey: 'mainRow',
        containerClassName: 'my-3 min-vh-60',
        mainColItems: [
          ...generateFaqSections(),
        ],
        sideBarItems: [
          meldenCard()
        ]
      })
    ]
  }
}
