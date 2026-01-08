import { LocaleParams } from "@/app/[locale]/utils";
import { H2 } from "@/components/headings";
import SimpleLoader from "@/components/simple-loader";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ChangePhoneNumberForm from "./_components/change-phone-number-form";
import EmbeddedMarkdownRenderer from "@/components/embedded-markdown-renderer";
import { Info } from "lucide-react";
import CurrentPhoneNumber from "./_components/current-phone-number";
import { redirect } from "next/navigation";


export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ChangePhonePage' });

    return {
        title: t('title'),
    }
}

export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ChangePhonePage' });

    redirect('/settings');

    return (
        <div className="space-y-6">
            <H2>
                {t('title')}
            </H2>
            <Suspense fallback={<SimpleLoader />}>
                <div className='p-6 bg-secondary rounded flex flex-col md:flex-row items-center gap-4'>
                    <div>
                        <Info className='text-primary size-8' />
                    </div>
                    <div>
                        <EmbeddedMarkdownRenderer>
                            {t('info')}
                        </EmbeddedMarkdownRenderer>
                    </div>
                </div>
                <Suspense fallback={<SimpleLoader />}>
                    <CurrentPhoneNumber
                        messages={{
                            label: t('currentPhoneNumber.label'),
                            emptyPhoneNumber: t('currentPhoneNumber.emptyPhoneNumber'),
                            verifiedPhoneNumber: t('currentPhoneNumber.verifiedPhoneNumber'),
                            unverifiedPhoneNumber: t('currentPhoneNumber.unverifiedPhoneNumber'),
                            openVerificationPage: t('currentPhoneNumber.openVerificationPage'),
                        }}
                    />
                </Suspense>
                <ChangePhoneNumberForm
                    messages={{
                        phone: {
                            label: t('phone.label'),
                            placeholder: t('phone.placeholder'),
                            description: t('phone.description'),
                            invalid: t('phone.invalid')
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
