import { ensureUserIsInAllDefaultStudies } from '@/actions/study/ensure-all-profiles-are-in-default-studies';
import ErrorInfo from '@/components/error-info';
import { AssignedSurvey, getAssignedSurveys } from '@/lib/server/data-fetching/survey';
import { Profile, getUser } from '@/lib/server/data-fetching/user';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import SurveyListClient from './survey-list-client';


interface SurveyListLoaderProps {
    locale: string;
}

const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || '';

const SurveyListLoader: React.FC<SurveyListLoaderProps> = async (props) => {
    const t = await getTranslations('DashboardPage');

    const resp = await getUser();
    if (!resp || resp.error) {
        return <ErrorInfo
            title={t('errorLoadingSurveys')}
            description={resp.error ? resp.error : 'Unknown error'}
        />
    }
    const profiles = resp.user.profiles as Profile[];


    await ensureUserIsInAllDefaultStudies(profiles);

    const assignedSurveys = await getAssignedSurveys(studyKey, profiles.map((p: Profile) => p.id));
    if (assignedSurveys.error) {
        console.log(assignedSurveys.error);
        return <ErrorInfo
            title={t('errorLoadingSurveys')}
            description={resp.error ? resp.error : 'Unknown error'}
        />
    }

    const now = Date.now() / 1000;
    const activeSurveys = assignedSurveys.surveys.filter((s: AssignedSurvey) => {
        if (s.validFrom && s.validFrom > now) {
            return false;
        }
        if (s.validUntil && s.validUntil < now) {
            return false;
        }
        return true;
    })

    return (
        <SurveyListClient
            locale={props.locale}
            profiles={profiles}
            activeSurveys={activeSurveys}
            surveyInfos={assignedSurveys.surveyInfos}
            messages={{
                requiredSurveys: {
                    title: t('surveyList.requiredSurveys.title'),
                    noSurveys: {
                        title: t('surveyList.requiredSurveys.noSurveys.title'),
                        description: t('surveyList.requiredSurveys.noSurveys.description'),
                    }
                },
                optionalSurveys: {
                    title: t('surveyList.optionalSurveys.title'),
                    description: t('surveyList.optionalSurveys.description'),
                    showBtn: t('surveyList.optionalSurveys.showBtn'),
                    hideBtn: t('surveyList.optionalSurveys.hideBtn'),
                }
            }}
        />
    );
};

export default SurveyListLoader;
