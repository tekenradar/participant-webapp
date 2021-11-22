import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { infoPageLayout } from "../../../../layout/infoPageLayout";
import { meldenCard } from "../../../cards/meldenCard";


export const artseninfoPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'informatie/artsen/artseninfo',
    topImage: {
      type: 'teaserImage',
      image: {
        url: '/images/no-license/hetGedrag.jpg',
        backgroundPosition: '70% 35%',
        height: 367,
      },
    },
    sideBarItems: [
      meldenCard(),
    ],
    bottomItems: [
      {
        itemKey: '1',
        config: {
          type: 'placeholder',
          label: 'patienten aanmelden',
          height: 150
        }
      },
    ],
  });
}
