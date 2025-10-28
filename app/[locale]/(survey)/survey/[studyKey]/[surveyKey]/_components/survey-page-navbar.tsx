import Container from '@/components/container';
import React from 'react';
import NavbarContent from './navbar-content';
import { Skeleton } from '@/components/ui/skeleton';
import { getTranslations } from 'next-intl/server';
import { Profile, getUser } from '@/lib/server/data-fetching/user';
import { redirect } from 'next/navigation';

interface SurveyPageNavbarProps {
    locale: string;
    profileId: string;
    redirectUrl?: string;
}

const SurveyPageNavbar: React.FC<SurveyPageNavbarProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'SurveyPage' });

    const resp = await getUser();
    if (!resp || resp.error) {
        console.error(resp.error);
        redirect('/');
    }

    const user = resp.user;

    if (!user || !user.profiles || !user.profiles.length) {
        redirect('/');
    }

    const profile = user.profiles.find((profile: Profile) => profile.id === props.profileId);
    if (!profile) {
        redirect('/');
    }


    return (
        <div className="bg-primary text-primary-foreground">
            <Container>
                <NavbarContent
                    profile={profile}
                    messages={{
                        exitSurveyBtn: t('navbar.exitSurveyBtn'),
                        exitSurveyConfirmationTitle: t('navbar.exitSurveyConfirmationTitle'),
                        exitSurveyConfirmationDescription: t('navbar.exitSurveyConfirmationDescription'),
                        exitSurveyConfirmationConfirmBtn: t('navbar.exitSurveyConfirmationConfirmBtn'),
                        exitSurveyConfirmationCancelBtn: t('navbar.exitSurveyConfirmationCancelBtn'),
                    }}
                    redirectUrl={props.redirectUrl}
                />
            </Container>
        </div>
    );
};

export default SurveyPageNavbar;

export const SurveyPageNavbarSkeleton = () => {
    return (
        <div className="bg-primary text-primary-foreground">
            <Container>
                <div className='flex justify-end'>
                    <Skeleton className='h-10 w-8 sm:w-56' />
                </div>
            </Container>
        </div>
    );
};