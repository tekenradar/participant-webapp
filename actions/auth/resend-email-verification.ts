'use server'

import { auth } from "@/auth"
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";

export const resendEmailVerificationMessage = async (email?: string) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken || !session.user?.email) {
        return { status: 401, error: 'Unauthorized' };
    }

    if (!email) {
        email = session.user?.email;
    }


    const url = '/v1/auth/resend-email-verification';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({ email }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to resend verification email: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}