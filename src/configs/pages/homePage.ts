import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const homePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'home',
    hideTitleBar: true,
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: '1',
                config: {
                  type: 'extension',
                  config: {
                    type: 'reportMap',
                    label: 'Map about tick reports'
                  }
                }
              }
            ]
          },
          {
            key: 'meldenCardCol',
            className: 'col-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'reportButtonsCard',
                className: 'h-100',
                config: {
                  type: 'extension',
                  config: {
                    type: 'reportButtonCard',
                    buttons: [
                      { buttonKey: 'tekenBeet', action: { type: 'navigate', value: '/melden' } },
                      { buttonKey: 'rodeRing', action: { type: 'navigate', value: '/melden' } },
                      { buttonKey: 'lyme', action: { type: 'navigate', value: '/melden' } },
                      { buttonKey: 'koorts', action: { type: 'navigate', value: '/melden' } },
                    ]
                  }
                }
              }
            ]
          },

        ]
      },
      {
        key: 'row2',
        columns: [
          {
            key: 'col2_1',
            className: 'col mt-3',
            items: [
              {
                itemKey: '3',
                config: {
                  type: 'placeholder',
                  label: 'Latest Niuews',
                  height: 600
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row3',
        columns: [
          {
            key: 'onderzoekCardCol',
            className: 'col-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'onderzoekCard',
                className: 'h-100',
                config: {
                  type: 'imageCard',
                  showActionBtn: true,
                  action: {
                    type: 'navigate',
                    value: '/onderzoek',
                  },
                  imageSrc: '/images/no-license/onderzoekcard.jpg',
                }
              }
            ]
          },
          {
            key: 'tekenCardCol',
            className: 'col-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'tekenCard',
                className: 'h-100',
                config: {
                  type: 'imageCard',
                  showActionBtn: true,
                  action: {
                    type: 'navigate',
                    value: '/informatie/teken',
                  },
                  imageSrc: '/images/no-license/tekencard.jpg',
                }
              }
            ]
          },
          {
            key: 'lymeCardCol',
            className: 'col-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'lymeCard',
                className: 'h-100',
                config: {
                  type: 'imageCard',
                  showActionBtn: true,
                  action: {
                    type: 'navigate',
                    value: '/informatie/lyme',
                  },
                  imageSrc: '/images/no-license/lymecard.jpg',
                }
              }
            ]
          }
        ]
      },
      {
        key: 'row4',
        columns: [
          {
            key: 'faqCardCol',
            className: 'col-12 col-lg-4 my-3',
            items: [
              {
                itemKey: 'faqCard',
                className: 'h-100',
                config: {
                  type: 'imageCard',
                  showActionBtn: true,
                  action: {
                    type: 'navigate',
                    value: '/faq',
                  },
                  imageSrc: '/images/no-license/faqcard.jpg',
                }
              }
            ]
          },
          {
            key: 'aboutCardCol',
            className: 'col-12 col-lg-4 my-3',
            items: [
              {
                itemKey: 'aboutCard',
                className: 'h-100',
                config: {
                  type: 'imageCard',
                  showActionBtn: true,
                  action: {
                    type: 'navigate',
                    value: '/tekenradar',
                  },
                  imageSrc: '/images/logo_tekenradar.png',
                }
              }
            ]
          },
        ]
      }
    ]
  }
}
