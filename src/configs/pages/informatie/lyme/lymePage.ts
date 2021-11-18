import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

export const lymePage = (path: string): PageConfig => {
  return {
    path: path,
    pageKey: 'informatie/lyme',
    rows: [
      {
        key: 'row1',
        columns: [
          {
            key: 'col1_1',
            className: 'col-xs-12 col-lg-8 mt-3',
            items: [
              {
                itemKey: 'LinklistLymeinfo',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisLyme',
                      type: 'internal',
                      value: '/informatie/basiskennis-lyme'
                    },
                    {
                      linkKey: 'hoeKrijgJeLyme',
                      type: 'internal',
                      value: '/informatie/hoe-krijg-je-de-ziekte-van-lyme'
                    },
                    {
                      linkKey: 'lymeKind',
                      type: 'internal',
                      value: '/informatie/hoe-herken-ik-een-tekenbeet-of-ziekte-van-lyme-bij-een-kind'
                    },
                    {
                      linkKey: 'naEenTekenbeet',
                      type: 'internal',
                      value: '/informatie/waar-moet-ik-op-letten-na-een-tekenbeet'
                    },
                    {
                      linkKey: 'roodPlekje',
                      type: 'internal',
                      value: '/informatie/klein-rood-plekje-na-tekenbeet'
                    },
                    {
                      linkKey: 'wanneerHuisarts',
                      type: 'internal',
                      value: '/informatie/wanneer-moet-ik-naar-de-huisarts'
                    },
                    {
                      linkKey: 'immuunsysteem',
                      type: 'internal',
                      value: '/informatie/de-ziekte-van-lyme-en-het-immuunsysteem'
                    },
                    {
                      linkKey: 'lymeZonderTekenbeet',
                      type: 'internal',
                      value: '/informatie/lyme-zonder-tekenbeet'
                    },
                    {
                      linkKey: 'antibiotica',
                      type: 'internal',
                      value: '/informatie/welke-behandeling-of-antibiotica-worden-gegeven-bij-lyme'
                    },
                    {
                      linkKey: 'risicoLyme',
                      type: 'internal',
                      value: '/informatie/wie-loopt-extra-risico-op-lyme'
                    },
                    {
                      linkKey: 'lymeVoorkomen',
                      type: 'internal',
                      value: '/informatie/hoe-lyme-voorkomen'
                    },
                    {
                      linkKey: 'bloedonderzoek',
                      type: 'internal',
                      value: '/informatie/wanneer-wordt-bloedonderzoek-gedaan-voor-lyme'
                    },
                    {
                      linkKey: 'aanvullendeInfo',
                      type: 'internal',
                      value: '/informatie/aanvullende-informatie'
                    },
                  ]
                }
              },
            ]
          },
          {
            key: 'col1_2',
            className: 'col-xs-12 col-lg-4 mt-3',
            items: [
              {
                itemKey: 'LinklistErythema',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'erythema',
                      type: 'internal',
                      value: '/informatie/erythema-migrans'
                    }
                  ]
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
            className: 'col mt-3',
            items: [
              {
                itemKey: 'LinklistLymeinNLinfo',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisLymeInNL',
                      type: 'internal',
                      value: '/informatie/lyme-in-nederland'
                    },
                    {
                      linkKey: 'LymeEnWerk',
                      type: 'internal',
                      value: '/informatie/lyme-en-werk'
                    }
                  ]
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
            key: 'col3_1',
            className: 'col mt-3',
            items: [
              {
                itemKey: 'LinkListAndereZiekten',
                config: {
                  type: 'linkList',
                  links: [
                    {
                      linkKey: 'basiskennisAndereZiekten',
                      type: 'internal',
                      value: '/informatie/andere-ziekten-door-teken-en-co-infecties'
                    },
                    {
                      linkKey: 'Tekenencefalitis',
                      type: 'internal',
                      value: '/informatie/tekenencefalitis'
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  }
}
