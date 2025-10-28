'use server'

import { Profile } from "@/lib/server/data-fetching/user";
import { enterStudy } from "./enter-study";
import { fetchCASEParticipantAPI } from "@/lib/server/case-backend";
import { auth } from "@/auth";
import { LocalizedString } from "survey-engine/data_types";


export interface StudyInfos {
    key: string;
    status: string;
    props: {
        name: LocalizedString[];
        description: LocalizedString[];
        tags?: Array<{ label: LocalizedString[] }>;
        startDate?: number;
        endDate?: number;
        systemDefaultStudy?: boolean;
    };
    stats: {
        participantCount: number;
        responseCount: number;
    }
}

export interface StudyInfoForUser extends StudyInfos {
    profileIds: string[];
}

const getAllActiveStudies = async (): Promise<Array<StudyInfos>> => {
    const searchParams = new URLSearchParams();
    searchParams.set('status', 'active');
    searchParams.set('instanceID', process.env.INSTANCE_ID || '');
    const url = `/v1/study-service/studies?${searchParams.toString()}`;

    const resp = await fetchCASEParticipantAPI(
        url,
        undefined,
        {
            method: 'GET',
            revalidate: 0,
        }
    )
    if (resp.status !== 200) {
        throw new Error(`Failed to fetch studies: ${resp.status} - ${resp.body.error}`);
    }
    if (!resp.body.studies) {
        throw new Error('No studies found');
    }
    return resp.body.studies;
}

const getAllStudiesForUser = async (): Promise<Array<StudyInfoForUser>> => {
    const session = await auth();
    if (!session || !session.CASE_API_accessToken) {
        throw new Error('No access token found');
    }
    const url = '/v1/study-service/studies/participating';

    const resp = await fetchCASEParticipantAPI(
        url,
        session.CASE_API_accessToken,
        {
            method: 'GET',
            revalidate: 0,
        }
    )
    if (resp.status !== 200) {
        throw new Error(`Failed to fetch studies: ${resp.status} - ${resp.body.error}`);
    }
    if (!resp.body.studies) {
        throw new Error('No studies found');
    }
    return resp.body.studies;
}


export const ensureUserIsInAllDefaultStudies = async (profiles: Array<Profile>): Promise<Profile[]> => {
    const studiesData = getAllActiveStudies();
    const studiesForUserData = getAllStudiesForUser();

    // Wait for the promises to resolve
    const [studies, studiesForUser] = await Promise.all([studiesData, studiesForUserData]);

    const profileIDs = profiles.map(profile => profile.id);

    for (const study of studies) {
        if (study.props.systemDefaultStudy) {
            const profilesInStudy = studiesForUser.find(studyForUser => studyForUser.key === study.key)?.profileIds || [];
            const profilesToAdd = profileIDs.filter(profileID => !profilesInStudy.includes(profileID));
            // console.log('profiles to enter the default study', profilesToAdd);

            for (const profileID of profilesToAdd) {
                try {
                    await enterStudy(study.key, profileID);
                } catch {
                    console.error(`failed to enter study ${study.key} for profile ${profileID}`);
                }
            }
        }
    }

    return profiles;
}