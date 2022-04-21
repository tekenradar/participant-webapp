import { PageConfig } from "case-web-app-core/build/types/pagesConfig"
import { onderzoekPage } from "./onderzoekPage";
import { lymeProspectPage } from "./onderzoeken/lymeProspectPage";
import { pandoraPage } from "./onderzoeken/pandoraPage";
//import { Valor_AMCPage } from "./onderzoeken/Valor_AMCPage";
import { preventieveAntibioticaPage } from "./onderzoeken/preventieveAntibioticaPage";
import { victoryPage } from "./onderzoeken/victoryPage";
import { vragenlijstPage } from "./onderzoeken/vragenlijstPage";
import { cijfersPage } from "./resultaten/cijfersPage";
import { publicatiesPage } from "./resultaten/publicatiesPage";
import { voorArtsenPage } from "./voorArtsen/voorArtsenPage";




export const onderzoekContainerPage = (path: string): PageConfig => {
  const onderzoekSubPages = [
    onderzoekPage(`${path}/overzicht`),
    // onderzoeken sub-pages
    lymeProspectPage(`${path}/lymeProspect`),
    pandoraPage(`${path}/pandora`),
    //Valor_AMCPage(`${path}/Valor_AMC`),
    preventieveAntibioticaPage(`${path}/preventieveAntibiotica`),
    victoryPage(`${path}/victory`),
    vragenlijstPage(`${path}/vragenlijst`),
    // resultaten sub-pages
    cijfersPage(`${path}/cijfers`),
    publicatiesPage(`${path}/publicaties`),
    // voor artsen sub-pages
    voorArtsenPage(`${path}/voorArtsen`)
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
