'use server';

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { AssignedSurvey } from "@/lib/server/data-fetching/survey";
import { redirect } from "next/navigation";
import { SurveyResponse } from "survey-engine/data_types";

export const submitResponses = async (
    studyKey: string,
    profileID: string,
    response: SurveyResponse,
    redirectUrl: string,
    ignoreImmediateSurveys?: boolean,
) => {
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

    let nextSurveyKey: string | undefined;
    if (!ignoreImmediateSurveys) {
        const assignedSurveys = resp.body.assignedSurveys;
        if (assignedSurveys && assignedSurveys.length > 0) {
            const now = Math.round(new Date().getTime() / 1000);
            const currentSurveyKey = response.key;
            const immediateSurveys = assignedSurveys.filter((s: AssignedSurvey) => {
                if (s.validFrom && s.validFrom > now) {
                    return false;
                }
                if (s.validUntil && s.validUntil < now) {
                    return false;
                }
                if (s.category !== 'immediate') {
                    return false;
                }
                if (s.surveyKey === currentSurveyKey) {
                    return false;
                }
                return true;
            });

            nextSurveyKey = immediateSurveys.length > 0 ? immediateSurveys[0].surveyKey : undefined;
        }
    }

    if (nextSurveyKey) {
        redirect(`/survey/${studyKey}/${nextSurveyKey}?pid=${profileID}&redirectUrl=${encodeURIComponent(redirectUrl)}`);
    } else {
        redirect(redirectUrl);
    }
}