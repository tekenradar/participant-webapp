import newsItemList from './newsItems.json';

export interface NewsItem {
  url: string;
  year: number;
  cardContent: {
    imageURL: string;
    imageCopyRightLabel?: string;
    imageAlwaysOnLeft?: boolean;
  };
  pageContent: {
    teaserImage: {
      use: boolean;
      url?: string;
      height?: number;
      backgroundPosition?: string;
      imageCopyRightLabel?: string;
    },
  }
}

export const newsItems: NewsItem[] = newsItemList.newsItems;
// Manage files:
// - locales/nl/globals.json > nieuws.<url>   --> for card on the homepage and news page and reference cards (bottom of news pages)
// - locales/nl/niews/<url>.json              --> for page title
// - locales/nl/niews/<url>.md                --> for page content
