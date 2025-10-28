import { auth } from '@/auth';
import { H2, H3 } from '@/components/headings';
import { Button } from '@/components/ui/button';
import { blurEmail } from '@/lib/blurEmail';
import { Pen } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import React from 'react';

interface AccountSettingsSectionProps {
    locale: string;
}

const AccountSettingsSection: React.FC<AccountSettingsSectionProps> = async (props) => {
    const session = await auth();
    const t = await getTranslations({ locale: props.locale, namespace: 'SettingsPage.accountSettings' });


    return (
        <div>
            <section>
                <H2>
                    {t('title')}
                </H2>

                <div className='space-y-4'>
                    <H3>
                        {t('email.title')}
                    </H3>
                    <p
                        className='text-sm text-muted-foreground text-justify'
                    >
                        {t('email.info')}
                    </p>
                    <Button asChild>
                        <Link
                            href='/settings/email'
                        >
                            {blurEmail(session?.user?.email ?? '')}
                            <span className='sr-only'>{t('email.change')}</span>
                            <span>
                                <Pen className='size-4 ml-2' />
                            </span>
                        </Link>
                    </Button>
                </div>

                <div className='space-y-4'>
                    <H3>
                        {t('phone.title')}
                    </H3>
                    <p
                        className='text-sm text-muted-foreground text-justify'
                    >{t('phone.info')}</p>
                    <Button asChild>
                        <Link
                            href='/settings/phone'
                        >

                            <span>{t('phone.change')}</span>
                            <span>
                                <Pen className='size-4 ml-2' />
                            </span>
                        </Link>
                    </Button>
                </div>

                <div className='space-y-4'>
                    <H3>
                        {t('password.title')}
                    </H3>
                    <p
                        className='text-sm text-muted-foreground text-justify'
                    >{t('password.info')}</p>
                    <Button asChild>
                        <Link
                            href='/settings/password'
                        >
                            {"••••••••••••••"}
                            <span className='sr-only'>{t('password.change')}</span>
                            <span>
                                <Pen className='size-4 ml-2' />
                            </span>
                        </Link>
                    </Button>
                </div>

            </section>
            <section>
                <div className='space-y-4 mt-12'>
                    <H2>
                        {t('profiles.title')}
                    </H2>
                    <p
                        className='text-sm text-muted-foreground text-justify'
                    >{t('profiles.info')}</p>
                    <Button asChild>
                        <Link
                            href='/settings/profiles'
                        >
                            {t('profiles.change')}
                            <span>
                                <Pen className='size-4 ml-2' />
                            </span>
                        </Link>
                    </Button>
                </div>
            </section>

            <section>
                <div className='space-y-4 mt-12'>
                    <H2>
                        {t('messageSubscription.title')}
                    </H2>
                    <p

                        className='text-sm text-muted-foreground text-justify'
                    >
                        {t('messageSubscription.description')}
                    </p>
                    <Button
                        asChild
                    >
                        <Link
                            href='/settings/message-subscription'
                        >
                            {t('messageSubscription.change')}
                            <span>
                                <Pen className='size-4 ml-2' />
                            </span>
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default AccountSettingsSection;
