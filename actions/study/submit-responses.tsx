'use server';

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { revalidatePath } from "next/cache";
import { SurveyResponse } from "survey-engine/data_types";

export const submitResponses = async (studyKey: string, profileID: string, response: SurveyResponse) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = `/v1/study-service/events/${studyKey}/submit`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({
                studyKey,
                profileID: profileID,
                response,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to submit response: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/')
    return resp.body;
}