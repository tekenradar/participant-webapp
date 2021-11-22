import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

import { pandoraPage } from "./pandoraPage";
import { resultatenPage } from "./resultatenPage";
import { tekenverwachtingPAge } from "./tekenverwachtingPage";


export const onderzoekPage = (path: string): PageConfig => {
  const onderzoekPages = [
    // onderzoek sub-pages
    pandoraPage(`${path}/pandora`),
    resultatenPage(`${path}/resultaten`),
    tekenverwachtingPAge(`${path}/tekenverwachting`),
  ];

  return {
    path: path,
    pageKey: 'onderzoek',
    hideTitleBar: true,
    rows: [],
    subPages: {
      pages: onderzoekPages
    },
  }
}
