import { ensureUserIsInAllDefaultStudies } from '@/actions/study/ensure-all-profiles-are-in-default-studies';
import ErrorInfo from '@/components/error-info';
import { H2 } from '@/components/headings';
import { getSubmissionHistory, SubmissionHistory } from '@/lib/server/data-fetching/responses';
import { getAssignedSurveys } from '@/lib/server/data-fetching/survey';
import { getUser, Profile } from '@/lib/server/data-fetching/user';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import ProfileCard from './profile-card';

interface ProfileStudyInfosProps {
    locale: string;
    studyKey: string;
}

const ProfileStudyInfos: React.FC<ProfileStudyInfosProps> = async (props) => {
    const { studyKey } = props;
    const t = await getTranslations({ locale: props.locale, namespace: 'DashboardPage' });

    const resp = await getUser();
    if (!resp || resp.error) {
        return <ErrorInfo
            title={t('errorLoadingSurveys')}
            description={resp.error ? resp.error : 'Unknown error'}
        />
    }
    const profiles = resp.user.profiles as Profile[];
    const profileIds = profiles.map((p: Profile) => p.id);
    await ensureUserIsInAllDefaultStudies(profiles);


    const assignedSurveys = await getAssignedSurveys(studyKey, profileIds);
    if (assignedSurveys.error) {
        return <ErrorInfo
            title={t('errorLoadingSurveys')}
            description={resp.error}
        />
    }

    const submissionHistory = await getSubmissionHistory(studyKey, profileIds);

    return (
        <div>
            <H2>
                {t('profileStudyInfos.heading')}
            </H2>
            <ul className='py-4 space-y-6'>
                {profiles.map((profile) => (
                    <li key={profile.id}>
                        <ProfileCard
                            profile={profile}
                            studyKey={props.studyKey}
                            assignedSurveys={assignedSurveys}
                            submissionHistory={submissionHistory.submissionHistory as SubmissionHistory}
                            locale={props.locale}
                            messages={{
                                mainProfileLabel: t('profileStudyInfos.mainProfileLabel'),
                                actionsMenu: {
                                    open: t('profileStudyInfos.actionsMenu.open'),
                                    label: t('profileStudyInfos.actionsMenu.label'),
                                    pauseFollowUp: t('profileStudyInfos.actionsMenu.pauseFollowUp'),
                                    changeContactOrConsent: t('profileStudyInfos.actionsMenu.changeContactOrConsent'),
                                },
                                activeSurveysHeading: t('profileStudyInfos.activeSurveysHeading'),
                                noActiveSurveys: t('profileStudyInfos.noActiveSurveys'),
                                nextFollowUpLabel: t('profileStudyInfos.nextFollowUpLabel'),
                                nextFollowUpDatePrefix: t('profileStudyInfos.nextFollowUpDatePrefix'),
                                goToAanmelden: t('profileStudyInfos.goToAanmelden'),

                                previousSubmissions: {
                                    heading: t('profileStudyInfos.previousSubmissions.heading'),
                                    noPreviousSubmissions: t('profileStudyInfos.previousSubmissions.noPreviousSubmissions'),
                                }

                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileStudyInfos;
