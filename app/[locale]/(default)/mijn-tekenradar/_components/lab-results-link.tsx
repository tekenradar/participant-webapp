import { Button } from '@/components/ui/button';
import { getLinkingCode } from '@/lib/server/data-fetching/linking-codes';
import { getUser, Profile } from '@/lib/server/data-fetching/user';
import { MicroscopeIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';
import { fetchLabResults } from '../persoonlijke-gegevens/[profileId]/_components/lab-results';
import { addDays, parse } from 'date-fns';
import logger from '@/lib/logger';


const studyKey = process.env.NEXT_PUBLIC_STUDY_KEY || '';
const labResultLinkingCodeKey = process.env.LAB_RESULT_LINKING_CODE_KEY || '';


const LabResultsLink: React.FC = async () => {
    const t = await getTranslations('DashboardPage');

    const resp = await getUser();
    if (!resp || resp.error) {
        logger.error('Could not fetch user',
            { error: resp?.error }
        );
        return null;
    }

    const profiles = resp.user.profiles as Profile[];

    const linkingCodes = (await Promise.all(profiles.map(async (p) => {
        const linkingCodeResp = await getLinkingCode(studyKey, labResultLinkingCodeKey, p.id);
        if (linkingCodeResp.error) {
            logger.error(linkingCodeResp.error, {
                'component': 'LabResultsLink',
            });
            return null;
        }
        return {
            profileId: p.id,
            linkingCode: linkingCodeResp.linkingCode
        };
    }))).filter((l) => l !== null && l.linkingCode !== '') as { profileId: string, linkingCode: string }[];


    if (linkingCodes.length === 0) {
        return null;
    }

    const profilesWithRecentResults = await Promise.all(linkingCodes.map(async (l) => {
        // fetch lab results
        const labResResp = await fetchLabResults(l.linkingCode);
        if (labResResp.error) {
            logger.error(labResResp.error, {
                'component': 'LabResultsLink',
            });
            return {
                profileId: l.profileId,
                hasRecentResults: false,
            };
        }
        const labResults = (labResResp.labResults || []).filter((lr) => lr.afnamedatum !== undefined && lr.afnamedatum !== '');
        if (labResults.length === 0) {
            return {
                profileId: l.profileId,
                hasRecentResults: false,
            }
        }

        // if any lab results are recent
        return {
            profileId: l.profileId,
            hasRecentResults: labResults.some((lr) => {
                const dateTime = parse(lr.afnamedatum ?? '', 'dd-MM-yyyy', new Date());
                return addDays(new Date(), -7).getTime() < dateTime.getTime();
            })
        };
    }));

    const firstWithRecentResults = profilesWithRecentResults.find((p) => p.hasRecentResults);

    if (!firstWithRecentResults) {
        return null; // No recent lab results found
    }

    return (
        <Button
            className='w-full mt-2'
            asChild>
            <Link
                href={`/dashboard/persoonlijke-gegevens/${firstWithRecentResults?.profileId || profiles[0].id}`}
                prefetch={false}
                className='w-full h-auto justify-between text-wrap'
            >
                <div className='flex items-center gap-4'>
                    <MicroscopeIcon className='size-5' />
                    <span className='grow items-center flex'>
                        {t('personalData.hasRecentResults')}
                    </span>
                </div>
            </Link>
        </Button>
    );
};

export default LabResultsLink;
