import { PageConfig, PageItem } from "case-web-app-core/build/types/pagesConfig"
import { simpleSideBarLayout } from "../../layout/rows/simpleSideBarLayout"
import { meldenCard } from "../cards/meldenCard"


const sideBarItems: Array<PageItem> = [
  meldenCard(),
  {
    className: 'mt-3',
    itemKey: 'references',
    config: {
      type: 'linkList',
      links: [
        {
          linkKey: 'faqLink',
          type: 'internal',
          value: '/faq'
        },
        {
          linkKey: 'privacyStatementLink',
          type: 'internal',
          value: '/privacy'
        },
        {
          linkKey: 'contactLink',
          type: 'internal',
          value: '/contact'
        }
      ]
    }
  },
  {
    itemKey: 'systemInfo',
    config: {
      type: 'systemInfo',
      showBrowserInfo: true
    }
  }
]

const mainColItems: Array<PageItem> = [
  {
    itemKey: 'surveyList',
    className: 'mb-2',
    config: {
      type: 'surveyList',
    }
  },
  {
    itemKey: 'reportList',
    config: {
      type: 'reportList',
      hideStudyKey: true,
    }
  },
]

export const myTekenradarPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'myTekenradar',
    hideWhen: 'unauth',
    rows: [
      simpleSideBarLayout({
        rowKey: 'mainRow',
        containerClassName: 'my-3 min-vh-60',
        mainColItems: [
          ...mainColItems
        ],
        sideBarItems: [
          ...sideBarItems
        ]
      })
    ]
  }
}
