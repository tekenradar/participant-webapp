import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { infoPageLayout } from "../../../layout/pages/infoPageLayout";
import { pageSection } from "../../../layout/rows/pageSection";
import { simpleRowColLayout } from "../../../layout/rows/simpleRowColLayout";
import { meldenCard } from "../../cards/meldenCard";





export const news20210708Page = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'nieuws/news20210708',
    // topImage: {
    //   type: 'teaserImage',
    //   image: {
    //     url: '/images/news/cRIVM/130852-1920.jpg',
    //     backgroundPosition: '70% 35%',
    //     height: 367,
    //   },
    // },
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
                    value: '/home'
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
                    value: '/nieuws/2021-05-27'
                  },
                }
              },
              {
                colClassName: 'col-12',
                itemKey: 'backToOverview',
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
                    value: '/nieuws/overzicht'
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
