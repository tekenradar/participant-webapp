import { getTranslations } from "next-intl/server";
import SignupForm from "./_components/signup-form";
import { Suspense } from "react";

import path from "path";
import fs from "fs/promises";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Loader } from "lucide-react";
import CenteredPageLayout from "@/components/layouts/centered-page-layout";
import { LocaleParams } from "@/app/[locale]/utils";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: 'RegisterPage' });
    return {
        title: t('title'),
    };
}

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        redirectTo?: string;
    }>;
}

export default async function Page({ params, searchParams }: PageProps) {
    const { locale } = await params;
    const { redirectTo } = await searchParams;
    const session = await auth();
    if (session && session.user) {
        redirect(redirectTo || '/')
    }

    const t = await getTranslations({ locale, namespace: 'RegisterPage' });

    const privacyPolicyMdPath = path.join(process.cwd(), 'content', locale, 'privacy-consent.md')
    const readPrivacyPolicyMd = await fs.readFile(privacyPolicyMdPath, 'utf8')

    return (
        <CenteredPageLayout
            title={t('title')}
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
                    <SignupForm
                        currentLocale={locale}
                        messages={{
                            info: t('form.info'),
                            email: {
                                label: t('form.email.label'),
                                description: t('form.email.description'),
                                placeholder: t('form.email.placeholder'),
                                invalid: t('form.email.invalid'),
                            },
                            password: {
                                label: t('form.password.label'),
                                description: t('form.password.description'),
                                placeholder: t('form.password.placeholder'),
                                invalid: t('form.password.invalid'),
                                rules: {
                                    label: t('form.password.rules.label'),
                                    content: t('form.password.rules.content'),
                                }
                            },
                            confirmPassword: {
                                label: t('form.confirmPassword.label'),
                                description: t('form.confirmPassword.description'),
                                placeholder: t('form.confirmPassword.placeholder'),
                                invalid: t('form.confirmPassword.invalid'),
                            },
                            consent: {
                                label: t('form.consent.label'),
                                invalid: t('form.consent.invalid'),
                                dialog: {
                                    title: t('form.consent.dialog.title'),
                                    content: readPrivacyPolicyMd,
                                    acceptBtn: t('form.consent.dialog.acceptBtn'),
                                    rejectBtn: t('form.consent.dialog.rejectBtn'),
                                }
                            },
                            submitBtn: t('form.submitBtn'),
                            goToLogin: t('form.goToLogin'),
                            signupFailed: t('form.signupFailed'),
                        }}
                    />
                </Suspense>
            </div>
        </CenteredPageLayout>
    );
}
