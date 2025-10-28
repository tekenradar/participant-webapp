import { getTranslations } from "next-intl/server";
import { UserRound, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContributionsOverviewLoader from "./_components/contributions-overview-loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarURL } from "@/lib/avatars";
import { getUser, Profile } from "@/lib/server/data-fetching/user";
import ErrorInfo from "@/components/error-info";
import Link from "next/link";
import LabResultsLoader from "./_components/lab-results";
import SelfTestParticipation from "./_components/self-test-participation";
import PageTitlebar from "@/components/page-titlebar";
import Container from "@/components/container";
import { Suspense } from "react";
import SimpleLoader from "@/components/simple-loader";


interface PageProps {
    params: Promise<{
        profileId: string;
        locale: string;
    }>
}

export default async function Page(props: PageProps) {
    const { locale, profileId } = await props.params;

    const t = await getTranslations({ locale, namespace: 'PersonalDataPage' });

    const resp = await getUser();
    if (!resp || resp.error) {
        return <ErrorInfo
            title={t('errorLoadingUser')}
            description={resp.error ? resp.error : 'Unknown error'}
        />
    }

    const profiles = resp.user.profiles as Profile[];
    const profile = profiles.find(p => p.id === profileId);
    if (!profile) {
        return <ErrorInfo
            title={t('errorLoadingUser')}
            description={`Profile with id ${profileId} not found`}
        />
    }

    return (
        <div>
            <PageTitlebar>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="grow">
                            {t('title')}
                        </span>

                        <div className='flex gap-2 items-center'>
                            <Avatar className='size-7 rounded-sm'>
                                <AvatarImage
                                    className='bg-secondary p-0.5'
                                    src={getAvatarURL(profile.avatarID)}
                                />
                                <AvatarFallback className="bg-secondary rounded-sm">
                                    <UserRound className='text-secondary-foreground size-5' />
                                </AvatarFallback>
                            </Avatar>
                            <span className='truncate text-sm md:text-lg max-w-64'>
                                {profile.alias}
                            </span>
                            <Button variant='ghost'
                                asChild
                                size={'icon'}
                            >
                                <Link href={`/dashboard`}>
                                    <XIcon className='text-muted-foreground size-5' />
                                    <span className='sr-only'>
                                        {t('backToDashboard')}
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </PageTitlebar>
            <Container>
                <div className="space-y-12 my-6 max-w-3xl mx-auto">
                    <ContributionsOverviewLoader
                        profileId={profileId}
                        locale={locale}
                    />

                    <Suspense fallback={<SimpleLoader />}>
                        <SelfTestParticipation
                            profileId={profileId}
                            locale={locale}
                        />
                    </Suspense>

                    <LabResultsLoader
                        profileId={profileId}
                        locale={locale}
                    />
                </div>
            </Container>
        </div>
    );
}
