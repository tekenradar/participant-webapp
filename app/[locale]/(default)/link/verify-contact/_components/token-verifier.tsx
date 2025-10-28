import { getTranslations } from 'next-intl/server';
import React from 'react';
import ResendEmail from './resend-email';
import { verifyContact } from '@/actions/auth/verifyContact';
import TokenVerificationSuccess from './token-verification-success';
import ErrorInfo from '@/components/error-info';


interface TokenVerifierProps {
    token: string;
    locale: string;
    isLoggedIn: boolean;
}

const TokenVerifier: React.FC<TokenVerifierProps> = async (props) => {
    const t = await getTranslations({ locale: props.locale, namespace: 'LinkResolvers.VerifyContactPage' });

    const resp = await verifyContact(props.token);


    const error = resp.error;
    if (error) {
        return <div className='space-y-6'>
            <ErrorInfo
                title={t('tokenVerificationFailed')}
                description={error}
            />
            <ResendEmail
                isLoggedIn={props.isLoggedIn}
                messages={{
                    goToLogin: t('resend.goToLogin'),
                    resendEmailVerificationBtn: t('resend.resendEmailVerificationBtn'),
                    error: t('resend.error'),
                    success: t('resend.success'),
                    refreshTokenBtn: t('resend.refreshTokenBtn'),
                    errorRefreshToken: t('resend.errorRefreshToken'),
                    successTokenRefreshed: t('resend.successTokenRefreshed'),
                }}
            />
        </div>;
    }

    return (
        <TokenVerificationSuccess
            isLoggedIn={props.isLoggedIn}
            token={props.token}
            messages={{
                tokenVerificationSuccess: t('tokenVerificationSuccess'),
                loginBtn: t('loginBtn'),
                goToDashboard: t('goToDashboard'),
                password: {
                    label: t('password.label'),
                    placeholder: t('password.placeholder'),
                    description: t('password.description'),
                    invalid: t('password.invalid')
                },
                loginFailed: t('loginFailed'),
            }}
        />
    );
};

export default TokenVerifier;
