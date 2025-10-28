import { H2, H3 } from '@/components/headings';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeftIcon } from 'lucide-react';
import { ChevronRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';
import ContributionsOverviewClient from './contributions-overview-client';
import { getSurveyResponses, ResponseExport } from '@/lib/server/data-fetching/responses';
import ErrorInfo from '@/components/error-info';

interface ContributionsOverviewLoaderProps {
    profileId: string;
    locale: string;
}

const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY as string;
const surveyKey = "weekly";

const ContributionsOverviewSection: React.FC<ContributionsOverviewLoaderProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'PersonalDataPage' });
    return (
        <div>
            <H2>
                {t('history.title')}
            </H2>
            <p className='text-sm text-muted-foreground my-2'>
                {t('history.description')}
            </p>

            <Suspense fallback={<ConctibutionsOverviewSkeleton />}>
                <ContributionsOverviewLoader
                    profileId={props.profileId}
                    locale={props.locale}
                />
            </Suspense>

            <div className='mt-6'>
                <H3>
                    {t('history.legend.title')}
                </H3>

                <div className="flex items-center gap-2 text-sm">
                    <div className="size-4 bg-muted border border-border"></div>
                    <span>{t('history.legend.noReport')}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <div className="size-4 bg-secondary"></div>
                    <span>{t('history.legend.sentInReportWithoutSymptoms')}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <div className="size-4 bg-primary"></div>
                    <span>{t('history.legend.reportIncludedSymptoms')}</span>
                </div>
            </div>
        </div>
    );
}

const getContributionsList = (responses: ResponseExport[]): Array<{
    time: number;
    hasSymptoms: boolean;
}> => {
    return responses.map((response) => {
        const hasSymptoms = Object.keys(response).some(key => {
            if (!key.startsWith('weekly.q1.1')) {
                return false;
            }
            if (key === 'weekly.q1.1-0' && response[key] === 'TRUE') {
                return false;
            }
            return response[key] === 'TRUE';
        });

        return {
            time: response.arrived,
            hasSymptoms,
        }
    })
}

const ContributionsOverviewLoader: React.FC<ContributionsOverviewLoaderProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'PersonalDataPage' });
    // fetch data

    const resp = await getSurveyResponses(studyKey, surveyKey, props.profileId, 1000);
    if (resp.error) {
        return <div className='flex items-center justify-center'>
            <ErrorInfo
                title={t('history.errorLoadingResponses')}
                description={resp.error ? resp.error : 'Unknown error'}
            />
        </div>
    }

    return (
        <ContributionsOverviewClient
            contributionsList={getContributionsList(resp.responses || [])}
            messages={{
                previousYear: t('history.previousYear'),
                currentYear: t('history.currentYear'),
                nextYear: t('history.nextYear'),
                beforeJoin: t('history.beforeJoin'),
                noSubmissions: t('history.noSubmissions'),
                submissionsCount: t('history.submissionsCount'),
                weekOf: t('history.weekOf'),
            }}
        />
    );
};

const ConctibutionsOverviewSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-2 mt-6">
            <div className="flex flex-col gap-0.5 justify-center items-center">
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-0.5">
                        {Array.from({ length: 13 }).map((_, colIndex) => (
                            <Skeleton key={colIndex} className="size-6" />
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <ChevronLeftIcon className="size-4 text-muted-foreground" />
                <Skeleton className="w-10 h-6" />
                <ChevronRightIcon className="size-4 text-muted-foreground" />
            </div>

        </div>

    );
}

export { ConctibutionsOverviewSkeleton };

export default ContributionsOverviewSection;
