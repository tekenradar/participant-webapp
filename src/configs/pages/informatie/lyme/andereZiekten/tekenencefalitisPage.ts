import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { infoPageLayout } from "../../../../../layout/pages/infoPageLayout"
import { meldenCard } from "../../../../cards/meldenCard";
import { simpleRowColLayout } from "../../../../../layout/rows/simpleRowColLayout";
import { pageSection } from "../../../../../layout/rows/pageSection";


export const tekenencefalitisPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'informatie/andereZiekten/tekenencefalitis',
    topImage: {
      type: 'teaserImage',
      image: {
        url: '/images/no-license/het-gedrag.jpg',
        backgroundPosition: '70% 35%',
        height: 367,
      },
    },
    sideBarItems: [
      meldenCard(),
    ],
    bottomRows: [
      pageSection({
        sectionKey: 'global:infoPageReferences',
        className: 'my-3',
        rows: [
          simpleRowColLayout({
            rowKey: 'references-row',
            items: [
              {
                colClassName: 'col-12 col-sm-6',
                itemKey: 'previousArticle',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  bodyBgImage: {
                    url: '/images/no-license/waar-leven-teken.jpg',
                    backgroundPosition: '50% 50%',
                  },
                  action: {
                    type: 'navigate',
                    value: '/informatie/andere-ziekten-door-teken-en-co-infecties'
                  },
                }
              },
              {
                colClassName: 'col-12 col-sm-6',
                itemKey: 'nextArticle',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  action: {
                    type: 'navigate',
                    value: '/informatie/basiskennis-lyme'
                  },
                }
              },
              {
                colClassName: 'col-12',
                itemKey: 'backToOverviewPage',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  image: {
                    placement: 'left',
                    width: '150px',
                    maxWidth: '150px',
                    url: '/images/no-license/waar-leven-teken.jpg',
                    backgroundPosition: '50% 50%',
                  },
                  action: {
                    type: 'navigate',
                    value: '/informatie/lyme'
                  },
                }
              }
            ]
          })
        ]
      })

    ]
  });
}
