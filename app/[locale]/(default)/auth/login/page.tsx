import LoginForm from "./_components/login-form";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import CenteredPageLayout from "@/components/layouts/centered-page-layout";
import { LocaleParams } from "@/app/[locale]/utils";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;

    const t = await getTranslations({ locale, namespace: 'LoginPage' });
    return {
        title: t('title'),
    };
}

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        redirectTo?: string;
    }>;
}


export default async function Page({ searchParams }: PageProps) {
    let { redirectTo } = await searchParams;
    const session = await auth();
    if (session && session.user) {
        redirectTo = redirectTo || '/';
        if (redirectTo.startsWith('http')) {
            redirectTo = '/';
        }
        redirect(redirectTo)
    }



    const t = await getTranslations('LoginPage');

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
                    <LoginForm
                        messages={{
                            email: {
                                label: t('form.email.label'),
                                description: t('form.email.description'),
                                placeholder: t('form.email.placeholder'),
                                invalid: t('form.email.invalid'),
                            },
                            password: {
                                label: t('form.password.label'),
                                placeholder: t('form.password.placeholder'),
                                description: t('form.password.description'),
                                invalid: t('form.password.invalid'),
                            },
                            submitBtn: t('form.submitBtn'),
                            loginFailed: t('form.loginFailed'),
                            goToRegister: t('form.goToRegister'),
                            goToPasswordForgotten: t('form.goToPasswordForgotten'),
                        }}
                    />
                </Suspense>
            </div>
        </CenteredPageLayout>
    );
}
