import { PageConfig } from "case-web-app-core/build/types/pagesConfig"

import { tekenPage } from "./teken/tekenPage"
import { lymePage } from "./lyme/lymePage"
import { tekenradarPage } from "./tekenradar/tekenradarPage"
import { artseninfoPage } from "./artsen/artseninfoPage"

import { waarLevenTekenPage } from "./teken/tekeninfo/waarLevenTekenPage"
import { hetGedragPage } from "./teken/tekeninfo/hetGedragPage"
import { basiskennisTekenPage } from "./teken/tekeninfo/basiskennisTekenPage"
import { hoeveelBesmetPage } from "./teken/tekeninfo/hoeveelBesmet"
import { hyalommaPage } from "./teken/tekeninfo/hyalommaPage"
import { tekenbeetVoorkomenPage } from "./teken/tekeninfo/tekenbeetVoorkomenPage"
import { wanneerActiefPage } from "./teken/tekeninfo/wanneerActiefPage"
import { basiskennisTekenbeetPage } from "./teken/tekenbeetinfo/basiskennisTekenbeetPage"
import { controleerTekenbetenPage } from "./teken/tekenbeetinfo/controleerTekenbetenPage"
import { hoeGrootPage } from "./teken/tekenbeetinfo/hoeGrootPage"
import { hoeVerwijderPage } from "./teken/tekenbeetinfo/hoeVerwijderPage"
import { watMoetIkDoenPage } from "./teken/tekenbeetinfo/watMoetIkDoenPage"
import { basiskennisLymePage } from "./lyme/lymeinfo/basiskennisLymePage"
import { aanvullendeInfoPage } from "./lyme/lymeinfo/aanvullendeInfoPage"
import { antibioticaPage } from "./lyme/lymeinfo/antibioticaPage"
import { bloedonderzoekPage } from "./lyme/lymeinfo/bloedonderzoekPage"
import { hoeKrijgJeLymePage } from "./lyme/lymeinfo/hoeKrijgJeLymePAge"
import { immuunsysteemPage } from "./lyme/lymeinfo/immuunsysteemPage"
import { lymeKindPage } from "./lyme/lymeinfo/lymeKindPage"
import { lymeVoorkomenPage } from "./lyme/lymeinfo/lymeVoorkomenPage"
import { lymeZonderTekenbeetPage } from "./lyme/lymeinfo/lymeZonderTekenbeetPage"
import { naEenTekenbeetPage } from "./lyme/lymeinfo/naEenTekenbeetPage"
import { risicoLymePage } from "./lyme/lymeinfo/risicoLymePage"
import { roodPlekjePage } from "./lyme/lymeinfo/roodPlekjePage"
import { wanneerHuisartsPage } from "./lyme/lymeinfo/wanneerHuisartsPage"
import { erythemaPage } from "./lyme/erythema/erythemaPage"
import { basiskennisLymeInNLPage } from "./lyme/lymeInNL/basiskennisLymeInNLPage"
import { LymeEnWerkPage } from "./lyme/lymeInNL/LymeEnWerkPage"
import { basiskennisAndereZiektenPage } from "./lyme/andereZiekten/basiskennisAndereZiektenPage"
import { TekenencefalitisPage } from "./lyme/andereZiekten/TekenencefalitisPage"
import { doelenTrPage } from "./tekenradar/tekenradarinfo/doelenTrPage"
import { wageningenPage } from "./tekenradar/partner/wageningenPage"
import { rivmPage } from "./tekenradar/partner/rivmPage"
import { natuurkalenderPage } from "./tekenradar/partner/natuurkalenderPage"
import { natuurberichtPage } from "./tekenradar/partner/natuurberichtPage"
import { zonMwPage } from "./tekenradar/financiers/zonMwPage"
import { vwsPage } from "./tekenradar/financiers/vwsPage"




export const informatiePage = (path: string): PageConfig => {
  const infoPages = [
    // overview pages
    tekenPage(`${path}/teken`),
    lymePage(`${path}/lyme`),
    tekenradarPage(`${path}/tekenradar`),
    artseninfoPage(`${path}/artsen`),

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

    //lymeinfo
    basiskennisLymePage(`${path}/basiskennis-lyme`),
    hoeKrijgJeLymePage(`${path}/hoe-krijg-je-de-ziekte-van-lyme`),
    lymeKindPage(`${path}/hoe-herken-ik-een-tekenbeet-of-ziekte-van-lyme-bij-een-kind`),
    naEenTekenbeetPage(`${path}/waar-moet-ik-op-letten-na-een-tekenbeet`),
    roodPlekjePage(`${path}/klein-rood-plekje-na-tekenbeet`),
    wanneerHuisartsPage(`${path}/wanneer-moet-ik-naar-de-huisarts`),
    immuunsysteemPage(`${path}/de-ziekte-van-lyme-en-het-immuunsysteem`),
    lymeZonderTekenbeetPage(`${path}/lyme-zonder-tekenbeet`),
    antibioticaPage(`${path}/welke-behandeling-of-antibiotica-worden-gegeven-bij-lyme`),
    risicoLymePage(`${path}/wie-loopt-extra-risico-op-lyme`),
    lymeVoorkomenPage(`${path}/hoe-lyme-voorkomen`),
    bloedonderzoekPage(`${path}/wanneer-wordt-bloedonderzoek-gedaan-voor-lyme`),
    aanvullendeInfoPage(`${path}/aanvullende-informatie`),

    //erythemainfo
    erythemaPage(`${path}/erythema-migrans`),

    //LymeinNLinfo
    basiskennisLymeInNLPage(`${path}/lyme-in-nederland`),
    LymeEnWerkPage(`${path}/lyme-en-werk`),

    //andereZiekteninfo
    basiskennisAndereZiektenPage(`${path}/andere-ziekten-door-teken-en-co-infecties`),
    TekenencefalitisPage(`${path}/tekenencefalitis`),

    //tekenradarinfo
    doelenTrPage(`${path}/doelen-tekenradar`),

    //partner
    wageningenPage(`${path}/wageningen-university`),
    rivmPage(`${path}/rivm`),
    natuurkalenderPage(`${path}/natuurkalender`),
    natuurberichtPage(`${path}/natuurbericht`),

    //financiers
    zonMwPage(`${path}/zonMw`),
    vwsPage(`${path}/ministerie-van-vws`),





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
