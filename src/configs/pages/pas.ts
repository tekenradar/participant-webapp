import { PageConfig } from "case-web-app-core/build/types/pagesConfig";
import { infoPageLayout } from "../../layout/pages/infoPageLayout";
import { meldenCard } from "../cards/meldenCard";

export const pasPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'pas',
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

    ]
  });
}
