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
          itemKey: '1',
          config: {
            type: 'placeholder',
            label: 'Veelgestelde vragen',
            height: 600
          }
        }],
        sideBarItems: [
          {
            itemKey: '1',
            config: {
              type: 'placeholder',
              label: 'Veelgestelde vragen',
              height: 600
            }
          }
        ]
      })
    ]
  }
}
