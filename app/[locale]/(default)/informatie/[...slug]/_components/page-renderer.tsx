import React from 'react';
import ArticlePageLayout from "@/components/layouts/article-page-layout";
import { infoPages } from "#site/content";
import { MDXContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";
import CoverImage, { CoverImagePosition } from '@/components/cover-image';
import IndexPageLayout from '@/components/layouts/index-page-layout';
import { getTranslations } from 'next-intl/server';
import ReportCard from '@/components/report-card';
import RelatedPages from '@/components/related-pages';


export const getContent = async (locale: string, name: string) => {
    return infoPages.find(pageItem => pageItem.locale === locale && pageItem.slugAsParams === name);
}


interface InfopageRendererProps {
    locale: string;
    name: string;
}

const PageRenderer: React.FC<InfopageRendererProps> = async (props) => {
    const pageContent = await getContent(props.locale, props.name);
    const t = await getTranslations('InformatiePage');

    if (!pageContent) {
        notFound();
    }

    const layout = pageContent.layout || 'article';

    switch (layout) {
        case 'index':
            return (
                <IndexPageLayout
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
                        <div>
                            <ReportCard showMyTekenradarLink={false} />
                        </div>
                    }
                >
                    <MDXContent
                        code={pageContent.content}
                    />
                </IndexPageLayout>
            );
        case 'article':
        default:

            const hasPreviousPage = pageContent.previousPageURL && pageContent.previousPageTitle;
            const hasNextPage = pageContent.nextPageURL && pageContent.nextPageTitle;

            const hasOverviewPage = pageContent.overviewPageKey;

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
                    sideBarContent={<div className='flex justify-center'>
                        <ReportCard showMyTekenradarLink={false} />
                    </div>}
                    bottomContent={<div
                        className={'mt-6 grow lg:max-w-[728px] w-full'}
                    >
                        <RelatedPages
                            title={t('relatedPages.title')}
                            previousPage={hasPreviousPage ? {
                                key: 'previousPage',
                                href: pageContent.previousPageURL,
                                title: pageContent.previousPageTitle,
                                description: pageContent.previousPageDescription,
                                btnLabel: t('relatedPages.readMoreBtn'),
                                imageURL: '/static/images/waar-leven-teken.jpg',
                            } : undefined}
                            nextPage={hasNextPage ? {
                                key: 'nextPage',
                                href: pageContent.nextPageURL,
                                title: pageContent.nextPageTitle,
                                description: pageContent.nextPageDescription,
                                btnLabel: t('relatedPages.readMoreBtn'),
                            } : undefined}
                            overviewPage={hasOverviewPage ? {
                                key: 'overviewPage',
                                href: `/informatie/${pageContent.overviewPageKey}`,
                                title: t(`relatedPages.overviewPageReferences.${pageContent.overviewPageKey}.title`),
                                description: t(`relatedPages.overviewPageReferences.${pageContent.overviewPageKey}.description`),
                                btnLabel: t(`relatedPages.overviewPageReferences.${pageContent.overviewPageKey}.btnLabel`),
                                imageURL: '/static/images/waar-leven-teken.jpg',
                                imageMode: 'left',
                            } : undefined}
                        />
                    </div>
                    }
                >
                    <MDXContent
                        code={pageContent.content}
                    />
                </ArticlePageLayout>
            );
    }
};

export default PageRenderer;
