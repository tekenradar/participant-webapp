import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { archief2012Page } from "./archief/archief2012Page";
import { archief2013Page } from "./archief/archief2013Page";
import { archief2014Page } from "./archief/archief2014Page";
import { archief2015Page } from "./archief/archief2015Page";
import { archief2016Page } from "./archief/archief2016Page";
import { archief2017Page } from "./archief/archief2017Page";
import { archief2018Page } from "./archief/archief2018Page";
import { archief2019Page } from "./archief/archief2019Page";
import { news20200622Page } from "./news20200622Page";
import { news20200623Page } from "./news20200623Page";
import { news20200624Page } from "./news20200624Page";
import { news20210419Page } from "./news20210419Page";
import { news20210527Page } from "./news20210527Page";
import { news20210708Page } from "./news20210708Page";
//import { news20220424Page } from "./news20220424Page"; AMC berciht dat niet doorging
import { news20220425Page } from "./news20220425Page";

import { newsPage } from "./newsPage";


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
    news20220425Page(`${path}/2022-04-25`),
    // news20220424Page(`${path}/2022-04-24`),
    news20210708Page(`${path}/2021-07-08`),
    news20210527Page(`${path}/2021-05-27`),
    news20210419Page(`${path}/2021-04-19`),
    news20200624Page(`${path}/2020-06-24`),
    news20200623Page(`${path}/2020-06-23`),
    news20200622Page(`${path}/2020-06-22`),

  ];

  return {
    path: path,
    pageKey: 'news',
    hideTitleBar: true,
    rows: [],
    subPages: {
      pages: nieuwsSubPages
    },
  }
}
