import { NavbarConfig } from "case-web-app-core/build/types/navbarConfig";

export const navbarConfig: NavbarConfig = {
  breakpoint: 'lg',
  leftItems: [
    {
      type: 'internal',
      // hideWhen: 'auth',
      itemKey: 'home',
      url: '/home',
    },
    {
      type: 'internal',
      // hideWhen: 'auth',
      itemKey: 'onderzoek',
      url: '/onderzoek/overzicht',
    },
    {
      type: 'dropdown',
      // hideWhen: 'auth',
      itemKey: 'informatie',
      dropdownItems: [
        {
          type: 'internal',
          itemKey: 'teken',
          url: '/informatie/teken',
        },
        {
          type: 'internal',
          itemKey: 'lyme',
          url: '/informatie/lyme',
        },
        {
          type: 'internal',
          itemKey: 'tekenradar',
          url: '/informatie/tekenradar',
        }
      ]
    },
    {
      type: 'internal',
      // hideWhen: 'auth',
      itemKey: 'Nieuws',
      url: '/nieuws/overzicht',
    },
    {
      type: 'internal',
      // hideWhen: 'auth',
      itemKey: 'faq',
      url: '/faq',
    },
  ],
  unauthRightItems: [
    {
      type: 'internal',
      itemKey: 'participate',
      url: '/melden',
    },
    {
      type: 'dialog',
      itemKey: 'login',
      url: 'login',
    }
  ],
  rightItems: [
    {
      "type": "internal",
      "url": "/my-tekenradar",
      "itemKey": "myTekenradar",
      "iconClass": "fas fa-home"
    },
    {
      "type": "internal",
      "url": "/melden",
      "itemKey": "melden",
      "iconClass": "fas fa-notes-medical"
    },
    {
      "type": "internal",
      "url": "/settings",
      "itemKey": "settings",
      "iconClass": "fas fa-cog"
    }
  ]
}
