import { Locale, nl } from 'date-fns/locale';

export const surveyDateLocales: Array<{ code: string, locale: Locale, format: string }> = [
    { code: 'nl', locale: nl, format: 'dd-MM-yyyy' },
];