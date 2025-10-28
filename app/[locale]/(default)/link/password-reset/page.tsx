import { LocaleParams } from "@/app/[locale]/utils";
import { auth } from "@/auth";

import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { getInfosForPasswordReset } from "@/actions/auth/password-reset";
import PasswordResetForm from "./_components/password-reset-form";
import LogoutTrigger from "@/components/navbar/logout-trigger";
import CenteredPageLayout from "@/components/layouts/centered-page-layout";


interface PageProps extends LocaleParams {
    searchParams: Promise<{
        token?: string;
    }>;
}

export default async function Page(props: PageProps) {
    const session = await auth();
    if (session && session.user) {
        return <LogoutTrigger />;
    }

    const { locale } = await props.params;

    const t = await getTranslations({ locale: locale, namespace: 'LinkResolvers.PasswordResetPage' });

    const token = (await props.searchParams).token;
    if (!token) {
        return <CenteredPageLayout
            title={t("title")}
        >
            <div className='max-w-[600px] w-full mx-auto'>
                <p className="text-destructive text-xl font-semibold">
                    {t("tokenMissing")}
                </p>
            </div>
        </CenteredPageLayout>
    }

    const tokenInfosResp = await getInfosForPasswordReset(token);
    if (tokenInfosResp.error) {
        return <CenteredPageLayout
            title={t("title")}
        >
            <div className='max-w-[600px] w-full mx-auto'>
                <p className="text-destructive text-xl font-semibold">
                    {t("tokenError")}
                </p>
                <p className="mt-2 text-sm">
                    {tokenInfosResp.error}
                </p>
            </div>
        </CenteredPageLayout>
    }

    return (
        <CenteredPageLayout
            title={t("title")}
        >
            <div className='max-w-[600px] w-full mx-auto'>
                <Suspense
                    fallback={
                        <div className="flex items-center justify-center h-96">
                            <Loader
                                className='size-8 animate-spin'
                                aria-label='Loading...'
                            />
                        </div>
                    }
                >
                    <PasswordResetForm
                        token={token}
                        email={tokenInfosResp.accountId}
                        messages={{
                            infos: t("infos"),
                            email: {
                                label: t("email.label"),
                                placeholder: t("email.placeholder"),
                                description: t("email.description"),
                                invalid: t("email.invalid")
                            },
                            newPassword: {
                                label: t("newPassword.label"),
                                placeholder: t("newPassword.placeholder"),
                                description: t("newPassword.description"),
                                invalid: t("newPassword.invalid"),
                                rules: {
                                    label: t("newPassword.rules.label"),
                                    content: t("newPassword.rules.content"),
                                }
                            },
                            confirmPassword: {
                                label: t("confirmPassword.label"),
                                placeholder: t("confirmPassword.placeholder"),
                                description: t("confirmPassword.description"),
                                invalid: t("confirmPassword.invalid")
                            },
                            submitBtn: t("submitBtn"),
                            error: t("error"),
                            success: t("success")
                        }} />
                </Suspense>
            </div>
        </CenteredPageLayout>
    );
}
