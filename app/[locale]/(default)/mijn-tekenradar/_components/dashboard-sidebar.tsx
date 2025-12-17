import LinkGroup from '@/components/link-group';
import { Button } from '@/components/ui/button';
import { NotebookTextIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';
import LabResultsLink from './lab-results-link';


const DashboardSidebar: React.FC = async () => {
    const t = await getTranslations('DashboardPage');

    return (
        <div className='space-y-4 max-w-[300px]'>
            <div className='border border-primary rounded p-4 @container w-full'>
                <h2 className='font-heading font-bold text-2xl flex flex-col @xs:flex-row items-start @xs:items-center gap-2'>
                    <span className='text-muted-foreground'>
                        <NotebookTextIcon className='size-8 @xs:size-5' />
                    </span>
                    {t('personalData.title')}
                </h2>
                <p>
                    {t('personalData.description')}
                </p>

                <LabResultsLink />

                <Button
                    variant={'outline'}
                    className='w-full mt-4 text-center text-balance h-fit'
                    asChild>
                    <Link href="/dashboard/persoonlijke-gegevens"
                        prefetch={false}
                    >
                        {t('personalData.openResultsBtn')}
                    </Link>
                </Button>
            </div>


            <LinkGroup
                title={t('links.title')}
                links={[
                    {
                        href: '/informatie/faq',
                        text: t('links.faq'),
                    },
                    {
                        href: '/settings',
                        text: t('links.settings'),
                    },
                    {
                        href: '/settings/profiles',
                        text: t('links.manageProfiles'),
                    },
                    {
                        href: '/algemeen/contact',
                        text: t('links.contact'),
                    }
                ]}
            />
        </div>
    );
};

export default DashboardSidebar;
