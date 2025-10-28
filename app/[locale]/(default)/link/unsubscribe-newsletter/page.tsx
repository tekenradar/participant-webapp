import { unsubscribeNewsletterWithTempToken } from "@/actions/user/unsubscribe-newsletter-with-temptoken";
import CenteredPageLayout from "@/components/layouts/centered-page-layout";
import EmbeddedMarkdownRenderer from "@/components/embedded-markdown-renderer";
import ErrorInfo from "@/components/error-info";
import { CheckCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface PageProps {
    params: Promise<{
        locale: string;
    }>
    searchParams: Promise<{
        token?: string;
    }>
}

export const dynamic = 'force-dynamic';

export const generateMetadata = async (props: PageProps) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'LinkResolvers.UnsubscribeNewsletterPage' });
    return {
        title: t('title'),
    };
}


export default async function Page(props: PageProps) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'LinkResolvers.UnsubscribeNewsletterPage' });
    const token = (await props.searchParams).token;
    if (!token) {
        return <CenteredPageLayout
            title={t('title')}
        >
            <ErrorInfo
                title={t('errors.tokenMissing.title')}
                description={t('errors.tokenMissing.description')}
            />
        </CenteredPageLayout>
    }

    const resp = await unsubscribeNewsletterWithTempToken(token);
    if (resp.error) {
        console.error(resp.error);
        return <CenteredPageLayout
            title={t('title')}
        >
            <ErrorInfo
                title={t('errors.requestFailed.title')}
                description={t('errors.requestFailed.description')}
            />
        </CenteredPageLayout>
    }


    return (
        <CenteredPageLayout
            title={t('title')}
        >
            <div className='my-12'>
                <p className="text-primary text-xl font-semibold flex flex-col sm:flex-row items-center gap-2">
                    <span>
                        <CheckCheck className='size-8' />
                    </span>
                    {t('success.title')}
                </p>
                <EmbeddedMarkdownRenderer>
                    {t('success.description')}
                </EmbeddedMarkdownRenderer>
            </div >
        </CenteredPageLayout>
    );
}
