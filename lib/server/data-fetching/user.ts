'use server'

import { auth } from "@/auth"
import { fetchCASEParticipantAPI } from "../case-backend";

export interface Profile {
    id: string;
    alias: string;
    avatarID: string;
    consentConfirmedAt?: number;
    mainProfile?: boolean;
}

export const getUser = async () => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to fetch user: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}