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
  },
  {
    "year": 2021,
    "url": "/nieuws/2021-07-08",
    "cardContent": {
      "imageURL": "/images/news/cRIVM/130852-1920.jpg",
    },
    "pageContent": {
      "teaserImage": {
        "use": true,
        "url": "/images/news/cRIVM/130852-1920.jpg",
        "height": 367,
        "backgroundPosition": "70% 35%"
      }
    }
  },
  {
    "year": 2021,
    "url": "/nieuws/2021-05-27",
    "cardContent": {
      "imageURL": "/images/news/Nagelteek_170218496.jpg",
    },
    "pageContent": {
      "teaserImage": {
        "use": true,
        "url": "/images/news/Nagelteek_170218496.jpg",
        "height": 367,
        "backgroundPosition": "50% 15%"
      }
    }
  },
  {
    "year": 2021,
    "url": "/nieuws/2021-04-19",
    "cardContent": {
      "imageURL": "/images/news/LP_KIDS.jpg",
    },
    "pageContent": {
      "teaserImage": {
        "use": true,
        "url": "/images/news/LP_KIDS.jpg",
        "height": 367,
        "backgroundPosition": "70% 35%"
      }
    }
  },

  {
    "year": 2020,
    "url": "/nieuws/2020-06-24",
    "cardContent": {
      "imageURL": "/images/news/cRIVM/77077-1920.jpg",
      "imageCopyRightLabel": "© RIVM",
    },
    "pageContent": {
      "teaserImage": {
        "use": true,
        "url": "/images/news/cRIVM/77077-1920.jpg",
        "height": 367,
        "backgroundPosition": "30% 65%"
      }
    }
  },
  {
    "year": 2020,
    "url": "/nieuws/2020-06-23",
    "cardContent": {
      "imageURL": "/images/news/cOTHER/tekenapp.jpeg",
      "imageCopyRightLabel": "© Nature Today",
      "imageAlwaysOnLeft": true
    },
    "pageContent": {
      "teaserImage": {
        "use": false,
      }
    }
  },
  {
    "year": 2020,
    "url": "/nieuws/2020-06-22",
    "cardContent": {
      "imageURL": "/images/news/foto-teek.jpg",
      "imageAlwaysOnLeft": true
    },
    "pageContent": {
      "teaserImage": {
        "use": true,
        "url": "/images/news/foto-teek.jpg",
        "height": 367,
        "backgroundPosition": "30% 65%"
      }
    }
  },
]
// Manage files:
// - locales/nl/globals.json > nieuws.<url>   --> for card on the homepage and news page and reference cards (bottom of news pages)
// - locales/nl/niews/<url>.json              --> for page title
// - locales/nl/niews/<url>.md                --> for page content
