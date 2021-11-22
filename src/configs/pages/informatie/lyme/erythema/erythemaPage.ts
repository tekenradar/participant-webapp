import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { infoPageLayout } from "../../../../../layout/infoPageLayout"
import { meldenCard } from "../../../../cards/meldenCard";

export const erythemaPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'informatie/erythema/erythema',
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
          label: 'back to overview',
          height: 150
        }
      }, {
        itemKey: '2',
        config: {
          type: 'placeholder',
          label: 'another topic',
          height: 150
        }
      }, {
        itemKey: '3',
        config: {
          type: 'placeholder',
          label: 'another article',
          height: 150
        }
      }, {
        itemKey: '4',
        config: {
          type: 'placeholder',
          label: 'next article',
          height: 150
        }
      }
    ],
  });
}
