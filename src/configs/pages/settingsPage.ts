import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const settingsPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'settings',
    hideWhen: 'unauth',
    rows: [
      {
        key: 'mainRow',
        containerClassName: 'mt-3',
        columns: [
          {
            key: 'settingsCol',
            className: 'col-12 col-md-10 col-lg-6 offset-lg-1 offset-0',
            items: [{
              itemKey: 'accountSettings',
              config: {
                type: 'accountSettings',
                hideProfileSettings: false
              }
            },
              /*{
                itemKey: 'communicationSettings',
                config: {
                  type: 'communicationSettings',
                  hideLanguageSelector: true
                }
              }*/
            ]
          },
          {
            key: 'helpCol',
            className: 'col-12 col-md-10 col-lg-4 pt-3 pt-lg-0',
            items: [
              {
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
          }
        ]
      },
      {
        key: 'deleteRow',
        containerClassName: 'mb-3',
        columns: [
          {
            key: 'deleteCol',
            className: 'col-12 col-md-10 col-lg-6 offset-lg-1 offset-0',
            items: [
              {
                itemKey: 'deleteAccount',
                config: {
                  type: 'deleteAccount'
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
