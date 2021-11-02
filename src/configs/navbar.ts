import { NavbarConfig } from "case-web-app-core/build/types/navbarConfig";

export const navbarConfig: NavbarConfig = {
    breakpoint: 'lg',
    leftItems: [
        {
            type: 'internal',
            // hideWhen: 'auth',
            itemKey: 'home',
            url: '/home',
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
