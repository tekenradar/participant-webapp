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
        },
        {
          type: 'internal',
          itemKey: 'artsen',
          url: '/informatie/artsen',
        },

      ]
    },
    {
      type: 'internal',
      // hideWhen: 'auth',
      itemKey: 'faq',
      url: '/faq',
    },
    {
      type: 'internal',
      // hideWhen: 'auth',
      itemKey: 'Nieuws',
      url: '/nieuws',
    }
  ],
  rightItems: [
    {
      "type": "internal",
      "url": "/settings",
      "itemKey": "settings",
      "iconClass": "fas fa-cog"
    }
  ]
}
