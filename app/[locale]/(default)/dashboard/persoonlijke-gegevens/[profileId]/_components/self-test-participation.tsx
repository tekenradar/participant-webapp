import React, { Suspense } from 'react';
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getParticipantState } from "@/lib/server/data-fetching/participant-state";
import { H2 } from '@/components/headings';
import EmbeddedMarkdownRenderer from '@/components/embedded-markdown-renderer';
import { ConfidentialResponse, getConfidentialSurveyResponse } from '@/lib/server/data-fetching/responses';
import { Pencil } from 'lucide-react';
import LabeledLoader from '@/components/labeled-loader';
import { OrderNewTestKits } from './order-new-test-kits';

interface SelfTestParticipationProps {
    profileId: string;
    locale: string;
}

// Assuming there's a swab study key - this should be configured via environment variable
const STUDY_KEY = process.env.NEXT_PUBLIC_STUDY_KEY!;

interface ContactInfo {
    fullName: string;
    address: {
        street: string;
        street2: string;
        houseNumber: string;
        postalCode: string;
        city: string;
    }
}

const parseContactInfo = (confidentialResponses: ConfidentialResponse[]): ContactInfo => {
    const givenName = confidentialResponses.find(r => r.responseKey.endsWith('givenName'))?.value || '';
    const familyName = confidentialResponses.find(r => r.responseKey.endsWith('familyName'))?.value || '';
    const fullName = (givenName && familyName) ? `${givenName} ${familyName}` : confidentialResponses.find(r => r.responseKey.endsWith('fullName'))?.value || '';
    const data = {
        fullName: fullName,
        address: {
            street: confidentialResponses.find(r => r.responseKey.endsWith('street'))?.value || '',
            street2: confidentialResponses.find(r => r.responseKey.endsWith('street2'))?.value || '',
            houseNumber: confidentialResponses.find(r => r.responseKey.endsWith('houseNumber'))?.value || '',
            postalCode: confidentialResponses.find(r => r.responseKey.endsWith('postalCode'))?.value || '',
            city: confidentialResponses.find(r => r.responseKey.endsWith('city'))?.value || '',
        }
    }
    return data;
}


// Async component that fetches the data
const SelfTestParticipationContent: React.FC<SelfTestParticipationProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'PersonalDataPage' });

    // Check if user is participating in swab study by getting participant state
    const participantStateResp = await getParticipantState(STUDY_KEY, props.profileId);

    const isParticipating = participantStateResp.participant &&
        participantStateResp.participant.flags.selfSwabbing === 'active';

    let content: React.ReactNode = null;

    if (isParticipating) {
        const confResp = await getConfidentialSurveyResponse(STUDY_KEY, 'SwabEntry.Addr', props.profileId);

        // Case 1: Error fetching data or no contact info available
        if (confResp.error || !confResp.confidentialResponse) {
            content = (
                <div className='mt-4 space-y-2 border border-border rounded-md p-4'>
                    <EmbeddedMarkdownRenderer className='text-sm'>
                        {t('selfTestParticipation.pleaseUpdateContactInfo')}
                    </EmbeddedMarkdownRenderer>
                    <Button asChild>
                        <Link
                            href={{
                                pathname: `/survey/${STUDY_KEY}/ChangeAddr`,
                                query: {
                                    pid: props.profileId,
                                    ignoreImmediateSurveys: 'true',
                                    redirectUrl: `/dashboard/persoonlijke-gegevens/${props.profileId}`,
                                }
                            }}
                            prefetch={false}
                        >
                            {t('selfTestParticipation.updateContactButton')}
                        </Link>
                    </Button>
                </div>
            );
        } else {
            const contactInfo = parseContactInfo(confResp.confidentialResponse);
            // Case 1: Full name is empty (incomplete contact info)
            if (contactInfo.fullName === '') {
                content = (
                    <div className='mt-4 space-y-2 border border-border rounded-md p-4'>
                        <EmbeddedMarkdownRenderer className='text-sm'>
                            {t('selfTestParticipation.pleaseUpdateContactInfo')}
                        </EmbeddedMarkdownRenderer>
                        <Button asChild>
                            <Link
                                href={{
                                    pathname: `/survey/${STUDY_KEY}/ChangeAddr`,
                                    query: {
                                        pid: props.profileId,
                                        ignoreImmediateSurveys: 'true',
                                        redirectUrl: `/dashboard/persoonlijke-gegevens/${props.profileId}`,
                                    }
                                }}
                                className='flex items-center gap-2'
                            >
                                <span className='text-white/60'>
                                    <Pencil className='size-4' />
                                </span>
                                {t('selfTestParticipation.changeContactInfo')}
                            </Link>
                        </Button>
                    </div>
                );
            } else {
                // Case 2: Contact info is available - display it with update option
                content = (
                    <>
                        <div className='mt-4 space-y-4 border border-border rounded-md p-4'>
                            <div>
                                <h3 className='font-bold text-sm mb-2'>
                                    {t('selfTestParticipation.contactInfo')}
                                </h3>
                                <div className='text-sm space-y-1 text-muted-foreground'>
                                    <div>{contactInfo.fullName}</div>
                                    <div>
                                        {contactInfo.address.street} {contactInfo.address.houseNumber}
                                        {contactInfo.address.street2 && `-${contactInfo.address.street2}`}
                                    </div>
                                    <div>
                                        {contactInfo.address.postalCode} {contactInfo.address.city}
                                    </div>
                                </div>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link
                                    href={{
                                        pathname: `/survey/${STUDY_KEY}/ChangeAddr`,
                                        query: {
                                            pid: props.profileId,
                                            ignoreImmediateSurveys: 'true',
                                            redirectUrl: `/dashboard/persoonlijke-gegevens/${props.profileId}`,
                                        }
                                    }}
                                    prefetch={false}
                                    className='flex items-center gap-2'
                                >
                                    <span className='text-muted-foreground'>
                                        <Pencil className='size-4' />
                                    </span>
                                    {t('selfTestParticipation.changeContactInfo')}
                                </Link>
                            </Button>
                        </div>

                        <OrderNewTestKits
                            profileId={props.profileId}
                            studyKey={STUDY_KEY}
                            contactInfo={contactInfo}
                            messages={{
                                selectTypeDropdown: {
                                    btnLabel: t('orderKits.selectTypeDropdown.btnLabel'),
                                    chooseTypeLabel: t('orderKits.selectTypeDropdown.chooseTypeLabel'),
                                    corona: {
                                        title: t('orderKits.selectTypeDropdown.corona.title'),
                                        description: t('orderKits.selectTypeDropdown.corona.description'),
                                    },
                                    nk_monster: {
                                        title: t('orderKits.selectTypeDropdown.nk_monster.title'),
                                        description: t('orderKits.selectTypeDropdown.nk_monster.description'),
                                    }
                                },
                                alertDialog: {
                                    title: t('orderKits.alertDialog.title'),
                                    titleCorona: t('orderKits.alertDialog.titleCorona'),
                                    titleNkMonster: t('orderKits.alertDialog.titleNkMonster'),
                                    description: t('orderKits.alertDialog.description'),
                                    cancelBtn: t('orderKits.alertDialog.cancelBtn'),
                                    changeAddressBtn: t('orderKits.alertDialog.changeAddressBtn'),
                                    orderBtn: t('orderKits.alertDialog.orderBtn'),
                                    noAddress: t('orderKits.alertDialog.noAddress'),
                                },
                                toast: {
                                    success: t('orderKits.toast.success'),
                                    error: t('orderKits.toast.error'),
                                }
                            }}
                        />
                    </>
                );
            }
        }
    } else {
        content = (<div className='mt-4 space-y-2 border border-border rounded-md p-4'>
            <EmbeddedMarkdownRenderer className='text-sm '>
                {t('selfTestParticipation.notParticipatingDescription')}
            </EmbeddedMarkdownRenderer>
            <Button asChild>
                <Link
                    href={{
                        pathname: `/survey/${STUDY_KEY}/SwabEntry`,
                        query: {
                            pid: props.profileId,
                            ignoreImmediateSurveys: 'true',
                            redirectUrl: `/dashboard/persoonlijke-gegevens/${props.profileId}`,
                        }
                    }}
                    prefetch={false}
                >
                    {t('selfTestParticipation.joinStudy')}
                </Link>
            </Button>
        </div>
        )
    }

    return content;
};

// Main component with Suspense wrapper
const SelfTestParticipation: React.FC<SelfTestParticipationProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'PersonalDataPage' });

    return (
        <div className='space-y-4'>
            <H2>
                {t('selfTestParticipation.title')}
            </H2>

            <Suspense fallback={<LabeledLoader label={t('selfTestParticipation.loading')} />}>
                <SelfTestParticipationContent
                    profileId={props.profileId}
                    locale={props.locale}
                />
            </Suspense>
        </div>
    );
};

export default SelfTestParticipation;