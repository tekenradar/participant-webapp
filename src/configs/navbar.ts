import { NavbarConfig } from "case-web-app-core/build/types/navbarConfig";

export const navbarConfig: NavbarConfig = {
    breakpoint: 'lg',
    leftItems: [
        {
            type: 'internal',
            // hideWhen: 'auth',
            itemKey: 'Home',
            url: '/home',
        },
        {
          type: 'internal',
          // hideWhen: 'auth',
          itemKey: 'Informatie',
          url: '/informatie',
      },
      {
        type: 'internal',
        // hideWhen: 'auth',
        itemKey: 'FAQ',
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
