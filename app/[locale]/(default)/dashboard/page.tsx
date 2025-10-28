import { LocaleParams } from "../../utils";
import { getTranslations } from "next-intl/server";
import ArticlePageLayout from "@/components/layouts/article-page-layout";
import DashboardSidebar from "./_components/dashboard-sidebar";
import { Suspense } from "react";
import SimpleLoader from "@/components/simple-loader";
import SurveyListLoader from "./_components/survey-list-loader";
import FullwidthImageWithContent from "@/components/fullwidth-image-with-content";


export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;

    const t = await getTranslations({ locale, namespace: 'DashboardPage' });

    return (
        <ArticlePageLayout
            title={
                t('title')
            }
            topContent={
                <FullwidthImageWithContent
                    imageSrc='/static/images/ANP-371602781-1024.jpg'
                    imageAlt=''
                    sectionClassName='h-[367px] max-h-[367px]'
                    imageClassName='object-top'
                >
                    <p className=''>{t('teaserImage.description')}</p>
                </FullwidthImageWithContent>
            }
            sideBarContent={
                <div className="space-y-4 w-full">
                    <DashboardSidebar />
                </div>
            }
        >
            <div className="grow">
                <Suspense fallback={<SimpleLoader />}>
                    <SurveyListLoader
                        locale={locale}
                    />
                </Suspense>
            </div>
        </ArticlePageLayout>
    );
}
