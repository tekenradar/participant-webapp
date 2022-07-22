export interface NewsItem {
  url: string;
  year: number;
  cardContent: {
    imageURL: string;
  };
  pageContent: {
    teaserImage: {
      use: boolean;
      url?: string;
      height?: number;
      backgroundPosition?: string;
    },
  }
}

export const newsItems: NewsItem[] = [
  {
    "year": 2022,
    "url": "/nieuws/2022-06-15",
    "cardContent": {
      "imageURL": "/images/SK-Lab-RIVM-66.jpg",
    },
    "pageContent": {
      "teaserImage": {
        "use": false,
      }
    }
  },
  {
    "year": 2022,
    "url": "/nieuws/2022-04-25",
    "cardContent": {
      "imageURL": "/images/news/cRIVM/iStock-543087666-1920.jpg",
    },
    "pageContent": {
      "teaserImage": {
        "use": true,
        "url": "/images/news/cRIVM/iStock-543087666-1920.jpg",
        "height": 367,
        "backgroundPosition": "70% 35%"
      }
    }
  }
]
// Manage files:
// - locales/nl/globals.json > nieuws.<url>   --> for card on the homepage and news page and reference cards (bottom of news pages)
// - locales/nl/niews/<url>.json              --> for page title
// - locales/nl/niews/<url>.md                --> for page content
