import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { simpleSideBarLayout } from "../../layout/simpleSideBarLayout"

export const faqPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'faq',
    rows: [
      simpleSideBarLayout({
        rowKey: 'mainRow',
        containerClassName: 'my-3 min-vh-60',
        mainColItems: [{
          itemKey: 'topItem',
          config: {
            type: 'simpleCard',
            variant: 'h2',
          }
        }, {
          itemKey: 'items',
          config: {
            type: 'accordionList',
            accordionCtrlsKey: "accordionControls"
          }
        }],
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
