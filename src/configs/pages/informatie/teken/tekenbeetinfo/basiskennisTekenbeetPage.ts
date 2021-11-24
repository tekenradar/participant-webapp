import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { infoPageLayout } from "../../../../../layout/infoPageLayout"
import { meldenCard } from "../../../../cards/meldenCard";

export const basiskennisTekenbeetPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'informatie/tekenbeetinfo/basiskennisTekenbeet',
    topImage: {
      type: 'teaserImage',
      image: {
        url: '/images/no-license/teaser_tekenbeet.jpg',
        backgroundPosition: '70% 80%',
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
