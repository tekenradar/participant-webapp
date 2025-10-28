'use server';

import { auth } from "@/auth";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { Profile } from "@/lib/server/data-fetching/user";
import { revalidatePath } from "next/cache";
import { SurveyResponse } from "survey-engine/data_types";

export const addNewProfile = async (profile: Profile) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user/profiles';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify(profile),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to add new profile: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/');
    return resp.body;
}

export const updateProfile = async (profile: Profile) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = '/v1/user/profiles';
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'PUT',
            body: JSON.stringify(profile),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to update profile: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/');
    return resp.body;
}

export const removeProfile = async (profileId: string, exitSurveyResponse?: SurveyResponse) => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        return { status: 401, error: 'Unauthorized' };
    }

    const url = `/v1/user/profiles/remove`;
    const resp = await fetchCASEParticipantAPI(url,
        session.CASE_API_accessToken,
        {
            method: 'POST',
            body: JSON.stringify({ profileId, exitSurveyResponse }),
            revalidate: 0,
        }
    );
    if (resp.status !== 200) {
        return { error: `Failed to remove profile: ${resp.status} - ${resp.body.error}` };
    }
    revalidatePath('/');
    return resp.body;
}