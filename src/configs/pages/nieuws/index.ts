import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { archief2012Page } from "./archief/archief2012Page";
import { nieuwsPage } from "./nieuwsPage";






export const nieuwsContainerPage = (path: string): PageConfig => {
  const nieuwsSubPages = [
    nieuwsPage(`${path}/nieuws`),
    // nieuws sub-pages
    archief2012Page(`${path}/nieuws/archief2012`)
  ];

  return {
    path: path,
    pageKey: 'nieuws',
    hideTitleBar: true,
    rows: [],
    subPages: {
      pages: nieuwsSubPages
    },
  }
}
