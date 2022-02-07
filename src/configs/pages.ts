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
    nieuwsContainerPage('/nieuws'),
    faqPage('/faq'),
    meldenPage('/melden'),
    settingsPage('/settings'),
    contactPage('/contact'),
    privacyPage('/privacy'),
    myTekenradarPage('/my-tekenradar'),
  ]
}
