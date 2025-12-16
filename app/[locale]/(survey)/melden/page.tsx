import PageTitlebar from '@/components/page-titlebar';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import LoginForm from '../../(default)/auth/login/_components/login-form';
import SimpleLoader from '@/components/simple-loader';
import { Suspense } from 'react';
import SurveyPageNavbar, { SurveyPageNavbarSkeleton } from '@/components/survey-components/survey-navbar';
import { auth } from '@/auth';
import logger from '@/lib/logger';
import { getUser, Profile } from '@/lib/server/data-fetching/user';
import ProfileSelector from './_components/profile-selector';
import SurveySkeleton from '@/components/survey-components/survey-skeleton';
import SurveyLoaderForLoggedIn from '@/components/survey-components/survey-loader-for-profile';
import SurveyLoaderForTemporaryParticipant from '@/components/survey-components/survey-loader-for-temporary-participant';


interface PageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        pid?: string;
        redirectTo?: string;
        surveyKey?: string;
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
        profile = profiles.find((p: Profile) => p.id === searchParams.pid);
    } else {
        logger.debug('not logged in');
    }

    let redirectTo = searchParams.redirectTo;
    let surveyKey = searchParams.surveyKey || 'PDiff';

    let content: React.ReactNode = null;


    // survey flow in progress
    if (loggedIn) {
        if (profile) {
            // load survey for selected profile
            content = <Suspense fallback={<SurveySkeleton />}>
                <SurveyLoaderForLoggedIn
                    locale={locale}
                    studyKey={studyKey}
                    surveyKey={surveyKey}
                    profileId={profile.id}
                />
            </Suspense>
        } else {
            // offer to select profile or create new profile
            // if profile is selected, update search params with selected profile id
            content = <div>
                <SurveySkeleton />
                <ProfileSelector
                    profiles={profiles}
                    messages={{
                        title: 'Selecteer een profiel',
                        description: 'Selecteer hieronder voor welk profiel je deze melding doet. Als je de melding voor jezelf doet, kies dan het profiel dat hoort bij je e-mail adres. Maak een nieuw profiel aan, als je de melding doet voor je kind dat jonger is dan 16 jaar.',
                        mainProfileLabel: 'Ik',
                        createProfileDialog: {
                            triggerBtn: 'Create profile',
                            title: 'Create a profile',
                            description: 'Create a profile to continue',
                            consent: {
                                label: 'I agree to the terms and conditions',
                                invalid: 'You must agree to the terms and conditions',
                                dialog: {
                                    title: 'Terms and conditions',
                                    content: 'You must agree to the terms and conditions',
                                    acceptBtn: 'I agree',
                                    rejectBtn: 'I disagree',
                                }
                            },
                            aliasLabel: 'Alias',
                            aliasPlaceholder: 'Enter your alias',
                            avatarSelectorLabel: 'Select your avatar',
                            saveProfileBtn: 'Create profile',
                            cancelBtn: 'Cancel',
                            errorSavingProfile: 'Error creating profile',
                            successSavingProfile: 'Profile created successfully',
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
                profile={undefined}
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




    return (
        <div className="bg-background">
            <AlertDialog open={true}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Please login to continue</AlertDialogTitle>
                        <AlertDialogDescription>
                            You need to login to continue. Please enter your email and password to continue.
                        </AlertDialogDescription>


                    </AlertDialogHeader>
                    <LoginForm
                        messages={{
                            email: {
                                label: 'Email',
                                placeholder: 'Email',
                                description: 'Email',
                                invalid: 'Email is invalid',
                            },
                            password: {
                                label: 'Password',
                                placeholder: 'Password',
                                description: 'Password',
                                invalid: 'Password is invalid',
                            },
                            submitBtn: 'Submit',
                            loginFailed: 'Login failed',
                            goToRegister: 'Go to register',
                            goToPasswordForgotten: 'Go to password forgotten',
                        }}

                    />
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}