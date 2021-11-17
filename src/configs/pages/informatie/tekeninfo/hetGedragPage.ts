import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const hetGedragPage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/tekeninfo/hetGedragPage',
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
                url: '/images/no-license/hetGedrag.jpg',
                backgroundPosition: '70% 35%',
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
            className: 'col-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'markdown',
                  markdownUrl: '/informatie/tekeninfo/hetGedrag.md',

                }
              }
            ]
          },
          {
            key: 'col1_2',
            className: 'col-12 col-lg-2 mt-3',
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
      },
      {
        key: 'row2',
        columns: [
          {
            key: 'col2_1',
            className: 'col-12 col-md-6 col-lg-2 mt-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'placeholder',
                  label: 'back to overview',
                  height: 150
                }
              }
            ]
          },
          {
            key: 'col2_2',
            className: 'col-12 col-md-6 col-lg-2 mt-3',
            items: [
              {
                itemKey: '2',
                config: {
                  type: 'placeholder',
                  label: 'another topic',
                  height: 150
                }
              }
            ]
          },
          {
            key: 'col2_3',
            className: 'col-12 col-md-6 col-lg-2 mt-3',
            items: [
              {
                itemKey: '3',
                config: {
                  type: 'placeholder',
                  label: 'another article',
                  height: 150
                }
              }
            ]
          },
          {
            key: 'col2_4',
            className: 'col-12 col-md-6 col-lg-2 my-3',
            items: [
              {
                itemKey: '4',
                config: {
                  type: 'placeholder',
                  label: 'next article',
                  height: 150
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
