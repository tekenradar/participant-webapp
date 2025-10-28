import { ItemComponent, LocalizedString, LocalizedObject, ResponseItem } from "survey-engine/data_types";
import { Locale, format } from 'date-fns';


export interface CommonResponseComponentProps {
    parentKey: string;
    compDef: ItemComponent;
    prefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    languageCode: string;
    showOptionKey?: boolean;
    disabled?: boolean;
    showErrors?: boolean;
    dateLocales?: Array<{ code: string, locale: Locale, format: string }>;
}

export const getItemComponentTranslationByRole = (components: Array<ItemComponent>, role: string, code: string): string | null => {
    const comp = components.find(comp => comp.role === role);
    if (!comp || comp.displayCondition === false) {
        return null;
    }
    const translation = getLocaleStringTextByCode(comp.content, code);
    if (!translation) {
        console.warn('no translation found for given language code: ' + code);
        return null;
    }
    return translation;
}

export const getLocaleStringTextByCode = (translations: LocalizedObject[] | undefined, code: string): string | undefined => {
    if (!translations) { return; }
    const translation = (translations.find(cont => cont.code === code) as LocalizedString);
    if (!translation) {
        if (translations.length > 0) {
            return (translations[0] as LocalizedString).resolvedText;
        }
        return;
    }
    return translation.resolvedText;
}

export const getLocaleStringDateByCode = (translations: LocalizedObject[] | undefined, code: string, dateFormat: string, dateLocales?: Array<{ code: string, locale: Locale, format: string }>): string | undefined => {
    if (!translations) { return; }
    let translation = (translations.find(cont => cont.code === code) as LocalizedString);
    if (!translation) {
        if (translations.length > 0) {
            translation = (translations[0] as LocalizedString);
        }
        return;
    }
    const parts = (translations[0] as LocalizedString).parts;
    if (!parts || parts.length < 1) {
        return;
    }

    let currentDate = new Date();
    if (typeof (parts[0]) === "number") {
        currentDate = new Date(parts[0] * 1000);
    }
    let dateString = 'invalid date/format';
    try {
        dateString = format(currentDate, dateFormat, { locale: dateLocales?.find(loc => loc.code === code)?.locale });
    } catch (error) {
        console.error('Error formatting date: ' + error);
    }
    return dateString
}

export const getItemComponentByRole = (components: Array<ItemComponent> | undefined, role: string): ItemComponent | undefined => {
    if (!components) { return; }
    return components.find(comp => comp.role === role);

}

export const getItemComponentsByRole = (components: Array<ItemComponent>, role: string): ItemComponent[] => {
    return components.filter(comp => comp.role === role);
}

export const getStyleValueByKey = (styles: Array<{ key: string, value: string }> | undefined, key: string): string | undefined => {
    if (!styles) {
        return;
    }
    const object = styles.find(st => st.key === key);
    if (!object) {
        return;
    }
    return object.value;
}

export const getClassName = (styles?: Array<{ key: string, value: string }>): string | undefined => {
    return getStyleValueByKey(styles, 'className');
}

export const getLabelPlacementStyle = (styles?: Array<{ key: string, value: string }>): string | undefined => {
    return getStyleValueByKey(styles, 'labelPlacement');
}

export const getInputMaxWidth = (styles?: Array<{ key: string, value: string }>): string | undefined => {
    return getStyleValueByKey(styles, 'inputMaxWidth');
}

export const filterForBodyComponents = (components: Array<ItemComponent>): ItemComponent[] => {
    return components.filter(comp => {
        if (comp.displayCondition === false) {
            return false;
        }
        if (comp.role === 'title' || comp.role === 'subtitle' || comp.role === 'helpGroup' || comp.role === 'footnote') {
            return false;
        }
        return true;
    });
}

export const findTopComponents = (components: Array<ItemComponent>): ItemComponent[] => {
    const firstRgIndex = components.findIndex(comp => comp.role === 'responseGroup');
    if (firstRgIndex < 0) {
        return components;
    }
    return components.slice(0, firstRgIndex);
}

export const findResponseComponents = (components: Array<ItemComponent>): ItemComponent[] => {
    const firstRgIndex = components.findIndex(comp => comp.role === 'responseGroup');
    const lastRgIndex = components.findLastIndex(comp => comp.role === 'responseGroup');

    if (firstRgIndex < 0) {
        return [];
    }
    return components.slice(firstRgIndex, lastRgIndex + 1);
}

export const findBottomComponents = (components: Array<ItemComponent>): ItemComponent[] => {
    const lastRgIndex = components.findLastIndex(comp => comp.role === 'responseGroup');
    if (lastRgIndex < 0) {
        return [];
    }
    return components.slice(lastRgIndex + 1);
}
