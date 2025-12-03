import Container from "@/components/container"
import { H2 } from "@/components/headings";
import { ImageLinkCard } from "@/components/image-link-card";
import { getSortedNewsArticles } from "@/lib/utils/news-items-utils";
import { getTranslations } from "next-intl/server";

const draftMode = process.env.NEXT_DRAFT_MODE === 'true';

const LatestNewsSection = async (props: { locale: string }) => {
    const t = await getTranslations('LandingPage.latestNews');

    const sortedNewsItems = await getSortedNewsArticles(props.locale, draftMode);

    if (sortedNewsItems.length < 3) {
        return null;
    }

    const topNewsItem = sortedNewsItems[0];
    return (
        <section>
            <Container>
                <H2
                    className="font-bold"
                    borderOnTop={false}
                >
                    {t('title')}
                </H2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <ImageLinkCard
                        title={topNewsItem.title}
                        moreBtnLabel={t('readMoreBtn')}
                        dateLabel={new Date(topNewsItem.date).toLocaleDateString(props.locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                        imagePlacement="top"
                        imageHeightClassName="max-h-[250px] min-h-[250px]"
                        href={`${topNewsItem.slug}`}
                        imageSrc={topNewsItem.teaserImage?.src}
                        imageAlt={topNewsItem.title}
                    >
                    </ImageLinkCard>

                    <ul className="space-y-4">
                        {sortedNewsItems.slice(1, 3).map((newsItem) => (
                            <li key={newsItem.slug}>
                                <ImageLinkCard
                                    title={newsItem.title}
                                    moreBtnLabel={t('readMoreBtn')}
                                    dateLabel={new Date(newsItem.date).toLocaleDateString(props.locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    href={`${newsItem.slug}`}
                                    imagePlacement="left"
                                    imageSrc={newsItem.teaserImage?.src}
                                    imageAlt={newsItem.title}
                                >

                                </ImageLinkCard>
                            </li>
                        ))}

                        <li>
                            <ImageLinkCard
                                title={t('goToNewsPage.title')}
                                moreBtnLabel={t('goToNewsPage.btnLabel')}
                                href="/nieuws"
                            >
                                {t('goToNewsPage.description')}
                            </ImageLinkCard>

                        </li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default LatestNewsSection;