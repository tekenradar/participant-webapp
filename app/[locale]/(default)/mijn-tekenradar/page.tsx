import { LocaleParams } from "../../utils";
import { getTranslations } from "next-intl/server";
import ArticlePageLayout from "@/components/layouts/article-page-layout";
import DashboardSidebar from "./_components/dashboard-sidebar";
import SurveyList from "./_components/survey-list";
import { redirect } from "next/navigation";
import { getUser, Profile } from "@/lib/server/data-fetching/user";
import { ensureUserIsInAllDefaultStudies } from "@/actions/study/ensure-all-profiles-are-in-default-studies";
import ReportHistory from "./_components/report-history";


export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;

    const t = await getTranslations({ locale, namespace: 'DashboardPage' });

    const resp = await getUser();
    if (!resp || resp.error) {
        redirect('/')
    }
    const profiles = resp.user.profiles as Profile[];
    await ensureUserIsInAllDefaultStudies(profiles);

    return (
        <ArticlePageLayout
            title={
                t('title')
            }
            topContent={undefined}
            sideBarContent={
                <div className="space-y-4 w-full">
                    <DashboardSidebar />
                </div>
            }
        >
            <div className="grow space-y-8">
                <SurveyList
                    locale={locale}
                    profiles={profiles}
                />

                <ReportHistory
                    profiles={profiles}
                    locale={locale}
                />
            </div>
        </ArticlePageLayout>
    );
}
