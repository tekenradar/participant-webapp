import React, { Suspense } from 'react';
import LabResultCard from './lab-result-card';
import { H2, H3 } from '@/components/headings';
import { PenIcon } from 'lucide-react';
import { parse } from 'date-fns';
import ErrorInfo from '@/components/error-info';
import { getTranslations } from 'next-intl/server';
import { getLinkingCode } from '@/lib/server/data-fetching/linking-codes';
import LabeledLoader from '@/components/labeled-loader';
import { Button } from '@/components/ui/button';
import logger from '@/lib/logger';


interface LabResultsProps {
    locale: string;
    profileId: string;
}

export const fetchLabResults = async (deelnemernummer: string): Promise<{
    error?: string;
    labResults?: LabResult[];
}> => {
    const labResultsServiceUrl = process.env.LAB_RESULTS_SERVICE_URL || '';
    if (!labResultsServiceUrl) {
        return { error: 'Lab results service URL not set' };
    }
    const url = `${labResultsServiceUrl}?deelnemernummer=${deelnemernummer}`;
    try {
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-app-id': process.env.LAB_RESULTS_SERVICE_APP_ID || '',
                'X-app-key': process.env.LAB_RESULTS_SERVICE_APP_KEY || '',
            },
            next: {
                revalidate: 0,
            }
        })

        if (resp.status !== 200) {
            if (resp.status === 404) {
                logger.info(`Lab API returned 404`);
                return {
                    labResults: [],
                }
            }
            return { error: `Failed to fetch lab results: ${resp.status}` };
        }
        const labResults = await resp.json();
        return { labResults };
    } catch (e) {
        console.log(e);
        return { error: 'Exception while fetching lab results - server logs might contain more information' };
    }
}

const labResultLinkingCodeKey = process.env.LAB_RESULT_LINKING_CODE_KEY || '';
const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || '';

interface LabResult {
    deelnemernummer: string;
    conclusie: string;
    aanmelddatum?: string;
    afnamedatum?: string;
}

const LabResults: React.FC<LabResultsProps> = async ({ locale, profileId }) => {
    const t = await getTranslations({ locale, namespace: 'PersonalDataPage' });


    const linkingCodeResp = await getLinkingCode(studyKey, labResultLinkingCodeKey, profileId);
    // linkingCodeResp.linkingCode = 'test'
    if (linkingCodeResp.error || !linkingCodeResp.linkingCode) {
        return null;
    }


    const renderLabResultsForProfile = async (profileId: string) => {
        let error: React.ReactNode = null;

        const linkingCodeResp = await getLinkingCode(studyKey, labResultLinkingCodeKey, profileId);
        if (linkingCodeResp.error) {
            error = <div
                className='flex justify-center items-center'
            ><ErrorInfo
                    title={t('labResults.errorLoadingLabResults')}
                    description={linkingCodeResp.error}
                />
            </div>
        }

        const deelnemernummer = linkingCodeResp.linkingCode;
        if (!deelnemernummer) {
            return null;
        }

        const resp = await fetchLabResults(deelnemernummer);
        if (resp.error) {
            error = <div
                className='flex justify-center items-center'
            ><ErrorInfo
                    title={t('labResults.errorLoadingLabResults')}
                    description={resp.error}
                />
            </div>
        }
        const labResults = (resp.labResults || []).filter((lr) => lr.afnamedatum !== undefined && lr.afnamedatum !== '');

        const twoWeeksMs = 14 * 24 * 60 * 60 * 1000;
        const labResultsWithDate = labResults.map((l: LabResult) => {
            const dateTime = parse(l.afnamedatum ?? '', 'dd-MM-yyyy', new Date());
            const isRecent = (Date.now() - dateTime.getTime()) <= twoWeeksMs;
            return {
                ...l,
                date: dateTime,
                displayConclusion: isRecent ? t('labResults.pendingPlaceholder') : l.conclusie,
            }
        }).sort((a, b) => {
            return b.date.getTime() - a.date.getTime();
        })

        return <div>
            {error}
            {labResultsWithDate.length < 1 && <div className='text-center text-muted-foreground py-4'>
                {t('labResults.noLabResults')}
            </div>}
            <ul className='space-y-4 mt-4'>
                {labResultsWithDate.map((l, index) => {
                    return <li key={index}>
                        <LabResultCard
                            locale={locale}
                            date={l.date}
                            conclusion={l.displayConclusion}
                        />
                    </li>
                })}
            </ul>
        </div>
    }

    return (
        <div>
            <H2>
                {t('labResults.title')}
            </H2>

            <p className='text-muted-foreground text-sm my-2'>
                {t('labResults.description')}
            </p>

            {renderLabResultsForProfile(profileId)}


            <div className='hidden'>
                <H3>
                    Contact information for lab results
                </H3>

                <p>
                    It would show the current contact information for lab study
                </p>

                <Button variant="outline" className="mt-2 hidden">
                    Edit <PenIcon className="size-4" />
                </Button>
            </div>
        </div>


    );
};


const LabResultsLoader: React.FC<LabResultsProps> = async ({ profileId, locale }) => {
    const t = await getTranslations({ locale, namespace: 'PersonalDataPage' });

    return <Suspense fallback={<LabeledLoader label={t('labResults.loading')} />}>
        <LabResults
            locale={locale}
            profileId={profileId}
        />
    </Suspense>
}


export default LabResultsLoader
