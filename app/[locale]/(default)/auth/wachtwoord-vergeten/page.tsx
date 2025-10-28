import { auth } from "@/auth";
import CenteredPageLayout from "@/components/layouts/centered-page-layout";
import { Loader } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import PasswordForgottenForm from "./_components/password-forgotten-form";
import { LocaleParams } from "@/app/[locale]/utils";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: 'PasswordForgottenPage' });
    return {
        title: t('title'),
    };
}

export default async function Page() {
    const session = await auth();
    if (session && session.CASE_API_accessToken) {
        redirect("/");
    }

    const t = await getTranslations('PasswordForgottenPage');

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
                    <PasswordForgottenForm
                        messages={{
                            email: {
                                label: t('form.email.label'),
                                placeholder: t('form.email.placeholder'),
                                description: t('form.email.description'),
                                invalid: t('form.email.invalid'),
                            },
                            submitBtn: t('form.submitBtn'),
                            error: t('form.error'),
                            success: t('form.success'),
                        }}
                    />
                </Suspense>
            </div>
        </CenteredPageLayout>
    );
}
