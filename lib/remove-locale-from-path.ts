import { locales } from "@/i18n/routing";

export const removeLocaleFromPath = (path: string) => {
    locales.forEach((locale) => {
        const localePrefix = `/${locale}`;
        if (path.startsWith(localePrefix)) {
            path = path.replace(localePrefix, '');
        }
    })
    if (path === '') {
        path = '/';
    }
    return path;
}