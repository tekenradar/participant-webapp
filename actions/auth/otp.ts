'use server';

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";

export const requestOTP = async (type: string) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const searchParams = new URLSearchParams();
    searchParams.set('type', type);

    const url = `/v1/auth/otp?${searchParams.toString()}`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}
