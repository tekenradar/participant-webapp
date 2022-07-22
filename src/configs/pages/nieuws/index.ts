import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { archief2012Page } from "./archief/archief2012Page";
import { archief2013Page } from "./archief/archief2013Page";
import { archief2014Page } from "./archief/archief2014Page";
import { archief2015Page } from "./archief/archief2015Page";
import { archief2016Page } from "./archief/archief2016Page";
import { archief2017Page } from "./archief/archief2017Page";
import { archief2018Page } from "./archief/archief2018Page";
import { archief2019Page } from "./archief/archief2019Page";
import { renderNewsItemPage } from "./newsItemPage";
import { newsItems } from "./newsItems";

import { newsPage } from "./newsPage";

const getNewsItemsPages = (): PageConfig[] => {
  const pages: PageConfig[] = []
  for (let i = 0; i < newsItems.length; i++) {
    const next = i < 1 ? undefined : newsItems[i - 1];
    const prev = i >= newsItems.length - 1 ? undefined : newsItems[i + 1];
    pages.push(renderNewsItemPage(newsItems[i], prev, next))
  }

  return pages;
}

export const nieuwsContainerPage = (path: string): PageConfig => {
  const nieuwsSubPages = [
    newsPage(`${path}/overzicht`),
    // archief sub-pages
    archief2012Page(`${path}/archief2012`),
    archief2013Page(`${path}/archief2013`),
    archief2014Page(`${path}/archief2014`),
    archief2015Page(`${path}/archief2015`),
    archief2016Page(`${path}/archief2016`),
    archief2017Page(`${path}/archief2017`),
    archief2018Page(`${path}/archief2018`),
    archief2019Page(`${path}/archief2019`),
    // news sub-pages
    // news20220615Page(`${path}/2022-06-15`),
    ...getNewsItemsPages(),
  ];

  return {
    path: path,
    pageKey: 'news',
    hideTitleBar: true,
    rows: [],
    subPages: {
      defaultRoutes: {
        auth: '/404',
        unauth: '/404'
      },
      pages: nieuwsSubPages
    },
  }
}
