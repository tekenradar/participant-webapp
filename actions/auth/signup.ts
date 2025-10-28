'use server';

import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { loginWithEmailAndPassword } from "./login";

export const signUpAction = async (
    email: string,
    password: string,
    infoCheck: string,
    preferredLanguage: string,
) => {
    const instanceID = process.env.INSTANCE_ID;

    const url = '/v1/auth/signup';
    const resp = await fetchCASEParticipantAPI(
        url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                infoCheck,
                preferredLanguage,
                instanceID,
            }),
            revalidate: 0,
        });
    if (resp.status > 201) {
        return { error: `Error: ${resp.status} - ${resp.body.error}` };
    }

    const r = await loginWithEmailAndPassword(email, password);
    if (r.error) {
        return { error: r.error };
    }
    return {
        success: true,
        error: undefined,
    }
}