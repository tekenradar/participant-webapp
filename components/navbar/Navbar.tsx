import React, { Suspense } from 'react';
import Container from '@/components/container';
import UserButton from './user-button';
import { Skeleton } from '@/components/ui/skeleton';
import NavMobile from './NavMobile';
import NavDesktop from './NavDesktop';
import { auth } from '@/auth';
import { getTranslations } from 'next-intl/server';
import { NavItem } from './types';


const Navbar: React.FC = async () => {
    const t = await getTranslations('Index.navbar');
    const session = await auth();

    const navItems: NavItem[] = [
        {
            key: 'home',
            href: '/',
            label: t('home'),
        },
        {
            key: 'onderzoek',
            href: '/onderzoek',
            label: t('onderzoek'),
        },
        {
            key: 'informatie',
            label: t('informatie.title'),
            items: [
                {
                    key: 'teken',
                    href: '/informatie/teken',
                    label: t('informatie.items.teken')
                },
                {
                    key: 'lyme',
                    href: '/informatie/lyme',
                    label: t('informatie.items.lyme')
                },
                {
                    key: 'tekenradar',
                    href: '/informatie/tekenradar',
                    label: t('informatie.items.tekenradar')
                },
            ]
        },
        {
            key: 'news',
            href: '/nieuws',
            label: t('news')
        },
        {
            key: 'faq',
            href: '/faq',
            label: t('faq')
        }
    ];

    const isLoggedIn = !!session?.user;

    return (
        <div className="bg-primary text-primary-foreground">
            <Container>
                <div className="flex items-center">
                    <Suspense
                        fallback={<Skeleton className='bg-primary h-10 w-24' />}
                    >
                        <NavMobile
                            isLoggedIn={isLoggedIn}
                            navItems={navItems}
                        />
                        <NavDesktop
                            isLoggedIn={isLoggedIn}
                            navItems={navItems}
                        />
                    </Suspense>


                    <div className="ms-auto flex items-center">
                        <Suspense fallback={
                            <Skeleton className='bg-secondary h-8 w-40' />}
                        >
                            <UserButton />
                        </Suspense>
                    </div>
                </div>
            </Container >
        </div >
    );
};

export default Navbar;
