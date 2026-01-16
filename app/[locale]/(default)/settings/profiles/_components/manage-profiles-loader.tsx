import { getUser } from '@/lib/server/data-fetching/user';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import ProfileManagerClient from './profile-manager-client';
import ErrorInfo from '@/components/error-info';
import { SurveyWithContext, getSurveyWithContextForTemporaryParticipant } from '@/lib/server/data-fetching/survey';

interface ManageProfilesLoaderProps {
    locale: string;
}

const ManageProfilesLoader: React.FC<ManageProfilesLoaderProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'ManageProfilesPage' });

    const resp = await getUser();

    if (!resp || resp.error || !resp.user || !resp.user.profiles || resp.user.profiles.length === 0) {
        return <div>
            <ErrorInfo
                title={t('fetchError')}
                description={resp?.error}
            />
        </div>
    }

    const profiles = resp.user.profiles;

    const exitSurveyStudyKey = process.env.NEXT_PUBLIC_STUDY_KEY;
    const exitSurveySurveyKey = process.env.DELETE_PROFILE_SURVEY_KEY;

    let survey: SurveyWithContext | undefined;
    if (exitSurveyStudyKey && exitSurveySurveyKey) {
        const resp = await getSurveyWithContextForTemporaryParticipant(exitSurveyStudyKey, exitSurveySurveyKey);
        if (resp && resp.surveyWithContext) {
            survey = resp.surveyWithContext;
        }
    }


    return (
        <ProfileManagerClient
            profiles={profiles}
            locale={props.locale}
            exitSurveyWithContext={survey}
            messages={{
                mainProfileLabel: t('mainProfileLabel'),
                editProfileBtnLabel: t('editProfileBtnLabel'),
                deleteProfileBtnLabel: t('deleteProfileBtnLabel'),
                deleteProfileDialogTitle: t('deleteProfileDialogTitle'),
                deleteProfileDialogDescription: t('deleteProfileDialogDescription'),
                deleteProfileDialogConfirmBtn: t('deleteProfileDialogConfirmBtn'),
                deleteProfileDialogCancelBtn: t('deleteProfileDialogCancelBtn'),
                backToSettingsBtn: t('backToSettingsBtn'),
                createProfileBtn: t('createProfileBtn'),
                exitProfileEditorBtn: t('exitProfileEditorBtn'),
                saveProfileBtn: t('saveProfileBtn'),
                headingNewProfile: t('headingNewProfile'),
                headingEditProfile: t('headingEditProfile'),
                consent: {
                    label: t('consent.label'),
                    invalid: t('consent.invalid'),
                    dialog: {
                        title: t('consent.dialog.title'),
                        content: t('consent.dialog.content'),
                        acceptBtn: t('consent.dialog.acceptBtn'),
                        rejectBtn: t('consent.dialog.rejectBtn'),
                    }
                },
                aliasLabel: t('aliasLabel'),
                aliasPlaceholder: t('aliasPlaceholder'),
                avatarSelectorLabel: t('avatarSelectorLabel'),
                errorSavingProfile: t('errorSavingProfile'),
                successSavingProfile: t('successSavingProfile'),
                errorDeletingProfile: t('errorDeletingProfile'),
                successDeletingProfile: t('successDeletingProfile'),
            }}
        />
    );
};

export default ManageProfilesLoader;
