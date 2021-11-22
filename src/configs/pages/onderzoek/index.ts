import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { onderzoekPage } from "./onderzoekPage";

import { pandoraPage } from "./pandoraPage";
import { resultatenPage } from "./resultatenPage";
import { tekenverwachtingPAge } from "./tekenverwachtingPage";


export const onderzoekContainerPage = (path: string): PageConfig => {
  const onderzoekSubPages = [
    onderzoekPage(`${path}/overzicht`),
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
      pages: onderzoekSubPages
    },
  }
}
