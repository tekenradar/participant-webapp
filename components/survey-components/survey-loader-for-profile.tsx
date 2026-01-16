import Container from '@/components/container';
import ErrorInfo from '@/components/error-info';
import { getSurveyWithContextForProfile } from '@/lib/server/data-fetching/survey';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import SurveyClient from './survey-client';
import PageTitlebar from '@/components/page-titlebar';
import { Survey } from 'survey-engine/data_types';
import { getLocalizedString } from '@/lib/get-localized-string';
import logger from '@/lib/logger';

interface SurveyLoaderProps {
    locale: string;
    studyKey: string;
    surveyKey: string;
    profileId: string;
    ignoreImmediateSurveys?: boolean;
    redirectUrl?: string;
}

const mapTileURL = process.env.MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const SurveyLoader: React.FC<SurveyLoaderProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'SurveyPage' });
    const tDashboard = await getTranslations({ locale: props.locale, namespace: 'DashboardPage.reportHistory.reportCards' });

    const resp = await getSurveyWithContextForProfile(props.studyKey, props.surveyKey, props.profileId);
    if (!resp || resp.error || !resp.surveyWithContext) {
        logger.error(`Error loading survey for profile "${props.profileId}" of study "${props.studyKey}" and survey "${props.surveyKey}": ${resp.error}`);
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
                            reportSelector: {
                                loading: t('survey.reportSelector.loading'),
                                noReports: t('survey.reportSelector.noReports'),
                                errorLoadingReports: t('survey.reportSelector.errorLoadingReports'),
                                reportCards: {
                                    TB: {
                                        title: tDashboard('TB.title'),
                                        environment: {
                                            label: tDashboard('TB.environment.label'),
                                            a: tDashboard('TB.environment.a'),
                                            b: tDashboard('TB.environment.b'),
                                            c: tDashboard('TB.environment.c'),
                                            d: tDashboard('TB.environment.d'),
                                            e: tDashboard('TB.environment.e'),
                                            f: tDashboard('TB.environment.f'),
                                            g: tDashboard('TB.environment.g'),
                                            h: tDashboard('TB.environment.h'),
                                            i: tDashboard('TB.environment.i'),
                                        },
                                        activity: {
                                            label: tDashboard('TB.activity.label'),
                                            a: tDashboard('TB.activity.a'),
                                            b: tDashboard('TB.activity.b'),
                                            c: tDashboard('TB.activity.c'),
                                            d: tDashboard('TB.activity.d'),
                                            e: tDashboard('TB.activity.e'),
                                            f: tDashboard('TB.activity.f'),
                                            g: tDashboard('TB.activity.g'),
                                            h: tDashboard('TB.activity.h'),
                                            i: tDashboard('TB.activity.i'),
                                        },
                                        count: {
                                            label: tDashboard('TB.count.label'),
                                        },
                                        location: {
                                            label: tDashboard('TB.location.label'),
                                        },
                                    },
                                },
                            },
                            emFotoUpload: {
                                label: t('survey.emFotoUpload.label'),
                                upload: t('survey.emFotoUpload.upload'),
                                drag: t('survey.emFotoUpload.drag'),
                                uploadBtn: t('survey.emFotoUpload.uploadBtn'),
                                deleteBtn: t('survey.emFotoUpload.deleteBtn'),
                                deleteDialog: {
                                    title: t('survey.emFotoUpload.deleteDialog.title'),
                                    description: t('survey.emFotoUpload.deleteDialog.description'),
                                    delete: t('survey.emFotoUpload.deleteDialog.delete'),
                                    keepCurrentSelection: t('survey.emFotoUpload.deleteDialog.keepCurrentSelection'),
                                },
                                successMessage: t('survey.emFotoUpload.successMessage'),
                                errorMessage: t('survey.emFotoUpload.errorMessage'),
                                fileSizeTooBigMessage: t('survey.emFotoUpload.fileSizeTooBigMessage'),
                            },
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
