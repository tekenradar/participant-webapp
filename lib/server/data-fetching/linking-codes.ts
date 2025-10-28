'use server'

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "../case-backend";

export const getLinkingCode = async (studyKey: string, codeKey: string, profileId: string): Promise<{
    error?: string;
    status?: number;
    linkingCode?: string;
}> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }
    const url = `/v1/study-service/participant-data/${studyKey}/linking-code?pid=${profileId}&key=${codeKey}`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch linking code: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}
