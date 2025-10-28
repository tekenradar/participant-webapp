'use server'

import { auth } from "@/auth"
import { fetchCASEParticipantAPI } from "../case-backend";
import { SurveyInfo } from "./survey";

interface Pagination {
    totalCount: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
}

export interface ResponseExport {
    ID: string;
    submitted: number;
    opened: number;
    arrived: number;
    engineVersion: string;
    language: string;
    participantID: string;
    session: string;
    version: string;
    [attributeKey: string]: string | number | object;
}

export const getSurveyResponses = async (studyKey: string, surveyKey: string, profileId: string, limit: number = 100): Promise<{
    status?: number;
    error?: string;
    pagination?: Pagination,
    responses?: ResponseExport[],
}> => {
    const filter = encodeURIComponent('{}');
    const sort = encodeURIComponent('{ "arrivedAt": -1 }');
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }
    const url = `/v1/study-service/participant-data/${studyKey}/responses?pid=${profileId}&surveyKey=${surveyKey}&limit=${limit}&sort=${sort}&filter=${filter}`;
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

export interface ConfidentialResponse {
    participantID: string;
    entryID: string;
    responseKey: string;
    value?: string;
}

export const getConfidentialSurveyResponse = async (studyKey: string, responseKey: string, profileId: string): Promise<{
    error?: string;
    status?: number;
    confidentialResponse?: ConfidentialResponse[];
}> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }
    const url = `/v1/study-service/participant-data/${studyKey}/confidential-response?pid=${profileId}&key=${responseKey}`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch confidential survey: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}

export interface SubmissionHistory {
    submissions: Array<{
        profileID: string;
        timestamp: number;
        surveyKey: string;
        versionId: string;
    }>;
    surveyInfos: Array<SurveyInfo>;
}

export const getSubmissionHistory = async (studyKey: string, profileIds: string[]): Promise<{
    status?: number;
    error?: string;
    submissionHistory?: SubmissionHistory;
}> => {
    const limit = 100;

    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }
    const search = new URLSearchParams();
    search.set("pids", profileIds.join(','));
    search.set("limit", limit.toString());
    const url = `/v1/study-service/participant-data/${studyKey}/submission-history?${search.toString()}`;
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