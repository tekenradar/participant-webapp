import { PagesConfig } from "case-web-app-core/build/types/pagesConfig";
import { faqPage } from "./pages/faqPage";
import { homePage } from "./pages/homePage";
import { informatiePage } from "./pages/informatie";
import { nieuwsPage } from "./pages/nieuwsPage";
import { onderzoekPage } from "./pages/onderzoekPage";
import { meldenPage } from "./pages/meldenPage";

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
    onderzoekPage('/onderzoek'),
    informatiePage('/informatie'),
    faqPage('/faq'),
    nieuwsPage('/nieuws'),
    meldenPage('/melden'),
  ]
}
