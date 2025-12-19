'use client';

import SurveyView from '@/components/survey-renderer/SurveyView/SurveyView';
import { SurveyWithContext } from '@/lib/server/data-fetching/survey';
import React from 'react';
import { surveyDateLocales } from '@/lib/survey-date-locales';
import { useRouter } from 'next/navigation';
import { SurveyResponse } from 'survey-engine/data_types';
import { submitResponses } from '@/actions/study/submit-responses';
import ContactFormWithAddressLookup from './custom-survey-components/contact-form-with-address-lookup';
import TickMapLocationPicker from './custom-survey-components/tick-map-location-picker';
import { submitResponseForTempParticipant } from '@/actions/study/temp-participant';
import SurveySkeleton from './survey-skeleton';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle, Loader } from 'lucide-react';
import { DEFAULT_DASHBOARD_URL } from '@/constants';
import ReportSelector, { ReportSelectorMessages } from './custom-survey-components/report-selector';
import { CommonResponseComponentProps } from '../survey-renderer/SurveySingleItemView/utils';
import EmFotoUpload, { EmFotoUploadMessages } from './custom-survey-components/em-foto-upload';


interface SurveyClientProps {
    studyKey: string;
    surveyKey: string;
    profileID?: string;
    openAt: number;
    locale: string;
    surveyWithContext: SurveyWithContext;
    messages: {
        previousPageBtn: string;
        nextPageBtn: string;
        submitBtn: string;
        invalidResponseText: string;
        submissionDialog: {
            title: string;
            description: string;
            errorTitle: string;
            errorDescription: string;
            goBackBtn: string;
            retryBtn: string;
        }
        reportSelector?: ReportSelectorMessages;
        emFotoUpload?: EmFotoUploadMessages;
    }
    ignoreImmediateSurveys?: boolean;
    redirectUrl?: string;
}

const SurveyClient: React.FC<SurveyClientProps> = (props) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const router = useRouter();
    const [submissionState, setSubmissionState] = React.useState<{
        isLoading: boolean;
        error: string | null;
        response: SurveyResponse | null;
    }>({
        isLoading: false,
        error: null,
        response: null,
    });

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        setSubmissionState({ isLoading: false, error: null, response: null });
    }, [props.surveyWithContext]);

    if (!isMounted) {
        return <div>
            <SurveySkeleton hideTitle={true} />
        </div>;
    }

    const submitResponse = async (response: SurveyResponse) => {
        setSubmissionState({ isLoading: true, error: null, response });

        if (!props.profileID) {
            const resp = await submitResponseForTempParticipant(props.studyKey, response);
            // If function returns (doesn't redirect), it means there was an error
            if (resp && 'error' in resp) {
                setSubmissionState({
                    isLoading: false,
                    error: resp.error || 'Unknown error',
                    response,
                });
                return;
            }
        } else {
            const resp = await submitResponses(
                props.studyKey,
                props.profileID,
                response,
                props.redirectUrl || DEFAULT_DASHBOARD_URL,
                props.ignoreImmediateSurveys,
            );
            if (!resp || resp.error) {
                setSubmissionState({
                    isLoading: false,
                    error: resp?.error || 'Unknown error',
                    response,
                });
                return;
            }
        }

        // Success - close dialog and redirect
        setSubmissionState({ isLoading: false, error: null, response: null });
        const redirectUrl = props.redirectUrl || DEFAULT_DASHBOARD_URL;
        router.replace(redirectUrl);
    };

    const onSubmit = (response: SurveyResponse) => {
        submitResponse(response);
    };

    const handleRetry = () => {
        if (submissionState.response) {
            setSubmissionState({ ...submissionState, error: null });
            submitResponse(submissionState.response!);
        }
    };

    const handleGoBack = () => {
        setSubmissionState({ isLoading: false, error: null, response: null });
        const redirectUrl = props.redirectUrl || DEFAULT_DASHBOARD_URL;
        router.push(redirectUrl);
    };

    const isDialogOpen = submissionState.isLoading || submissionState.error !== null;

    return (
        <>
            <SurveyView
                loading={submissionState.isLoading}
                survey={props.surveyWithContext.survey}
                context={props.surveyWithContext.context}
                prefills={props.surveyWithContext.prefill?.responses}
                languageCode={props.locale}
                backBtnText={props.messages.previousPageBtn}
                nextBtnText={props.messages.nextPageBtn}
                submitBtnText={props.messages.submitBtn}
                invalidResponseText={props.messages.invalidResponseText}
                customResponseComponents={[
                    {
                        name: 'contact',
                        component: ContactFormWithAddressLookup,
                    },
                    {
                        name: ':map',
                        component: TickMapLocationPicker,
                    },
                    {
                        name: 'input:TBReportSelector',
                        component: (compProps: CommonResponseComponentProps) => <ReportSelector
                            {...compProps}
                            profileID={props.profileID || ''}
                            locale={props.locale}
                            messages={props.messages?.reportSelector || undefined}
                        />,
                    },
                    {
                        name: 'input:file',
                        component: (compProps: CommonResponseComponentProps) => <EmFotoUpload
                            {...compProps}
                            studyKey={props.studyKey}
                            profileID={props.profileID || ''}
                            messages={props.messages?.emFotoUpload || undefined}
                        />,
                    }
                ]}
                dateLocales={surveyDateLocales}

                onSubmit={(responses, version) => {
                    const now = Math.round(new Date().getTime() / 1000);
                    const response: SurveyResponse = {
                        key: props.surveyKey,
                        responses: [...responses],
                        versionId: version,
                        submittedAt: now,
                        openedAt: props.openAt,
                        context: {
                            language: props.locale,
                            engineVersion: process.env.NEXT_PUBLIC_SURVEY_ENGINE_VERSION,
                        }
                    }
                    onSubmit(response);
                }}
            />

            <AlertDialog open={isDialogOpen} onOpenChange={(open) => {
                if (!open && !submissionState.isLoading) {
                    // Only allow closing if not loading
                    setSubmissionState({ isLoading: false, error: null, response: null });
                }
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {submissionState.isLoading ? props.messages.submissionDialog.title : props.messages.submissionDialog.errorTitle}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {submissionState.isLoading ? (
                                <span className="flex items-center justify-center gap-3 py-4">
                                    <Loader className="size-5 animate-spin" />
                                    <span>{props.messages.submissionDialog.description}</span>
                                </span>
                            ) : (
                                <>
                                    <span className="flex items-center justify-center gap-3 py-4 text-destructive">
                                        <AlertCircle className="size-5 text-destructive" />
                                        {props.messages.submissionDialog.errorDescription}
                                    </span>
                                    <span className='text-center border border-border rounded-md p-4 flex items-center justify-center gap-3'>{submissionState.error}</span>
                                </>


                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {submissionState.error && (
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleGoBack}>
                                {props.messages.submissionDialog.goBackBtn}
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleRetry}>
                                {props.messages.submissionDialog.retryBtn}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default SurveyClient;
