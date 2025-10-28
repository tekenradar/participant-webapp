'use server';

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { revalidatePath } from "next/cache";


export const changeAccountEmail = async (email: string, password: string) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user/change-account-email';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to change account email: ${resp.status} - ${resp.body.error}` };
    }

    return resp.body;
}