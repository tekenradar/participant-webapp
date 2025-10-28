import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "../case-backend";
import { LocalizedString, StudyVariable, Survey, SurveyResponse } from "survey-engine/data_types";

export interface SurveyWithContext {
    survey: Survey;
    context?: {
        studyVariables?: {
            [key: string]: StudyVariable;
        };
        participantFlags?: {
            [key: string]: string;
        }
    },
    prefill?: SurveyResponse;
}

export interface AssignedSurvey {
    studyKey: string;
    surveyKey: string;
    validFrom?: number;
    validUntil?: number;
    category: string;
    profileID: string;
}

export interface SurveyInfo {
    studyKey: string;
    surveyKey: string;
    name: LocalizedString[];
    description: LocalizedString[];
    typicalDuration: LocalizedString[];
    versionId: string;
}

export interface AssignedSurveys {
    surveys: AssignedSurvey[];
    surveyInfos: SurveyInfo[];
}


export const getSurveyWithContextForProfile = async (studyKey: string, surveyKey: string, profileId: string) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }
    const url = `/v1/study-service/participant-data/${studyKey}/survey/${surveyKey}?pid=${profileId}`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch survey: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}

export const getSurveyWithContextForTemporaryParticipant = async (studyKey: string, surveyKey: string, tempParticipantId?: string) => {
    const search = new URLSearchParams();
    search.set('instanceID', process.env.INSTANCE_ID || '');
    search.set('studyKey', studyKey);
    search.set('surveyKey', surveyKey);
    if (tempParticipantId) {
        search.set('pid', tempParticipantId);
    }

    const url = `/v1/study-service/temp-participant/survey?${search.toString()}`;
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch survey: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}

export const getAssignedSurveys = async (studyKey: string, profileIDs: string[]) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const search = new URLSearchParams();
    search.set("pids", profileIDs.join(','));

    const url = `/v1/study-service/participant-data/${studyKey}/surveys?${search.toString()}`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch surveys: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}