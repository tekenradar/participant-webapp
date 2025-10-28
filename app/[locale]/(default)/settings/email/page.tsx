import { LocaleParams } from "@/app/[locale]/utils";
import { H2 } from "@/components/headings";
import SimpleLoader from "@/components/simple-loader";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ChangeAccountEmailForm from "./_components/change-account-email-form";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ChangeEmailPage' });

    return {
        title: t('title'),
    }
}

export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ChangeEmailPage' });

    return (
        <div>
            <H2>
                {t('title')}
            </H2>
            <Suspense fallback={<SimpleLoader />}>
                <ChangeAccountEmailForm
                    messages={{
                        email: {
                            label: t('email.label'),
                            placeholder: t('email.placeholder'),
                            description: t('email.description'),
                            invalid: t('email.invalid')
                        },
                        password: {
                            label: t('password.label'),
                            placeholder: t('password.placeholder'),
                            description: t('password.description'),
                            invalid: t('password.invalid')
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
