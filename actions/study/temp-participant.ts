'use server';

import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { SurveyResponse } from "survey-engine/data_types";

export const registerTempParticipant = async (studyKey: string) => {
    const instanceID = process.env.INSTANCE_ID;

    const url = `/v1/study-service/temp-participant/register`;
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({
                studyKey,
                instanceId: instanceID,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to register temp participant: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}

export const submitResponseForTempParticipant = async (studyKey: string, pid: string, response: SurveyResponse) => {
    const instanceID = process.env.INSTANCE_ID;

    const url = `/v1/study-service/temp-participant/submit-response`;
    const resp = await fetchCASEParticipantAPI(
        url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({
                studyKey,
                instanceId: instanceID,
                pid,
                response,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to submit response: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}