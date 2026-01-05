import Container from '@/components/container';
import ErrorInfo from '@/components/error-info';
import { getSurveyWithContextForTemporaryParticipant } from '@/lib/server/data-fetching/survey';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import SurveyClient from './survey-client';
import PageTitlebar from '@/components/page-titlebar';
import { Survey } from 'survey-engine/data_types';
import { getLocalizedString } from '@/lib/get-localized-string';
import logger from '@/lib/logger';
import RequireLogin from './require-login';

interface SurveyLoaderProps {
    locale: string;
    studyKey: string;
    surveyKey: string;
}

const mapTileURL = process.env.MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const SurveyLoaderForTemporaryParticipant: React.FC<SurveyLoaderProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'SurveyPage' });

    const resp = await getSurveyWithContextForTemporaryParticipant(props.studyKey, props.surveyKey);
    if (!resp || resp.error || !resp.surveyWithContext) {
        logger.error(`Error loading survey for temporary participant of study "${props.studyKey}" and survey "${props.surveyKey}": ${resp.error}`);
        return <>
            <PageTitlebar>
                {t('errorLoadingSurveys.title')}
            </PageTitlebar>
            <Container className='flex justify-center items-center grow'>
                <div className='max-w-[800px] w-full'>
                    <ErrorInfo
                        title={t('errorLoadingSurveys.errorTitle', { studyKey: props.studyKey, surveyKey: props.surveyKey })}
                        description={t('errorLoadingSurveys.errorDescription')}
                    />
                </div>
            </Container>
        </>
    }

    const survey = resp.surveyWithContext.survey as Survey;
    const title = getLocalizedString(survey.props?.name, props.locale);

    const requireLogin = survey.requireLoginBeforeSubmission;

    return (
        <>
            {requireLogin && <RequireLogin
                surveyKey={props.surveyKey}
                messages={{
                    title: t('requireLogin.title'),
                    description: t('requireLogin.description'),
                    loginBtn: t('requireLogin.loginBtn'),
                    registerBtn: t('requireLogin.registerBtn'),
                    leaveBtn: t('requireLogin.leaveBtn'),
                }}
            />}
            <PageTitlebar>
                {title}
            </PageTitlebar>
            <Container className='flex justify-center pt-6 pb-10'>
                <div className="max-w-[800px] w-full">
                    <SurveyClient
                        locale={props.locale}
                        surveyWithContext={resp.surveyWithContext}
                        mapTileURL={mapTileURL}
                        messages={{
                            previousPageBtn: t('survey.previousPageBtn'),
                            nextPageBtn: t('survey.nextPageBtn'),
                            submitBtn: t('survey.submitBtn'),
                            invalidResponseText: t('survey.invalidResponseText'),
                            submissionDialog: {
                                title: t('survey.submissionDialog.title'),
                                description: t('survey.submissionDialog.description'),
                                errorTitle: t('survey.submissionDialog.errorTitle'),
                                errorDescription: t('survey.submissionDialog.errorDescription'),
                                goBackBtn: t('survey.submissionDialog.goBackBtn'),
                                retryBtn: t('survey.submissionDialog.retryBtn'),
                            },
                        }}
                        openAt={Math.floor(Date.now() / 1000)}
                        studyKey={props.studyKey}
                        surveyKey={props.surveyKey}
                    />
                </div>
            </Container>
        </>
    );
};

export default SurveyLoaderForTemporaryParticipant;
