import { PageConfig } from "case-web-app-core/build/types/pagesConfig";
import { infoPageLayout } from "../../layout/pages/infoPageLayout";

export const notFoundPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: '/notFound',
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

    ],
    bottomRows: [

    ]
  });
}
