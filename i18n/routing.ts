import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = [
    'nl'
];


export const routing = defineRouting({
    locales: locales,
    defaultLocale: 'nl',
    localePrefix: 'as-needed'
});

export const { usePathname, useRouter } = createNavigation(routing);