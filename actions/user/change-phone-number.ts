'use server';

import { auth } from "@/auth";
import { phoneRegex } from "@/lib/phone-number-regex";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { revalidatePath } from "next/cache";

export const changePhoneNumber = async (newPhoneNumber: string, password: string) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    if (!newPhoneNumber || new RegExp(phoneRegex).test(newPhoneNumber) === false) {
        return { status: 400, error: 'Invalid phone number' };
    }

    const url = '/v1/user/change-phone-number';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({ newPhoneNumber, password }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to change account phone number: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/');
    return resp.body;
}

export const requestPhoneNumberVerification = async () => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user/request-phone-number-verification';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to request phone number verification: ${resp.status} - ${resp.body.error}` };
    }
    return resp.body;
}