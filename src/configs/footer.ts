import { FooterConfig } from "case-web-app-core/build/types/footerConfig";

export const footerConfig: FooterConfig = {
  columns: [
    {
      columnKey: 'partners',
      classNameOverride: 'col-12 col-md-10 col-lg-6 col-xl-4 mt-3 text-white',
      items: [
        {
          type: "external",
          itemKey: "rivm",
          value: "/informatie/rivm"
          //value: "https://twitter.com/rivm",
          //iconClass: "fab fa-twitter"
        },
        {
          type: "external",
          itemKey: "wur",
          value: "/informatie/wageningen-university"
          //value: "https://www.wur.nl/",
          //iconClass: "fab fa-facebook-square"
        },
        {
          type: "external",
          itemKey: "fsd",
          value: "/informatie/fsd"
          //value: "https://www.fsd.nl/",
          //iconClass: "fab fa-facebook-square"
        },
        {
          type: "external",
          itemKey: "amc",
          value: "/informatie/amc"
          //value: "https://www.amc.nl/web/specialismen/expertisecentra-een-overzicht/amsterdam-umc-multidisciplinair-lymeziekte-centrum-amlc.htm",
          //iconClass: "fab fa-facebook-square"
        },
        {
          type: "external",
          itemKey: "radboudumc",
          value: "/informatie/radboud"
          //value: "https://www.radboudumc.nl/patientenzorg/aandoeningen/lymeziekte",
          //iconClass: "fab fa-facebook-square"
        },
      ]
    },
    {
      columnKey: 'about',
      classNameOverride: 'col-12 col-md-10 col-lg-6 col-xl-4 mt-3 text-white',
      items: [
        {
          type: "internal",
          itemKey: "contact",
          value: "/contact"
        },
        {
          type: "internal",
          itemKey: "privacy",
          value: "/privacy"
        },
        {
          type: "internal",
          itemKey: "disclaimer",
          value: "/disclaimer"
        },
        {
          type: "internal",
          itemKey: "accessibility",
          value: "/accessibility"
        },
      ]
    }
  ]
}
