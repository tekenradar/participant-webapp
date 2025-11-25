import Container from "@/components/container";
import CoverImage from "@/components/cover-image";
import EmbeddedMarkdownRenderer from "@/components/embedded-markdown-renderer";
import { H2 } from "@/components/headings";
import PageTitlebar from "@/components/page-titlebar";
import { getTranslations, setRequestLocale } from "next-intl/server";


interface PageProps {
    params: Promise<{
        locale: string;
    }>;
}


export const generateMetadata = async (props: PageProps) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale, namespace: 'OnderzoekPage' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    }
}

export default async function Page(
    props: PageProps
) {
    const { locale } = await props.params;
    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'OnderzoekPage' });

    return (
        <div>
            <PageTitlebar>
                {t('title')}
            </PageTitlebar>
            <CoverImage
                width={1000}
                height={367}
                src="/static/images/waar-leven-teken.jpg"
                alt={t('title')}
                coverImageYPosition="20%"
            />
            <div className='space-y-6 py-6'>

                <section>
                    <Container className="space-y-4">
                        <H2>{t('doelen.title')}</H2>

                        <EmbeddedMarkdownRenderer className="max-w-3xl">
                            {t('doelen.description')}
                        </EmbeddedMarkdownRenderer>
                    </Container>

                </section>

                <section>
                    Onze onderzoeken
                </section>

                <section>
                    Results
                </section>

                <section>
                    for doctors
                </section>

            </div>

        </div>
    )
}
