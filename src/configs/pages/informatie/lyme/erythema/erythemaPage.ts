import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { infoPageLayout } from "../../../../../layout/pages/infoPageLayout"
import { meldenCard } from "../../../../cards/meldenCard";
import { simpleRowColLayout } from "../../../../../layout/rows/simpleRowColLayout";
import { pageSection } from "../../../../../layout/rows/pageSection";

export const erythemaPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'informatie/erythema/erythema',
    helmet: {
      override: 'local'
    },
    topImage: {
      type: 'teaserImage',
      image: {
        url: '/images/no-license/het-gedrag.jpg',
        backgroundPosition: '70% 35%',
        height: 367,
      },
    },
    mainColOptionalContent: [
      {
        itemKey: 'erythemaGallery',
        className: 'mt-2',
        config: {
          type: 'extension',
          config: {
            type: 'gallery'
          }
        }
      },
    ],
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
                colClassName: 'col-12',
                itemKey: 'backToOverview',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  bodyBgImage: {
                    url: '/images/no-license/waar-leven-teken.jpg',
                    backgroundPosition: '50% 50%',
                  },
                  action: {
                    type: 'navigate',
                    value: '/informatie/lyme'
                  },
                }
              },

            ]
          })
        ]
      })

    ]
  });
}
