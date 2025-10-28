import { NavItem } from "./types";

export const shouldHideNavItem = (item: NavItem, isLoggedIn: boolean) => {
    if (item.hideWhen === 'loggedIn' && isLoggedIn) {
        return true;
    }

    if (item.hideWhen === 'loggedOut' && !isLoggedIn) {
        return true;
    }

    return false;
}