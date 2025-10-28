import LinkButton from "@/components/buttons/link-button";
import Container from "@/components/container";
import PageTitlebar from "@/components/page-titlebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAvatarURL } from "@/lib/avatars";
import { getUser, Profile } from "@/lib/server/data-fetching/user";
import { cn } from "@/lib/utils";
import { ChevronRight, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Page() {
    const t = await getTranslations('DashboardProfileSelectionPage');

    const resp = await getUser();
    if (!resp || resp.error) {
        redirect('/dashboard');
    }
    const profiles = resp.user.profiles as Profile[];

    if (profiles.length === 0) {
        redirect('/dashboard');
    }

    if (profiles.length === 1) {
        redirect(`/dashboard/persoonlijke-gegevens/${profiles[0].id}`);
    }

    return (
        <div>
            <PageTitlebar>
                {t('title')}
            </PageTitlebar>
            <Container className="pt-6 pb-12">
                <div className="space-y-4 mx-auto w-fit min-w-[300px]">
                    <p className="text-lg font-medium">{t('hint')}</p>

                    <ul className="max-w-xl space-y-4 mt-4 mb-6">
                        {profiles.map((profile) => (
                            <li key={profile.id}>
                                <Button
                                    variant={'outline'}

                                    asChild>
                                    <Link
                                        href={{
                                            pathname: `/dashboard/persoonlijke-gegevens/${profile.id}`,
                                        }}
                                        prefetch={false}
                                        className="w-full h-auto justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar className='size-8 rounded-sm'>
                                                <AvatarImage
                                                    className={cn('bg-secondary p-0.5')}
                                                    src={getAvatarURL(profile.avatarID || "")}
                                                    alt={profile.avatarID}
                                                />
                                                <AvatarFallback className="bg-secondary rounded-sm">
                                                    <UserRound className='text-secondary-foreground size-5' />
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className='grow items-center flex'>
                                                <span className='max-w-[200px] inline-block truncate'>
                                                    {profile.alias}
                                                </span>
                                                <span>
                                                    {profile.mainProfile && <span className='text-xs ms-1 text-muted-foreground'>
                                                        ({t('mainProfileLabel')})
                                                    </span>}
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <ChevronRight className="text-muted-foreground size-4" />
                                        </div>
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>

                    <LinkButton
                        href='/dashboard'
                    >
                        {t('backToDashboard')}
                    </LinkButton>
                </div>
            </Container>
        </div>
    );
}
