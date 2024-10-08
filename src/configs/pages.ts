import { PagesConfig } from "case-web-app-core/build/types/pagesConfig";
import { faqPage } from "./pages/faqPage";
import { homePage } from "./pages/homePage";
import { informatiePage } from "./pages/informatie";
import { meldenPage } from "./pages/meldenPage";
import { nieuwsContainerPage } from "./pages/nieuws";
import { onderzoekContainerPage } from "./pages/onderzoek";
import { settingsPage } from "./pages/settingsPage";
import { myTekenradarPage } from "./pages/myTekenradarPage";
import { contactPage } from "./pages/contactPage";
import { privacyPage } from "./pages/privacyPage";
import { medischePage } from "./pages/medischePage";
import { toeganPage } from "./pages/toeganPage";
import { notFoundPage } from "./pages/notFoundPage";
import { pasPage } from "./pages/pas";
import { lymeProspectPlusPage } from "./pages/lymeProspectPlusPage";

const defaultRoutes = {
  auth: "/my-tekenradar",
  unauth: "/home",
  studyPage: "/my-tekenradar",
  surveyPage: "/surveys",
  notFound: "/404"
};

export const pagesConfig: PagesConfig = {
  defaultRoutes: defaultRoutes,
  pages: [
    homePage('/home'),
    onderzoekContainerPage('/onderzoek'),
    informatiePage('/informatie'),
    nieuwsContainerPage('/nieuws'),
    pasPage('/pas'),
    faqPage('/faq'),
    meldenPage('/melden'),
    lymeProspectPlusPage('/lymeProspectPlus'),
    settingsPage('/settings'),
    contactPage('/contact'),
    privacyPage('/privacy'),
    medischePage('/disclaimer'),
    toeganPage('/accessibility'),
    myTekenradarPage('/my-tekenradar'),
    notFoundPage('/404'),
  ]
}
