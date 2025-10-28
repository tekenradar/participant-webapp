import { LocaleParams } from "@/app/[locale]/utils";
import { H2 } from "@/components/headings";
import SimpleLoader from "@/components/simple-loader";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ManageProfilesLoader from "./_components/manage-profiles-loader";


export const generateMetadata = async (props: LocaleParams) => {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ManageProfilesPage' });

    return {
        title: t('title'),
    }
}

export default async function Page(props: LocaleParams) {
    const { locale } = await props.params;
    const t = await getTranslations({ locale: locale, namespace: 'ManageProfilesPage' });

    return (
        <div>
            <H2>
                {t('title')}
            </H2>
            <Suspense fallback={<SimpleLoader />}>
                <div className="mt-6">
                    <ManageProfilesLoader
                        locale={locale}
                    />
                </div>
            </Suspense>
        </div>
    );
}
