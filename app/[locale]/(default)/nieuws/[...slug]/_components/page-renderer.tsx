import React from 'react';
import ArticlePageLayout from "@/components/layouts/article-page-layout";
import { newsPages } from "#site/content";
import { MDXContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";
import CoverImage, { CoverImagePosition } from '@/components/cover-image';
import IndexPageLayout from '@/components/layouts/index-page-layout';
import { ImageLinkCard } from '@/components/image-link-card';
import { getTranslations } from 'next-intl/server';


export const getContent = async (locale: string, name: string) => {
    return newsPages.find(pageItem => pageItem.locale === locale && pageItem.slugAsParams === name);
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

    const published = new Date(pageContent.date) < new Date();

    if (!published && process.env.NEXT_DRAFT_MODE !== 'true') {
        notFound();
    }


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
            sideBarContent={<div><ImageLinkCard
                imageSrc="/static/images/ANP-371602781-1024.jpg"
                title={t('meldenCard.title')}
                imageAlt=''
                moreBtnLabel={t('meldenCard.actionLabel')}
                href="/dashboard"
            >
                <p className="italic">
                    {t('meldenCard.body')}
                </p>
            </ImageLinkCard></div>}
        >
            <MDXContent
                code={pageContent.content}
            />
        </ArticlePageLayout>
    );
};

export default PageRenderer;
