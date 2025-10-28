'use server'

import { auth } from "@/auth";
import logger from "@/lib/logger";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";


export const triggerCustomEvent = async (profileId: string, studyKey: string, eventKey: string, payload: {
    [key: string]: string | number;
}) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    if (!studyKey) {
        return { status: 400, error: 'Missing studyKey' };
    }

    const url = `/v1/study-service/events/${studyKey}/custom`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({
                studyKey,
                profileID: profileId,
                eventKey,
                payload,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        logger.error(`Failed to trigger custom event: ${resp.status} - ${resp.body.error}`)
        return { error: `Failed to trigger custom event: ${resp.status} - ${resp.body.error}` };
    }

    return resp.body;
}