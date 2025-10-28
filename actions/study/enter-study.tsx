'use server'

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";


export const enterStudy = async (studyKey: string, profileId: string) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    if (!studyKey) {
        return { status: 400, error: 'Missing studyKey' };
    }

    const url = `/v1/study-service/events/${studyKey}/enter`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({
                studyKey,
                profileID: profileId,
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to add new profile: ${resp.status} - ${resp.body.error}` };
    }

    return resp.body;
}
