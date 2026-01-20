import { Suspense } from 'react';
import SurveyPageNavbar, { SurveyPageNavbarSkeleton } from '@/components/survey-components/survey-navbar';
import { auth } from '@/auth';
import logger from '@/lib/logger';
import { getUser, Profile } from '@/lib/server/data-fetching/user';
import ProfileSelector from './_components/profile-selector';
import SurveySkeleton from '@/components/survey-components/survey-skeleton';
import SurveyLoaderForLoggedIn from '@/components/survey-components/survey-loader-for-profile';
import SurveyLoaderForTemporaryParticipant from '@/components/survey-components/survey-loader-for-temporary-participant';
import { getTempParticipantId } from '@/lib/server/temp-participant-cookie';
import MergeRedirect from './_components/merge-redirect';
import { getTranslations } from 'next-intl/server';
import { ensureUserIsInAllDefaultStudies } from '@/actions/study/ensure-all-profiles-are-in-default-studies';


interface PageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        pid?: string;
        redirectTo?: string;
        surveyKey?: string;
        mergeSkip?: string;
        mergeError?: string;
    }>;
}

const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || 'tekenradar';

export default async function Page(props: PageProps) {
    const { locale } = await props.params;
    const searchParams = await props.searchParams;

    const session = await auth();
    const loggedIn = session && session.user;

    let profile: Profile | undefined;
    let profiles: Array<Profile> = [];
    if (loggedIn) {
        const userResp = await getUser();
        profiles = userResp.user?.profiles;
        await ensureUserIsInAllDefaultStudies(profiles);
        profile = profiles?.find((p: Profile) => p.id === searchParams?.pid);
    } else {
        logger.debug('not logged in');
    }

    let redirectTo = searchParams.redirectTo;
    let surveyKey = searchParams.surveyKey || 'PDiff';

    let content: React.ReactNode = null;


    // survey flow in progress
    if (loggedIn) {
        if (profile) {
            const tempParticipantId = await getTempParticipantId();
            if (tempParticipantId && searchParams.mergeSkip !== '1') {
                const sp = new URLSearchParams();
                sp.set('surveyKey', surveyKey);
                if (redirectTo) sp.set('redirectTo', redirectTo);
                if (searchParams.mergeError) sp.set('mergeError', searchParams.mergeError);

                // Use client component to handle redirect and show loading state
                content = <MergeRedirect
                    profileId={profile.id}
                    queryString={sp.toString()}
                />
            } else {
                // load survey for selected profile
                content = <Suspense fallback={<SurveySkeleton />}>
                    <SurveyLoaderForLoggedIn
                        locale={locale}
                        studyKey={studyKey}
                        surveyKey={surveyKey}
                        profileId={profile.id}
                    />
                </Suspense>
            }
        } else {
            const t = await getTranslations('MeldenPage.selectProfile');

            // offer to select profile or create new profile
            // if profile is selected, update search params with selected profile id
            content = <div>
                <SurveySkeleton />
                <ProfileSelector
                    profiles={profiles}
                    messages={{
                        title: t('title'),
                        description: t('description'),
                        mainProfileLabel: t('mainProfileLabel'),
                        createProfileDialog: {
                            triggerBtn: t('createProfileDialog.triggerBtn'),
                            title: t('createProfileDialog.title'),
                            description: t('createProfileDialog.description'),
                            consent: {
                                label: t('createProfileDialog.consent.label'),
                                invalid: t('createProfileDialog.consent.invalid'),
                                dialog: {
                                    title: t('createProfileDialog.consent.dialog.title'),
                                    content: t('createProfileDialog.consent.dialog.content'),
                                    acceptBtn: t('createProfileDialog.consent.dialog.acceptBtn'),
                                    rejectBtn: t('createProfileDialog.consent.dialog.rejectBtn'),
                                }
                            },
                            aliasLabel: t('createProfileDialog.aliasLabel'),
                            aliasPlaceholder: t('createProfileDialog.aliasPlaceholder'),
                            avatarSelectorLabel: t('createProfileDialog.avatarSelectorLabel'),
                            saveProfileBtn: t('createProfileDialog.saveProfileBtn'),
                            cancelBtn: t('createProfileDialog.cancelBtn'),
                            errorSavingProfile: t('createProfileDialog.errorSavingProfile'),
                            successSavingProfile: t('createProfileDialog.successSavingProfile'),
                        }
                    }} />
            </div>
        }
    } else {
        content = <Suspense fallback={<SurveySkeleton />}>
            <SurveyLoaderForTemporaryParticipant
                locale={locale}
                studyKey={studyKey}
                surveyKey={surveyKey}
            />
        </Suspense>
    }


    return <>
        <Suspense
            fallback={<SurveyPageNavbarSkeleton />}
        >
            <SurveyPageNavbar
                locale={locale}
                profile={profile}
                redirectUrl={redirectTo}
            />
        </Suspense>

        <main
            className="flex-1 flex flex-col"
            role="main"
            id="main"
            tabIndex={-1}
        >
            {content}
        </main>
    </>
}