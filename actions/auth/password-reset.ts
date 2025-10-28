'use server'

import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";

export const getInfosForPasswordReset = async (token: string) => {
    const url = '/v1/password-reset/get-infos';
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({ token }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}

export const resetPassword = async (token: string, newPassword: string) => {
    const url = '/v1/password-reset/reset';
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({ token, newPassword }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}