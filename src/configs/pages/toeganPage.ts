import { PageConfig } from "case-web-app-core/build/types/pagesConfig";
import { infoPageLayout } from "../../layout/pages/infoPageLayout";
import { pageSection } from "../../layout/rows/pageSection";
import { simpleRowColLayout } from "../../layout/rows/simpleRowColLayout";
import { meldenCard } from "../cards/meldenCard";

export const toeganPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: '/toegan',
    helmet: {
      override: 'global',
    },
    topImage: {
      type: 'teaserImage',
      image: {
        url: '/images/no-license/waar-leven-teken.jpg',
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
                itemKey: 'disclaimer',
                className: "mt-2",
                config: {
                  type: 'actionCard',
                  bodyBgImage: {
                    url: '/images/no-license/waar-leven-teken.jpg',
                    backgroundPosition: '50% 50%',
                  },
                  action: {
                    type: 'navigate',
                    value: '/disclaimer'
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
