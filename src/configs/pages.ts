import { PagesConfig } from "case-web-app-core/build/types/pagesConfig";
import { homePage } from "./pages/homePage";

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
    ]
}
