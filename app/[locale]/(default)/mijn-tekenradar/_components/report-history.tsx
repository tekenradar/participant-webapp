import { H2 } from "@/components/headings";
import SimpleLoader from "@/components/simple-loader";
import { Profile } from "@/lib/server/data-fetching/user";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ReportHistoryClient from "./report-history-client";


interface ReportHistoryProps {
    profiles: Profile[];
    locale: string;
}

const ReportHistory = async (props: ReportHistoryProps) => {
    const { profiles, locale } = props;

    const t = await getTranslations('DashboardPage.reportHistory');

    return (
        <div>
            <H2>{t('title')}</H2>
            <p className="mt-2">{t('description')}</p>

            <div className="mt-4">
                <Suspense fallback={<SimpleLoader />}>
                    <ReportHistoryClient
                        locale={locale}
                        profiles={profiles}
                        messages={{
                            profileSelectorLabel: t('profileSelectorLabel'),
                            noProfileSelected: t('noProfileSelected'),
                            mainProfileLabel: t('mainProfileLabel'),
                            loadMoreBtnLabel: t('loadMoreBtnLabel'),
                            errorLoadingReports: t('errorLoadingReports'),
                            noReports: t('noReports'),
                            reportCards: {
                                hasNoData: t('reportCards.hasNoData'),
                                followUp: {
                                    title: t('reportCards.followUp.title'),
                                },
                                TB: {
                                    title: t('reportCards.TB.title'),
                                    environment: {
                                        label: t('reportCards.TB.environment.label'),
                                        a: t('reportCards.TB.environment.a'),
                                        b: t('reportCards.TB.environment.b'),
                                        c: t('reportCards.TB.environment.c'),
                                        d: t('reportCards.TB.environment.d'),
                                        e: t('reportCards.TB.environment.e'),
                                        f: t('reportCards.TB.environment.f'),
                                        g: t('reportCards.TB.environment.g'),
                                        h: t('reportCards.TB.environment.h'),
                                        i: t('reportCards.TB.environment.i'),
                                    },
                                    activity: {
                                        label: t('reportCards.TB.activity.label'),
                                        a: t('reportCards.TB.activity.a'),
                                        b: t('reportCards.TB.activity.b'),
                                        c: t('reportCards.TB.activity.c'),
                                        d: t('reportCards.TB.activity.d'),
                                        e: t('reportCards.TB.activity.e'),
                                        f: t('reportCards.TB.activity.f'),
                                        g: t('reportCards.TB.activity.g'),
                                        h: t('reportCards.TB.activity.h'),
                                        i: t('reportCards.TB.activity.i'),
                                    },
                                    count: {
                                        label: t('reportCards.TB.count.label'),
                                    },
                                    location: {
                                        label: t('reportCards.TB.location.label'),
                                    }
                                },
                                EM: {
                                    title: t('reportCards.EM.title'),
                                },
                                LB: {
                                    title: t('reportCards.LB.title'),
                                },
                                chronic: {
                                    title: t('reportCards.chronic.title'),
                                },
                                Fever: {
                                    title: t('reportCards.Fever.title'),
                                },

                            },

                        }}
                    />
                </Suspense>
            </div>
        </div>
    )
}

export default ReportHistory;