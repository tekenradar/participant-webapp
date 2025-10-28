'use server';

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { revalidatePath } from "next/cache";

export const manageSubscription = async (
    isSubscribedToNewsletter: boolean,
    toggleWeeklySubscription?: boolean
) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user/contact-preferences';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'PUT',
            body: JSON.stringify({
                subscribedToNewsletter: isSubscribedToNewsletter,
                toggleWeeklySubscription: toggleWeeklySubscription
            }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to manage subscription: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/');
    return resp.body;
}