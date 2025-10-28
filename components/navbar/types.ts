export interface NavItem {
    key: string;
    href?: string;
    label: string;
    items?: NavItem[];
    hideWhen?: 'loggedIn' | 'loggedOut';
}