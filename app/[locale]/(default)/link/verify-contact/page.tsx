import { auth } from "@/auth";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ResendEmail from "./_components/resend-email";
import CenteredPageLayout from "@/components/layouts/centered-page-layout";
import NoTokenInfo from "./_components/no-token-info";
import SimpleLoader from "@/components/simple-loader";
import { Suspense } from "react";
import TokenVerifier from "./_components/token-verifier";

interface PageProps {
    params: Promise<{
        locale: string;
    }>
    searchParams: Promise<{
        token?: string;
    }>
}


export default async function Page(props: PageProps) {
    const { locale } = await props.params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale: locale, namespace: 'LinkResolvers.VerifyContactPage' });

    const verificationToken = (await props.searchParams).token;
    const session = await auth();
    const isLoggedIn = (session && session.user) ? true : false;

    if (!verificationToken) {
        return (
            <CenteredPageLayout
                title={t('title')}
            >
                <div className="mb-6">
                    {!verificationToken && <NoTokenInfo locale={locale} />}
                </div>
                <div className="">
                    <ResendEmail
                        isLoggedIn={isLoggedIn}
                        messages={{
                            goToLogin: t('resend.goToLogin'),
                            resendEmailVerificationBtn: t('resend.resendEmailVerificationBtn'),
                            success: t('resend.success'),
                            error: t('resend.error'),
                            refreshTokenBtn: t('resend.refreshTokenBtn'),
                            errorRefreshToken: t('resend.errorRefreshToken'),
                            successTokenRefreshed: t('resend.successTokenRefreshed'),
                        }}
                    />
                </div>
            </CenteredPageLayout>
        );
    }

    return (
        <CenteredPageLayout
            title={t('title')}
        >
            <Suspense fallback={<SimpleLoader />}>
                <TokenVerifier
                    token={verificationToken}
                    locale={locale}
                    isLoggedIn={isLoggedIn}
                />
            </Suspense>
        </CenteredPageLayout>
    );
}
