'use server';

import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";

export const unsubscribeNewsletterWithTempToken = async (token: string) => {
    const url = '/v1/unsubscribe-newsletter';
    const resp = await fetchCASEParticipantAPI(url,
        undefined,
        {
            method: 'POST',
            body: JSON.stringify({ token }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to unsubscribe newsletter: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}