import React from 'react';
import ArticlePageLayout from "@/components/layouts/article-page-layout";
import { NewsItem } from "#site/content";
import { MDXContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";
import CoverImage, { CoverImagePosition } from '@/components/cover-image';
import { getTranslations } from 'next-intl/server';
import ReportCard from '@/components/report-card';
import { getSortedNewsArticles } from '@/lib/utils/news-items-utils';
import RelatedPages from '@/components/related-pages';


const getContentIndex = async (items: Array<NewsItem>, locale: string, name: string) => {
    return items.findIndex(pageItem => pageItem.locale === locale && pageItem.slugAsParams === name);
}

const draftMode = process.env.NEXT_DRAFT_MODE === 'true';

export const getNewsPageContent = async (locale: string, name: string) => {
    const sortedNewsItems = await getSortedNewsArticles(locale, draftMode);
    const pageIndex = await getContentIndex(sortedNewsItems, locale, name);
    if (pageIndex === -1) {
        return undefined;
    }
    return sortedNewsItems[pageIndex];
}

interface InfopageRendererProps {
    locale: string;
    name: string;
}

const PageRenderer: React.FC<InfopageRendererProps> = async (props) => {
    const sortedNewsItems = await getSortedNewsArticles(props.locale, draftMode);
    const pageIndex = await getContentIndex(sortedNewsItems, props.locale, props.name);
    if (pageIndex === -1) {
        notFound();
    }

    const pageContent = sortedNewsItems[pageIndex];
    const t = await getTranslations('NewsPage');

    if (!pageContent) {
        notFound();
    }

    const published = new Date(pageContent.date) < new Date();

    if (!published && !draftMode) {
        notFound();
    }

    const previousPage = pageIndex > 0 ? sortedNewsItems[pageIndex - 1] : undefined;
    const nextPage = pageIndex < sortedNewsItems.length - 1 ? sortedNewsItems[pageIndex + 1] : undefined;

    return (
        <ArticlePageLayout
            title={<>
                {pageContent.title}
            </>}
            topContent={
                pageContent.cover && (
                    <CoverImage
                        src={pageContent.cover}
                        alt={pageContent.title}
                        credits={pageContent.coverCredits}
                        coverImageYPosition={pageContent.coverImageYPosition as CoverImagePosition}
                    />
                )
            }
            sideBarContent={
                <div className='flex justify-center'>
                    <ReportCard showMyTekenradarLink={false} />
                </div>
            }
            bottomContent={<div
                className={'mt-6 grow lg:max-w-[728px] w-full'}
            >
                <RelatedPages
                    title={t('relatedPages.title')}
                    previousPage={previousPage ? {
                        href: '/nieuws/' + previousPage.slugAsParams,
                        title: previousPage.title,
                        description: previousPage.teaserText,
                        btnLabel: t('relatedPages.readMoreBtn'),
                        date: new Date(previousPage.date).toLocaleDateString(props.locale, { year: 'numeric', month: 'long', day: 'numeric' }),
                        // imageURL: previousPage.cover,
                    } : undefined}
                    nextPage={nextPage ? {
                        href: '/nieuws/' + nextPage.slugAsParams,
                        title: nextPage.title,
                        description: nextPage.teaserText,
                        btnLabel: t('relatedPages.readMoreBtn'),
                        date: new Date(nextPage.date).toLocaleDateString(props.locale, { year: 'numeric', month: 'long', day: 'numeric' }),
                        // imageURL: nextPage.cover,
                    } : undefined}
                    overviewPage={{
                        href: `/nieuws`,
                        title: t(`relatedPages.overviewPageReference.title`),
                        description: t(`relatedPages.overviewPageReference.description`),
                        btnLabel: t(`relatedPages.overviewPageReference.btnLabel`),
                        imageURL: '/static/images/waar-leven-teken.jpg',
                        imageMode: 'left',
                    }}
                />
            </div>
            }
        >
            <MDXContent
                code={pageContent.content}
            />
        </ArticlePageLayout>
    );
};

export default PageRenderer;
