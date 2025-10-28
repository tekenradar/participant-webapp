import { auth } from '@/auth';

import React from 'react';
import UserMenu, { AuthLinks } from './user-button-client';
import { getTranslations } from 'next-intl/server';
import LogoutTrigger from './logout-trigger';
import { blurEmail } from '@/lib/blurEmail';


const UserButton: React.FC = async () => {
    const session = await auth();
    const t = await getTranslations('Index.navbar');



    if (!session) {
        const buttons = [
            {
                key: 'register',
                href: '/doemee?redirectTo=/dashboard',
                label: t('register')
            },
            {
                key: 'login',
                href: '/auth/login?redirectTo=/dashboard',
                label: t('login')
            },

        ]
        return <AuthLinks
            buttons={buttons}
        />;
    }

    if (!session?.user?.email) {
        return <LogoutTrigger />
    }

    session.user.email = blurEmail(session.user.email);

    return (
        <UserMenu user={session.user}
            currentUserLabel={t('userMenu.currentUserLabel')}
            studyOverviewLink={t('userMenu.studyOverviewLink')}
            settingsLink={t('userMenu.settingsLink')}
            logoutLabel={t('userMenu.logout')}
        />
    );
};

export default UserButton;
