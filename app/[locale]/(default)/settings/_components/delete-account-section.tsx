import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import { H2 } from '@/components/headings';
import { AlertTriangle } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import DeleteAccountClient from './delete-account-client';
import { SurveyWithContext, getSurveyWithContextForTemporaryParticipant } from '@/lib/server/data-fetching/survey';

interface DeleteAccountSectionProps {
    locale: string;
}

const DeleteAccountSection: React.FC<DeleteAccountSectionProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'SettingsPage.deleteAccount' });
    const tSurvey = await getTranslations({ locale: props.locale, namespace: 'SurveyPage' });

    const exitSurveyStudyKey = process.env.NEXT_PUBLIC_STUDY_KEY;
    const exitSurveySurveyKey = process.env.DELETE_ACCOUNT_SURVEY_KEY;

    let survey: SurveyWithContext | undefined;
    if (exitSurveyStudyKey && exitSurveySurveyKey) {
        const resp = await getSurveyWithContextForTemporaryParticipant(exitSurveyStudyKey, exitSurveySurveyKey);
        if (resp && resp.surveyWithContext) {
            survey = resp.surveyWithContext;
        }
    }

    return (
        <div className='space-y-6'>
            <H2>
                {t('title')}
            </H2>

            <div className='p-6 bg-orange-100 rounded flex flex-col md:flex-row items-center gap-4'>
                <div>
                    <AlertTriangle className='text-orange-600 size-8' />
                </div>
                <div>
                    <EmbeddedMarkdownRenderer>
                        {t('description')}
                    </EmbeddedMarkdownRenderer>

                </div>
            </div>

            <DeleteAccountClient
                messages={{
                    deleteBtn: t('deleteBtn'),
                    dialog: {
                        title: t('dialog.title'),
                        description: t('dialog.description'),
                        confirmBtn: t('dialog.confirmBtn'),
                        cancelBtn: t('dialog.cancelBtn'),
                    },
                    survey: {
                        invalidResponseText: tSurvey('survey.invalidResponseText'),
                    },
                    success: t('dialog.success'),
                    error: t('dialog.error'),
                }}
                survey={survey as SurveyWithContext}
                locale={props.locale}


            />
        </div>
    );
};

export default DeleteAccountSection;
