import { notFound } from "next/navigation";
import { getGeneralContent } from "./utils";
import ArticlePageLayout from "@/components/layouts/article-page-layout";
import CoverImage, { CoverImagePosition } from "@/components/cover-image";
import { MDXContent } from "@/components/mdx-content";

export const renderGeneralPageContent = async (locale: string, name: string) => {
    const pageContent = await getGeneralContent(locale, name);

    if (!pageContent) {
        notFound();
    }

    return (
        <ArticlePageLayout
            title={<>
                {pageContent.title}
            </>
            }
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
            sideBarContent={<div>TODO: report card</div>}
        >
            <MDXContent
                code={pageContent.content}
            />
        </ArticlePageLayout>
    );
}