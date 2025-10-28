import { ExpressionArg, LocalizedObject, LocalizedString } from "survey-engine/data_types";

export const getLocalizedString = (translations: LocalizedObject[] | undefined, code: string): string | undefined => {
    if (!translations) { return; }
    const translation = (translations.find(cont => cont.code === code) as LocalizedString);
    if (!translation) {
        if (translations.length > 0) {
            return (translations[0] as LocalizedString).parts.map(p => (p as ExpressionArg).str).join('');
        }
        return
    }
    return translation.parts.map(p => (p as ExpressionArg).str).join('');
}