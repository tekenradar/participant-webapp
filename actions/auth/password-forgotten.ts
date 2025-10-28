'use server'

import { auth } from "@/auth"
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";

export const initiatePasswordReset = async (email?: string) => {
    const session = await auth();
    if (session && session.CASE_API_accessToken) {
        return { status: 400, error: 'You are already logged in' };
    }

    const url = '/v1/password-reset/initiate';
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({ email, instanceID: process.env.INSTANCE_ID }),
            revalidate: 0,
        }
    );

    if (resp.status !== 200) {
        console.log(JSON.stringify({ error: `${resp.status} - ${resp.body.error}` }));
    }
    return {
        success: true,
        message: 'Password reset initiated',
    };
}