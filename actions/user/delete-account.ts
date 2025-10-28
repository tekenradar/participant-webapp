'use server'

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { logout } from "../auth/logout";
import { SurveyResponse } from "survey-engine/data_types";

export const deleteAccount = async (
    exitSurveyResponse?: SurveyResponse
) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'DELETE',
            body: JSON.stringify({
                exitSurveyResponse,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to delete account: ${resp.status} - ${resp.body.error}` };
    }

    await logout('/');

    return resp.body;
}