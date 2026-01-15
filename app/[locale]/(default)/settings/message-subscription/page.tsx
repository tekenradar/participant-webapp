import { LocaleParams } from "@/app/[locale]/utils";
import { H2 } from "@/components/headings";
import SimpleLoader from "@/components/simple-loader";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ManageSubscriptionsForm from "./_components/manage-subscriptions-form";
import { getUser } from "@/lib/server/data-fetching/user";
import ErrorInfo from "@/components/error-info";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'MessageSubscriptionPage' });

    return {
        title: t('title'),
    }
}

export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'MessageSubscriptionPage' });

    const resp = await getUser();
    if (!resp || resp.error) {
        console.error(resp.error);
        return <div className='flex flex-col items-center justify-center h-96'>
            <ErrorInfo
                title="Error"
                description={resp?.error}
            />
        </div>
    }

    const subscriptions = {
        subscribedToNewsletter: resp.user.contactPreferences.subscribedToNewsletter,
        subscribedToWeekly: resp.user.contactPreferences.subscribedToWeekly,
    }

    return (
        <div className="space-y-6">
            <H2>
                {t('title')}
            </H2>
            <Suspense fallback={<SimpleLoader />}>
                <p>
                    {t("info")}
                </p>
                <ManageSubscriptionsForm
                    subscriptions={subscriptions}
                    messages={{
                        // weeklySwitchLabel: t('weeklySwitchLabel'),
                        weeklySwitchLabel: 'unused for now',
                        newsletterSwitchLabel: t('newsletterSwitchLabel'),
                        success: t('success'),
                        error: t('error'),
                    }}
                />

                <Button
                    variant={'outline'}
                    asChild
                >
                    <Link href="/settings">
                        {t('backToSettingsBtn')}
                    </Link>
                </Button>
            </Suspense>
        </div>
    );
}
