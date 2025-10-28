'use server'

import { fetchCASEParticipantAPI } from "../case-backend";

export type StudyVariableType = 'string' | 'int' | 'float' | 'boolean' | 'date';

export interface StudyVariableFromServer {
    id: string;
    key: string;
    studyKey: string;
    valueUpdatedAt: string;
    type: StudyVariableType;
    value?: string | number | boolean | Date | null;
}

export const getStudyVariables = async (studyKey: string, instanceID: string): Promise<{
    status?: number;
    error?: string;
    variables?: StudyVariableFromServer[],
}> => {
    const url = `/v1/study-service/studies/${studyKey}/variables?instanceID=${instanceID}`;
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch study variables: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}

export const getStudyVariable = async (studyKey: string, instanceID: string, variableKey: string): Promise<{
    status?: number;
    error?: string;
    variable?: StudyVariableFromServer,
}> => {
    const url = `/v1/study-service/studies/${studyKey}/variables/${variableKey}?instanceID=${instanceID}`;
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch study variable: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}
