import { locales } from "@/i18n/routing";
import { newsPages } from "@/.velite";
import PageRenderer, { getNewsPageContent } from "./_components/page-renderer";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string[];
    }>;
}

export function generateStaticParams() {
    const staticParams: Array<{
        locale: string;
        slug: string[];
    }> = [];
    locales.forEach(locale => {
        newsPages.forEach(({ slugAsParams }) => {
            staticParams.push({ locale, slug: slugAsParams.split('/') });
        });
    });
    return staticParams;
}

export const generateMetadata = async (props: PageProps) => {
    const { locale, slug } = await props.params;
    const name = slug.join("/");
    const page = await getNewsPageContent(locale, name);

    if (!page) {
        return null;
    }

    return {
        title: page.title,
    };
}

export default async function Page(
    props: PageProps
) {
    const { locale, slug } = await props.params;
    setRequestLocale(locale);

    const name = slug.join("/");
    return (
        <PageRenderer
            locale={locale}
            name={name}
        />
    );
}
