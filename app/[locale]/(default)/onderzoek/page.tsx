import Container from "@/components/container";
import CoverImage from "@/components/cover-image";
import EmbeddedMarkdownRenderer from "@/components/embedded-markdown-renderer";
import { H2 } from "@/components/headings";
import PageTitlebar from "@/components/page-titlebar";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImageLinkCard } from "@/components/image-link-card";


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

                        <div className="flex justify-center pb-12 sm:pt-6">
                            <EmbeddedMarkdownRenderer className="max-w-3xl mx-auto p-6 border border-primary rounded-md">
                                {t('doelen.description')}
                            </EmbeddedMarkdownRenderer>
                        </div>
                    </Container>

                </section>

                <section>
                    <Container>
                        <H2>{t('onderzoeken.title')}</H2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                            <li className="col-span-1 md:col-span-2">
                                <ImageLinkCard
                                    title={t('onderzoeken.cards.vragenlijst.title')}
                                    moreBtnLabel={t('onderzoeken.readMoreBtn')}
                                    href="/onderzoek/vragenlijst"
                                    imageSrc="/static/images/small-pexels-rodnae-productions-10376214y_crop.jpg"
                                    imageAlt={t('onderzoeken.cards.vragenlijst.imageAlt')}
                                >
                                    {t('onderzoeken.cards.vragenlijst.description')}
                                </ImageLinkCard>
                            </li>
                            <li>
                                <ImageLinkCard
                                    title={t('onderzoeken.cards.lymeProspect.title')}
                                    moreBtnLabel={t('onderzoeken.readMoreBtn')}
                                    href="/onderzoek/lymeProspect"
                                    imageSrc="/static/images/cRIVM/82073-1920.jpg"
                                    imageAlt={t('onderzoeken.cards.lymeProspect.imageAlt')}
                                    imageCredits="© RIVM"
                                >
                                    {t('onderzoeken.cards.lymeProspect.description')}
                                </ImageLinkCard>
                            </li>
                            <li>
                                <ImageLinkCard
                                    title={t('onderzoeken.cards.preventieveAntibiotica.title')}
                                    moreBtnLabel={t('onderzoeken.readMoreBtn')}
                                    href="/onderzoek/preventieveAntibiotica"
                                    imageSrc="/static/images/cRIVM/iStock-159286807-1920.jpg"
                                    imageAlt={t('onderzoeken.cards.preventieveAntibiotica.imageAlt')}
                                    imageCredits="© RIVM"
                                >
                                    {t('onderzoeken.cards.preventieveAntibiotica.description')}
                                </ImageLinkCard>
                            </li>
                            <li>
                                <ImageLinkCard
                                    title={t('onderzoeken.cards.victory.title')}
                                    moreBtnLabel={t('onderzoeken.readMoreBtn')}
                                    href="/onderzoek/victory"
                                    imageSrc="/static/images/pexels-katerina-holmes-5905747.jpg"
                                    imageAlt={t('onderzoeken.cards.victory.imageAlt')}
                                >
                                    {t('onderzoeken.cards.victory.description')}
                                </ImageLinkCard>
                            </li>
                            <li>
                                <ImageLinkCard
                                    title={t('onderzoeken.cards.pandora.title')}
                                    moreBtnLabel={t('onderzoeken.readMoreBtn')}
                                    href="/onderzoek/pandora"
                                    imageSrc="/static/images/cRIVM/JPJDouaneLaboratorium17-1920.jpg"
                                    imageAlt={t('onderzoeken.cards.pandora.imageAlt')}
                                    imageCredits="© RIVM"
                                >
                                    {t('onderzoeken.cards.pandora.description')}
                                </ImageLinkCard>
                            </li>
                        </ul>
                    </Container>
                </section>

                <section>
                    <Container>
                        <H2>{t('onderzoeken.title')}</H2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <li className="col-span-1">
                                <ImageLinkCard
                                    title={t('results.cards.cijfers.title')}
                                    moreBtnLabel={t('results.readMoreBtn')}
                                    href="/onderzoek/cijfers"
                                    imageSrc="/static/images/cRIVM/PV-20161013-02-1920.jpg"
                                    imageAlt={t('results.cards.cijfers.imageAlt')}
                                    imageCredits="© RIVM"
                                >
                                    {t('results.cards.cijfers.body')}
                                </ImageLinkCard>
                            </li>

                            <li className="col-span-1">
                                <ImageLinkCard
                                    title={t('results.cards.publicaties.title')}
                                    moreBtnLabel={t('results.readMoreBtn')}
                                    href="/onderzoek/publicaties"
                                    imageSrc="/static/images/cRIVM/ipads&phonesnieuwewerken-8-1920.jpg"
                                    imageAlt={t('results.cards.publicaties.imageAlt')}
                                    imageCredits="© RIVM"
                                >
                                    {t('results.cards.publicaties.body')}
                                </ImageLinkCard>
                            </li>
                        </ul>
                    </Container>
                </section>

                <section>
                    for doctors
                </section>

            </div>

        </div>
    )
}
