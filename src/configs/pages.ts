import { PagesConfig } from "case-web-app-core/build/types/pagesConfig";
import { faqPage } from "./pages/faqPage";
import { homePage } from "./pages/homePage";
import { informatiePage } from "./pages/informatie";
import { meldenPage } from "./pages/meldenPage";
import { nieuwsPage } from "./pages/nieuws/nieuwsPage";
import { onderzoekContainerPage } from "./pages/onderzoek";
import { settingsPage } from "./pages/settingsPage";
import { myTekenradarPage } from "./pages/myTekenradarPage";

const defaultRoutes = {
  auth: "/home",
  unauth: "/home",
  studyPage: "/home",
  surveyPage: "/surveys"
};

export const pagesConfig: PagesConfig = {
  defaultRoutes: defaultRoutes,
  pages: [
    homePage('/home'),
    onderzoekContainerPage('/onderzoek'),
    informatiePage('/informatie'),
    nieuwsPage('/nieuws'),
    faqPage('/faq'),
    meldenPage('/melden'),
    settingsPage('/settings'),
    myTekenradarPage('/my-tekenradar'),
  ]
}
