import { PageConfig } from "case-web-app-core/build/types/pagesConfig";
import { infoPageLayout } from "../../../layout/pages/infoPageLayout";
import { pageSection } from "../../../layout/rows/pageSection";
import { PageItemWithCol, simpleRowColLayout } from "../../../layout/rows/simpleRowColLayout";
import { meldenCard } from "../../cards/meldenCard";
import { NewsItem } from "./newsItems";

export const renderNewsItemPage = (newsItem: NewsItem, previousItem?: NewsItem, nextItem?: NewsItem): PageConfig => {

  const references: PageItemWithCol[] = [
    {
      colClassName: nextItem ? 'col-12 col-sm-6' : 'col-12',
      itemKey: previousItem ? `global:${previousItem.url.substring(1).replaceAll('/', '.')}` : 'global:nieuws.backToHomeCard',
      className: "h-100",
      config: {
        type: 'actionCard',
        bodyBgImage: {
          url: previousItem?.cardContent.imageURL ? previousItem?.cardContent.imageURL : '/images/no-license/waar-leven-teken.jpg',
          backgroundPosition: '50% 50%',
        },
        hideBodyContent: true,
        action: {
          type: 'navigate',
          value: previousItem ? previousItem.url : '/home'
        },
      }
    },
  ];

  if (nextItem) {
    references.push({
      colClassName: 'col-12 col-sm-6',
      itemKey: `global:${nextItem.url.substring(1).replaceAll('/', '.')}`,
      className: "h-100",
      config: {
        type: 'actionCard',
        hideBodyContent: true,
        action: {
          type: 'navigate',
          value: nextItem.url
        },
      }
    })
  }

  references.push({
    colClassName: 'col-12',
    itemKey: 'global:nieuws.backToOverviewCard',
    className: 'h-100',
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
  })

  return infoPageLayout({
    path: newsItem.url,
    pageKey: newsItem.url.substring(1),
    topImage: newsItem.pageContent.teaserImage.use ? {
      type: 'teaserImage',
      image: {
        url: newsItem.pageContent.teaserImage.url ? newsItem.pageContent.teaserImage.url : newsItem.cardContent.imageURL,
        backgroundPosition: newsItem.pageContent.teaserImage.backgroundPosition,
        height: newsItem.pageContent.teaserImage.height,
        copyrightNotice: newsItem.pageContent.teaserImage.imageCopyRightLabel,
        copyrightNoticeXAlignment: 'start'
      },
    } : undefined,
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
            rowClassNameOverride: 'row gy-2',
            items: references,
          })
        ]
      })
    ]
  });
}
