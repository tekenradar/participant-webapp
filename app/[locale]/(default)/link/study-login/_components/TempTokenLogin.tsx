import { getTemptokenInfos } from '@/actions/auth/temptoken-infos';
import { auth } from '@/auth';
import { getTranslations } from 'next-intl/server';

import React from 'react';

import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LogoutTrigger from '@/components/navbar/logout-trigger';

interface TempTokenLoginProps {
    locale: string;
    token: string;
    callback: string;
}

const TempTokenLogin: React.FC<TempTokenLoginProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'LinkResolvers.StudyLoginPage' });
    const session = await auth();


    const tokenInfosResp = await getTemptokenInfos(props.token);
    if (tokenInfosResp.error) {
        return <div>
            <p className="text-destructive text-xl font-semibold">
                {t("tokenError")}
            </p>
            <p className="mt-2 text-sm">
                {tokenInfosResp.error}
            </p>
            <div className='mt-4'>
                <Button asChild>
                    <Link
                        href={`/auth/login?redirectTo=${props.callback}`}
                        prefetch={false}
                    >
                        {t("goToLogin")}
                    </Link>
                </Button>
            </div>
        </div>
    }


    if (session && session.user) {
        if (session.user.email === tokenInfosResp.email && session.user.id === tokenInfosResp.userID) {
            redirect(props.callback);
        } else {
            return <LogoutTrigger />
        }
    }

    return (
        <LoginForm
            email={tokenInfosResp.email}
            token={props.token}
            callback={props.callback}
            messages={{
                infos: t("form.infos"),
                email: {
                    label: t("form.email.label"),
                    description: t("form.email.description"),
                    placeholder: t("form.email.placeholder"),
                    invalid: t("form.email.invalid")
                },
                password: {
                    label: t("form.password.label"),
                    description: t("form.password.description"),
                    placeholder: t("form.password.placeholder"),
                    invalid: t("form.password.invalid")
                },
                submitBtn: t("form.submitBtn"),
                goToPasswordForgotten: t("form.goToPasswordForgotten"),
                error: t("form.loginFailed")
            }}
        />
    );
};

export default TempTokenLogin;
