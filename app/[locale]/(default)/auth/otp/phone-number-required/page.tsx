import { LocaleParams } from "@/app/[locale]/utils";
import Container from "@/components/container";
import EmbeddedMarkdownRenderer from "@/components/embedded-markdown-renderer";
import LinkButton from "@/components/buttons/link-button";
import PageTitlebar from "@/components/page-titlebar";
import { AlertTriangle } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: 'PhoneNumberRequiredPage' });

    return {
        title: t('title'),
    }
}

export default async function Page({ params }: LocaleParams) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'PhoneNumberRequiredPage' });

    return (
        <div className="flex flex-col h-full">
            <PageTitlebar>
                {t('title')}
            </PageTitlebar>

            <Container className="grow justify-center flex-col flex items-center py-12">
                <div className="space-y-6 flex flex-col items-center max-w-[600px]">
                    <div className="flex justify-center">
                        <AlertTriangle className='text-primary size-12' />
                    </div>
                    <EmbeddedMarkdownRenderer
                        className='text-justify'
                    >
                        {t('description')}
                    </EmbeddedMarkdownRenderer>
                    <LinkButton
                        href='/settings/phone'
                    >
                        {t('goToSettings')}
                    </LinkButton>
                </div>
            </Container>
        </div>
    );
}
