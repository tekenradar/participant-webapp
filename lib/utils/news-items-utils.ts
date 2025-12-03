import { NewsItem, newsPages } from "@/.velite";

export const getSortedNewsArticles = async (locale: string, draftMode: boolean) => {
    const localeNews = filterNewsItemsForLocale(newsPages, locale, draftMode);
    return sortNewsItems(localeNews);
}

export const filterNewsItemsForYear = (newsItems: Array<NewsItem>, year: number) => {
    return newsItems.filter(newsItem => {
        return new Date(newsItem.date).getFullYear() === year;
    });
}

export const filterNewsItemsForLocale = (newsItems: Array<NewsItem>, locale: string, includeDrafts: boolean) => {
    return newsItems.filter(newsItem => {
        const published = new Date(newsItem.date) < new Date();
        return newsItem.locale === locale && (published || includeDrafts)
    });
}

export function sortNewsItems(newsItem: Array<NewsItem>) {
    return newsItem.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    });
}