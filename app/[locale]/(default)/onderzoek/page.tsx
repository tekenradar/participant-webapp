import CoverImage from "@/components/cover-image";
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
                    Doelen
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
