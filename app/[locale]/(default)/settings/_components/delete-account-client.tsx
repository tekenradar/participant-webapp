'use client';

import { deleteAccount } from '@/actions/user/delete-account';
import LoadingButton from '@/components/loading-button';
import SurveyView from '@/components/survey-renderer/SurveyView/SurveyView';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

import React from 'react';
import { toast } from 'sonner';
import { SurveyResponse } from 'survey-engine/data_types';
import { surveyDateLocales } from '@/lib/survey-date-locales';
import { SurveyWithContext } from '@/lib/server/data-fetching/survey';


interface DeleteAccountClientProps {
    messages: {
        deleteBtn: string;
        dialog: {
            title: string;
            description: string;
            confirmBtn: string;
            cancelBtn: string;
        },
        success: string;
        error: string;
        survey: {
            invalidResponseText: string;
        };
    };
    studyKey?: string;
    survey?: SurveyWithContext;
    locale?: string;
}


const DeleteAccountClient: React.FC<DeleteAccountClientProps> = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();
    const [exitSurveyResponse, setExitSurveyResponse] = React.useState<SurveyResponse | undefined>();

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        startTransition(async () => {
            const resp = await deleteAccount(exitSurveyResponse);
            if (!resp || resp.error) {
                toast.error(props.messages.error, {
                    description: resp.error ? resp.error : 'Unknown error'
                });
                return
            }
            toast.success(props.messages.success);
            setIsOpen(false);
        });
    }

    return (
        <div>
            <AlertDialog
                open={isOpen} onOpenChange={setIsOpen}
            >
                <AlertDialogTrigger asChild>
                    <LoadingButton
                        variant={'outline'}
                        className='bg-destructive/20 hover:bg-destructive/30'
                        isLoading={isPending}
                    >
                        {props.messages.deleteBtn}
                    </LoadingButton>
                </AlertDialogTrigger>
                <AlertDialogContent className='overflow-y-scroll max-h-svh pb-12 sm:pb-6 max-w-2xl'>
                    <AlertDialogHeader>
                        <AlertDialogTitle
                            className='text-2xl'
                        >
                            {props.messages.dialog.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {props.messages.dialog.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {props.survey && props.locale && (
                        <SurveyView
                            survey={props.survey.survey}
                            context={props.survey?.context}
                            prefills={props.survey?.prefill?.responses}
                            languageCode={props.locale || ''}
                            onSubmit={() => { }}
                            showEngineDebugMsg={false}
                            onResponsesChanged={(
                                responses,
                                version,
                            ) => {
                                const now = Math.round(new Date().getTime() / 1000);
                                const response: SurveyResponse = {
                                    key: props.survey?.survey.surveyDefinition.key || 'exit',
                                    responses: [...responses],
                                    versionId: version,
                                    submittedAt: now,
                                    openedAt: now,
                                    context: {
                                        language: props.locale,
                                        engineVersion: process.env.NEXT_PUBLIC_SURVEY_ENGINE_VERSION,
                                    }
                                }
                                setExitSurveyResponse(response);
                            }}
                            backBtnText={'Back'}
                            nextBtnText={'Next'}
                            submitBtnText={'Submit'}
                            invalidResponseText={props.messages.survey.invalidResponseText}
                            hideButtons={true}
                            //customResponseComponents={customResponseComponents}
                            dateLocales={surveyDateLocales}

                        />)}
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            disabled={isPending}
                        >
                            {props.messages.dialog.cancelBtn}
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <LoadingButton
                                isLoading={isPending}
                                onClick={onDelete}
                                className='bg-destructive hover:bg-destructive/70'
                            >
                                {props.messages.dialog.confirmBtn}
                            </LoadingButton>
                        </AlertDialogAction>
                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>
        </div >
    );
};

export default DeleteAccountClient;
