import { Suspense } from "react";
import SurveyPageNavbar, { SurveyPageNavbarSkeleton } from "@/components/survey-components/survey-navbar";
import { redirect } from "next/navigation";
import { Profile, getUser } from "@/lib/server/data-fetching/user";
import { validateRedirectUrl } from "@/lib/utils/url-validation";
import SurveyLoader from "@/components/survey-components/survey-loader-for-profile";
import SurveySkeleton from "@/components/survey-components/survey-skeleton";
import { DEFAULT_DASHBOARD_URL } from "@/constants";
import { ensureUserIsInAllDefaultStudies } from "@/actions/study/ensure-all-profiles-are-in-default-studies";


interface PageProps {
    params: Promise<{
        locale: string;
        studyKey: string;
        surveyKey: string;
    }>;
    searchParams: Promise<{
        pid: string;
        ignoreImmediateSurveys?: string;
        redirectUrl?: string;
    }>;
}

export const dynamic = 'force-dynamic';


export default async function Page(props: PageProps) {
    const { locale, studyKey, surveyKey } = await props.params;
    const { pid, ignoreImmediateSurveys, redirectUrl } = await props.searchParams;

    // Validate redirect URL (only local URLs allowed)
    const validatedRedirectUrl = validateRedirectUrl(redirectUrl);

    // if !pid
    const openForMainProfile = pid === undefined;

    let profiles: Array<Profile> = [];
    try {
        const userResp = await getUser();
        profiles = userResp.user?.profiles;
    } catch (error) {
        console.error(error);
    }
    if (profiles) {
        await ensureUserIsInAllDefaultStudies(profiles);
    }
    const profile = profiles.find(p => {
        if (openForMainProfile) {
            return p.mainProfile;
        } else {
            return p.id === pid;
        }
    })
    if (!profile) {
        redirect(validatedRedirectUrl || DEFAULT_DASHBOARD_URL)
    }

    return (
        <>
            <Suspense
                fallback={<SurveyPageNavbarSkeleton />}
            >
                <SurveyPageNavbar
                    locale={locale}
                    profile={profile}
                    redirectUrl={validatedRedirectUrl}
                />
            </Suspense>

            <main
                className="flex-1"
                role="main"
                id="main"
                tabIndex={-1}
            >
                <Suspense fallback={<SurveySkeleton />}>
                    <SurveyLoader
                        locale={locale}
                        studyKey={studyKey}
                        surveyKey={surveyKey}
                        profileId={profile.id}
                        ignoreImmediateSurveys={ignoreImmediateSurveys === 'true'}
                        redirectUrl={validatedRedirectUrl}
                    />
                </Suspense>
            </main>

        </>
    );
}
