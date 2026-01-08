import SimpleLoader from "@/components/simple-loader";
import { Suspense } from "react";
import VerificationForm from "./_components/VerificationForm";
import { LocaleParams } from "@/app/[locale]/utils";
import { getTranslations } from "next-intl/server";
import { H2 } from "@/components/headings";
import { redirect } from "next/navigation";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'VerifyPhoneNumberPage' });

    return {
        title: t('title'),
    }
}


export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'VerifyPhoneNumberPage' });

    redirect('/settings');

    return (
        <div className="space-y-6">
            <H2>
                {t('title')}
            </H2>
            <Suspense fallback={<SimpleLoader />}>
                <VerificationForm
                    messages={{
                        form: {
                            otp: {
                                label: t('form.otp.label'),
                                description: t('form.otp.description'),
                                invalid: t('form.otp.invalid'),
                            },
                            submitBtn: t('form.submitBtn'),
                            verificationFailed: t('form.verificationFailed'),
                        },
                        requestCode: {
                            error: t('requestCode.error'),
                            btnLabel: t('requestCode.btnLabel'),
                            success: t('requestCode.success'),
                        }
                    }}
                />
            </Suspense>
        </div>
    );
}
