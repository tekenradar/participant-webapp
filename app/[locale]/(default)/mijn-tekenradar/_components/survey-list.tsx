import { AssignedSurvey, getAssignedSurveys, SurveyInfo } from '@/lib/server/data-fetching/survey';
import { Profile } from '@/lib/server/data-fetching/user';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import SurveyListClient from './survey-list-client';
import SimpleLoader from '@/components/simple-loader';
import { H2 } from '@/components/headings';
import logger from '@/lib/logger';


interface SurveyListLoaderProps {
    locale: string;
    profiles: Array<Profile>;
}

const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || '';

const loadingSurveys = async (profiles: Array<Profile>): Promise<{
    requiredSurveys: Array<AssignedSurvey>;
    optionalSurveys: Array<AssignedSurvey>;
    surveyInfos: Array<SurveyInfo>;
}> => {
    const assignedSurveys = await getAssignedSurveys(studyKey, profiles?.map((p: Profile) => p.id));
    if (assignedSurveys.error) {
        logger.error('Error loading assigned surveys ' + assignedSurveys.error);

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

    const optionalSurveys = activeSurveys.filter((s: AssignedSurvey) => s.category === 'optional');
    const requiredSurveys = activeSurveys.filter((s: AssignedSurvey) => s.category !== 'optional');

    return {
        requiredSurveys,
        optionalSurveys,
        surveyInfos: assignedSurveys.surveyInfos,
    };
}


const SurveyListLoader: React.FC<SurveyListLoaderProps> = async (props) => {
    const t = await getTranslations('DashboardPage');
    const { profiles } = props;

    const { requiredSurveys, optionalSurveys, surveyInfos } = await loadingSurveys(profiles);


    return (
        <SurveyListClient
            locale={props.locale}
            profiles={profiles}
            requiredSurveys={requiredSurveys}
            optionalSurveys={optionalSurveys}
            surveyInfos={surveyInfos}
            messages={{
                requiredSurveys: {
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


const RequiredSurveysCount: React.FC<SurveyListLoaderProps> = async (props) => {
    const { profiles } = props;
    const { requiredSurveys } = await loadingSurveys(profiles);
    return (
        <span>
            {': '}
            <span className='text-primary'>
                {requiredSurveys.length}
            </span>
        </span>
    );
}


const SurveyList: React.FC<SurveyListLoaderProps> = async (props) => {
    const t = await getTranslations('DashboardPage');

    return (
        <div className='space-y-6'>
            <div>
                <H2>
                    {t('surveyList.requiredSurveys.title')}
                    <Suspense fallback={null}>
                        <RequiredSurveysCount {...props} />
                    </Suspense>
                </H2>
                <Suspense fallback={<SimpleLoader />}>
                    <SurveyListLoader {...props} />
                </Suspense>
            </div>
        </div>
    );
}

export default SurveyList;

