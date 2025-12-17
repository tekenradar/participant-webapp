import LinkGroup from '@/components/link-group';
import ReportCard from '@/components/report-card';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const DashboardSidebar: React.FC = async () => {
    const t = await getTranslations('DashboardPage');

    return (
        <div className='space-y-8'>

            <div className='flex justify-center'>
                <ReportCard showMyTekenradarLink={false} />
            </div>

            <LinkGroup
                title={t('settingsLinks.title')}
                links={[
                    {
                        href: '/settings',
                        text: t('settingsLinks.settings'),
                    },
                    {
                        href: '/settings/profiles',
                        text: t('settingsLinks.manageProfiles'),
                    }
                ]}
            />

            <LinkGroup
                title={t('seeAlsoLinks.title')}
                links={[
                    {
                        href: '/informatie/faq',
                        text: t('seeAlsoLinks.faq'),
                    },
                    {
                        href: '/algemeen/contact',
                        text: t('seeAlsoLinks.contact'),
                    }
                ]}
            />
        </div>
    );
};

export default DashboardSidebar;
