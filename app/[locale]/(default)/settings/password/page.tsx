import { LocaleParams } from "@/app/[locale]/utils";
import { H2 } from "@/components/headings";
import SimpleLoader from "@/components/simple-loader";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ChangePasswordForm from "./_components/change-password-form";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ChangePasswordPage' });

    return {
        title: t('title'),
    }
}

export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ChangePasswordPage' });

    return (
        <div>
            <H2>
                {t('title')}
            </H2>
            <Suspense fallback={<SimpleLoader />}>
                <ChangePasswordForm
                    messages={{
                        currentPassword: {
                            label: t('currentPassword.label'),
                            placeholder: t('currentPassword.placeholder'),
                            description: t('currentPassword.description'),
                            invalid: t('currentPassword.invalid')
                        },
                        newPassword: {
                            label: t('newPassword.label'),
                            placeholder: t('newPassword.placeholder'),
                            description: t('newPassword.description'),
                            invalid: t('newPassword.invalid'),
                            rules: {
                                label: t('newPassword.rules.label'),
                                content: t('newPassword.rules.content'),
                            }
                        },
                        confirmPassword: {
                            label: t('confirmPassword.label'),
                            placeholder: t('confirmPassword.placeholder'),
                            description: t('confirmPassword.description'),
                            invalid: t('confirmPassword.invalid')
                        },
                        submitBtn: t('submitBtn'),
                        cancelBtn: t('cancelBtn'),
                        error: t('error'),
                        success: t('success')
                    }}
                />
            </Suspense>
        </div>
    );
}
