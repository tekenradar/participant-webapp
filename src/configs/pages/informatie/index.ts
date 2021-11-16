import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

import { tekenPage } from "./tekenPage"
import { lymePage } from "./lymePage"
import { tekenradarPage } from "./tekenradarPage"
import { artsenPage } from "./artsenPage"
import { waarLevenTekenPage } from "./tekeninfo/waarLevenTekenPage"


export const informatiePage = (path: string): PageConfig => {
  const infoPages = [
    // overview pages
    tekenPage(`${path}/teken`),
    lymePage(`${path}/lyme`),
    tekenradarPage(`${path}/tekenradar`),
    artsenPage(`${path}/artsen`),

    // subpages (content)
    waarLevenTekenPage(`${path}/waar-leven-teken`)
  ];

  return {
    path: path,
    pageKey: 'informatie',
    hideTitleBar: true,
    rows: [],
    subPages: {
      pages: infoPages
    },
  }
}
