'use server';

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { revalidatePath } from "next/cache";

export const changePassword = async (oldPassword: string, newPassword: string) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user/password';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({ oldPassword, newPassword }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to change password: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/');
    return resp.body;
}