import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';


export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    // Ensure that the incoming locale is valid
    if (!locale || !routing.locales.includes(locale as string)) {
        locale = routing.defaultLocale;
    }


    return {
        locale,
        messages: (await import(`./translations/${locale}.json`)).default
    };
});