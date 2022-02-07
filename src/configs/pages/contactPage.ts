import { PageConfig } from "case-web-app-core/build/types/pagesConfig";
import { infoPageLayout } from "../../layout/pages/infoPageLayout";
import { pageSection } from "../../layout/rows/pageSection";
import { simpleRowColLayout } from "../../layout/rows/simpleRowColLayout";
import { meldenCard } from "../cards/meldenCard";

export const contactPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: '/contact',
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
            ]
          })
        ]
      })

    ]
  });
}
