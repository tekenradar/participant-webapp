import Container from '@/components/container';
import ErrorInfo from '@/components/error-info';
import { getSurveyWithContextForProfile } from '@/lib/server/data-fetching/survey';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import SurveyClient from './survey-client';
import PageTitlebar from '@/components/page-titlebar';
import { Survey } from 'survey-engine/data_types';
import { getLocalizedString } from '@/lib/get-localized-string';

interface SurveyLoaderProps {
    locale: string;
    studyKey: string;
    surveyKey: string;
    profileId: string;
    ignoreImmediateSurveys?: boolean;
    redirectUrl?: string;
}

const SurveyLoader: React.FC<SurveyLoaderProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'SurveyPage' });

    const resp = await getSurveyWithContextForProfile(props.studyKey, props.surveyKey, props.profileId);
    if (!resp || resp.error || !resp.surveyWithContext) {
        console.error(resp.error);
        return <Container className='flex justify-center'>
            <ErrorInfo
                title={t('surveyLoadingError')}
                description={resp?.error}
            />
        </Container>;
    }

    const survey = resp.surveyWithContext.survey as Survey;
    const title = getLocalizedString(survey.props?.name, props.locale);

    return (
        <>
            <PageTitlebar>
                {title}
            </PageTitlebar>
            <Container className='flex justify-center pt-6 pb-10'>
                <div className="max-w-[800px] w-full">
                    <SurveyClient
                        locale={props.locale}
                        surveyWithContext={resp.surveyWithContext}
                        messages={{
                            previousPageBtn: t('survey.previousPageBtn'),
                            nextPageBtn: t('survey.nextPageBtn'),
                            submitBtn: t('survey.submitBtn'),
                            invalidResponseText: t('survey.invalidResponseText'),
                            submitError: t('survey.submitError'),
                        }}
                        openAt={Math.floor(Date.now() / 1000)}
                        studyKey={props.studyKey}
                        surveyKey={props.surveyKey}
                        profileID={props.profileId}
                        ignoreImmediateSurveys={props.ignoreImmediateSurveys}
                        redirectUrl={props.redirectUrl}
                    />
                </div>
            </Container>
        </>
    );
};

export default SurveyLoader;
