import { LocaleParams } from "../../utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CoverImage from "@/components/cover-image";
import { filterNewsItemsForYear, getSortedNewsArticles } from "@/lib/utils/news-items-utils";
import { H2 } from "@/components/headings";
import ArticlePageLayout from "@/components/layouts/article-page-layout";
import ReportCard from "@/components/report-card";
import { ImageLinkCard } from "@/components/image-link-card";


export const generateMetadata = async () => {
    const t = await getTranslations('NewsPage');

    return {
        title: t('meta.title'),
        description: t('meta.description'),
    }
}

const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear; year++) {
        years.push(year);
    }
    years.reverse();
    return years;
}

const draftMode = process.env.NEXT_DRAFT_MODE === 'true';


export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    setRequestLocale(locale);
    const t = await getTranslations('NewsPage');

    const sortedNewsItems = await getSortedNewsArticles(locale, draftMode);

    return (
        <ArticlePageLayout
            title={<>
                {t('title')}
            </>}
            topContent={
                <CoverImage
                    width={1000}
                    height={367}
                    src="/static/images/newspapers-g351ad5b65_1280.jpg"
                    alt={t('title')}
                    coverImageYPosition="30%"
                />
            }
            sideBarContent={
                <div className='flex justify-center'>
                    <ReportCard showMyTekenradarLink={false} />
                </div>
            }
        >
            <div className="space-y-6" >
                {getYears().map(year => {
                    const yearNewsItems = filterNewsItemsForYear(sortedNewsItems, year);
                    if (yearNewsItems.length < 1) {
                        return null;
                    }
                    return (
                        <section key={year}>
                            <H2>
                                {year}
                            </H2>
                            <ul className="space-y-4 pt-4">
                                {yearNewsItems.map((newsItem, index) => (
                                    <li key={newsItem.slug}>
                                        <ImageLinkCard
                                            title={newsItem.title}
                                            moreBtnLabel={t('readMoreBtn')}
                                            dateLabel={new Date(newsItem.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                                            imagePlacement={newsItem.teaserImagePlacement || (index === 0 ? 'top' : 'left')}
                                            href={`${newsItem.slug}`}
                                            imageSrc={newsItem.teaserImage?.src}
                                            imageAlt={newsItem.title}
                                            imageCredits={newsItem.teaserImageCredits}
                                        >
                                            {newsItem.teaserText}
                                        </ImageLinkCard>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )
                })}
            </div>

        </ArticlePageLayout>
    );
}
