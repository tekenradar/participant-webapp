import { generalPages } from "#site/content";


export const getGeneralContent = async (locale: string, name: string) => {
    return generalPages.find(page => page.locale === locale && page.slugAsParams === name);
}