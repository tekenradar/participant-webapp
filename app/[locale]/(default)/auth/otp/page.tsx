import PageTitlebar from "@/components/page-titlebar";
import OtpForm from "./_components/otp-form";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Container from "@/components/container";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { requestOTP } from "@/actions/auth/otp";
import ErrorInfo from "@/components/error-info";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/server/data-fetching/user";
import { ContactInfo } from "@/lib/server/contact-info";

interface PageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        types: string;
        otpRedirect: string;
        status: string;
    }>
}

const hasVerifiedPhoneNumber = async () => {
    const resp = await getUser();
    if (!resp || resp.error || !resp.user) {
        console.error(resp.error);
        return false;
    }
    const contactInfos = resp.user.contactInfos;
    if (!contactInfos) {
        return false;
    }

    const phoneContactInfo = contactInfos.find((contactInfo: ContactInfo) => contactInfo.type === 'phone');

    const phoneNumber = phoneContactInfo?.phone;
    const hasPhoneNumber = phoneNumber !== undefined && phoneNumber.length > 0;
    const verified = phoneContactInfo?.confirmedAt !== undefined && phoneContactInfo?.confirmedAt > 0;
    return hasPhoneNumber && verified;
}

export default async function Page({ params, searchParams }: PageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'OTPPage' });

    const types = (await searchParams).types.split(',');
    const status = (await searchParams).status;

    let error: string | undefined;
    let phoneNumberAvailable = false;

    if (types.includes('sms')) {
        // check if phone number is available
        phoneNumberAvailable = await hasVerifiedPhoneNumber();

        if (types.length === 1 && !phoneNumberAvailable) {
            // only sms type allowed
            redirect('/auth/otp/phone-number-required');
        }
    }

    // if email type allowed send email
    if (status !== 'ready') {
        if (types.includes('email')) {
            // console.log('sending email');
            const resp = await requestOTP('email');
            if (!resp || resp.error) {
                error = resp.error ? resp.error : 'Unknown error';
            }
        } else if (types.includes('sms') && phoneNumberAvailable) {
            // console.log('sending sms');
            const resp = await requestOTP('sms');
            if (!resp || resp.error) {
                error = resp.error ? resp.error : 'Unknown error';
            }
        }
    }



    return (
        <div className="flex flex-col h-full">
            <PageTitlebar>
                {t('title')}
            </PageTitlebar>

            <Container className="grow justify-center flex-col flex items-center py-12">
                <div className='max-w-[600px] w-full mx-auto'>
                    {error && <ErrorInfo
                        title={t('form.resend.error')}
                        description={error}
                    />}
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
                        <OtpForm
                            phoneNumberAvailable={phoneNumberAvailable}
                            messages={{
                                form: {
                                    otp: {
                                        label: t('form.otp.label'),
                                        description: t('form.otp.description'),
                                        invalid: t('form.otp.invalid'),
                                    },
                                    submitBtn: t('form.submitBtn'),
                                    verificationFailed: t('form.failed'),
                                },
                                resend: {
                                    text: t('form.resend.text'),
                                    emailBtn: t('form.resend.emailBtn'),
                                    smsBtn: t('form.resend.smsBtn'),
                                    error: t('form.resend.error'),
                                    success: t('form.resend.success'),
                                }
                            }}
                        />
                    </Suspense>
                </div>
            </Container>
        </div>
    );
}
