import Container from '@/components/container';
import React from 'react';
import NavbarContent from './navbar-content';
import { Skeleton } from '@/components/ui/skeleton';
import { getTranslations } from 'next-intl/server';
import { Profile } from '@/lib/server/data-fetching/user';
import { validateRedirectUrl } from '@/lib/utils/url-validation';

interface SurveyPageNavbarProps {
    locale: string;
    profile?: Profile;
    redirectUrl?: string;
}

const SurveyPageNavbar: React.FC<SurveyPageNavbarProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'SurveyPage' });

    const validatedRedirectUrl = validateRedirectUrl(props.redirectUrl);

    return (
        <div className="bg-primary text-primary-foreground">
            <Container>
                <NavbarContent
                    profile={props.profile}
                    messages={{
                        exitSurveyBtn: t('navbar.exitSurveyBtn'),
                        exitSurveyConfirmationTitle: t('navbar.exitSurveyConfirmationTitle'),
                        exitSurveyConfirmationDescription: t('navbar.exitSurveyConfirmationDescription'),
                        exitSurveyConfirmationConfirmBtn: t('navbar.exitSurveyConfirmationConfirmBtn'),
                        exitSurveyConfirmationCancelBtn: t('navbar.exitSurveyConfirmationCancelBtn'),
                    }}
                    redirectUrl={validatedRedirectUrl}
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
                <div className='flex justify-start h-10 items-center'>
                    <Skeleton className='h-10 w-56 bg-secondary/40 rounded-none' />
                </div>
            </Container>
        </div>
    );
};