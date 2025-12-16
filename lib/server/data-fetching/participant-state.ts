'use server'

import { auth } from "@/auth"
import { fetchCASEParticipantAPI } from "../case-backend";
import { AssignedSurvey } from "./survey";

export interface Participant {
    participantId: string;
    currentStudySession?: string;
    enteredAt: number;
    studyStatus: string;
    flags: {
        [key: string]: string;
    };
    assignedSurveys: Array<AssignedSurvey>;
    lastSubmissions?: {
        [key: string]: number;
    }
    messages?: Array<{
        id: string;
        scheduledFor: number;
        type: string;
    }>
}

export const getParticipantState = async (studyKey: string, profileId: string): Promise<{
    status?: number;
    error?: string;
    participant?: Participant,
}> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }
    const url = `/v1/study-service/participant-data/${studyKey}/participant-state?pid=${profileId}`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch participant state: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}
