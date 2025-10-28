import { getTranslations } from "next-intl/server";
import { LocaleParams } from "../../utils";

export const generateMetadata = async ({ params }: LocaleParams) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'LinkResolvers' });
    return {
        title: t('title'),
    };
}

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="h-full">
            {children}
        </div>
    );
}
