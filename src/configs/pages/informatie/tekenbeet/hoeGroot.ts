import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { infoPageLayout } from "../../../../layout/infoPageLayout"

export const hoeGrootPage = (path: string): PageConfig => {
  return infoPageLayout({
    path: path,
    pageKey: 'informatie/tekenbeet/hoeGroot',
    topImage: {
      type: 'teaserImage',
      image: {
        url: '/images/no-license/waar-leven-teken.jpg',
        backgroundPosition: '70% 35%',
        height: 367,
      },
    },
    sideBarItems: [
      {
        itemKey: '1',
        config: {
          type: 'placeholder',
          label: 'Tekenbeet melden',
          height: 400
        }
      }
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
