import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { onderzoekPage } from "./onderzoekPage";

import { doelenOnderzoekPage } from "./doelen/doelenOnderzoekPage";
import { lymeProspectPage} from "./onderzoeken/lymeProspectPage";
import { pandoraPage } from "./onderzoeken/pandoraPage";
import { preventieveAntibioticaPage } from "./onderzoeken/preventieveAntibioticaPage";
import { victoryPage } from "./onderzoeken/victoryPage";
import { vragenlijstPage } from "./onderzoeken/vragenlijstPage";
import { cijfersPage } from "./resultaten/cijfersPage";
import { publicatiesPage } from "./resultaten/publicatiesPage";




export const onderzoekContainerPage = (path: string): PageConfig => {
  const onderzoekSubPages = [
    onderzoekPage(`${path}/overzicht`),
    // doelen sub-pages
    doelenOnderzoekPage(`${path}/doelen`),
    // onderzoeken sub-pages
    lymeProspectPage(`${path}/lymeProspect`),
    pandoraPage(`${path}/pandora`),
    preventieveAntibioticaPage(`${path}/preventieveAntibiotica`),
    victoryPage(`${path}/victory`),
    vragenlijstPage(`${path}/vragenlijst`),
    // resultaten sub-pages
    cijfersPage(`${path}/cijfers`),
    publicatiesPage(`${path}/publicaties`),
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
