import Container from "@/components/container";
import LinkGroup from "@/components/link-group";
import PageTitlebar from "@/components/page-titlebar";
import { getTranslations } from "next-intl/server";
import { LocaleParams } from "../../utils";

export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: 'SettingsPage' });
    return {
        title: t('title'),
    };
}

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = await getTranslations('SettingsPage');

    return (
        <div className="flex flex-col h-full">
            <PageTitlebar>
                {t('title')}
            </PageTitlebar>

            <Container className="py-6 flex flex-col gap-6 md:flex-row">
                <div className="grow">
                    {children}
                </div>
                <div className="min-w-64">
                    <LinkGroup
                        title={t('links.title')}
                        links={[
                            {
                                href: '/informatie/faq',
                                text: t('links.faq')
                            },
                            {
                                href: '/algemeen/privacy',
                                text: t('links.privacy')
                            },
                            {
                                href: '/algemeen/contact',
                                text: t('links.contact')
                            }
                        ]}
                    />

                </div>
            </Container>
        </div>
    );
}
