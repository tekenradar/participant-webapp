import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { simpleSideBarLayout } from "../../layout/simpleSideBarLayout"
import { generatePageSectionItem } from "../common/pageSectionItem"

export const faqPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'faq',
    rows: [
      simpleSideBarLayout({
        rowKey: 'mainRow',
        containerClassName: 'my-3 min-vh-60',
        mainColItems: [
          generatePageSectionItem({
            itemKey: 'tekenradar',
            leadItems: [
              {
                itemKey: 'tekenradar.items',
                config: {
                  type: 'accordionList',
                  accordionCtrlsKey: "accordionControls"
                }
              }
            ],
            leadColClassName: 'col-12',
            panelRows: []
          }),
          generatePageSectionItem({
            itemKey: 'ticks',
            className: 'mt-3',
            leadItems: [
              {
                itemKey: 'ticks.items',
                config: {
                  type: 'accordionList',
                  accordionCtrlsKey: "accordionControls"
                }
              }
            ],
            leadColClassName: 'col-12',
            panelRows: []
          }),
        ],
        sideBarItems: [
          {
            itemKey: '1',
            config: {
              type: 'placeholder',
              label: 'Cards for Veelgestelde vragen',
              height: 600
            }
          }
        ]
      })
    ]
  }
}
