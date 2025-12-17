'use server';

import { auth } from "@/auth";
import logger from "@/lib/logger";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { Participant } from "@/lib/server/data-fetching/participant-state";
import { AssignedSurvey } from "@/lib/server/data-fetching/survey";
import { deleteTempParticipantId, getTempParticipantId, setTempParticipantId } from "@/lib/server/temp-participant-cookie";
import { redirect } from "next/navigation";
import { SurveyResponse } from "survey-engine/data_types";

export const registerTempParticipant = async (studyKey: string): Promise<{ participant: Participant } | { error: string }> => {
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

export const submitResponseForTempParticipant = async (studyKey: string, response: SurveyResponse) => {
    const instanceID = process.env.INSTANCE_ID;
    let tempParticipantId = await getTempParticipantId();
    if (!tempParticipantId) {
        const regResp = await registerTempParticipant(studyKey);
        if ('error' in regResp) {
            return { error: `Failed to register temp participant: ${regResp.error}` };
        }
        tempParticipantId = regResp.participant.participantId;
        await setTempParticipantId(tempParticipantId);
    }

    logger.info(`Submitting response for temp participant "${tempParticipantId}" of study "${studyKey}" and survey "${response.key}"`);

    const url = `/v1/study-service/temp-participant/submit-response`;
    const resp = await fetchCASEParticipantAPI(
        url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({
                studyKey,
                instanceId: instanceID,
                pid: tempParticipantId,
                response,
            }),
            revalidate: 0,
        }
    );

    if (resp.status !== 200) {
        return { error: `Failed to submit response: ${resp.status} - ${resp.body.error}` };
    }

    let nextSurveyKey: string | undefined;
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
    if (nextSurveyKey) {
        redirect(`/melden/?surveyKey=${nextSurveyKey}`);
    } else {
        redirect('/melden/koppelen');
    }
}

export const mergeTempParticipantWithProfile = async (studyKey: string, profileId: string) => {
    const session = await auth();
    if (!session?.user) {
        return { error: 'Not logged in' };
    }

    let tempParticipantId = await getTempParticipantId();
    if (!tempParticipantId) {
        return { error: 'No temp participant id found' };
    }

    // call API to merge temp participant with profile
    const url = `/v1/study-service/events/${studyKey}/merge-temporary-participant`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({
                profileID: profileId,
                temporaryParticipantID: tempParticipantId,
            }),
            revalidate: 0,
        }
    );
    await deleteTempParticipantId();
    if (resp.status !== 200) {
        return { error: `Failed to merge temp participant with profile: ${resp.status} - ${resp.body.error}` };
    }

    return resp.body;
}
