import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const faqPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'faq',
    rows: [
      {
        key: 'row1',
        className: 'py-4',
        columns: [
          {
            key: 'col1_1',
            className: 'col',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'Veelgestelde vragen',
                  height: 600
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
