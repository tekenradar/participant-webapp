import { auth } from "@/auth";
import Container from "@/components/container";
import EmbeddedMarkdownRenderer from "@/components/embedded-markdown-renderer";
import PageTitlebar from "@/components/page-titlebar";
import SurveyPageNavbar, { SurveyPageNavbarSkeleton } from "@/components/survey-components/survey-navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getTempParticipantId } from "@/lib/server/temp-participant-cookie";
import { CircleCheckBigIcon, LockOpenIcon, LogOutIcon, UserPlusIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProfileSelectorRadioGroup from "./_components/profile-selector-radio-group";
import { getUser } from "@/lib/server/data-fetching/user";
import { Profile } from "@/lib/server/data-fetching/user";



interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default async function Page(props: PageProps) {
    const { locale } = await props.params;

    const t = await getTranslations({ locale, namespace: 'KoppelenPage' });

    const tempParticipantId = await getTempParticipantId();
    if (!tempParticipantId) {
        redirect('/');
    }

    const session = await auth();
    const loggedIn = session && session.user;

    let content: React.ReactNode = null;
    if (loggedIn) {
        const userResp = await getUser();
        const profiles = userResp.user?.profiles as Profile[];
        // logged in -> offer to select profile or create new profile
        content = <div className="max-w-xl mx-auto space-y-4">
            <EmbeddedMarkdownRenderer className="border border-primary rounded-md p-4 w-full bg-secondary text-secondary-foreground">
                {t('infoForProfileSelection')}
            </EmbeddedMarkdownRenderer>


            <ProfileSelectorRadioGroup
                profiles={profiles}
                messages={{
                    title: t('selectProfile.title'),
                    mainProfileLabel: t('selectProfile.mainProfileLabel'),
                    connectProfileBtn: t('selectProfile.connectProfileBtn'),
                    connectProfileError: t('selectProfile.connectProfileError'),
                    connectProfileSuccess: t('selectProfile.connectProfileSuccess'),
                    createProfileDialog: {
                        triggerBtn: t('selectProfile.createProfileDialog.triggerBtn'),
                        title: t('selectProfile.createProfileDialog.title'),
                        description: t('selectProfile.createProfileDialog.description'),
                        consent: {
                            label: t('selectProfile.createProfileDialog.consent.label'),
                            invalid: t('selectProfile.createProfileDialog.consent.invalid'),
                            dialog: {
                                title: t('selectProfile.createProfileDialog.consent.dialog.title'),
                                content: t('selectProfile.createProfileDialog.consent.dialog.content'),
                                acceptBtn: t('selectProfile.createProfileDialog.consent.dialog.acceptBtn'),
                                rejectBtn: t('selectProfile.createProfileDialog.consent.dialog.rejectBtn'),
                            }
                        },
                        aliasLabel: t('selectProfile.createProfileDialog.aliasLabel'),
                        aliasPlaceholder: t('selectProfile.createProfileDialog.aliasPlaceholder'),
                        avatarSelectorLabel: t('selectProfile.createProfileDialog.avatarSelectorLabel'),
                        saveProfileBtn: t('selectProfile.createProfileDialog.saveProfileBtn'),
                        cancelBtn: t('selectProfile.createProfileDialog.cancelBtn'),
                        errorSavingProfile: t('selectProfile.createProfileDialog.errorSavingProfile'),
                        successSavingProfile: t('selectProfile.createProfileDialog.successSavingProfile'),
                    }

                }}
            />
        </div>
    } else {
        // not logged in -> offer to login or register (/auth/login?redirectTo=/melden/koppelen )
        content = <div className="max-w-xl mx-auto space-y-4">
            <EmbeddedMarkdownRenderer className="border border-primary rounded-md p-4 w-full bg-secondary text-secondary-foreground">
                {t('infoForConnectedAccounts')}
            </EmbeddedMarkdownRenderer>
            <Button
                className="w-full"
                asChild
            >
                <Link href={`/auth/login?redirectTo=/melden/koppelen`}>
                    <span>
                        <LockOpenIcon className="size-4" />
                    </span>
                    {t('loginBtn')}
                </Link>
            </Button>
            <Button
                className="w-full"
                asChild
            >
                <Link href={`/auth/register?redirectTo=/melden/koppelen`}>
                    <span>
                        <UserPlusIcon className="size-4" />
                    </span>
                    {t('registerBtn')}
                </Link>
            </Button>
            <Separator />
            <Button
                className="w-full"
                variant="outline"
                asChild
            >
                <Link href={`/`}>
                    <span>
                        <LogOutIcon className="size-4" />
                    </span>
                    {t('cancelBtn')}
                </Link>
            </Button>
        </div>
    }


    return (
        <>
            <Suspense
                fallback={<SurveyPageNavbarSkeleton />}
            >
                <SurveyPageNavbar
                    locale={locale}
                    profile={undefined}

                />
            </Suspense>

            <main
                className="flex-1 flex flex-col grow"
                role="main"
                id="main"
                tabIndex={-1}
            >
                <PageTitlebar>
                    {t('title')}
                </PageTitlebar>
                <Container className="space-y-12 grow py-12 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-4 mx-auto w-fit">
                        <span>
                            <CircleCheckBigIcon className="size-8 text-primary" />
                        </span>
                        <span className="text-2xl font-semibold">
                            {t('successTitle')}
                        </span>
                    </div>

                    {content}
                </Container>
            </main>
        </>
    );
}