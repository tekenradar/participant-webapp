import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

import { tekenPage } from "./tekenPage"
import { lymePage } from "./lymePage"
import { tekenradarPage } from "./tekenradarPage"
import { artsenPage } from "./artsenPage"
import { waarLevenTekenPage } from "./tekeninfo/waarLevenTekenPage"
import { hetGedragPage } from "./tekeninfo/hetGedragPage"
import { basiskennisTekenPage } from "./tekeninfo/basiskennisTekenPage"
import { hoeveelBesmetPage } from "./tekeninfo/hoeveelBesmet"
import { hyalommaPage } from "./tekeninfo/hyalommaPage"
import { tekenbeetVoorkomenPage } from "./tekeninfo/tekenbeetVoorkomenPage"
import { wanneerActiefPage } from "./tekeninfo/wanneerActiefPage"
import { basiskennisTekenbeetPage } from "./tekenbeet/basiskennisTekenbeetPage"
import { controleerTekenbetenPage } from "./tekenbeet/controleerTekenbetenPage"
import { hoeGrootPage } from "./tekenbeet/hoeGroot"
import { hoeVerwijderPage } from "./tekenbeet/hoeVerwijderPage"
import { watMoetIkDoenPage } from "./tekenbeet/watMoetIkDoen"

export const informatiePage = (path: string): PageConfig => {
  const infoPages = [
    // overview pages
    tekenPage(`${path}/teken`),
    lymePage(`${path}/lyme`),
    tekenradarPage(`${path}/tekenradar`),
    artsenPage(`${path}/artsen`),

    // subpages (content)
    //tekeninfo
    basiskennisTekenPage(`${path}/basiskennis-teken`),
    waarLevenTekenPage(`${path}/waar-leven-teken`),
    hetGedragPage(`${path}/het-gedrag-van-de-teek`),
    wanneerActiefPage(`${path}/wanneer-zijn-teken-actief`),
    hoeveelBesmetPage(`${path}/hoeveel-teken-zijn-besmet`),
    tekenbeetVoorkomenPage(`${path}/hoe-kan-ik-een-tekenbeet-voorkomen`),
    hyalommaPage(`${path}/hyalomma-teek`),

    //tekenbeetinfo
    basiskennisTekenbeetPage(`${path}/basiskennis-tekenbeet`),
    controleerTekenbetenPage(`${path}/hoe-controleer-ik-op-tekenbeten`),
    watMoetIkDoenPage(`${path}/wat-moet-ik-doen-bij-een-tekenbeet`),
    hoeVerwijderPage(`${path}/hoe-verwijder-ik-een-teek`),
    hoeGrootPage(`${path}/hoe-groot-is-de-kans-op-besmetting-na-een-tekenbeet`),



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
