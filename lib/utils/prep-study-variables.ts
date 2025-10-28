import { StudyVariableFromServer as ServerStudyVariable } from "../server/data-fetching/study-variables";
import { StudyVariable } from "survey-engine/data_types";


export const prepStudyVariables = (studyVariables: ServerStudyVariable[]): {
    [key: string]: StudyVariable;
} => {
    const studyVariablesObject: {
        [key: string]: StudyVariable;
    } = {};
    studyVariables.forEach((variable) => {
        if (variable.value === null || variable.value === undefined) {
            return;
        }
        switch (variable.type) {
            case 'date':
                if (typeof variable.value === 'string') {
                    const parsedValue = new Date(variable.value);
                    if (!(parsedValue instanceof Date) || isNaN(parsedValue.getTime())) {
                        return;
                    }
                    studyVariablesObject[variable.key] = {
                        value: parsedValue,
                        type: variable.type,
                    };
                } else if (variable.value instanceof Date) {
                    studyVariablesObject[variable.key] = {
                        value: variable.value,
                        type: variable.type,
                    };
                } else {
                    return;
                }
                break;
            case 'string':
                studyVariablesObject[variable.key] = {
                    value: variable.value as string,
                    type: variable.type,
                };
                break;
            case 'int':
                studyVariablesObject[variable.key] = {
                    value: variable.value as number,
                    type: variable.type,
                };
                break;
            case 'float':
                studyVariablesObject[variable.key] = {
                    value: variable.value as number,
                    type: variable.type,
                };
                break;
            case 'boolean':
                studyVariablesObject[variable.key] = {
                    value: variable.value as boolean,
                    type: variable.type,
                };
                break;
            default:
                studyVariablesObject[variable.key] = {
                    value: variable.value,
                    type: variable.type,
                };
        }
    });
    return studyVariablesObject;
}