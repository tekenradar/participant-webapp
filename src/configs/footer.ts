import { FooterConfig } from "case-web-app-core/build/types/footerConfig";

export const footerConfig: FooterConfig = {
  columns: [
    {
      columnKey: 'partners',
      items: [
        {
          type: "external",
          itemKey: "rivm",
          value: "https://twitter.com/rivm",
          //iconClass: "fab fa-twitter"
        },
        {
          type: "external",
          itemKey: "wageningen",
          value: "https://",
          //iconClass: "fab fa-facebook-square"
        },
        {
          type: "external",
          itemKey: "other?",
          value: "https://",
          //iconClass: "fab fa-facebook-square"
        },
      ]
    },
    {
      columnKey: 'about',
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
