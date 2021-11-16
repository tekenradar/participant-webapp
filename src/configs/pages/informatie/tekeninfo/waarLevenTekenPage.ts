import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const waarLevenTekenPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/tekeninfo/waarLevenTeken',
    rows: [
      {
        key: 'topImage',
        fullWidth: true,
        columns: [{
          key: 'col',
          className: 'w-100 p-0',
          items: [{
            itemKey: 'topImage',
            config: {
              type: 'teaserImage',
              image: {
                url: '/images/no-license/waar-leven-teken.jpg',
                backgroundPosition: '50% 20%',
                height: 367,
              },
            }
          }]
        }]
      },
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-12 col-lg-8 my-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'markdown',
                  markdownUrl: '/informatie/tekeninfo/waarLevenTeken.md',

                }
              }
            ]
          },
          {
            key: 'col1_2',
            className: 'col-12 col-lg-4 my-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'Tekenbeet melden',
                  height: 400
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
